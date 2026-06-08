#!/usr/bin/env node
/**
 * Thermae — Fully Automatic Venue Discovery
 * Runs every Sunday via GitHub Actions.
 *
 * 1. Searches Google News RSS for new sauna/wellness openings
 * 2. Scrapes thesaunaguide.co.uk and irelandsaunas.com for new listings
 * 3. Uses Claude AI to research each candidate and extract full venue details
 * 4. Adds verified new venues directly to src/data/venues.ts
 * 5. Emails a summary report to hello@thermae.app
 *
 * Git commit, push and Netlify rebuild are handled by venue-monitor.yml.
 */

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

'use strict';

const https      = require('https');
const http       = require('http');
const fs         = require('fs');
const path       = require('path');
const nodemailer = require('nodemailer');

try { require('dotenv').config({ path: path.join(__dirname, '.env') }); } catch (_) {}

const VENUES_FILE = path.join(__dirname, '../src/data/venues.ts');
const REPORT_FILE = path.join(__dirname, 'new-venues-found.txt');
const DAYS_BACK   = 9; // One week + 2 day buffer

// ── SEARCH TERMS ─────────────────────────────────────────────────────────────

const SEARCH_TERMS = [
  'new sauna opening Ireland 2026',
  'new sauna opening UK 2026',
  'new cold plunge Ireland',
  'new sauna London 2026',
  'new wellness venue Dublin',
  'new sauna Edinburgh 2026',
  'new Nordic spa UK',
  'new sauna Manchester',
  'new banya opening UK',
  'new sauna Bristol',
  'sauna bar opening UK',
  'new cold plunge London',
];

// Extra sites to scrape for venue listings
const EXTRA_SITES = [
  { name: 'The Sauna Guide UK', url: 'https://thesaunaguide.co.uk' },
  { name: 'Ireland Saunas',     url: 'https://irelandsaunas.com'   },
];

// Keywords that indicate a venue is relevant
const RELEVANT_RE = /sauna|plunge|cold\s+(water|dip|swim)|banya|steam\s+room|thermal\s+spa|wellness\s+(centre|center|venue)|nordic\s+(spa|bath)|ice\s+bath/i;

// ── HTTP ──────────────────────────────────────────────────────────────────────

function fetchUrl(url, depth = 0) {
  return new Promise((resolve, reject) => {
    if (depth > 4) return reject(new Error('Too many redirects'));
    let data = '';
    let parsedUrl;
    try { parsedUrl = new URL(url); } catch (e) { return reject(e); }

    const mod = parsedUrl.protocol === 'https:' ? https : http;
    const req = mod.get(url, {
      headers: { 'User-Agent': 'Thermae-Bot/2.0 (+https://thermae.app)' },
      timeout: 15000,
    }, res => {
      if ([301, 302, 307, 308].includes(res.statusCode) && res.headers.location) {
        let loc = res.headers.location;
        if (loc.startsWith('/')) loc = `${parsedUrl.protocol}//${parsedUrl.host}${loc}`;
        return fetchUrl(loc, depth + 1).then(resolve).catch(reject);
      }
      res.on('data', chunk => { data += chunk; });
      res.on('end',  () => resolve(data));
    });
    req.on('error',   reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

// ── RSS HELPERS ───────────────────────────────────────────────────────────────

function googleNewsUrl(query) {
  return `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-GB&gl=GB&ceid=GB:en`;
}

function parseRssItems(xml) {
  const items = [];
  const re    = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    const b     = m[1];
    const title   = (b.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)    || b.match(/<title>(.*?)<\/title>/))?.[1]       || '';
    const link    = (b.match(/<link>(.*?)<\/link>/))?.[1]                                                                  || '';
    const pubDate = (b.match(/<pubDate>(.*?)<\/pubDate>/))?.[1]                                                            || '';
    const desc    = (b.match(/<description><!\[CDATA\[(.*?)\]\]><\/description>/) || b.match(/<description>(.*?)<\/description>/))?.[1] || '';
    if (title && link) items.push({ title, link, pubDate, desc });
  }
  return items;
}

function isRecent(pubDateStr) {
  if (!pubDateStr) return true;
  try {
    const pub    = new Date(pubDateStr);
    const cutoff = new Date(Date.now() - DAYS_BACK * 24 * 3600 * 1000);
    return pub >= cutoff;
  } catch (_) { return true; }
}

// ── HTML LINK SCRAPER ─────────────────────────────────────────────────────────

function extractVenueLinks(html, baseUrl) {
  const host    = new URL(baseUrl).host;
  const results = [];
  const re      = /<a[^>]+href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    let href = m[1].trim();
    const text = m[2].replace(/<[^>]+>/g, '').trim();
    if (!text || text.length < 4 || text.length > 120) continue;
    if (!RELEVANT_RE.test(text)) continue;
    if (href.startsWith('/')) href = `https://${host}${href}`;
    if (!href.startsWith('http')) continue;
    results.push({ title: text, link: href, desc: `Found on ${host}`, pubDate: '' });
  }
  return results;
}

// ── VENUES.TS HELPERS ─────────────────────────────────────────────────────────

function parseExistingNames(src) {
  const names = new Set();
  for (const m of src.matchAll(/\bname\s*:\s*"([^"]+)"/g)) {
    names.add(m[1].toLowerCase().trim());
  }
  return names;
}

