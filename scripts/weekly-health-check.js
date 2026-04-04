#!/usr/bin/env node
/**
 * Thermae Weekly Health Check
 * Reads all venues from src/data/venues.ts, checks each website is live,
 * and writes a report to scripts/health-report.txt
 */

const https = require('https');
const http  = require('http');
const fs    = require('fs');
const path  = require('path');

// ── CONFIG ────────────────────────────────────────────────────────────────────
const VENUES_FILE   = path.join(__dirname, '../src/data/venues.ts');
const REPORT_FILE   = path.join(__dirname, 'health-report.txt');
const TIMEOUT_MS    = 10000;   // 10 s per request
const CONCURRENCY   = 8;       // parallel requests

// ── PARSE VENUES ──────────────────────────────────────────────────────────────
function parseVenues(src) {
  const venues = [];
  const blocks = src.split(/\n\s*\{/);
  for (const block of blocks) {
    const id   = (block.match(/\bid\s*:\s*(\d+)/)           || [])[1];
    const name = (block.match(/\bname\s*:\s*"([^"]+)"/)      || [])[1];
    const city = (block.match(/\bcity\s*:\s*"([^"]+)"/)      || [])[1];
    const url  = (block.match(/\bbookingUrl\s*:\s*"([^"]+)"/) || [])[1];
    if (id && name && city) {
      venues.push({ id: Number(id), name, city, url: url || null });
    }
  }
  return venues;
}

// ── HTTP CHECK ────────────────────────────────────────────────────────────────
function checkUrl(url) {
  return new Promise(resolve => {
    const timeout = setTimeout(() => resolve({ status: 'TIMEOUT', code: null }), TIMEOUT_MS);
    const mod = url.startsWith('https') ? https : http;
    const req = mod.request(url, { method: 'HEAD', timeout: TIMEOUT_MS }, res => {
      clearTimeout(timeout);
      const code = res.statusCode;
      // Follow single redirect
      if ([301, 302, 307, 308].includes(code) && res.headers.location) {
        checkUrl(res.headers.location).then(resolve);
      } else {
        resolve({ status: code >= 200 && code < 400 ? 'OK' : 'DEAD', code });
      }
    });
    req.on('error', () => { clearTimeout(timeout); resolve({ status: 'ERROR', code: null }); });
    req.on('timeout', () => { clearTimeout(timeout); req.destroy(); resolve({ status: 'TIMEOUT', code: null }); });
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
        process.stdout.write(`  Checking [${i + 1}/${venues.length}] ${v.name}…\r`);
        const r = await checkUrl(v.url);
        results[i] = { ...v, ...r };
      }
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  return results;
}

// ── REPORT ────────────────────────────────────────────────────────────────────
function buildReport(results, date) {
  const ok      = results.filter(r => r.status === 'OK');
  const dead    = results.filter(r => r.status === 'DEAD');
  const timeout = results.filter(r => r.status === 'TIMEOUT');
  const error   = results.filter(r => r.status === 'ERROR');
  const noUrl   = results.filter(r => r.status === 'NO_URL');
  const flagged = [...dead, ...timeout, ...error];

  const lines = [
    '═══════════════════════════════════════════════════════',
    `  THERMAE WEEKLY HEALTH CHECK — ${date}`,
    '═══════════════════════════════════════════════════════',
    '',
    `Total venues checked : ${results.length}`,
    `✅ OK                : ${ok.length}`,
    `❌ Dead (4xx/5xx)    : ${dead.length}`,
    `⏱  Timeout           : ${timeout.length}`,
    `⚠️  Connection error  : ${error.length}`,
    `🔗 No website listed : ${noUrl.length}`,
    '',
  ];

  if (flagged.length > 0) {
    lines.push('── FLAGGED VENUES (check manually) ──────────────────────');
    for (const r of flagged) {
      lines.push(`  [${r.status.padEnd(7)} ${r.code ?? '   '}]  ID ${String(r.id).padStart(3)}  ${r.name} (${r.city})`);
      lines.push(`           ${r.url}`);
    }
    lines.push('');
  }

  if (noUrl.length > 0) {
    lines.push('── VENUES WITH NO WEBSITE ────────────────────────────────');
    for (const r of noUrl) {
      lines.push(`  ID ${String(r.id).padStart(3)}  ${r.name} (${r.city})`);
    }
    lines.push('');
  }

  if (flagged.length > 0) {
    lines.push('── SUGGESTED ACTIONS ─────────────────────────────────────');
    for (const r of flagged) {
      lines.push(`• ${r.name} · ${r.city} · ${r.url}`);
      if (r.status === 'DEAD')    lines.push('  → Venue may have closed. Verify and remove or update URL.');
      if (r.status === 'TIMEOUT') lines.push('  → Site timed out. Try manually; may be a temporary issue.');
      if (r.status === 'ERROR')   lines.push('  → Connection refused or DNS failure. Check URL is correct.');
    }
    lines.push('');
  }

  lines.push('─────────────────────────────────────────────────────────');
  lines.push(`Report generated: ${new Date().toISOString()}`);
  lines.push('');

  return lines.join('\n');
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
(async () => {
  console.log('Thermae Health Check starting…');
  const src    = fs.readFileSync(VENUES_FILE, 'utf-8');
  const venues = parseVenues(src);
  console.log(`Parsed ${venues.length} venues. Checking websites…\n`);

  const results = await checkAll(venues);
  process.stdout.write('\n');

  const date   = new Date().toLocaleDateString('en-GB', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
  const report = buildReport(results, date);

  fs.writeFileSync(REPORT_FILE, report, 'utf-8');
  console.log(report);
  console.log(`\nReport saved to: ${REPORT_FILE}`);
})();
