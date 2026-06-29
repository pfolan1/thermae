#!/usr/bin/env node
/**
 * Thermae Monthly Analytics Report
 * Generates a 7-tab XLSX workbook + markdown backup, then emails it.
 *
 * Usage:  node scripts/analytics/generate-monthly-report.js
 * Config: ZOHO_EMAIL and ZOHO_PASSWORD environment variables
 */

'use strict';

const fs         = require('fs');
const path       = require('path');
const nodemailer = require('nodemailer');
const ExcelJS    = require('exceljs');

try { require('dotenv').config({ path: path.join(__dirname, '../.env') }); } catch (_) {}

// ── CONFIG ────────────────────────────────────────────────────────────────────
const VENUES_FILE   = path.join(__dirname, '../../src/data/venues.ts');
const SNAPSHOTS_DIR = path.join(__dirname, 'snapshots');
const REPORTS_DIR   = path.join(__dirname, 'reports');
const REPORT_EMAIL  = 'hello@thermae.app';

// Exchange rates (native → EUR)
const EXCHANGE = { GBP: 1.17, EUR: 1.0, NOK: 0.085, SEK: 0.086, DKK: 0.13 };

// Styling constants
const DARK_FILL = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF333333' } };
const DARK_FONT = { color: { argb: 'FFFFFFFF' }, bold: true, size: 11 };
const BLUE_FILL = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2D6FAB' } };
const BLUE_FONT = { color: { argb: 'FFFFFFFF' }, bold: true };
const ALT_FILL  = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF5F5F5' } };

// ── PARSE VENUES ──────────────────────────────────────────────────────────────
function parseVenues(src) {
  const venues = [];
  const blocks  = src.split(/\n\s*\{/);
  for (const block of blocks) {
    const id      = (block.match(/\bid\s*:\s*(\d+)/)                      || [])[1];
    const name    = (block.match(/\bname\s*:\s*"([^"]+)"/)                 || [])[1];
    const city    = (block.match(/\bcity\s*:\s*"([^"]+)"/)                 || [])[1];
    const country = (block.match(/\bcountry\s*:\s*"([^"]+)"/)              || [])[1];
    const type    = (block.match(/\btype\s*:\s*"([^"]+)"/)                 || [])[1];
    const price   = (block.match(/\bprice\s*:\s*"([^"]+)"/)                || [])[1];
    const tagsM   =  block.match(/\btags\s*:\s*\[([^\]]+)\]/);
    const cat     = (block.match(/\bvenueCategory\s*:\s*"([^"]+)"/)        || [])[1];

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
      });
    }
  }
  return venues;
}

// ── PRICE PARSING ─────────────────────────────────────────────────────────────
function parsePriceDetailed(priceStr) {
  if (!priceStr) return { native: null, currency: null, eur: null };
  const low = priceStr.toLowerCase();
  if (low.includes('free')) return { native: 0, currency: 'Free', eur: 0 };
  if (low.includes('check website') || low.includes('members only')) {
    return { native: null, currency: null, eur: null };
  }

  let m;
  m = priceStr.match(/NOK\s*(\d+(?:\.\d+)?)/i) || priceStr.match(/(\d+(?:\.\d+)?)\s*NOK/i);
  if (m) return { native: Number(m[1]), currency: 'NOK', eur: Math.round(Number(m[1]) * EXCHANGE.NOK) };

  m = priceStr.match(/SEK\s*(\d+(?:\.\d+)?)/i) || priceStr.match(/(\d+(?:\.\d+)?)\s*SEK/i);
  if (m) return { native: Number(m[1]), currency: 'SEK', eur: Math.round(Number(m[1]) * EXCHANGE.SEK) };

  m = priceStr.match(/DKK\s*(\d+(?:\.\d+)?)/i) || priceStr.match(/(\d+(?:\.\d+)?)\s*DKK/i);
  if (m) return { native: Number(m[1]), currency: 'DKK', eur: Math.round(Number(m[1]) * EXCHANGE.DKK) };

  m = priceStr.match(/£\s*(\d+(?:\.\d+)?)/);
  if (m) return { native: Number(m[1]), currency: 'GBP', eur: Math.round(Number(m[1]) * EXCHANGE.GBP) };

  m = priceStr.match(/€\s*(\d+(?:\.\d+)?)/);
  if (m) return { native: Number(m[1]), currency: 'EUR', eur: Math.round(Number(m[1])) };

  m = priceStr.match(/(\d+)/);
  if (m) return { native: Number(m[1]), currency: 'EUR', eur: Number(m[1]) };

  return { native: null, currency: null, eur: null };
}

function parsePrice(priceStr) {
  return parsePriceDetailed(priceStr).eur;
}

function median(arr) {
  if (!arr.length) return null;
  const s   = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : Math.round((s[mid - 1] + s[mid]) / 2);
}

function avg(arr) {
  if (!arr.length) return null;
  return Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);
}

// ── VENUE CATEGORY ────────────────────────────────────────────────────────────
function getCategory(v) {
  if (v.cat) return v.cat;
  const t = v.tags.map(x => x.toLowerCase());
  if (t.some(x => x.includes('hotel spa') || x === 'hotel')) return 'hotel';
  if (t.some(x => x.includes('gym')))                        return 'gym';
  if (t.some(x => x.includes('members club')))               return 'members_club';
  if (t.some(x => x.includes('day spa')))                    return 'spa';
  if (t.some(x => x.includes('public leisure') || x.includes('leisure centre'))) return 'leisure_centre';
  return 'dedicated';
}

