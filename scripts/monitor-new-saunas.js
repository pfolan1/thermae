#!/usr/bin/env node
/**
 * Thermae — New Sauna Monitor
 * Searches Google News RSS feeds for new sauna/wellness openings in Ireland, UK and Nordics.
 * Filters out venues already in venues.ts by name matching.
 * Saves potential new venues to scripts/new-venues-found.txt for Claude to review.
 *
 * Usage: node scripts/monitor-new-saunas.js
 *        npm run monitor
 */

const https = require('https');
const http  = require('http');
const fs    = require('fs');
const path  = require('path');

const VENUES_FILE  = path.join(__dirname, '../src/data/venues.ts');
const OUTPUT_FILE  = path.join(__dirname, 'new-venues-found.txt');
const DAYS_BACK    = 7;

// Search terms — each generates a separate RSS query
const SEARCH_TERMS = [
  'new sauna Ireland',
  'new sauna London',
  'sauna opening UK',
  'cold plunge opening Ireland',
  'new wellness venue Dublin',
  'new sauna Edinburgh',
  'new sauna Manchester',
  'new sauna Birmingham',
  'wellness centre opening Ireland',
  'bathing facility opening UK',
  'sauna bar opening',
  'new Nordic spa UK',
  'new Nordic spa Ireland',
];

// ── HELPERS ───────────────────────────────────────────────────────────────────
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    let data  = '';
    const req = mod.get(url, {
      headers: { 'User-Agent': 'Thermae-Monitor/1.0 (+https://thermae.app)' },
      timeout: 15000,
    }, res => {
      // Follow single redirect
      if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

function googleNewsRssUrl(query) {
  const encoded = encodeURIComponent(query);
  return `https://news.google.com/rss/search?q=${encoded}&hl=en-GB&gl=GB&ceid=GB:en&when:7d`;
}

// Parse RSS XML minimally (no xml parser dependency)
function parseRssItems(xml) {
  const items = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = itemRe.exec(xml)) !== null) {
    const block   = m[1];
    const title   = (block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) ||
                     block.match(/<title>(.*?)<\/title>/))?.[1] || '';
    const link    = (block.match(/<link>(.*?)<\/link>/))?.[1] || '';
    const pubDate = (block.match(/<pubDate>(.*?)<\/pubDate>/))?.[1] || '';
    const desc    = (block.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/) ||
                     block.match(/<description>(.*?)<\/description>/))?.[1] || '';
    items.push({ title, link, pubDate, desc });
  }
  return items;
}

// Parse venue names from venues.ts for deduplication
function parseExistingVenueNames(src) {
  const names = new Set();
  for (const m of src.matchAll(/\bname\s*:\s*"([^"]+)"/g)) {
    names.add(m[1].toLowerCase().trim());
  }
  return names;
}

// Very rough relevance filter — item must mention sauna/wellness/plunge etc.
const RELEVANT_RE = /sauna|plunge|cold (water|dip|swim)|banya|steam room|thermal|spa|wellness|Nordic bath|ice bath/i;

// Check if item was published in the past N days
function isRecent(pubDateStr, daysBack) {
  if (!pubDateStr) return true; // assume recent if no date
  try {
    const pub = new Date(pubDateStr);
    const cutoff = new Date(Date.now() - daysBack * 24 * 3600 * 1000);
    return pub >= cutoff;
  } catch (_) { return true; }
}

