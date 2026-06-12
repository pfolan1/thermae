#!/usr/bin/env node
/**
 * Thermae Monthly Analytics Report
 * Calculates key wellness industry metrics from venues.ts, saves a snapshot,
 * generates a formatted markdown report, and emails it to hello@thermae.app.
 *
 * Usage:  node scripts/analytics/generate-monthly-report.js
 * Config: set ZOHO_EMAIL and ZOHO_PASSWORD environment variables
 */

const fs         = require('fs');
const path       = require('path');
const nodemailer = require('nodemailer');

// Load .env from scripts/ directory (graceful fallback)
try { require('dotenv').config({ path: path.join(__dirname, '../.env') }); } catch (_) {}

// ── CONFIG ─────────────────────────────────────────────────────────────────────
const VENUES_FILE    = path.join(__dirname, '../../src/data/venues.ts');
const SNAPSHOTS_DIR  = path.join(__dirname, 'snapshots');
const REPORTS_DIR    = path.join(__dirname, 'reports');
const REPORT_EMAIL   = 'hello@thermae.app';

// Approximate regional populations (thousands) for per-capita estimates
const REGION_POPULATION = {
  'Greater London': 9100, 'South West': 5700, 'South East': 9200,
  'North West': 7400, 'Yorkshire': 5500, 'West Midlands': 5900,
  'North East': 2600, 'East Midlands': 4900, 'East of England': 6300,
  'Scotland': 5500, 'Wales': 3200, 'Northern Ireland': 1900,
  'Dublin': 1450, 'Cork': 550, 'Galway': 260, 'Limerick': 200,
  'Kerry': 150, 'Wicklow': 140, 'Donegal': 165, 'Mayo': 130,
  'Sligo': 65, 'Waterford': 115, 'Wexford': 150, 'Kilkenny': 100,
  'Clare': 120, 'Tipperary': 160, 'Meath': 210, 'Kildare': 230,
  'Westmeath': 95, 'Offaly': 80, 'Roscommon': 65, 'Leitrim': 35,
  'Cavan': 75, 'Monaghan': 60, 'Carlow': 58, 'Laois': 90,
  'Oslo Region': 1100, 'Western Norway': 650, 'Northern Norway': 240, 'South-West Norway': 380,
  'Helsinki Region': 1500, 'Lapland': 180, 'Pirkanmaa': 530,
  'Stockholm Region': 2400, 'Gothenburg Region': 1100,
  'Copenhagen Region': 1350, 'Jutland': 2600,
  'Reykjavík': 250,
};

// ── PARSE VENUES ───────────────────────────────────────────────────────────────
function parseVenues(src) {
  const venues = [];
  const blocks = src.split(/\n\s*\{/);
  for (const block of blocks) {
    const id       = (block.match(/\bid\s*:\s*(\d+)/)                      || [])[1];
    const name     = (block.match(/\bname\s*:\s*"([^"]+)"/)                 || [])[1];
    const city     = (block.match(/\bcity\s*:\s*"([^"]+)"/)                 || [])[1];
    const country  = (block.match(/\bcountry\s*:\s*"([^"]+)"/)              || [])[1];
    const type     = (block.match(/\btype\s*:\s*"([^"]+)"/)                 || [])[1];
    const price    = (block.match(/\bprice\s*:\s*"([^"]+)"/)                || [])[1];
    const tagsM    =  block.match(/\btags\s*:\s*\[([^\]]+)\]/);
    const cat      = (block.match(/\bvenueCategory\s*:\s*"([^"]+)"/)        || [])[1];
    const area     = (block.match(/\barea\s*:\s*"([^"]+)"/)                 || [])[1];

    const tags = tagsM
      ? tagsM[1].match(/"([^"]+)"/g)?.map(t => t.replace(/"/g, '')) || []
      : [];

    if (id && name && city) {
      venues.push({
        id: Number(id), name, city,
        country: country || 'Unknown',
        type:    type    || '',
        price:   price   || '',
        tags,
        cat:     cat     || null,
        area:    area    || '',
      });
    }
  }
  return venues;
}