// ── COMPUTE METRICS ───────────────────────────────────────────────────────────
function computeMetrics(venues) {
  const countries = [...new Set(venues.map(v => v.country))].sort();
  const cities    = [...new Set(venues.map(v => v.city))].sort();
  const CATS      = ['dedicated','hotel','gym','spa','leisure_centre','members_club'];
  const SAUNA_TYPES = ['Finnish','Wood-fired','Infrared','Russian Banya','Seaweed Bath','Hot Spring','Lagoon','Geothermal','Smoke Sauna'];

  // Price by country
  const priceByCountry = {};
  for (const c of countries) {
    const cv     = venues.filter(v => v.country === c);
    const prices = cv.map(v => parsePrice(v.price)).filter(x => x !== null);
    priceByCountry[c] = {
      count:  cv.length,
      avg:    avg(prices),
      min:    prices.length ? Math.min(...prices) : null,
      max:    prices.length ? Math.max(...prices) : null,
      median: median(prices),
      priced: prices.length,
    };
  }

  // Venue count by country
  const venuesByCountry = {};
  for (const c of countries) venuesByCountry[c] = venues.filter(v => v.country === c).length;

  // Top 20 cities
  const venuesByCity = {};
  for (const city of cities) {
    const cv     = venues.filter(v => v.city === city);
    const prices = cv.map(v => parsePrice(v.price)).filter(x => x !== null);
    venuesByCity[city] = { count: cv.length, avgPrice: avg(prices), priced: prices.length };
  }
  const top20cities = Object.entries(venuesByCity)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 20);

  // Category breakdown
  const catBreakdown = {};
  for (const v of venues) {
    const cat = getCategory(v);
    catBreakdown[cat] = (catBreakdown[cat] || 0) + 1;
  }

  // Price by category
  const priceByCategory = {};
  for (const cat of CATS) {
    const cv     = venues.filter(v => getCategory(v) === cat);
    const prices = cv.map(v => parsePrice(v.price)).filter(x => x !== null);
    priceByCategory[cat] = { count: cv.length, avg: avg(prices) };
  }

  // Sauna type tag breakdown
  const typeBreakdown = {};
  for (const st of SAUNA_TYPES) {
    typeBreakdown[st] = venues.filter(v => v.tags.some(t => t.toLowerCase() === st.toLowerCase())).length;
  }

  // Venue type field counts
  const typeCounts = { sauna: 0, plunge: 0, both: 0, seaweed: 0, lagoon: 0 };
  for (const v of venues) {
    if (v.type in typeCounts) typeCounts[v.type]++;
  }

  // Feature analytics
  const allTags   = venues.flatMap(v => v.tags);
  const tagCounts = {};
  for (const t of allTags) tagCounts[t] = (tagCounts[t] || 0) + 1;
  const topTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 20);

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

  const geothermalCount = venues.filter(v => v.tags.some(t => /geothermal/i.test(t))).length;
  const hotSpringCount  = venues.filter(v => v.tags.some(t => /hot spring/i.test(t))).length;
  const lagoonCount     = venues.filter(v => v.tags.some(t => /lagoon/i.test(t))).length;

  // Coastal by country
  const coastalByCountry = {};
  for (const c of countries) {
    const cv      = venues.filter(v => v.country === c);
    const coastal = cv.filter(v =>
      v.tags.some(t => /seafront|coastal|waterfront|fjord|harbour|sea plunge|sea view/i.test(t))
    );
    coastalByCountry[c] = {
      total: cv.length, coastal: coastal.length,
      pct: cv.length ? Math.round(coastal.length / cv.length * 100) : 0,
    };
  }

  // Price extremes by country (with native currency)
  const extremesByCountry = {};
  for (const c of countries) {
    const cv = venues.filter(v => v.country === c && parsePrice(v.price) !== null);
    if (!cv.length) continue;
    const sorted = [...cv].sort((a, b) => (parsePrice(a.price) || 0) - (parsePrice(b.price) || 0));
    const cheapV = sorted[0];
    const expV   = sorted[sorted.length - 1];
    const cheapD = cheapV ? parsePriceDetailed(cheapV.price) : null;
    const expD   = expV   ? parsePriceDetailed(expV.price)   : null;
    extremesByCountry[c] = {
      cheapest: cheapV ? {
        name: cheapV.name, price: cheapV.price, type: cheapV.type,
        native: cheapD.native, currency: cheapD.currency, eur: cheapD.eur,
      } : null,
      mostExpensive: expV ? {
        name: expV.name, price: expV.price, type: expV.type,
        native: expD.native, currency: expD.currency, eur: expD.eur,
      } : null,
    };
  }

  // Global averages
  const allEurPrices = venues.map(v => parsePrice(v.price)).filter(x => x !== null);
  const allGbpPrices = venues
    .map(v => parsePriceDetailed(v.price))
    .filter(d => d.currency === 'GBP' && d.native !== null)
    .map(d => d.native);

  return {
    totalVenues: venues.length,
    venuesByCountry,
    priceByCountry,
    top20cities,
    catBreakdown,
    priceByCategory,
    typeBreakdown,
    typeCounts,
    topTags,
    coldPlungeCount,
    outdoorCount,
    freeOrCheapCount,
    geothermalCount,
    hotSpringCount,
    lagoonCount,
    extremesByCountry,
    coastalByCountry,
    avgPriceEur: avg(allEurPrices),
    avgPriceGbp: avg(allGbpPrices),
  };
}

// ── DIFF vs PREVIOUS SNAPSHOT ─────────────────────────────────────────────────
function diffWithPrevious(current, prevSnap) {
  if (!prevSnap) return null;
  const diff = {};
  for (const [country, count] of Object.entries(current.venuesByCountry)) {
    const prev = prevSnap.metrics?.venuesByCountry?.[country] || 0;
    diff[country] = { current: count, prev, change: count - prev };
  }
  return {
    totalChange: current.totalVenues - (prevSnap.metrics?.totalVenues || 0),
    byCountry:   diff,
  };
}