// Rough name-match dedup: is this article likely about an existing venue?
function mentionsExistingVenue(text, existingNames) {
  const lower = text.toLowerCase();
  for (const name of existingNames) {
    // Only flag if the article mentions the full venue name (3+ word match)
    const words = name.split(/\s+/).filter(w => w.length > 3);
    if (words.length >= 2 && words.every(w => lower.includes(w))) return true;
  }
  return false;
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
(async () => {
  console.log('');
  console.log('Thermae New Sauna Monitor');
  console.log('=========================');
  console.log(`Searching for openings in the past ${DAYS_BACK} days...\n`);

  const src           = fs.readFileSync(VENUES_FILE, 'utf-8');
  const existingNames = parseExistingVenueNames(src);
  console.log(`Loaded ${existingNames.size} existing venue names for deduplication.\n`);

  const seen    = new Set(); // deduplicate by URL across queries
  const found   = [];
  const errors  = [];

  for (const term of SEARCH_TERMS) {
    process.stdout.write(`  Searching: "${term}"…`);
    try {
      const url  = googleNewsRssUrl(term);
      const xml  = await fetchUrl(url);
      const items = parseRssItems(xml);
      let count   = 0;

      for (const item of items) {
        if (seen.has(item.link)) continue;
        if (!isRecent(item.pubDate, DAYS_BACK)) continue;
        if (!RELEVANT_RE.test(item.title + ' ' + item.desc)) continue;

        seen.add(item.link);
        const fullText = item.title + ' ' + item.desc;

        found.push({
          term,
          title:      item.title,
          link:       item.link,
          pubDate:    item.pubDate,
          alreadyIn:  mentionsExistingVenue(fullText, existingNames),
        });
        count++;
      }
      console.log(` ${count} result(s)`);
    } catch (err) {
      console.log(` ERROR: ${err.message}`);
      errors.push({ term, error: err.message });
    }
  }

  // Split into new vs known
  const potentialNew = found.filter(f => !f.alreadyIn);
  const probablyKnown = found.filter(f => f.alreadyIn);

  // Build report
  const date = new Date().toLocaleDateString('en-GB', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const lines = [
    '═══════════════════════════════════════════════════════════════',
    '  THERMAE NEW VENUE MONITOR',
    `  ${date}`,
    '═══════════════════════════════════════════════════════════════',
    '',
    `  Total results found  : ${found.length}`,
    `  Potential new venues : ${potentialNew.length}`,
    `  Already in database  : ${probablyKnown.length}`,
    `  Search errors        : ${errors.length}`,
    '',
  ];

  if (potentialNew.length > 0) {
    lines.push('── POTENTIAL NEW VENUES (review these) ─────────────────────────');
    lines.push('   ⚠ These need manual verification — not all will be real venues');
    lines.push('');
    for (const item of potentialNew) {
      lines.push(`  SEARCH TERM: "${item.term}"`);
      lines.push(`  TITLE:  ${item.title}`);
      lines.push(`  DATE:   ${item.pubDate}`);
      lines.push(`  URL:    ${item.link}`);
      lines.push('');
    }
  } else {
    lines.push('── POTENTIAL NEW VENUES ─────────────────────────────────────────');
    lines.push('  No new venues found this week.');
    lines.push('');
  }

  if (probablyKnown.length > 0) {
    lines.push('── ALREADY IN DATABASE (skipped) ───────────────────────────────');
    for (const item of probablyKnown) {
      lines.push(`  ${item.title}`);
      lines.push(`  ${item.link}`);
    }
    lines.push('');
  }

  if (errors.length > 0) {
    lines.push('── SEARCH ERRORS ────────────────────────────────────────────────');
    for (const e of errors) {
      lines.push(`  "${e.term}" → ${e.error}`);
    }
    lines.push('');
  }

  lines.push('── NEXT STEPS ───────────────────────────────────────────────────');
  lines.push('  1. Review each "Potential new venues" URL above');
  lines.push('  2. For any real new venues: find address, coordinates, and add to venues.ts');
  lines.push('  3. Also manually check these sources for new additions:');
  lines.push('     • https://irelandsaunas.com');
  lines.push('     • https://saunafinder.ie');
  lines.push('     • https://timeout.com/london/wellness');
  lines.push('     • https://designmynight.com');
  lines.push('');
  lines.push(`Report generated: ${new Date().toISOString()}`);
  lines.push('');

  const report = lines.join('\n');
  fs.writeFileSync(OUTPUT_FILE, report, 'utf-8');
  console.log('');
  console.log(report);
  console.log(`\nReport saved to: ${OUTPUT_FILE}`);
})();
