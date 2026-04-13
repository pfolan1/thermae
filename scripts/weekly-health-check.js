#!/usr/bin/env node
/**
 * Thermae Weekly Health Check
 * Reads all venues from src/data/venues.ts, checks each website is live,
 * generates a detailed report, and emails it to hello@thermae.app
 *
 * Usage:  node scripts/weekly-health-check.js
 * Config: set ZOHO_EMAIL and ZOHO_PASSWORD environment variables
 *         (copy scripts/.env.example to scripts/.env and fill in values)
 */

const https      = require('https');
const http       = require('http');
const fs         = require('fs');
const path       = require('path');
const nodemailer = require('nodemailer');

// Load .env from scripts/ directory (gracefully — falls back to process.env)
try { require('dotenv').config({ path: path.join(__dirname, '.env') }); } catch (_) {}

// ── CONFIG ────────────────────────────────────────────────────────────────────
const VENUES_FILE  = path.join(__dirname, '../src/data/venues.ts');
const REPORT_FILE  = path.join(__dirname, 'health-report.txt');
const TIMEOUT_MS   = 12000;   // 12 s per request
const CONCURRENCY  = 6;       // parallel requests (polite)
const REPORT_EMAIL = 'hello@thermae.app';

// Bounding boxes for sanity-checking coordinates [minLat, maxLat, minLng, maxLng]
const COUNTRY_BOUNDS = {
  'UK':       [49.8,  61.0, -8.7,   2.0],
  'Ireland':  [51.4,  55.5, -10.6, -5.9],
  'Norway':   [57.9,  71.2,  4.5,  31.2],
  'Sweden':   [55.3,  69.1, 10.9,  24.2],
  'Finland':  [59.7,  70.1, 19.7,  31.6],
  'Denmark':  [54.5,  57.8,  8.0,  15.3],
  'Iceland':  [63.3,  66.6,-24.5, -13.4],
  'Estonia':  [57.5,  59.7, 21.7,  28.2],
  'Latvia':   [55.6,  58.1, 20.9,  28.3],
  'Lithuania':[53.9,  56.5, 20.9,  26.9],
};

