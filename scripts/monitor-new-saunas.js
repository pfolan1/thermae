#!/usr/bin/env node
/**
 * Thermae — Fully Automatic Venue Discovery
 * Runs every Sunday via GitHub Actions.
 *
 * Data sources:
 *   1. Google News RSS — new sauna/wellness opening articles
 *   2. Direct site scraping — thesaunaguide.co.uk, irelandsaunas.com, swimfinder.net
 *   3. OpenStreetMap Overpass API — leisure=sauna nodes across UK/Ireland/Iceland/Nordics
 *   4. Google Places API — text search near key cities (optional, requires API key)
 *
 * Pipeline:
 *   - News + scraping candidates → Claude AI verification → auto-add to venues.ts
 *   - OSM + Places candidates → flagged for manual review in new-venues-found.txt
 *   - Email report with sections per data source
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
  'new hot spring Iceland',
  'new geothermal spa opening',
  'new lagoon spa opening 2026',
];

// Extra sites to scrape for venue listings
const EXTRA_SITES = [
  { name: 'The Sauna Guide UK', url: 'https://thesaunaguide.co.uk'  },
  { name: 'Ireland Saunas',     url: 'https://irelandsaunas.com'    },
  { name: 'Swimfinder',         url: 'https://swimfinder.net/saunas' },
];

// OpenStreetMap bounding boxes [name, "south,west,north,east"]
// Allowed countries: UK, Ireland, Iceland, Norway, Sweden, Finland, Denmark, Greenland,
//                    Latvia, Estonia, Lithuania, Germany, Poland
// Excluded by bounding box: Russia (>31°E or >59°N east of 28°E) and Belarus (23–32°E, 51–56°N)
const OVERPASS_REGIONS = [
  { name: 'UK',          bbox: '49.9,-6.4,60.9,1.8'    },
  { name: 'Ireland',     bbox: '51.4,-10.7,55.4,-5.9'   },
  { name: 'Iceland',     bbox: '63.0,-24.5,66.5,-13.5'  },
  { name: 'Norway',      bbox: '57.0,4.0,71.5,31.0'     },
  { name: 'Sweden',      bbox: '55.0,10.5,69.5,24.5'    },
  { name: 'Finland',     bbox: '59.5,19.5,70.0,31.5'    },
  { name: 'Denmark',     bbox: '54.5,8.0,57.8,15.5'     },
  { name: 'Greenland',   bbox: '59.5,-73.0,83.5,-12.0'  },
  { name: 'Latvia',      bbox: '55.6,20.8,58.1,28.2'    },
  { name: 'Estonia',     bbox: '57.5,21.5,59.7,28.2'    },
  { name: 'Lithuania',   bbox: '53.9,20.9,56.5,26.8'    },
  { name: 'Germany',     bbox: '47.2,5.8,55.1,15.1'     },
  { name: 'Poland',      bbox: '49.0,14.1,54.9,24.2'    },
];

// Google Places cities + search queries
const PLACES_CITIES = [
  { name: 'London',     lat: 51.5074, lng: -0.1278,  radius: 20000 },
  { name: 'Dublin',     lat: 53.3498, lng: -6.2603,  radius: 20000 },
  { name: 'Edinburgh',  lat: 55.9533, lng: -3.1883,  radius: 15000 },
  { name: 'Glasgow',    lat: 55.8642, lng: -4.2518,  radius: 15000 },
  { name: 'Manchester', lat: 53.4808, lng: -2.2426,  radius: 15000 },
  { name: 'Reykjavik',  lat: 64.1466, lng: -21.9426, radius: 30000 },
  { name: 'Helsinki',   lat: 60.1699, lng: 24.9384,  radius: 20000 },
  { name: 'Oslo',       lat: 59.9139, lng: 10.7522,  radius: 20000 },
  { name: 'Stockholm',  lat: 59.3293, lng: 18.0686,  radius: 20000 },
  { name: 'Copenhagen', lat: 55.6761, lng: 12.5683,  radius: 20000 },
];

const PLACES_QUERIES = [
  'sauna',
  'cold plunge',
  'hot spring spa',
  'geothermal pool',
  'Nordic spa',
  'seaweed bath',
];

// Keywords that indicate a venue is relevant
const RELEVANT_RE = /sauna|plunge|cold\s+(water|dip|swim)|banya|steam\s+room|thermal\s+spa|wellness\s+(centre|center|venue)|nordic\s+(spa|bath)|ice\s+bath|hot\s+spring|geothermal|lagoon\s+spa/i;

// Adult/sex venue exclusion — precise terms only, NOT blanket "gay" exclusion.
// LGBTQ-friendly wellness venues are fine; only exclude explicit adult/sex venues.
const ADULT_CONTENT_RE = /\bcruising\b|adult\s+only|men\s+only|18\+|private\s+cabin[s]?|darkroom|gay\s+sauna|massage\s+parlour|thai\s+massage/i;

// Exclude venues with Cyrillic-only names (Russian/Belarusian)
const CYRILLIC_ONLY_RE = /^[\u0400-\u04FF\s\d\W]+$/;

// Exclude venues with pure numbers/symbols names (no real words)
const MEANINGLESS_NAME_RE = /^[\d\s\-–—_.,;:!?@#$%^&*()+=/\\|<>{}[\]"'`~]+$/;

// Russia bounding box: lng > 32°E (east of Belarus/Baltics) combined with lat in Russia range
// Belarus bounding box: lng 23–32°E, lat 51–56°N
function isRussiaOrBelarus(lat, lng) {
  if (lat == null || lng == null) return false;
  // Belarus: approximately 51.3–56.2°N, 23.2–32.8°E
  if (lat >= 51.3 && lat <= 56.2 && lng >= 23.2 && lng <= 32.8) return true;
  // Russia: east of 32°E (covers mainland Russia west of Urals) + north of Finland/Baltic
  // More precisely: exclude lng > 32 when lat > 59 (northern Russia) OR lng > 40
  if (lng > 40) return true;
  if (lng > 32 && lat > 59) return true;
  return false;
}

// Returns true if a venue name/website should be excluded as adult content
function isAdultVenue(name, website) {
  const text = (name + ' ' + (website || '')).toLowerCase();
  return ADULT_CONTENT_RE.test(text);
}

// Returns true if the name fails basic quality checks
function isLowQualityName(name) {
  if (!name || name.trim().length < 4) return true;
  if (MEANINGLESS_NAME_RE.test(name)) return true;
  if (CYRILLIC_ONLY_RE.test(name)) return true;
  return false;
}

// ── HTTP (GET) ────────────────────────────────────────────────────────────────

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

// ── HTTP (POST) — used by Overpass API ───────────────────────────────────────

function fetchUrlPost(url, body) {
  return new Promise((resolve, reject) => {
    const parsed   = new URL(url);
    const mod      = parsed.protocol === 'https:' ? https : http;
    const postData = `data=${encodeURIComponent(body)}`;
    const options  = {
      hostname: parsed.hostname,
      path:     parsed.pathname + (parsed.search || ''),
      method:   'POST',
      headers:  {
        'Content-Type':   'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData),
        'User-Agent':     'Thermae-Bot/2.0 (+https://thermae.app)',
      },
      timeout: 45000,
    };
    let data = '';
    const req = mod.request(options, res => {
      res.on('data', chunk => { data += chunk; });
      res.on('end',  () => resolve(data));
    });
    req.on('error',   reject);
    req.on('timeout', () => { req.destroy(); reject(new Error('Timeout')); });
    req.write(postData);
    req.end();
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
    const b       = m[1];
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

// ── NAME SIMILARITY ───────────────────────────────────────────────────────────

// Dice coefficient using character bigrams — returns 0..1
function nameSimilarity(a, b) {
  a = a.toLowerCase().trim();
  b = b.toLowerCase().trim();
  if (a === b) return 1.0;
  if (a.length < 2 || b.length < 2) return 0;
  const getBigrams = s => {
    const set = new Set();
    for (let i = 0; i < s.length - 1; i++) set.add(s.slice(i, i + 2));
    return set;
  };
  const biA = getBigrams(a);
  const biB = getBigrams(b);
  let shared = 0;
  for (const bg of biA) if (biB.has(bg)) shared++;
  return (2 * shared) / (biA.size + biB.size);
}

// Returns true only if the candidateName is 90%+ similar to any existing name
function isSimilarToExisting(candidateName, existingNames, threshold = 0.9) {
  const lower = candidateName.toLowerCase().trim();
  for (const name of existingNames) {
    if (nameSimilarity(lower, name) >= threshold) return true;
  }
  return false;
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

  // Find the closing bracket of the VENUES array specifically.
  // The VENUES array declaration starts with "export const VENUES: Venue[] = ["
  // and its closing "];" is followed by a blank line then "export const CITIES".
  // We locate the VENUES closing "];" by finding the last one that appears BEFORE
  // the CITIES export declaration.
  const citiesIdx = src.indexOf('\nexport const CITIES');
  if (citiesIdx === -1) {
    // Fallback safety: can't locate structure — abort insertion, write to report instead
    throw new Error('Could not locate CITIES export in venues.ts — aborting auto-insert to prevent file corruption');
  }

  // Within the portion before CITIES, find the last ];\n
  const venuesPortion = src.slice(0, citiesIdx);
  const idx = venuesPortion.lastIndexOf('\n];');
  if (idx === -1) {
    throw new Error('Could not find VENUES array closing ]; before CITIES export');
  }

  // Validate: the character just before this ]; should be part of a venue object (closing brace area)
  const nearClose = venuesPortion.slice(Math.max(0, idx - 10), idx);
  if (!nearClose.includes('}') && !nearClose.includes(',')) {
    throw new Error('Unexpected content near VENUES closing bracket — aborting to prevent corruption');
  }

  // Find the last non-whitespace character before \n]; to determine if a trailing comma is needed.
  // All manually-formatted venues already end with "},", so blindly prepending "," would create
  // a double-comma (",,") which TypeScript rejects as a sparse array in a Venue[] literal.
  let lastNonWsPos = idx - 1;
  while (lastNonWsPos >= 0 && /\s/.test(src[lastNonWsPos])) lastNonWsPos--;
  const needsComma = lastNonWsPos < 0 || src[lastNonWsPos] !== ',';

  return src.slice(0, idx) + (needsComma ? ',' : '') + block + src.slice(idx);
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
  "type": "sauna" or "plunge" or "both" or "seaweed" or "lagoon",
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

// ── OVERPASS API (OpenStreetMap) ──────────────────────────────────────────────

function buildOverpassQuery(bbox) {
  return `[out:json][timeout:30];
(
  node["leisure"="sauna"](${bbox});
  node["leisure"="swimming_pool"]["sport"="sauna"](${bbox});
  node["amenity"="spa"]["name"](${bbox});
  node["leisure"="sports_centre"]["sport"="sauna"](${bbox});
);
out body;`;
}

async function queryOverpassAPI(existingNames) {
  const flagged = [];
  console.log('\n── OpenStreetMap Overpass API ───────────────────────────────');

  for (const region of OVERPASS_REGIONS) {
    try {
      process.stdout.write(`  OSM query: ${region.name} (bbox ${region.bbox})…`);
      const raw  = await fetchUrlPost(
        'https://overpass-api.de/api/interpreter',
        buildOverpassQuery(region.bbox)
      );
      const data = JSON.parse(raw);
      const elements = Array.isArray(data.elements) ? data.elements : [];

      let newCount = 0;
      for (const el of elements) {
        const name = el.tags && el.tags.name;
        // Quality filters
        if (isLowQualityName(name)) continue;
        // Geographic exclusion: Russia and Belarus
        if (isRussiaOrBelarus(el.lat, el.lon)) continue;
        // Adult content exclusion
        const website = el.tags && (el.tags.website || el.tags['contact:website'] || null);
        if (isAdultVenue(name, website)) continue;
        // Duplicate check
        if (isSimilarToExisting(name, existingNames, 0.85)) continue;

        const type = el.tags.leisure || el.tags.amenity || 'sauna';
        flagged.push({
          name,
          lat:     el.lat,
          lng:     el.lon,
          osmType: type,
          website: website,
          region:  region.name,
          source:  'OpenStreetMap',
          flagged: true, // always manual review
        });
        newCount++;
      }
      console.log(` ${elements.length} elements → ${newCount} new`);
    } catch (err) {
      console.log(` ERROR: ${err.message}`);
    }
  }

  console.log(`  Total new OSM venues flagged: ${flagged.length}`);
  return flagged;
}

// ── GOOGLE PLACES API ─────────────────────────────────────────────────────────

async function queryGooglePlaces(existingNames) {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    console.log('\n── Google Places API: SKIPPED (GOOGLE_PLACES_API_KEY not set)');
    return [];
  }

  const flagged    = [];
  const seenIds    = new Set();
  console.log('\n── Google Places API ────────────────────────────────────────');

  for (const city of PLACES_CITIES) {
    for (const query of PLACES_QUERIES) {
      try {
        process.stdout.write(`  Places: "${query}" near ${city.name}…`);
        const url = `https://maps.googleapis.com/maps/api/place/textsearch/json`
          + `?query=${encodeURIComponent(query)}`
          + `&location=${city.lat},${city.lng}`
          + `&radius=${city.radius}`
          + `&key=${apiKey}`;

        const raw  = await fetchUrl(url);
        const data = JSON.parse(raw);

        if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
          console.log(` API error: ${data.status}`);
          continue;
        }

        let newCount = 0;
        for (const place of (data.results || [])) {
          if (seenIds.has(place.place_id)) continue;
          seenIds.add(place.place_id);
          // Quality and exclusion filters
          if (isLowQualityName(place.name)) continue;
          if (isAdultVenue(place.name, place.website || '')) continue;
          if (isRussiaOrBelarus(place.geometry?.location?.lat, place.geometry?.location?.lng)) continue;
          if (isSimilarToExisting(place.name, existingNames, 0.85)) continue;

          flagged.push({
            name:    place.name,
            address: place.formatted_address || '',
            lat:     place.geometry.location.lat,
            lng:     place.geometry.location.lng,
            city:    city.name,
            query,
            source:  'Google Places',
            flagged: true, // always manual review
          });
          newCount++;
        }
        console.log(` ${newCount} new`);

        // Throttle to stay within API rate limits
        await new Promise(r => setTimeout(r, 200));
      } catch (err) {
        console.log(` ERROR: ${err.message}`);
      }
    }
  }

  console.log(`  Total new Google Places venues flagged: ${flagged.length}`);
  return flagged;
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

  const venueSrc      = fs.readFileSync(VENUES_FILE, 'utf-8');
  const existingNames = parseExistingNames(venueSrc);
  const highestId     = getHighestId(venueSrc);
  console.log(`Loaded ${existingNames.size} existing venues (highest ID: ${highestId})\n`);

  // ── 1. Google News RSS ────────────────────────────────────────────────────
  const newsCandidates = [];
  const seenLinks      = new Set();
  console.log('── Google News RSS ──────────────────────────────────────────');

  for (const term of SEARCH_TERMS) {
    try {
      process.stdout.write(`  News: "${term}"…`);
      const xml   = await fetchUrl(googleNewsUrl(term));
      const items = parseRssItems(xml);
      let count   = 0;
      for (const item of items) {
        if (seenLinks.has(item.link)) continue;
        if (!isRecent(item.pubDate))  continue;
        seenLinks.add(item.link);
        newsCandidates.push({ ...item, term, source: 'Google News' });
        count++;
      }
      console.log(` ${count} result(s)`);
    } catch (err) {
      console.log(` ERROR: ${err.message}`);
    }
  }

  // ── 2. Direct site scraping ───────────────────────────────────────────────
  console.log('\n── Site Scraping ────────────────────────────────────────────');
  for (const site of EXTRA_SITES) {
    try {
      process.stdout.write(`  Scraping: ${site.name}…`);
      const html  = await fetchUrl(site.url);
      const links = extractVenueLinks(html, site.url);
      let count   = 0;
      for (const item of links) {
        if (seenLinks.has(item.link)) continue;
        seenLinks.add(item.link);
        newsCandidates.push({ ...item, term: site.name, source: site.name });
        count++;
      }
      console.log(` ${count} candidate(s)`);
    } catch (err) {
      console.log(` ERROR: ${err.message}`);
    }
  }

  // ── 3. OpenStreetMap Overpass API ─────────────────────────────────────────
  const osmFlagged = await queryOverpassAPI(existingNames);

  // ── 4. Google Places API ─────────────────────────────────────────────────
  const placesEnabled  = !!process.env.GOOGLE_PLACES_API_KEY;
  const placesFlagged  = await queryGooglePlaces(existingNames);

  // ── 5. Relevance filter + Claude research (news + scraping only) ──────────
  const relevant = newsCandidates.filter(c => {
    const text = c.title + ' ' + c.desc;
    if (!RELEVANT_RE.test(text)) return false;
    // Adult content check on title/URL
    if (isAdultVenue(c.title, c.link)) return false;
    // Minimum name length
    if (!c.title || c.title.trim().length < 4) return false;
    // Cyrillic / numbers-only exclusion
    if (CYRILLIC_ONLY_RE.test(c.title)) return false;
    return true;
  });
  console.log(`\nNews/scraping candidates: ${newsCandidates.length} total, ${relevant.length} relevant`);
  console.log('── Claude AI Verification ───────────────────────────────────');

  const newVenues = [];
  const skipped   = [];
  const errors    = [];

  for (const candidate of relevant) {
    if (isSimilarToExisting(candidate.title, existingNames)) {
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

      if (isSimilarToExisting(parsed.name, existingNames)) {
        console.log(` skip (duplicate: ${parsed.name})`);
        skipped.push({ candidate, reason: `Duplicate: ${parsed.name}` });
        continue;
      }

      console.log(` ✅ "${parsed.name}" — ${parsed.city}, ${parsed.country}`);
      existingNames.add(parsed.name.toLowerCase().trim());
      newVenues.push(parsed);
    } catch (err) {
      console.log(` ERROR: ${err.message}`);
      errors.push({ candidate, error: err.message });
    }
  }

  // ── 6. Write verified new venues to venues.ts ─────────────────────────────
  let insertedCount = 0;
  if (newVenues.length > 0) {
    try {
      const updated = insertVenuesIntoTs(venueSrc, newVenues, highestId + 1);
      // Sanity check: updated file must still contain CITIES export intact
      if (!updated.includes('export const CITIES: string[] = [')) {
        throw new Error('Post-insert sanity check failed: CITIES export missing from result');
      }
      fs.writeFileSync(VENUES_FILE, updated, 'utf-8');
      insertedCount = newVenues.length;
      console.log(`\n✅ Added ${newVenues.length} venue(s) to src/data/venues.ts`);
    } catch (insertErr) {
      console.error(`\n⚠️  Auto-insert FAILED (${insertErr.message})`);
      console.error('   Venues saved to new-venues-found.txt for manual review instead.');
      // Write the failed venues to the manual review report
      const fallbackLines = ['── VENUES NOT AUTO-INSERTED (insert error — manual review needed) ──'];
      for (const v of newVenues) {
        fallbackLines.push(`  ❌ ${v.name} — ${v.city}, ${v.country}`);
        fallbackLines.push(`     ${v.desc}`);
        if (v.bookingUrl) fallbackLines.push(`     ${v.bookingUrl}`);
        fallbackLines.push('');
      }
      fs.appendFileSync(REPORT_FILE, '\n' + fallbackLines.join('\n'), 'utf-8');
    }
  } else {
    console.log('\nℹ️  No new venues auto-added this week.');
  }

  // ── 7. Build report ───────────────────────────────────────────────────────
  const date = new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const lines = [
    '═══════════════════════════════════════════════════════════════',
    '  THERMAE VENUE DISCOVERY REPORT',
    `  ${date}`,
    '═══════════════════════════════════════════════════════════════',
    '',
    '  DATA SOURCES THIS RUN:',
    `  • Google News RSS          : ${newsCandidates.length} articles, ${relevant.length} relevant`,
    `  • OpenStreetMap Overpass   : ${osmFlagged.length} new venues flagged`,
    `  • Google Places API        : ${placesEnabled ? `${placesFlagged.length} new venues flagged` : 'SKIPPED (no API key)'}`,
    '',
    '  RESULTS:',
    `  • Venues auto-added        : ${newVenues.length}`,
    `  • Flagged for manual review: ${osmFlagged.length + placesFlagged.length}`,
    `  • Skipped (duplicates/irrelevant): ${skipped.length}`,
    `  • Errors                   : ${errors.length}`,
    '',
    '═══════════════════════════════════════════════════════════════',
    '',
  ];

  // Section 1: Auto-added venues
  if (newVenues.length > 0) {
    lines.push('── NEW VENUES ADDED AUTOMATICALLY (via Google News + Claude) ───');
    for (const v of newVenues) {
      lines.push(`  ✅ ${v.name}`);
      lines.push(`     ${v.city}, ${v.country}`);
      lines.push(`     ${v.desc}`);
      if (v.bookingUrl) lines.push(`     ${v.bookingUrl}`);
      lines.push('');
    }
  } else {
    lines.push('── NO NEW VENUES AUTO-ADDED THIS WEEK ──────────────────────────');
    lines.push('  Nothing verified from news sources this week.');
    lines.push('');
  }

  // Section 2: OSM flagged
  lines.push('── OPENSTREETMAP — FLAGGED FOR MANUAL REVIEW ───────────────────');
  if (osmFlagged.length > 0) {
    for (const v of osmFlagged) {
      lines.push(`  📍 ${v.name}`);
      lines.push(`     Region: ${v.region} | Type: ${v.osmType} | Coords: ${v.lat?.toFixed(4)}, ${v.lng?.toFixed(4)}`);
      if (v.website) lines.push(`     ${v.website}`);
      lines.push('');
    }
  } else {
    lines.push('  No new OSM venues found this week.\n');
  }

  // Section 3: Google Places flagged
  if (placesEnabled) {
    lines.push('── GOOGLE PLACES — FLAGGED FOR MANUAL REVIEW ───────────────────');
    if (placesFlagged.length > 0) {
      for (const v of placesFlagged) {
        lines.push(`  📍 ${v.name}`);
        lines.push(`     ${v.address}`);
        lines.push(`     Search: "${v.query}" near ${v.city} | Coords: ${v.lat?.toFixed(4)}, ${v.lng?.toFixed(4)}`);
        lines.push('');
      }
    } else {
      lines.push('  No new Google Places venues found this week.\n');
    }
  } else {
    lines.push('── GOOGLE PLACES ────────────────────────────────────────────────');
    lines.push('  Skipped — set GOOGLE_PLACES_API_KEY in scripts/.env to enable.\n');
  }

  // Section 4: Errors
  if (errors.length > 0) {
    lines.push('── ERRORS ───────────────────────────────────────────────────────');
    for (const e of errors) {
      lines.push(`  ⚠  "${e.candidate.title.slice(0, 60)}" → ${e.error}`);
    }
    lines.push('');
  }

  lines.push(`Report generated: ${new Date().toISOString()}`);
  const report = lines.join('\n');
  fs.writeFileSync(REPORT_FILE, report, 'utf-8');
  console.log('\n' + report);

  // ── 8. Email summary ──────────────────────────────────────────────────────
  const totalFlagged = osmFlagged.length + placesFlagged.length;
  const subject = newVenues.length > 0
    ? `✅ Thermae: ${newVenues.length} venue(s) added, ${totalFlagged} flagged for review — ${date}`
    : totalFlagged > 0
      ? `🔍 Thermae: ${totalFlagged} venue(s) flagged for manual review — ${date}`
      : `ℹ️  Thermae Venue Monitor: Nothing new — ${date}`;
  await sendEmail(subject, report);
})();