// ── PRICE PARSING ──────────────────────────────────────────────────────────────
const EXCHANGE = { '£': 1.17, '€': 1.0, NOK: 0.085, SEK: 0.086, DKK: 0.13 };

function parsePrice(priceStr) {
  if (!priceStr) return null;
  const low = priceStr.toLowerCase();
  if (low.includes('free')) return 0;
  if (low.includes('check website') || low.includes('check website')) return null;

  // NOK
  let m = priceStr.match(/NOK\s*(\d+)/i);
  if (m) return Math.round(Number(m[1]) * EXCHANGE.NOK);

  // SEK
  m = priceStr.match(/SEK\s*(\d+)/i);
  if (m) return Math.round(Number(m[1]) * EXCHANGE.SEK);

  // DKK
  m = priceStr.match(/DKK\s*(\d+)/i);
  if (m) return Math.round(Number(m[1]) * EXCHANGE.DKK);

  // GBP
  m = priceStr.match(/£\s*(\d+(?:\.\d+)?)/);
  if (m) return Math.round(Number(m[1]) * EXCHANGE['£']);

  // EUR
  m = priceStr.match(/€\s*(\d+(?:\.\d+)?)/);
  if (m) return Math.round(Number(m[1]) * EXCHANGE['€']);

  // plain number
  m = priceStr.match(/(\d+)/);
  if (m) return Number(m[1]);

  return null;
}

function median(arr) {
  if (!arr.length) return null;
  const s = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : Math.round((s[mid - 1] + s[mid]) / 2);
}

function avg(arr) {
  if (!arr.length) return null;
  return Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
}

// ── DERIVE VENUE CATEGORY ──────────────────────────────────────────────────────
function getCategory(v) {
  if (v.cat) return v.cat;
  const t = v.tags.map(x => x.toLowerCase());
  if (t.some(x => x.includes('hotel spa') || x.includes('hotel'))) return 'hotel';
  if (t.some(x => x.includes('gym'))) return 'gym';
  if (t.some(x => x.includes('members club'))) return 'members_club';
  if (t.some(x => x.includes('day spa'))) return 'spa';
  if (t.some(x => x.includes('public leisure') || x.includes('leisure centre'))) return 'leisure_centre';
  return 'dedicated';
}