// ── PARSE VENUES ──────────────────────────────────────────────────────────────
function parseVenues(src) {
  const venues = [];
  // Split on opening brace preceded by whitespace (each venue object)
  const blocks = src.split(/\n\s*\{/);
  for (const block of blocks) {
    const id      = (block.match(/\bid\s*:\s*(\d+)/)              || [])[1];
    const name    = (block.match(/\bname\s*:\s*"([^"]+)"/)         || [])[1];
    const city    = (block.match(/\bcity\s*:\s*"([^"]+)"/)         || [])[1];
    const country = (block.match(/\bcountry\s*:\s*"([^"]+)"/)      || [])[1];
    const area    = (block.match(/\barea\s*:\s*"([^"]+)"/)         || [])[1];
    const latM    =  block.match(/\blat\s*:\s*(-?\d+\.?\d*)/);
    const lngM    =  block.match(/\blng\s*:\s*(-?\d+\.?\d*)/);
    const url     = (block.match(/\bbookingUrl\s*:\s*"([^"]+)"/)   || [])[1];

    if (id && name && city) {
      venues.push({
        id:      Number(id),
        name,
        city,
        country: country || 'Unknown',
        area:    area    || '',
        lat:     latM ? Number(latM[1]) : null,
        lng:     lngM ? Number(lngM[1]) : null,
        url:     url  || null,
      });
    }
  }
  return venues;
}

// ── HTTP CHECK ────────────────────────────────────────────────────────────────
function checkUrl(url, depth = 0) {
  return new Promise(resolve => {
    if (depth > 3) return resolve({ status: 'ERROR', code: null, note: 'Too many redirects' });

    let settled = false;
    const done = val => { if (!settled) { settled = true; resolve(val); } };

    const timer = setTimeout(() => done({ status: 'TIMEOUT', code: null }), TIMEOUT_MS);

    let parsedUrl;
    try { parsedUrl = new URL(url); } catch (_) {
      clearTimeout(timer);
      return done({ status: 'ERROR', code: null, note: 'Invalid URL' });
    }

    const mod = parsedUrl.protocol === 'https:' ? https : http;
    const req = mod.request(url, {
      method: 'HEAD',
      timeout: TIMEOUT_MS,
      headers: { 'User-Agent': 'Thermae-HealthBot/1.0 (+https://thermae.app)' },
    }, res => {
      clearTimeout(timer);
      const code = res.statusCode;
      if ([301, 302, 307, 308].includes(code) && res.headers.location) {
        // Resolve relative redirects
        let loc = res.headers.location;
        if (loc.startsWith('/')) loc = `${parsedUrl.protocol}//${parsedUrl.host}${loc}`;
        checkUrl(loc, depth + 1).then(done);
      } else {
        done({ status: code >= 200 && code < 400 ? 'OK' : 'DEAD', code });
      }
    });

    req.on('error', () => { clearTimeout(timer); done({ status: 'ERROR', code: null }); });
    req.on('timeout', () => { clearTimeout(timer); req.destroy(); done({ status: 'TIMEOUT', code: null }); });
    req.end();
  });
}

// ── CONCURRENCY POOL ──────────────────────────────────────────────────────────
async function checkAll(venues) {
  const results = new Array(venues.length);
  let idx = 0;

  async function worker() {
    while (idx < venues.length) {
      const i = idx++;
      const v = venues[i];
      if (!v.url) {
        results[i] = { ...v, status: 'NO_URL', code: null };
      } else {
        process.stdout.write(`  [${String(i + 1).padStart(3)}/${venues.length}] ${v.name.padEnd(45).slice(0,45)}…\r`);
        const r = await checkUrl(v.url);
        results[i] = { ...v, ...r };
      }
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  process.stdout.write('\n');
  return results;
}

// ── COORDINATE SANITY CHECK ───────────────────────────────────────────────────
function checkCoordinates(venues) {
  const noCoords   = [];
  const inTheSea   = [];

  for (const v of venues) {
    if (v.lat === null || v.lng === null) {
      noCoords.push(v);
      continue;
    }
    if (v.lat === 0 && v.lng === 0) {
      inTheSea.push({ ...v, note: 'Coordinates are 0,0 (Null Island)' });
      continue;
    }
    const bounds = COUNTRY_BOUNDS[v.country];
    if (bounds) {
      const [minLat, maxLat, minLng, maxLng] = bounds;
      if (v.lat < minLat || v.lat > maxLat || v.lng < minLng || v.lng > maxLng) {
        inTheSea.push({
          ...v,
          note: `Coords ${v.lat},${v.lng} outside expected ${v.country} bounding box`,
        });
      }
    }
  }

  return { noCoords, inTheSea };
}

// ── REPORT BUILDER ────────────────────────────────────────────────────────────
function buildReport(results, coordCheck, date) {
  const ok      = results.filter(r => r.status === 'OK');
  const dead    = results.filter(r => r.status === 'DEAD');
  const timeout = results.filter(r => r.status === 'TIMEOUT');
  const error   = results.filter(r => r.status === 'ERROR');
  const noUrl   = results.filter(r => r.status === 'NO_URL');
  const flagged = [...dead, ...timeout, ...error];
  const { noCoords, inTheSea } = coordCheck;

  const sep  = '═══════════════════════════════════════════════════════════════';
  const sep2 = '───────────────────────────────────────────────────────────────';

  const lines = [
    sep,
    `  THERMAE WEEKLY HEALTH CHECK`,
    `  ${date}`,
    sep,
    '',
    `  Total venues checked : ${results.length}`,
    `  ✅ OK                : ${ok.length}`,
    `  ❌ Dead (4xx/5xx)    : ${dead.length}`,
    `  ⏱  Timeout           : ${timeout.length}`,
    `  ⚠️  Connection error  : ${error.length}`,
    `  🔗 No website listed : ${noUrl.length}`,
    `  📍 No coordinates    : ${noCoords.length}`,
    `  🌊 Suspect coordinates: ${inTheSea.length}`,
    '',
  ];

  // ── Flagged websites ──
  if (flagged.length > 0) {
    lines.push('── FLAGGED WEBSITES (dead / timeout / error) ───────────────────');
    for (const r of flagged) {
      const code = r.code ? ` HTTP ${r.code}` : '';
      lines.push(`  [${r.status.padEnd(7)}${code.padEnd(9)}]  ID ${String(r.id).padStart(3)}  ${r.name}`);
      lines.push(`    ${r.city}, ${r.country}`);
      lines.push(`    ${r.url}`);
      lines.push('');
    }
  } else {
    lines.push('── FLAGGED WEBSITES ─────────────────────────────────────────────');
    lines.push('  All websites are live. No action needed.');
    lines.push('');
  }

  // ── No website ──
  if (noUrl.length > 0) {
    lines.push('── VENUES WITH NO WEBSITE ───────────────────────────────────────');
    for (const r of noUrl) {
      lines.push(`  ID ${String(r.id).padStart(3)}  ${r.name} · ${r.city}, ${r.country}`);
    }
    lines.push('');
  }

  // ── No coordinates ──
  if (noCoords.length > 0) {
    lines.push('── VENUES WITH NO COORDINATES ───────────────────────────────────');
    for (const v of noCoords) {
      lines.push(`  ID ${String(v.id).padStart(3)}  ${v.name} · ${v.city}, ${v.country}`);
    }
    lines.push('');
  }

  // ── Suspect coordinates ──
  if (inTheSea.length > 0) {
    lines.push('── SUSPECT COORDINATES (may be in the sea) ──────────────────────');
    for (const v of inTheSea) {
      lines.push(`  ID ${String(v.id).padStart(3)}  ${v.name} · ${v.city}, ${v.country}`);
      lines.push(`    lat: ${v.lat}, lng: ${v.lng}`);
      lines.push(`    ⚠ ${v.note}`);
      lines.push('');
    }
  }

  // ── Suggested actions ──
  const hasActions = flagged.length > 0 || noCoords.length > 0 || inTheSea.length > 0;
  lines.push('── SUGGESTED ACTIONS ────────────────────────────────────────────');
  if (!hasActions) {
    lines.push('  No actions required this week. Everything looks healthy! 🎉');
  } else {
    for (const r of dead) {
      lines.push(`• [DEAD] ${r.name} (${r.city}) — ${r.url}`);
      lines.push('  → HTTP error returned. Venue may have closed or changed URL.');
      lines.push('  → Visit URL manually. If gone: set open:false or remove entry.');
    }
    for (const r of timeout) {
      lines.push(`• [TIMEOUT] ${r.name} (${r.city}) — ${r.url}`);
      lines.push('  → Site timed out. Check manually; may be a temporary outage.');
    }
    for (const r of error) {
      lines.push(`• [ERROR] ${r.name} (${r.city}) — ${r.url}`);
      lines.push('  → DNS/connection failure. Verify the URL is correct.');
    }
    for (const v of noCoords) {
      lines.push(`• [NO COORDS] ${v.name} (${v.city}) — add lat/lng to venues.ts`);
    }
    for (const v of inTheSea) {
      lines.push(`• [BAD COORDS] ${v.name} (${v.city}) — verify lat:${v.lat} lng:${v.lng}`);
    }
  }
  lines.push('');
  lines.push(sep2);
  lines.push(`Report generated: ${new Date().toISOString()}`);
  lines.push('');

  return lines.join('\n');
}

// ── EMAIL ─────────────────────────────────────────────────────────────────────
async function sendReport(report, flaggedCount, date) {
  const email    = process.env.ZOHO_EMAIL;
  const password = process.env.ZOHO_PASSWORD;

  if (!email || !password) {
    console.log('\n⚠  ZOHO_EMAIL / ZOHO_PASSWORD not set — skipping email.');
    console.log('   Set these in scripts/.env (see scripts/.env.example)');
    return;
  }

  const transporter = nodemailer.createTransport({
    host:   'smtp.zoho.eu',
    port:   465,
    secure: true,
    auth:   { user: email, pass: password },
  });

  const subject = flaggedCount > 0
    ? `⚠️ Thermae Health Check — ${flaggedCount} issue(s) found — ${date}`
    : `✅ Thermae Health Check — All clear — ${date}`;

  await transporter.sendMail({
    from:    `"Thermae Health Bot" <${email}>`,
    to:      REPORT_EMAIL,
    subject,
    text:    report,
    html:    `<pre style="font-family:monospace;font-size:13px;line-height:1.5">${
               report.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
             }</pre>`,
  });

  console.log(`✅ Report emailed to ${REPORT_EMAIL}`);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
(async () => {
  console.log('');
  console.log('Thermae Weekly Health Check');
  console.log('===========================');

  const src    = fs.readFileSync(VENUES_FILE, 'utf-8');
  const venues = parseVenues(src);
  console.log(`Parsed ${venues.length} venues.\n`);
  console.log('Checking websites…\n');

  const results    = await checkAll(venues);
  const coordCheck = checkCoordinates(venues);

  const date   = new Date().toLocaleDateString('en-GB', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
  const report = buildReport(results, coordCheck, date);

  fs.writeFileSync(REPORT_FILE, report, 'utf-8');
  console.log(report);
  console.log(`Report saved to: ${REPORT_FILE}`);

  const flaggedCount =
    results.filter(r => ['DEAD','TIMEOUT','ERROR'].includes(r.status)).length +
    coordCheck.noCoords.length +
    coordCheck.inTheSea.length;

  await sendReport(report, flaggedCount, date);
})();