// ── KEY HIGHLIGHTS ────────────────────────────────────────────────────────────
function buildHighlights(metrics, prevSnap, monthLabel) {
  const highlights = [];
  const total      = metrics.totalVenues;

  // 1. Biggest month-on-month price change (or baseline message)
  if (prevSnap?.metrics?.priceByCountry) {
    let biggestChange = null;
    let biggestCountry = '';
    for (const [country, data] of Object.entries(metrics.priceByCountry)) {
      const prevAvg = prevSnap.metrics.priceByCountry[country]?.avg;
      if (prevAvg != null && data.avg != null) {
        const change = data.avg - prevAvg;
        if (biggestChange === null || Math.abs(change) > Math.abs(biggestChange)) {
          biggestChange  = change;
          biggestCountry = country;
        }
      }
    }
    const newVenues = total - (prevSnap.metrics.totalVenues || 0);
    const newStr    = newVenues !== 0
      ? ` ${newVenues > 0 ? '+' : ''}${newVenues} venues added this month.`
      : ' No new venues added.';

    if (biggestCountry && biggestChange !== null && biggestChange !== 0) {
      const dir = biggestChange > 0 ? 'up' : 'down';
      highlights.push(
        `Biggest price shift: ${biggestCountry} avg moved ${dir} €${Math.abs(biggestChange)} month-on-month` +
        ` (now €${metrics.priceByCountry[biggestCountry].avg} avg).${newStr}`
      );
    } else {
      highlights.push(
        `${monthLabel}: ${total} venues across ${Object.keys(metrics.venuesByCountry).length} countries.` +
        ` Prices stable month-on-month.${newStr}`
      );
    }
  } else {
    highlights.push(
      `${monthLabel}: ${total} venues indexed across ${Object.keys(metrics.venuesByCountry).length} countries` +
      ` — first snapshot baseline established.`
    );
  }

  // 2. Category split
  const ded   = metrics.catBreakdown.dedicated      || 0;
  const gym   = metrics.catBreakdown.gym            || 0;
  const hotel = metrics.catBreakdown.hotel          || 0;
  const lc    = metrics.catBreakdown.leisure_centre || 0;
  highlights.push(
    `Category split: ${ded} dedicated (${Math.round(ded/total*100)}%), ` +
    `${gym} gym saunas (${Math.round(gym/total*100)}%), ` +
    `${hotel} hotel spas (${Math.round(hotel/total*100)}%), ` +
    `${lc} leisure centres (${Math.round(lc/total*100)}%).`
  );

  // 3. Cold plunge + outdoor + free
  const cpPct   = Math.round(metrics.coldPlungeCount  / total * 100);
  const outPct  = Math.round(metrics.outdoorCount      / total * 100);
  const freePct = Math.round(metrics.freeOrCheapCount  / total * 100);
  highlights.push(
    `${cpPct}% of venues offer cold plunge / ice bath (${metrics.coldPlungeCount}). ` +
    `${outPct}% are outdoor or waterfront (${metrics.outdoorCount}). ` +
    `${freePct}% are free or under €10 (${metrics.freeOrCheapCount}).`
  );

  return highlights;
}

// ── EXCEL HELPERS ─────────────────────────────────────────────────────────────
function writeBanner(ws, rowNum, text, spanCols) {
  const row = ws.getRow(rowNum);
  row.getCell(1).value     = text;
  row.getCell(1).fill      = DARK_FILL;
  row.getCell(1).font      = DARK_FONT;
  row.getCell(1).alignment = { vertical: 'middle', horizontal: 'left' };
  if (spanCols > 1) ws.mergeCells(rowNum, 1, rowNum, spanCols);
  row.height = 22;
  row.commit();
  return rowNum + 1;
}

function writeHeader(ws, rowNum, headers) {
  const row = ws.getRow(rowNum);
  headers.forEach((h, i) => {
    const cell      = row.getCell(i + 1);
    cell.value      = h;
    cell.fill       = BLUE_FILL;
    cell.font       = BLUE_FONT;
    cell.alignment  = { horizontal: i === 0 ? 'left' : 'center', vertical: 'middle' };
    cell.border     = { bottom: { style: 'thin', color: { argb: 'FF1A4E7D' } } };
  });
  row.height = 18;
  row.commit();
  return rowNum + 1;
}

function writeDataRow(ws, rowNum, values, altRow = false) {
  const row = ws.getRow(rowNum);
  values.forEach((v, i) => {
    const cell      = row.getCell(i + 1);
    cell.value      = v ?? '—';
    cell.alignment  = { horizontal: i === 0 ? 'left' : 'center', vertical: 'middle' };
    if (altRow) cell.fill = ALT_FILL;
  });
  row.height = 16;
  row.commit();
  return rowNum + 1;
}

function setAutoFit(ws) {
  ws.columns.forEach(col => {
    let maxLen = 8;
    col.eachCell({ includeEmpty: false }, cell => {
      const len = String(cell.value ?? '').length;
      if (len > maxLen) maxLen = len;
    });
    col.width = Math.min(maxLen + 3, 44);
  });
}

// "2026-06" → "Jun 26"
function periodLabel(period) {
  const [y, mo] = period.split('-');
  return new Date(Number(y), Number(mo) - 1, 1)
    .toLocaleDateString('en-GB', { month: 'short', year: '2-digit' });
}

// Formatted native price string for Price Extremes tab
function nativeDisplay(entry) {
  if (!entry) return '—';
  if (entry.currency === 'Free') return 'Free';
  if (entry.currency === 'GBP')  return `£${entry.native}`;
  if (entry.currency === 'EUR')  return `€${entry.native}`;
  if (entry.native != null)      return `${entry.native} ${entry.currency}`;
  return '—';
}