// ── ANALYTICS ─────────────────────────────────────────────────────────────────
function computeMetrics(venues) {
  const countries = [...new Set(venues.map(v => v.country))].sort();
  const cities = [...new Set(venues.map(v => v.city))].sort();

  // ─ Price by country ─
  const priceByCountry = {};
  for (const c of countries) {
    const prices = venues.filter(v => v.country === c).map(v => parsePrice(v.price)).filter(x => x !== null);
    priceByCountry[c] = {
      count: venues.filter(v => v.country === c).length,
      avg: avg(prices),
      min: prices.length ? Math.min(...prices) : null,
      max: prices.length ? Math.max(...prices) : null,
      median: median(prices),
      priced: prices.length,
    };
  }

  // ─ Venues per country ─
  const venuesByCountry = {};
  for (const c of countries) {
    venuesByCountry[c] = venues.filter(v => v.country === c).length;
  }

  // ─ Price by city (top 20 by venue count) ─
  const venuesByCity = {};
  for (const city of cities) {
    const cvenues = venues.filter(v => v.city === city);
    const prices = cvenues.map(v => parsePrice(v.price)).filter(x => x !== null);
    venuesByCity[city] = { count: cvenues.length, avgPrice: avg(prices) };
  }
  const top20cities = Object.entries(venuesByCity)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 20);

  // ─ Category breakdown ─
  const catBreakdown = {};
  for (const v of venues) {
    const cat = getCategory(v);
    catBreakdown[cat] = (catBreakdown[cat] || 0) + 1;
  }

  // ─ Type breakdown (sauna types from tags) ─
  const saunaTypes = ['Finnish','Wood-fired','Infrared','Russian Banya','Seaweed Bath','Hot Spring','Lagoon','Geothermal','Smoke Sauna'];
  const typeBreakdown = {};
  for (const st of saunaTypes) {
    typeBreakdown[st] = venues.filter(v => v.tags.some(t => t.toLowerCase() === st.toLowerCase())).length;
  }

  // ─ Feature analytics ─
  const allTags = venues.flatMap(v => v.tags);
  const tagCounts = {};
  for (const t of allTags) {
    tagCounts[t] = (tagCounts[t] || 0) + 1;
  }
  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);

  const coldPlungeCount = venues.filter(v =>
    v.tags.some(t => /cold plunge|ice bath|plunge|arctic/i.test(t)) || v.type === 'both'
  ).length;

  const outdoorCount = venues.filter(v =>
    v.tags.some(t => /outdoor|seafront|riverside|lakeside|coastal|waterfront|fjord/i.test(t))
  ).length;

  const freeOrCheapCount = venues.filter(v => {
    const p = parsePrice(v.price);
    return p !== null && p <= 10;
  }).length;

  // ─ Most expensive / cheapest per country ─
  const extremesByCountry = {};
  for (const c of countries) {
    const cv = venues.filter(v => v.country === c && parsePrice(v.price) !== null);
    if (!cv.length) continue;
    const sorted = cv.sort((a, b) => (parsePrice(a.price) || 0) - (parsePrice(b.price) || 0));
    extremesByCountry[c] = {
      cheapest: sorted[0] ? { name: sorted[0].name, price: sorted[0].price } : null,
      mostExpensive: sorted[sorted.length - 1] ? { name: sorted[sorted.length - 1].name, price: sorted[sorted.length - 1].price } : null,
    };
  }

  // ─ Price by category ─
  const priceByCategory = {};
  for (const cat of ['dedicated','hotel','gym','spa','leisure_centre','members_club']) {
    const cv = venues.filter(v => getCategory(v) === cat);
    const prices = cv.map(v => parsePrice(v.price)).filter(x => x !== null);
    priceByCategory[cat] = { count: cv.length, avg: avg(prices) };
  }

  // ─ Coastal venues by country ─
  const coastalByCountry = {};
  for (const c of countries) {
    const cv = venues.filter(v => v.country === c);
    const coastal = cv.filter(v => v.tags.some(t => /seafront|coastal|waterfront|fjord|harbour|harbour|sea plunge|sea view/i.test(t)));
    coastalByCountry[c] = { total: cv.length, coastal: coastal.length, pct: cv.length ? Math.round(coastal.length / cv.length * 100) : 0 };
  }

  return {
    totalVenues: venues.length,
    venuesByCountry,
    priceByCountry,
    top20cities,
    catBreakdown,
    typeBreakdown,
    topTags,
    coldPlungeCount,
    outdoorCount,
    freeOrCheapCount,
    extremesByCountry,
    priceByCategory,
    coastalByCountry,
  };
}

// ── DIFF vs PREVIOUS SNAPSHOT ──────────────────────────────────────────────────
function diffWithPrevious(current, prevSnap) {
  if (!prevSnap) return null;
  const diff = {};
  for (const [country, count] of Object.entries(current.venuesByCountry)) {
    const prev = prevSnap.metrics?.venuesByCountry?.[country] || 0;
    diff[country] = { current: count, prev, change: count - prev };
  }
  return { totalChange: current.totalVenues - (prevSnap.metrics?.totalVenues || 0), byCountry: diff };
}

