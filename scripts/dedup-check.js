'use strict';

const fs         = require('fs');
const path       = require('path');
const nodemailer = require('nodemailer');

// ── CONSTANTS ──────────────────────────────────────────────────────────────────
const VENUES_FILE  = path.join(__dirname, '../src/data/venues.ts');
const REPORTS_DIR  = path.join(__dirname, 'analytics/dedup-reports');
const REPORT_EMAIL = 'hello@thermae.app';

// ~200m threshold — two venues must be within this to count as the same physical spot
const COORD_THRESHOLD_KM = 0.20;

// ── PARSE VENUES ──────────────────────────────────────────────────────────────
function parseVenues(src) {
  const blocks = src.split(/\n\s*\{/);
  const venues = [];

  for (const block of blocks) {
    const idMatch   = block.match(/\bid\s*:\s*(\d+)/);
    const nameMatch = block.match(/\bname\s*:\s*["'`]([^"'`]+)["'`]/);
    if (!idMatch || !nameMatch) continue;

    const cityMatch      = block.match(/\bcity\s*:\s*["'`]([^"'`]+)["'`]/);
    const countryMatch   = block.match(/\bcountry\s*:\s*["'`]([^"'`]+)["'`]/);
    const latMatch       = block.match(/\blat\s*:\s*([-\d.]+)/);
    const lngMatch       = block.match(/\blng\s*:\s*([-\d.]+)/);
    const urlMatch       = block.match(/\bbookingUrl\s*:\s*["'`]([^"'`]+)["'`]/);
    const reviewMatch    = block.match(/\breviewCount\s*:\s*(\d+)/);
    const priceMatch     = block.match(/\bpriceFrom\s*:\s*([\d.]+)/);
    const priceTypeMatch = block.match(/\bpriceType\s*:\s*["'`]([^"'`]+)["'`]/);

    venues.push({
      id:        parseInt(idMatch[1], 10),
      name:      nameMatch[1],
      city:      cityMatch      ? cityMatch[1]               : '',
      country:   countryMatch   ? countryMatch[1]            : '',
      lat:       latMatch       ? parseFloat(latMatch[1])    : null,
      lng:       lngMatch       ? parseFloat(lngMatch[1])    : null,
      url:       urlMatch       ? urlMatch[1]                : '',
      reviews:   reviewMatch    ? parseInt(reviewMatch[1], 10) : 0,
      price:     priceMatch     ? parseFloat(priceMatch[1])  : null,
      priceType: priceTypeMatch ? priceTypeMatch[1]          : null,
    });
  }

  return venues;
}

// ── HAVERSINE DISTANCE (km) ───────────────────────────────────────────────────
function haversineKm(lat1, lng1, lat2, lng2) {
  const R    = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a    = Math.sin(dLat / 2) ** 2 +
               Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
               Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ── NAME SIMILARITY ───────────────────────────────────────────────────────────
function normaliseName(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function nameSimilarity(a, b) {
  const na = normaliseName(a);
  const nb = normaliseName(b);
  if (na === nb) return 1.0;
  if (na.includes(nb) || nb.includes(na)) return 0.9;
  const wa     = new Set(na.split(' '));
  const wb     = new Set(nb.split(' '));
  const shared = [...wa].filter(w => w.length > 2 && wb.has(w)).length;
  const total  = Math.max(wa.size, wb.size);
  return total > 0 ? shared / total : 0;
}

// ── COMPLETENESS SCORE (0–10) ─────────────────────────────────────────────────
function completenessScore(v) {
  let s = 0;
  if (v.url)           s += 3;
  if (v.lat && v.lng)  s += 2;
  if (v.reviews > 0)   s += 2;
  if (v.price)         s += 1;
  if (v.priceType)     s += 1;
  if (v.city)          s += 1;
  return s;
}

// ── DETECT DUPLICATES ─────────────────────────────────────────────────────────
function detectDuplicates(venues) {
  const pairs = [];

  // Build URL index — real URLs only (skip empty strings and placeholder text)
  const byUrl = new Map();
  for (const v of venues) {
    if (!v.url || !v.url.startsWith('http')) continue;
    const key = v.url.toLowerCase().replace(/\/$/, '');
    if (!byUrl.has(key)) byUrl.set(key, []);
    byUrl.get(key).push(v);
  }

  // 1. URL + proximity detection: same URL AND within threshold = same physical spot
  //    Same URL alone is NOT enough — operators legitimately run multiple venues
  //    under one website. Only flag when coordinates confirm it's the same spot.
  for (const group of byUrl.values()) {
    if (group.length < 2) continue;
    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        const a = group[i], b = group[j];
        if (!a.lat || !b.lat) continue; // can't verify proximity without coords
        const distKm = haversineKm(a.lat, a.lng, b.lat, b.lng);
        if (distKm >= COORD_THRESHOLD_KM) continue; // different spots = different venues

        const sim = nameSimilarity(a.name, b.name);
        pairs.push({
          a, b, sim,
          distanceM:  Math.round(distKm * 1000),
          reason:     'Same bookingUrl + within 200m',
          confidence: sim >= 0.6 ? 'HIGH' : 'MEDIUM',
        });
      }
    }
  }

  // 2. Coordinate-based detection (MEDIUM confidence)
  for (let i = 0; i < venues.length; i++) {
    const a = venues[i];
    if (!a.lat || !a.lng) continue;

    for (let j = i + 1; j < venues.length; j++) {
      const b = venues[j];
      if (!b.lat || !b.lng) continue;

      const distKm = haversineKm(a.lat, a.lng, b.lat, b.lng);
      if (distKm >= COORD_THRESHOLD_KM) continue;

      // Skip if already caught by URL check
      if (pairs.some(p =>
        (p.a.id === a.id && p.b.id === b.id) ||
        (p.a.id === b.id && p.b.id === a.id)
      )) continue;

      const sim = nameSimilarity(a.name, b.name);
      if (sim < 0.4) continue; // genuinely different venues at same location (e.g. hotel lobby spa)

      pairs.push({
        a, b, sim,
        distanceM:  Math.round(distKm * 1000),
        reason:     `Coordinates within ${Math.round(distKm * 1000)}m + similar name`,
        confidence: sim >= 0.8 ? 'HIGH' : 'MEDIUM',
      });
    }
  }

  return pairs;
}

// ── CATEGORISE PAIR ───────────────────────────────────────────────────────────
function categorise(pair) {
  const { a, b, sim, confidence } = pair;
  const aScore = completenessScore(a);
  const bScore = completenessScore(b);

  if (aScore <= 3 || bScore <= 3) return 'Stub';
  if (confidence === 'HIGH' && sim >= 0.7) return 'Confirmed';
  return 'Probable';
}

// ── BUILD REPORT ──────────────────────────────────────────────────────────────
function buildReport(pairs, date) {
  const lines = [];
  const HR    = '═'.repeat(72);
  const hr    = '─'.repeat(72);

  lines.push(`Thermae Dedup Check — ${date}`);
  lines.push(HR);
  lines.push('');

  if (pairs.length === 0) {
    lines.push('  No duplicate venues detected.');
    lines.push('');
    lines.push(HR);
    return lines.join('\n');
  }

  for (const cat of ['Confirmed', 'Probable', 'Stub']) {
    const group = pairs.filter(p => categorise(p) === cat);
    if (group.length === 0) continue;

    lines.push(`── ${cat.toUpperCase()} (${group.length}) ──`);
    lines.push('');

    for (const p of group) {
      const { a, b, sim, distanceM, reason, confidence } = p;
      const aScore  = completenessScore(a);
      const bScore  = completenessScore(b);
      const keeper  = aScore >= bScore ? a : b;

      lines.push(`  [${confidence}]  ${reason}`);
      lines.push(`  ID ${a.id}: ${a.name}  (${a.city}, ${a.country})`);
      lines.push(`         URL:      ${a.url || '(none)'}`);
      lines.push(`         Coords:   ${a.lat ?? '–'}, ${a.lng ?? '–'}`);
      lines.push(`         Reviews:  ${a.reviews}   Price: ${a.price ? `€${a.price}` : '–'}   Completeness: ${aScore}/10`);
      lines.push(`  ID ${b.id}: ${b.name}  (${b.city}, ${b.country})`);
      lines.push(`         URL:      ${b.url || '(none)'}`);
      lines.push(`         Coords:   ${b.lat ?? '–'}, ${b.lng ?? '–'}`);
      lines.push(`         Reviews:  ${b.reviews}   Price: ${b.price ? `€${b.price}` : '–'}   Completeness: ${bScore}/10`);
      lines.push(`  Similarity: ${Math.round(sim * 100)}%${distanceM != null ? `   Distance: ${distanceM}m` : ''}`);
      lines.push(`  Suggested keep: ID ${keeper.id} (${keeper.name})`);
      lines.push('');
    }

    lines.push(hr);
    lines.push('');
  }

  lines.push(`Total suspected: ${pairs.length}`);
  lines.push('');
  lines.push('This script is READ-ONLY. Remove weaker entries manually from src/data/venues.ts.');
  lines.push('');
  lines.push(HR);

  return lines.join('\n');
}

// ── EMAIL ─────────────────────────────────────────────────────────────────────
async function sendReport(report, count) {
  const email    = process.env.ZOHO_EMAIL;
  const password = process.env.ZOHO_PASSWORD;

  if (!email || !password) {
    console.log('\n  ZOHO_EMAIL / ZOHO_PASSWORD not set — skipping email.');
    return;
  }

  const transporter = nodemailer.createTransport({
    host:   'smtp.zoho.eu',
    port:   465,
    secure: true,
    auth:   { user: email, pass: password },
    tls:    { rejectUnauthorized: false },
  });

  const subject = count > 0
    ? `Thermae Dedup Check — ${count} suspected duplicate(s)`
    : `Thermae Dedup Check — all clean`;

  try {
    await transporter.sendMail({
      from:    `"Thermae Dedup Bot" <${email}>`,
      to:      REPORT_EMAIL,
      subject,
      text:    report,
      html:    `<pre style="font-family:monospace;font-size:13px;line-height:1.5">${
                 report.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
               }</pre>`,
    });
    console.log(`  Report emailed to ${REPORT_EMAIL}`);
  } catch (err) {
    console.error('  Email failed:', err.message);
  }
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
(async () => {
  console.log('');
  console.log('Thermae Dedup Check');
  console.log('===================');

  const src    = fs.readFileSync(VENUES_FILE, 'utf-8');
  const venues = parseVenues(src);
  console.log(`Parsed ${venues.length} venues.\n`);

  const pairs = detectDuplicates(venues);

  const dateIso   = new Date().toISOString().slice(0, 10);
  const dateHuman = new Date().toLocaleDateString('en-GB', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const report = buildReport(pairs, dateHuman);

  fs.mkdirSync(REPORTS_DIR, { recursive: true });
  const reportFile = path.join(REPORTS_DIR, `${dateIso}.txt`);
  fs.writeFileSync(reportFile, report, 'utf-8');

  console.log(report);
  console.log(`Report saved to: ${reportFile}`);

  await sendReport(report, pairs.length);
})();