// ── BUILD 7-TAB XLSX ──────────────────────────────────────────────────────────
async function buildXlsx(outPath, metrics, allSnapshots, monthLabel, highlights) {
  const wb      = new ExcelJS.Workbook();
  wb.creator    = 'Thermae Analytics';
  wb.created    = new Date();
  wb.modified   = new Date();

  const snaps     = [...allSnapshots].sort((a, b) => a.period.localeCompare(b.period));
  const monthCols = snaps.map(s => periodLabel(s.period));

  const countries = Object.keys(metrics.venuesByCountry).sort();
  const top20     = metrics.top20cities.map(([city]) => city);
  const CATS      = ['dedicated','hotel','gym','spa','leisure_centre','members_club'];
  const TYPES     = ['Finnish','Wood-fired','Infrared','Russian Banya','Seaweed Bath','Hot Spring','Lagoon','Geothermal','Smoke Sauna'];
  const total     = metrics.totalVenues;

  // ── TAB 1: SUMMARY ──────────────────────────────────────────────────────────
  {
    const ws = wb.addWorksheet('Summary');
    let r    = 1;
    const W  = 3;

    r = writeBanner(ws, r, `Thermae Analytics — ${monthLabel}`, W);
    r = writeBanner(ws, r, 'KEY HIGHLIGHTS', W);

    highlights.forEach((hl, idx) => {
      const row            = ws.getRow(r++);
      row.getCell(1).value = `${idx + 1}.  ${hl}`;
      row.getCell(1).alignment = { wrapText: true, vertical: 'top' };
      ws.mergeCells(r - 1, 1, r - 1, W);
      row.height = 38;
      row.commit();
    });

    r++;
    r = writeBanner(ws, r, 'PORTFOLIO SNAPSHOT', W);
    const hdrRow = r;
    r = writeHeader(ws, r, ['Metric', 'Value', 'Note']);
    ws.autoFilter = { from: { row: hdrRow, column: 1 }, to: { row: hdrRow, column: W } };

    const snapRows = [
      ['Total venues',               total,                                                      ''],
      ['  Sauna only',               metrics.typeCounts.sauna,                                   'type field = sauna'],
      ['  Cold plunge only',         metrics.typeCounts.plunge,                                  'type field = plunge'],
      ['  Sauna + cold plunge',      metrics.typeCounts.both,                                    'type field = both'],
      ['  Seaweed baths',            metrics.typeCounts.seaweed   ?? 0,                          'type field = seaweed'],
      ['  Lagoons',                  metrics.typeCounts.lagoon    ?? 0,                          'type field = lagoon'],
      ['Hot springs (tag)',          metrics.hotSpringCount,                                     '"Hot Spring" tag'],
      ['Geothermal (tag)',           metrics.geothermalCount,                                    '"Geothermal" tag'],
      ['% with cold plunge',         `${Math.round(metrics.coldPlungeCount / total * 100)}%`,    `${metrics.coldPlungeCount} venues`],
      ['% outdoor / waterfront',     `${Math.round(metrics.outdoorCount    / total * 100)}%`,    `${metrics.outdoorCount} venues`],
      ['% free or under €10',        `${Math.round(metrics.freeOrCheapCount/ total * 100)}%`,    `${metrics.freeOrCheapCount} venues`],
      ['Avg price — all (EUR)',       metrics.avgPriceEur != null ? `€${metrics.avgPriceEur}` : '—', 'venues with price data'],
      ['Avg price — GBP venues (£)', metrics.avgPriceGbp != null ? `£${metrics.avgPriceGbp}` : '—', 'GBP-priced venues only'],
    ];
    snapRows.forEach((row, i) => { r = writeDataRow(ws, r, row, i % 2 === 1); });

    ws.getColumn(1).width = 34;
    ws.getColumn(2).width = 22;
    ws.getColumn(3).width = 28;
  }

  // ── TAB 2: MONTH ON MONTH ────────────────────────────────────────────────────
  {
    const ws = wb.addWorksheet('Month on Month');
    let r    = 1;
    const W  = monthCols.length + 1;

    r = writeBanner(ws, r, 'MONTH ON MONTH TRENDS', W);
    const hdrRow = r;
    r = writeHeader(ws, r, ['Metric', ...monthCols]);
    ws.autoFilter = { from: { row: hdrRow, column: 1 }, to: { row: hdrRow, column: W } };

    const momRows = [
      {
        label: 'Total venues',
        fn:    (s)    => s.metrics.totalVenues,
      },
      {
        label: 'New venues added',
        fn:    (s, i) => {
          if (i === 0) return '—';
          return s.metrics.totalVenues - snaps[i - 1].metrics.totalVenues || 0;
        },
      },
      {
        label: 'Avg price EUR (all)',
        fn:    (s)    => {
          if (s.metrics.avgPriceEur != null) return `€${s.metrics.avgPriceEur}`;
          const avgs = Object.values(s.metrics.priceByCountry || {})
            .map(p => p.avg).filter(x => x != null);
          const a = avg(avgs);
          return a != null ? `€${a}` : '—';
        },
      },
      {
        label: 'Avg price GBP (£ venues)',
        fn:    (s)    => s.metrics.avgPriceGbp != null ? `£${s.metrics.avgPriceGbp}` : '—',
      },
      {
        label: '% cold plunge',
        fn:    (s)    => s.metrics.coldPlungeCount && s.metrics.totalVenues
          ? `${Math.round(s.metrics.coldPlungeCount / s.metrics.totalVenues * 100)}%` : '—',
      },
      {
        label: '% outdoor / waterfront',
        fn:    (s)    => s.metrics.outdoorCount && s.metrics.totalVenues
          ? `${Math.round(s.metrics.outdoorCount / s.metrics.totalVenues * 100)}%` : '—',
      },
      {
        label: '% free or under €10',
        fn:    (s)    => s.metrics.freeOrCheapCount != null && s.metrics.totalVenues
          ? `${Math.round(s.metrics.freeOrCheapCount / s.metrics.totalVenues * 100)}%` : '—',
      },
    ];

    momRows.forEach((rowDef, i) => {
      const values = snaps.map((s, idx) => rowDef.fn(s, idx) ?? '—');
      r = writeDataRow(ws, r, [rowDef.label, ...values], i % 2 === 1);
    });

    setAutoFit(ws);
    ws.getColumn(1).width = 30;
  }

  // ── TAB 3: YEAR ON YEAR ──────────────────────────────────────────────────────
  {
    const ws = wb.addWorksheet('Year on Year');
    let r    = 1;

    // Group by year; use last (most recent) snapshot of each year
    const byYear = {};
    for (const s of snaps) {
      const y = s.period.slice(0, 4);
      if (!byYear[y]) byYear[y] = [];
      byYear[y].push(s);
    }
    const years     = Object.keys(byYear).sort();
    const yearSnaps = years.map(y => byYear[y][byYear[y].length - 1]);
    const W         = years.length + 1;

    r = writeBanner(ws, r, 'YEAR ON YEAR TRENDS  (last available snapshot per year)', W);
    const hdrRow = r;
    r = writeHeader(ws, r, ['Metric', ...years]);
    ws.autoFilter = { from: { row: hdrRow, column: 1 }, to: { row: hdrRow, column: W } };

    const yoyRows = [
      { label: 'Total venues',           fn: s => s.metrics.totalVenues },
      { label: 'Avg price EUR',          fn: s => s.metrics.avgPriceEur != null ? `€${s.metrics.avgPriceEur}` : '—' },
      { label: 'Avg price GBP (£ venues)',fn: s => s.metrics.avgPriceGbp != null ? `£${s.metrics.avgPriceGbp}` : '—' },
      { label: '% cold plunge',          fn: s => s.metrics.coldPlungeCount && s.metrics.totalVenues ? `${Math.round(s.metrics.coldPlungeCount / s.metrics.totalVenues * 100)}%` : '—' },
      { label: '% outdoor',              fn: s => s.metrics.outdoorCount && s.metrics.totalVenues ? `${Math.round(s.metrics.outdoorCount / s.metrics.totalVenues * 100)}%` : '—' },
      { label: '% free / under €10',     fn: s => s.metrics.freeOrCheapCount != null ? `${Math.round(s.metrics.freeOrCheapCount / s.metrics.totalVenues * 100)}%` : '—' },
    ];

    yoyRows.forEach((rowDef, i) => {
      const values = yearSnaps.map(s => rowDef.fn(s) ?? '—');
      r = writeDataRow(ws, r, [rowDef.label, ...values], i % 2 === 1);
    });

    setAutoFit(ws);
    ws.getColumn(1).width = 30;
  }

  // ── TAB 4: BY COUNTRY ────────────────────────────────────────────────────────
  {
    const ws = wb.addWorksheet('By Country');
    let r    = 1;
    const W  = monthCols.length + 1;

    // PRICING
    r = writeBanner(ws, r, 'PRICING — AVG EUR  (months as columns)', W);
    const priceHdr = r;
    r = writeHeader(ws, r, ['Country', ...monthCols]);
    ws.autoFilter = { from: { row: priceHdr, column: 1 }, to: { row: priceHdr, column: W } };
    countries.forEach((c, i) => {
      const vals = snaps.map(s => {
        const a = s.metrics.priceByCountry?.[c]?.avg;
        return a != null ? `€${a}` : '—';
      });
      r = writeDataRow(ws, r, [c, ...vals], i % 2 === 1);
    });

    r++;
    // VENUES
    r = writeBanner(ws, r, 'VENUES  (months as columns)', W);
    r = writeHeader(ws, r, ['Country', ...monthCols]);
    countries.forEach((c, i) => {
      const vals = snaps.map(s => s.metrics.venuesByCountry?.[c] ?? '—');
      r = writeDataRow(ws, r, [c, ...vals], i % 2 === 1);
    });

    r++;
    // VENUES PRICED
    r = writeBanner(ws, r, 'VENUES PRICED  (months as columns)', W);
    r = writeHeader(ws, r, ['Country', ...monthCols]);
    countries.forEach((c, i) => {
      const vals = snaps.map(s => s.metrics.priceByCountry?.[c]?.priced ?? '—');
      r = writeDataRow(ws, r, [c, ...vals], i % 2 === 1);
    });

    r++;
    // COASTAL %
    r = writeBanner(ws, r, 'COASTAL %  (months as columns)', W);
    r = writeHeader(ws, r, ['Country', ...monthCols]);
    countries.forEach((c, i) => {
      const vals = snaps.map(s => {
        const d = s.metrics.coastalByCountry?.[c];
        return d ? `${d.pct}%` : '—';
      });
      r = writeDataRow(ws, r, [c, ...vals], i % 2 === 1);
    });

    setAutoFit(ws);
    ws.getColumn(1).width = 22;
  }

  // ── TAB 5: BY CITY ───────────────────────────────────────────────────────────
  {
    const ws = wb.addWorksheet('By City');
    let r    = 1;
    const W  = monthCols.length + 1;

    // PRICING
    r = writeBanner(ws, r, 'PRICING — AVG EUR, TOP 20 CITIES  (months as columns)', W);
    const priceHdr = r;
    r = writeHeader(ws, r, ['City', ...monthCols]);
    ws.autoFilter = { from: { row: priceHdr, column: 1 }, to: { row: priceHdr, column: W } };
    top20.forEach((city, i) => {
      const vals = snaps.map(s => {
        const entry = (s.metrics.top20cities || []).find(([c]) => c === city);
        const p = entry?.[1]?.avgPrice;
        return p != null ? `€${p}` : '—';
      });
      r = writeDataRow(ws, r, [city, ...vals], i % 2 === 1);
    });

    r++;
    // VENUES
    r = writeBanner(ws, r, 'VENUE COUNT, TOP 20 CITIES  (months as columns)', W);
    r = writeHeader(ws, r, ['City', ...monthCols]);
    top20.forEach((city, i) => {
      const vals = snaps.map(s => {
        const entry = (s.metrics.top20cities || []).find(([c]) => c === city);
        return entry?.[1]?.count ?? '—';
      });
      r = writeDataRow(ws, r, [city, ...vals], i % 2 === 1);
    });

    r++;
    // VENUES PRICED
    r = writeBanner(ws, r, 'VENUES PRICED, TOP 20 CITIES  (months as columns)', W);
    r = writeHeader(ws, r, ['City', ...monthCols]);
    top20.forEach((city, i) => {
      const vals = snaps.map(s => {
        const entry = (s.metrics.top20cities || []).find(([c]) => c === city);
        return entry?.[1]?.priced ?? '—';
      });
      r = writeDataRow(ws, r, [city, ...vals], i % 2 === 1);
    });

    r++;
    // COASTAL % — placeholder, data accrues as metrics expand
    r = writeBanner(ws, r, 'COASTAL %, TOP 20 CITIES  (months as columns — data accrues over time)', W);
    r = writeHeader(ws, r, ['City', ...monthCols]);
    top20.forEach((city, i) => {
      r = writeDataRow(ws, r, [city, ...snaps.map(() => '—')], i % 2 === 1);
    });

    setAutoFit(ws);
    ws.getColumn(1).width = 22;
  }

  // ── TAB 6: CATEGORIES & TYPES ────────────────────────────────────────────────
  {
    const ws = wb.addWorksheet('Categories & Types');
    let r    = 1;
    const W  = monthCols.length + 1;

    // VENUE CATEGORY COUNT
    r = writeBanner(ws, r, 'VENUE CATEGORY COUNT  (months as columns)', W);
    const catHdr = r;
    r = writeHeader(ws, r, ['Category', ...monthCols]);
    ws.autoFilter = { from: { row: catHdr, column: 1 }, to: { row: catHdr, column: W } };
    CATS.forEach((cat, i) => {
      const vals = snaps.map(s => s.metrics.catBreakdown?.[cat] ?? '—');
      r = writeDataRow(ws, r, [cat, ...vals], i % 2 === 1);
    });

    r++;
    // AVG PRICE BY CATEGORY
    r = writeBanner(ws, r, 'AVG PRICE BY CATEGORY — EUR  (months as columns)', W);
    r = writeHeader(ws, r, ['Category', ...monthCols]);
    CATS.forEach((cat, i) => {
      const vals = snaps.map(s => {
        const a = s.metrics.priceByCategory?.[cat]?.avg;
        return a != null ? `€${a}` : '—';
      });
      r = writeDataRow(ws, r, [cat, ...vals], i % 2 === 1);
    });

    r++;
    // SAUNA TYPE TAG COUNT
    r = writeBanner(ws, r, 'SAUNA TYPE TAG COUNT  (months as columns)', W);
    r = writeHeader(ws, r, ['Type', ...monthCols]);
    TYPES.forEach((type, i) => {
      const vals = snaps.map(s => s.metrics.typeBreakdown?.[type] ?? '—');
      r = writeDataRow(ws, r, [type, ...vals], i % 2 === 1);
    });

    setAutoFit(ws);
    ws.getColumn(1).width = 24;
  }

  // ── TAB 7: PRICE EXTREMES ────────────────────────────────────────────────────
  {
    const ws = wb.addWorksheet('Price Extremes');
    let r    = 1;
    const W  = 5;

    r = writeBanner(ws, r, `PRICE EXTREMES — ${monthLabel}`, W);

    r = writeBanner(ws, r, 'CHEAPEST BY COUNTRY', W);
    const cheapHdr = r;
    r = writeHeader(ws, r, ['Country', 'Venue', 'Native Price', 'EUR Equiv.', 'Type']);
    ws.autoFilter = { from: { row: cheapHdr, column: 1 }, to: { row: cheapHdr, column: W } };

    let altRow = false;
    for (const country of countries) {
      const d = metrics.extremesByCountry[country];
      if (!d?.cheapest) continue;
      const c = d.cheapest;
      r = writeDataRow(ws, r,
        [country, c.name, nativeDisplay(c), c.eur != null ? `€${c.eur}` : '—', c.type || '—'],
        altRow
      );
      altRow = !altRow;
    }

    r++;
    r = writeBanner(ws, r, 'MOST EXPENSIVE BY COUNTRY', W);
    r = writeHeader(ws, r, ['Country', 'Venue', 'Native Price', 'EUR Equiv.', 'Type']);

    altRow = false;
    for (const country of countries) {
      const d = metrics.extremesByCountry[country];
      if (!d?.mostExpensive) continue;
      const me = d.mostExpensive;
      r = writeDataRow(ws, r,
        [country, me.name, nativeDisplay(me), me.eur != null ? `€${me.eur}` : '—', me.type || '—'],
        altRow
      );
      altRow = !altRow;
    }

    ws.getColumn(1).width = 20;
    ws.getColumn(2).width = 38;
    ws.getColumn(3).width = 16;
    ws.getColumn(4).width = 14;
    ws.getColumn(5).width = 12;
  }

  await wb.xlsx.writeFile(outPath);
  console.log(`XLSX saved: ${outPath}`);
}