// ── MARKDOWN REPORT ────────────────────────────────────────────────────────────
function buildReport(dateLabel, metrics, diff) {
  const lines = [];
  const h = (n, t) => lines.push(`${'#'.repeat(n)} ${t}`);
  const row = (...cells) => lines.push('| ' + cells.join(' | ') + ' |');
  const sep = (n) => lines.push('| ' + Array(n).fill('---').join(' | ') + ' |');
  const br = () => lines.push('');

  h(1, `Thermae Monthly Analytics — ${dateLabel}`);
  lines.push(`> Generated: ${new Date().toISOString().slice(0, 10)} · Source: venues.ts`);
  br();

  // Summary
  h(2, 'Summary');
  lines.push(`**Total venues indexed:** ${metrics.totalVenues}`);
  if (diff) {
    lines.push(`**New venues this month:** ${diff.totalChange >= 0 ? '+' : ''}${diff.totalChange}`);
  }
  br();

  // Venues by country
  h(2, 'Venue Count by Country');
  row('Country', 'Venues', diff ? 'Change' : 'Count');
  sep(diff ? 3 : 2);
  for (const [c, n] of Object.entries(metrics.venuesByCountry).sort((a,b) => b[1]-a[1])) {
    const d = diff?.byCountry?.[c];
    row(c, String(n), diff ? (d?.change >= 0 ? `+${d.change}` : String(d?.change || 0)) : '');
  }
  br();

  // Price by country
  h(2, 'Pricing by Country (EUR equivalent)');
  row('Country', 'Avg €', 'Min €', 'Median €', 'Max €', 'Venues priced');
  sep(6);
  for (const [c, p] of Object.entries(metrics.priceByCountry).sort((a,b) => (b[1].avg||0)-(a[1].avg||0))) {
    row(c, p.avg ?? '—', p.min ?? '—', p.median ?? '—', p.max ?? '—', String(p.priced));
  }
  br();

  // Top 20 cities
  h(2, 'Top 20 Cities by Venue Count');
  row('City', 'Venues', 'Avg Price €');
  sep(3);
  for (const [city, d] of metrics.top20cities) {
    row(city, String(d.count), d.avgPrice ?? '—');
  }
  br();

  // Category breakdown
  h(2, 'Venue Category Breakdown');
  row('Category', 'Count', '% of Total');
  sep(3);
  for (const [cat, n] of Object.entries(metrics.catBreakdown).sort((a,b) => b[1]-a[1])) {
    row(cat, String(n), `${Math.round(n / metrics.totalVenues * 100)}%`);
  }
  br();

  // Price by category
  h(2, 'Average Price by Venue Category (EUR equivalent)');
  row('Category', 'Venues', 'Avg €');
  sep(3);
  for (const [cat, d] of Object.entries(metrics.priceByCategory).sort((a,b) => (b[1].avg||0)-(a[1].avg||0))) {
    row(cat, String(d.count), d.avg ?? '—');
  }
  br();

  // Sauna type breakdown
  h(2, 'Sauna Type Tags');
  row('Type', 'Venues', '% of Total');
  sep(3);
  for (const [type, n] of Object.entries(metrics.typeBreakdown).sort((a,b) => b[1]-a[1])) {
    if (n > 0) row(type, String(n), `${Math.round(n / metrics.totalVenues * 100)}%`);
  }
  br();

  // Feature analytics
  h(2, 'Feature Analytics');
  lines.push(`- **Venues with cold plunge / ice bath:** ${metrics.coldPlungeCount} (${Math.round(metrics.coldPlungeCount / metrics.totalVenues * 100)}%)`);
  lines.push(`- **Venues with outdoor / waterfront access:** ${metrics.outdoorCount} (${Math.round(metrics.outdoorCount / metrics.totalVenues * 100)}%)`);
  lines.push(`- **Free or low-cost venues (under €10):** ${metrics.freeOrCheapCount} (${Math.round(metrics.freeOrCheapCount / metrics.totalVenues * 100)}%)`);
  br();

  // Top tags
  h(2, 'Top 20 Most Common Tags / Amenities');
  row('Tag', 'Count', '% of Venues');
  sep(3);
  for (const [tag, n] of metrics.topTags) {
    row(tag, String(n), `${Math.round(n / metrics.totalVenues * 100)}%`);
  }
  br();

  // Coastal by country
  h(2, 'Coastal / Waterfront Venues by Country');
  row('Country', 'Total Venues', 'Coastal Venues', '% Coastal');
  sep(4);
  for (const [c, d] of Object.entries(metrics.coastalByCountry).sort((a,b) => b[1].pct-a[1].pct)) {
    row(c, String(d.total), String(d.coastal), `${d.pct}%`);
  }
  br();

  // Extremes
  h(2, 'Most Expensive & Cheapest Venues by Country');
  row('Country', 'Cheapest', 'Most Expensive');
  sep(3);
  for (const [c, d] of Object.entries(metrics.extremesByCountry)) {
    row(c,
      d.cheapest ? `${d.cheapest.name} (${d.cheapest.price})` : '—',
      d.mostExpensive ? `${d.mostExpensive.name} (${d.mostExpensive.price})` : '—'
    );
  }
  br();

  lines.push('---');
  lines.push(`*Thermae Analytics · Automatically generated · ${new Date().toUTCString()}*`);

  return lines.join('\n');
}