function getHighestId(src) {
  let max = 0;
  for (const m of src.matchAll(/\bid\s*:\s*(\d+)/g)) {
    const n = parseInt(m[1], 10);
    if (n > max) max = n;
  }
  return max;
}

function buildVenueEntry(id, v) {
  const tags       = JSON.stringify(v.tags || ['Sauna']);
  const bookingUrl = v.bookingUrl ? `\n    bookingUrl:${JSON.stringify(v.bookingUrl)}` : '';
  return `  {
    id:${id}, city:${JSON.stringify(v.city)}, country:${JSON.stringify(v.country)}, name:${JSON.stringify(v.name)}, area:${JSON.stringify(v.area || '')},
    type:${JSON.stringify(v.type || 'sauna')}, price:${JSON.stringify(v.price || 'Check website')}, rating:4.5, reviews:0,
    hours:${JSON.stringify(v.hours || 'Check website for current hours')},
    temp:${JSON.stringify(v.temp || 'N/A')}, tags:${tags}, emoji:${JSON.stringify(v.emoji || '🔥')}, open:true,
    hygiene:${JSON.stringify(v.hygiene || 'A')}, lockerNote:${JSON.stringify(v.lockerNote || 'Check website for locker details')},
    transport:${JSON.stringify(v.transport || 'Check website for directions')},
    parking:${JSON.stringify(v.parking || 'Check website for parking')},
    desc:${JSON.stringify(v.desc || '')},
    lat:${Number(v.lat) || 0}, lng:${Number(v.lng) || 0},${bookingUrl}
  }`;
}

function insertVenuesIntoTs(src, venues, startId) {
  const entries = venues.map((v, i) => buildVenueEntry(startId + i, v));
  const block   = '\n\n  // ── AUTO-ADDED ──\n' + entries.join(',\n');
  const idx     = src.lastIndexOf('\n];');
  if (idx === -1) throw new Error('Could not find closing ]; in venues.ts');
  return src.slice(0, idx) + ',' + block + src.slice(idx);
}

// ── ANTHROPIC API ─────────────────────────────────────────────────────────────