// ── MARKDOWN BACKUP ───────────────────────────────────────────────────────────
function buildMarkdown(dateLabel, metrics, diff) {
  const lines = [];
  const h   = (n, t) => lines.push(`${'#'.repeat(n)} ${t}`);
  const row = (...cells) => lines.push('| ' + cells.join(' | ') + ' |');
  const sep = (n) => lines.push('| ' + Array(n).fill('---').join(' | ') + ' |');
  const br  = () => lines.push('');

  h(1, `Thermae Monthly Analytics — ${dateLabel}`);
  lines.push(`> Generated: ${new Date().toISOString().slice(0, 10)} · Source: venues.ts`);
  br();

  h(2, 'Summary');
  lines.push(`**Total venues:** ${metrics.totalVenues}`);
  if (diff) lines.push(`**New venues this month:** ${diff.totalChange >= 0 ? '+' : ''}${diff.totalChange}`);
  br();

  h(2, 'Venue Count by Country');
  row('Country', 'Venues', ...(diff ? ['Change'] : []));
  sep(diff ? 3 : 2);
  for (const [c, n] of Object.entries(metrics.venuesByCountry).sort((a, b) => b[1] - a[1])) {
    const d = diff?.byCountry?.[c];
    row(c, String(n), ...(diff ? [(d?.change >= 0 ? `+${d.change}` : String(d?.change || 0))] : []));
  }
  br();

  h(2, 'Pricing by Country (EUR equivalent)');
  row('Country', 'Avg €', 'Min €', 'Median €', 'Max €', 'Priced');
  sep(6);
  for (const [c, p] of Object.entries(metrics.priceByCountry).sort((a, b) => (b[1].avg || 0) - (a[1].avg || 0))) {
    row(c, p.avg ?? '—', p.min ?? '—', p.median ?? '—', p.max ?? '—', String(p.priced));
  }
  br();

  h(2, 'Top 20 Cities by Venue Count');
  row('City', 'Venues', 'Avg €');
  sep(3);
  for (const [city, d] of metrics.top20cities) row(city, String(d.count), d.avgPrice ?? '—');
  br();

  h(2, 'Category Breakdown');
  row('Category', 'Count', '%');
  sep(3);
  for (const [cat, n] of Object.entries(metrics.catBreakdown).sort((a, b) => b[1] - a[1])) {
    row(cat, String(n), `${Math.round(n / metrics.totalVenues * 100)}%`);
  }
  br();

  h(2, 'Feature Analytics');
  lines.push(`- Cold plunge / ice bath: ${metrics.coldPlungeCount} (${Math.round(metrics.coldPlungeCount / metrics.totalVenues * 100)}%)`);
  lines.push(`- Outdoor / waterfront: ${metrics.outdoorCount} (${Math.round(metrics.outdoorCount / metrics.totalVenues * 100)}%)`);
  lines.push(`- Free or under €10: ${metrics.freeOrCheapCount} (${Math.round(metrics.freeOrCheapCount / metrics.totalVenues * 100)}%)`);
  br();

  h(2, 'Price Extremes by Country');
  row('Country', 'Cheapest', 'Most Expensive');
  sep(3);
  for (const [c, d] of Object.entries(metrics.extremesByCountry)) {
    row(c,
      d.cheapest      ? `${d.cheapest.name} (${d.cheapest.price})`          : '—',
      d.mostExpensive ? `${d.mostExpensive.name} (${d.mostExpensive.price})` : '—'
    );
  }
  br();

  lines.push('---');
  lines.push(`*Thermae Analytics · Auto-generated · ${new Date().toUTCString()}*`);
  return lines.join('\n');
}