// ── EMAIL ──────────────────────────────────────────────────────────────────────
async function sendEmail(subject, body) {
  const email    = process.env.ZOHO_EMAIL;
  const password = process.env.ZOHO_PASSWORD;

  if (!email || !password) {
    console.log('No email credentials found — skipping email send.');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.eu',
    port: 465,
    secure: true,
    auth: { user: email, pass: password },
  });

  await transporter.sendMail({
    from: email,
    to: REPORT_EMAIL,
    subject,
    text: body,
  });

  console.log(`Email sent to ${REPORT_EMAIL}`);
}

// ── MAIN ───────────────────────────────────────────────────────────────────────
async function main() {
  const now       = new Date();
  const yearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const dateLabel = now.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

  console.log(`Generating analytics for ${dateLabel}...`);

  // Ensure directories exist
  fs.mkdirSync(SNAPSHOTS_DIR, { recursive: true });
  fs.mkdirSync(REPORTS_DIR,   { recursive: true });

  // Parse venues
  const src    = fs.readFileSync(VENUES_FILE, 'utf8');
  const venues = parseVenues(src);
  console.log(`Parsed ${venues.length} venues.`);

  // Load previous snapshot for diff
  const snapshotFiles = fs.readdirSync(SNAPSHOTS_DIR).filter(f => f.endsWith('.json')).sort();
  let prevSnap = null;
  if (snapshotFiles.length > 0) {
    const lastFile = snapshotFiles[snapshotFiles.length - 1];
    try { prevSnap = JSON.parse(fs.readFileSync(path.join(SNAPSHOTS_DIR, lastFile), 'utf8')); } catch (_) {}
  }

  // Compute metrics
  const metrics = computeMetrics(venues);
  const diff    = diffWithPrevious(metrics, prevSnap);

  // Save snapshot
  const snapshot = {
    generatedAt: now.toISOString(),
    period: yearMonth,
    metrics,
    venueIds: venues.map(v => v.id),
  };
  const snapPath = path.join(SNAPSHOTS_DIR, `${yearMonth}.json`);
  fs.writeFileSync(snapPath, JSON.stringify(snapshot, null, 2));
  console.log(`Snapshot saved: ${snapPath}`);

  // Build report
  const report = buildReport(dateLabel, metrics, diff);
  const reportPath = path.join(REPORTS_DIR, `${yearMonth}-report.md`);
  fs.writeFileSync(reportPath, report);
  console.log(`Report saved: ${reportPath}`);

  // Print to console
  console.log('\n' + report);

  // Email
  await sendEmail(`Thermae Monthly Analytics — ${dateLabel}`, report);
}

main().catch(err => { console.error(err); process.exit(1); });