async function callClaude(prompt) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY not set');

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key':         apiKey,
      'anthropic-version': '2023-06-01',
      'content-type':      'application/json',
    },
    body: JSON.stringify({
      model:      'claude-sonnet-4-6',
      max_tokens: 1024,
      messages:   [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Anthropic API ${res.status}: ${body}`);
  }
  const data = await res.json();
  return data.content[0].text;
}

function researchPrompt(candidate) {
  return `You are a venue researcher for Thermae (thermae.app), a sauna and wellness directory covering Ireland, UK, and Nordic countries.

Analyse this article about a potential new venue:
TITLE: ${candidate.title}
DESCRIPTION: ${candidate.desc}
SOURCE: ${candidate.link}
SEARCH TERM: ${candidate.term || ''}

Is this a real, newly opened sauna/wellness venue in Ireland, UK or Nordic countries (Norway, Sweden, Finland, Denmark, Iceland)?

If YES, return a JSON object:
{
  "name": "Official venue name",
  "city": "City",
  "country": "UK" or "Ireland" or "Norway" or "Sweden" or "Finland" or "Denmark" or "Iceland",
  "area": "Neighbourhood or district",
  "type": "sauna" or "plunge" or "both" or "seaweed",
  "price": "e.g. '£20' or '€15 per session' or 'Check website'",
  "hours": "Check website for current hours",
  "temp": "e.g. '4°C plunge' or 'River plunge' or 'N/A'",
  "tags": ["Tag1", "Tag2"],
  "emoji": "🔥 or 🧊 or 🔥🧊 or ♨️ or 🌊",
  "hygiene": "A",
  "lockerNote": "Check website for locker details",
  "transport": "Check website for directions",
  "parking": "Check website for parking",
  "desc": "1-2 sentence factual description based on the article",
  "lat": 53.3498,
  "lng": -6.2603,
  "bookingUrl": "https://venue-website.com or null"
}

For lat/lng: use your best knowledge of the specific venue or street address. If unknown, use the city centre coordinates.
For bookingUrl: use the real venue website URL if mentioned; otherwise null.

If this is NOT a real new venue opening (opinion piece, generic article, already well-established venue, or non-sauna/wellness topic), return:
{"skip": true, "reason": "one line reason"}

Return ONLY valid JSON. No markdown, no explanation.`;
}

// ── EMAIL ─────────────────────────────────────────────────────────────────────

async function sendEmail(subject, body) {
  const email    = process.env.ZOHO_EMAIL;
  const password = process.env.ZOHO_PASSWORD;
  if (!email || !password) {
    console.log('\n⚠  ZOHO_EMAIL / ZOHO_PASSWORD not set — skipping email.');
    return;
  }
  const transporter = nodemailer.createTransport({
    host:   'smtp.zoho.eu',
    port:   465,
    secure: true,
    auth:   { user: email, pass: password },
  });
  await transporter.sendMail({
    from:    `"Thermae Venue Bot" <${email}>`,
    to:      'hello@thermae.app',
    subject,
    text:    body,
    html:    `<pre style="font-family:monospace;font-size:13px;line-height:1.5">${
               body.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
             }</pre>`,
  });
  console.log('✅ Summary email sent to hello@thermae.app');
}

// ── MAIN ──────────────────────────────────────────────────────────────────────

(async () => {
  console.log('\nThermae Fully Automatic Venue Discovery');
  console.log('========================================\n');

  const venueSrc     = fs.readFileSync(VENUES_FILE, 'utf-8');
  const existingNames = parseExistingNames(venueSrc);
  const highestId    = getHighestId(venueSrc);
  console.log(`Loaded ${existingNames.size} existing venues (highest ID: ${highestId})\n`);

  // ── 1. Collect candidates ──────────────────────────────────────────────────
  const candidates = [];
  const seenLinks  = new Set();

  // Google News RSS
  for (const term of SEARCH_TERMS) {
    try {
      process.stdout.write(`  News search: "${term}"…`);
      const xml   = await fetchUrl(googleNewsUrl(term));
      const items = parseRssItems(xml);
      let count   = 0;
      for (const item of items) {
        if (seenLinks.has(item.link)) continue;
        if (!isRecent(item.pubDate))  continue;
        seenLinks.add(item.link);
        candidates.push({ ...item, term, source: 'Google News' });
        count++;
      }
      console.log(` ${count} result(s)`);
    } catch (err) {
      console.log(` ERROR: ${err.message}`);
    }
  }

  // Direct site scraping
  for (const site of EXTRA_SITES) {
    try {
      process.stdout.write(`  Scraping: ${site.name}…`);
      const html  = await fetchUrl(site.url);
      const links = extractVenueLinks(html, site.url);
      let count   = 0;
      for (const item of links) {
        if (seenLinks.has(item.link)) continue;
        seenLinks.add(item.link);
        candidates.push({ ...item, term: site.name, source: site.name });
        count++;
      }
      console.log(` ${count} candidate(s)`);
    } catch (err) {
      console.log(` ERROR: ${err.message}`);
    }
  }

  console.log(`\nTotal candidates before filter: ${candidates.length}`);

  // ── 2. Relevance filter ────────────────────────────────────────────────────
  const relevant = candidates.filter(c => RELEVANT_RE.test(c.title + ' ' + c.desc));
  console.log(`After relevance filter: ${relevant.length}\n`);

  // ── 3. Research each candidate with Claude ─────────────────────────────────
  const newVenues = [];
  const skipped   = [];
  const errors    = [];

  for (const candidate of relevant) {
    // Pre-filter: skip if candidate title strongly matches an existing venue name
    const titleLower = candidate.title.toLowerCase();
    const likelyKnown = [...existingNames].some(name => {
      const words = name.split(/\s+/).filter(w => w.length > 4);
      return words.length >= 2 && words.every(w => titleLower.includes(w));
    });
    if (likelyKnown) {
      skipped.push({ candidate, reason: 'Matches existing venue name' });
      continue;
    }

    try {
      process.stdout.write(`  Researching: "${candidate.title.slice(0, 55)}"…`);
      const raw = await callClaude(researchPrompt(candidate));

      let parsed;
      try {
        parsed = JSON.parse(raw);
      } catch (_) {
        const m = raw.match(/\{[\s\S]*\}/);
        if (m) parsed = JSON.parse(m[0]);
        else   throw new Error('No JSON in response');
      }

      if (parsed.skip) {
        console.log(` skip (${parsed.reason || '—'})`);
        skipped.push({ candidate, reason: parsed.reason });
        continue;
      }

      if (!parsed.name || !parsed.city || !parsed.country) {
        console.log(' skip (missing name/city/country)');
        skipped.push({ candidate, reason: 'Missing required fields' });
        continue;
      }

      // Duplicate check by resolved name
      const nameLower = parsed.name.toLowerCase().trim();
      if (existingNames.has(nameLower)) {
        console.log(` skip (duplicate: ${parsed.name})`);
        skipped.push({ candidate, reason: `Duplicate: ${parsed.name}` });
        continue;
      }

      console.log(` ✅ "${parsed.name}" — ${parsed.city}, ${parsed.country}`);
      existingNames.add(nameLower); // prevent intra-run duplicates
      newVenues.push(parsed);
    } catch (err) {
      console.log(` ERROR: ${err.message}`);
      errors.push({ candidate, error: err.message });
    }
  }

  console.log(`\nNew venues found    : ${newVenues.length}`);
  console.log(`Skipped             : ${skipped.length}`);
  console.log(`Errors              : ${errors.length}\n`);

  // ── 4. Write new venues to venues.ts ──────────────────────────────────────
  if (newVenues.length > 0) {
    const updated = insertVenuesIntoTs(venueSrc, newVenues, highestId + 1);
    fs.writeFileSync(VENUES_FILE, updated, 'utf-8');
    console.log(`✅ Added ${newVenues.length} venue(s) to src/data/venues.ts`);
  } else {
    console.log('ℹ️  No new venues to add this week.');
  }

  // ── 5. Build report ────────────────────────────────────────────────────────
  const date  = new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const lines = [
    '═══════════════════════════════════════════════════════════════',
    '  THERMAE VENUE DISCOVERY REPORT',
    `  ${date}`,
    '═══════════════════════════════════════════════════════════════',
    '',
    `  Candidates collected : ${candidates.length}`,
    `  After relevance filter: ${relevant.length}`,
    `  New venues added     : ${newVenues.length}`,
    `  Skipped              : ${skipped.length}`,
    `  Errors               : ${errors.length}`,
    '',
  ];

  if (newVenues.length > 0) {
    lines.push('── VENUES ADDED TO venues.ts ────────────────────────────────────');
    for (const v of newVenues) {
      lines.push(`  ✅ ${v.name} — ${v.city}, ${v.country}`);
      lines.push(`     ${v.desc}`);
      if (v.bookingUrl) lines.push(`     ${v.bookingUrl}`);
      lines.push('');
    }
  } else {
    lines.push('── NO NEW VENUES FOUND ──────────────────────────────────────────');
    lines.push('  Nothing new to add this week.');
    lines.push('');
  }

  if (errors.length > 0) {
    lines.push('── ERRORS ───────────────────────────────────────────────────────');
    for (const e of errors) {
      lines.push(`  "${e.candidate.title.slice(0, 60)}" → ${e.error}`);
    }
    lines.push('');
  }

  lines.push(`Report generated: ${new Date().toISOString()}`);
  const report = lines.join('\n');
  fs.writeFileSync(REPORT_FILE, report, 'utf-8');
  console.log('\n' + report);

  // ── 6. Email summary ───────────────────────────────────────────────────────
  const subject = newVenues.length > 0
    ? `✅ Thermae: ${newVenues.length} new venue(s) added — ${date}`
    : `ℹ️  Thermae Venue Monitor: No new venues — ${date}`;
  await sendEmail(subject, report);
})();