// ── HTML EMAIL BODY ───────────────────────────────────────────────────────────
function buildEmailHtml(monthLabel, highlights, metrics) {
  const total = metrics.totalVenues;

  const portfolioRows = [
    ['Total venues',               total,                                                        ''],
    ['Sauna only',                 metrics.typeCounts.sauna,                                     'type = sauna'],
    ['Cold plunge only',           metrics.typeCounts.plunge,                                    'type = plunge'],
    ['Sauna + cold plunge',        metrics.typeCounts.both,                                      'type = both'],
    ['Seaweed baths',              metrics.typeCounts.seaweed  ?? 0,                             'type = seaweed'],
    ['Lagoons',                    metrics.typeCounts.lagoon   ?? 0,                             'type = lagoon'],
    ['Hot springs (tag)',          metrics.hotSpringCount,                                       '"Hot Spring" tag'],
    ['Geothermal (tag)',           metrics.geothermalCount,                                      '"Geothermal" tag'],
    ['% with cold plunge',         `${Math.round(metrics.coldPlungeCount  / total * 100)}%`,     `${metrics.coldPlungeCount} venues`],
    ['% outdoor / waterfront',     `${Math.round(metrics.outdoorCount     / total * 100)}%`,     `${metrics.outdoorCount} venues`],
    ['% free or under €10',        `${Math.round(metrics.freeOrCheapCount / total * 100)}%`,     `${metrics.freeOrCheapCount} venues`],
    ['Avg price — all (EUR)',       metrics.avgPriceEur != null ? `€${metrics.avgPriceEur}` : '—', 'venues with price data'],
    ['Avg price — GBP venues (£)', metrics.avgPriceGbp != null ? `£${metrics.avgPriceGbp}` : '—', 'GBP-priced venues only'],
  ];

  const tableRows = portfolioRows.map(([metric, value, note], i) => `
    <tr style="background:${i % 2 === 0 ? '#ffffff' : '#f7f7f7'}">
      <td style="padding:7px 12px;border-bottom:1px solid #eee">${metric}</td>
      <td style="padding:7px 12px;border-bottom:1px solid #eee;font-weight:bold;text-align:center">${value}</td>
      <td style="padding:7px 12px;border-bottom:1px solid #eee;color:#888;font-size:12px">${note}</td>
    </tr>`).join('');

  const highlightDivs = highlights.map((h, i) => `
    <div style="background:#f0f6ff;border-left:4px solid #2D6FAB;padding:10px 14px;margin:8px 0;border-radius:3px;font-size:14px;line-height:1.5">
      <strong>${i + 1}.</strong> ${h}
    </div>`).join('');

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;font-size:14px;color:#333;max-width:680px;margin:0 auto;padding:20px">

  <div style="background:#333;color:#fff;padding:14px 20px;border-radius:6px;margin-bottom:20px">
    <h1 style="margin:0;font-size:22px">Thermae Monthly Analytics</h1>
    <p style="margin:5px 0 0;opacity:.75;font-size:13px">${monthLabel}</p>
  </div>

  <div style="background:#2D6FAB;color:#fff;padding:8px 14px;border-radius:4px;margin-bottom:6px;font-weight:bold;font-size:13px;letter-spacing:.5px">
    KEY HIGHLIGHTS
  </div>
  ${highlightDivs}

  <div style="background:#2D6FAB;color:#fff;padding:8px 14px;border-radius:4px;margin:24px 0 6px;font-weight:bold;font-size:13px;letter-spacing:.5px">
    PORTFOLIO SNAPSHOT
  </div>
  <table style="border-collapse:collapse;width:100%;font-size:13px">
    <thead>
      <tr style="background:#2D6FAB;color:#fff">
        <th style="padding:8px 12px;text-align:left;font-weight:bold">Metric</th>
        <th style="padding:8px 12px;text-align:center;font-weight:bold">Value</th>
        <th style="padding:8px 12px;text-align:left;font-weight:bold">Note</th>
      </tr>
    </thead>
    <tbody>${tableRows}</tbody>
  </table>

  <p style="margin-top:22px;font-size:13px;color:#555;line-height:1.6">
    <strong>Full 7-tab Excel workbook attached.</strong> Includes month-on-month trends, year-on-year,
    by-country and by-city breakdowns, category analysis, and price extremes per country.
  </p>

  <p style="margin-top:28px;font-size:11px;color:#aaa;border-top:1px solid #eee;padding-top:10px">
    Thermae Analytics &middot; Auto-generated &middot; ${new Date().toUTCString()}
  </p>
</body>
</html>`;
}

// ── SEND EMAIL ────────────────────────────────────────────────────────────────
async function sendEmail(subject, htmlBody, xlsxPath) {
  const email    = process.env.ZOHO_EMAIL;
  const password = process.env.ZOHO_PASSWORD;

  if (!email || !password) {
    console.log('No email credentials — skipping send. (Set ZOHO_EMAIL + ZOHO_PASSWORD.)');
    return;
  }

  const transporter = nodemailer.createTransport({
    host:   'smtp.zoho.eu',
    port:   465,
    secure: true,
    auth:   { user: email, pass: password },
  });

  await transporter.sendMail({
    from:    email,
    to:      REPORT_EMAIL,
    subject,
    html:    htmlBody,
    attachments: [{
      filename:    path.basename(xlsxPath),
      path:        xlsxPath,
      contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    }],
  });

  console.log(`Email sent to ${REPORT_EMAIL} — attached: ${path.basename(xlsxPath)}`);
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
async function main() {
  const now       = new Date();
  const yearMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const dateLabel = now.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

  console.log(`Generating analytics for ${dateLabel}...`);

  fs.mkdirSync(SNAPSHOTS_DIR, { recursive: true });
  fs.mkdirSync(REPORTS_DIR,   { recursive: true });

  // Parse venues
  const src    = fs.readFileSync(VENUES_FILE, 'utf8');
  const venues = parseVenues(src);
  console.log(`Parsed ${venues.length} venues.`);

  // Load all existing snapshots before overwriting current month
  const snapFiles     = fs.readdirSync(SNAPSHOTS_DIR).filter(f => f.endsWith('.json')).sort();
  const prevSnapshots = snapFiles
    .map(f => { try { return JSON.parse(fs.readFileSync(path.join(SNAPSHOTS_DIR, f), 'utf8')); } catch { return null; } })
    .filter(Boolean);

  // Previous month's snapshot for diff (period strictly before this month)
  const prevSnap = prevSnapshots.filter(s => s.period < yearMonth).pop() || null;

  // Compute current metrics
  const metrics = computeMetrics(venues);

  // Save snapshot (overwrites same-month if re-run)
  const snapshot = {
    generatedAt: now.toISOString(),
    period:      yearMonth,
    metrics,
    venueIds:    venues.map(v => v.id),
  };
  const snapPath = path.join(SNAPSHOTS_DIR, `${yearMonth}.json`);
  fs.writeFileSync(snapPath, JSON.stringify(snapshot, null, 2));
  console.log(`Snapshot saved: ${snapPath}`);

  // Full snapshot list (replace old current-month entry if present)
  const allSnapshots = [
    ...prevSnapshots.filter(s => s.period !== yearMonth),
    snapshot,
  ].sort((a, b) => a.period.localeCompare(b.period));

  // Build highlights
  const highlights = buildHighlights(metrics, prevSnap, dateLabel);

  // Build XLSX
  const xlsxPath = path.join(REPORTS_DIR, `${yearMonth}-report.xlsx`);
  await buildXlsx(xlsxPath, metrics, allSnapshots, dateLabel, highlights);

  // Build markdown backup
  const diff     = diffWithPrevious(metrics, prevSnap);
  const markdown = buildMarkdown(dateLabel, metrics, diff);
  const mdPath   = path.join(REPORTS_DIR, `${yearMonth}-report.md`);
  fs.writeFileSync(mdPath, markdown);
  console.log(`Markdown backup saved: ${mdPath}`);

  // Print summary to console
  console.log('\n--- HIGHLIGHTS ---');
  highlights.forEach((h, i) => console.log(`${i + 1}. ${h}`));

  // Send email with XLSX attachment
  const htmlBody = buildEmailHtml(dateLabel, highlights, metrics);
  await sendEmail(`Thermae Monthly Analytics — ${dateLabel}`, htmlBody, xlsxPath);
}

main().catch(err => { console.error(err); process.exit(1); });
