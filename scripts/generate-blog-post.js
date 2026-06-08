#!/usr/bin/env node
/**
 * generate-blog-post.js
 * Always generates a blog post — no date checks, no skipping.
 *
 * Picks the next topic from a hardcoded rotating list, calls the Anthropic
 * API to write a 1000+ word post, saves it to src/content/blog/ as a
 * TypeScript file, and updates src/content/blog/index.ts.
 *
 * Topic rotation is tracked in scripts/blog-topics-used.json.
 *
 * Environment variables:
 *   ANTHROPIC_API_KEY  — required
 */

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

'use strict';

const fs   = require('fs');
const path = require('path');

// ── Paths ─────────────────────────────────────────────────────────────────────

const ROOT       = path.join(__dirname, '..');
const USED_PATH  = path.join(__dirname, 'blog-topics-used.json');
const BLOG_DIR   = path.join(ROOT, 'src', 'content', 'blog');
const INDEX_PATH = path.join(BLOG_DIR, 'index.ts');

// ── Topic list ────────────────────────────────────────────────────────────────

const TOPICS = [
  {
    title:   'The Science of Cold Plunge: What Happens to Your Body in 2026',
    slug:    'cold-plunge-science-body-2026',
    keyword: 'cold plunge science 2026',
  },
  {
    title:   'New Sauna Openings UK and Ireland Summer 2026',
    slug:    'new-sauna-openings-uk-ireland-summer-2026',
    keyword: 'new sauna openings uk ireland 2026',
  },
  {
    title:   'Best Outdoor Saunas Scotland Complete Guide',
    slug:    'best-outdoor-saunas-scotland',
    keyword: 'outdoor saunas scotland',
  },
  {
    title:   'Wild Atlantic Way Wellness Coastal Saunas Guide',
    slug:    'wild-atlantic-way-wellness-saunas',
    keyword: 'wild atlantic way saunas',
  },
  {
    title:   'Helsinki Sauna Guide Complete Visitor Guide 2026',
    slug:    'helsinki-sauna-guide-2026',
    keyword: 'helsinki sauna guide',
  },
  {
    title:   'Best Saunas for Beginners London',
    slug:    'best-saunas-beginners-london',
    keyword: 'saunas for beginners london',
  },
  {
    title:   'Seaweed Baths Ireland Ancient Tradition Modern Science',
    slug:    'seaweed-baths-ireland-tradition-science',
    keyword: 'seaweed baths ireland',
  },
  {
    title:   'Nordic Sauna Culture Why Finland Has Saunas Everywhere',
    slug:    'nordic-sauna-culture-finland',
    keyword: 'nordic sauna culture finland',
  },
  {
    title:   'Best Saunas Manchester Liverpool Complete Guide',
    slug:    'best-saunas-manchester-liverpool',
    keyword: 'saunas manchester liverpool',
  },
  {
    title:   'Contrast Therapy Benefits Latest Research 2026',
    slug:    'contrast-therapy-benefits-research-2026',
    keyword: 'contrast therapy benefits',
  },
  {
    title:   'Best Saunas Cornwall and South West England',
    slug:    'best-saunas-cornwall-south-west-england',
    keyword: 'saunas cornwall south west england',
  },
  {
    title:   'Yorkshire Sauna Guide Leeds Sheffield York',
    slug:    'yorkshire-sauna-guide-leeds-sheffield-york',
    keyword: 'saunas yorkshire leeds sheffield',
  },
  {
    title:   'Birmingham Midlands Sauna Complete Guide',
    slug:    'birmingham-midlands-sauna-guide',
    keyword: 'saunas birmingham midlands',
  },
  {
    title:   'Best Cold Plunge Venues Ireland 2026',
    slug:    'best-cold-plunge-venues-ireland-2026',
    keyword: 'cold plunge ireland 2026',
  },
  {
    title:   'Edinburgh Glasgow Sauna Scene Complete Guide',
    slug:    'edinburgh-glasgow-sauna-scene',
    keyword: 'saunas edinburgh glasgow',
  },
];

// ── Topic rotation ────────────────────────────────────────────────────────────

function loadUsed() {
  try {
    return JSON.parse(fs.readFileSync(USED_PATH, 'utf8'));
  } catch (_) {
    return { nextIndex: 0 };
  }
}

function saveUsed(data) {
  fs.writeFileSync(USED_PATH, JSON.stringify(data, null, 2), 'utf8');
}

function pickTopic() {
  const used = loadUsed();
  // Wrap around when we've cycled through all topics
  if (used.nextIndex >= TOPICS.length) {
    used.nextIndex = 0;
  }
  const topic = TOPICS[used.nextIndex];
  used.nextIndex += 1;
  saveUsed(used);
  return topic;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function humanDateUS(iso) {
  const d = new Date(iso + 'T12:00:00Z');
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function slugToIdentifier(slug) {
  return slug.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
}

// ── Anthropic API ─────────────────────────────────────────────────────────────

async function callAnthropic(prompt) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY environment variable is not set.');

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key':         apiKey,
      'anthropic-version': '2023-06-01',
      'content-type':      'application/json',
    },
    body: JSON.stringify({
      model:      'claude-opus-4-6',
      max_tokens: 4096,
      messages:   [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Anthropic API error ${res.status}: ${body}`);
  }

  const data = await res.json();
  return data.content[0].text;
}

// ── Prompt ────────────────────────────────────────────────────────────────────

function buildPrompt(topic, publishDate) {
  return `You are a wellness expert and content writer for Thermae (thermae.app), the leading sauna and cold plunge directory for Ireland and the UK.

Write a high-quality, SEO-optimised blog post on this topic:
"${topic.title}"

Requirements:
- At least 1,000 words of engaging, well-researched content
- Warm, knowledgeable, human tone — like a trusted wellness guide
- Reference real scientific research where appropriate (e.g. Finnish studies, Rhonda Patrick, Susanna Søberg, Andrew Huberman)
- Mention specific real venues from the Thermae directory where relevant (e.g. ARC Wellness Canary Wharf, Community Sauna Baths Hackney Wick, Brockwell Lido Sauna, York Hall Spa, Löyly Helsinki, The Sea Sauna Dublin, Thermae Bath Spa, Ardagh Community Sauna Bristol)
- Include practical advice readers can act on today
- End with a call to action to find venues at thermae.app
- Target keyword: "${topic.keyword}"

IMPORTANT — Output format:
Return ONLY a valid JSON object (no markdown, no code fences, no explanation) with exactly these fields:
{
  "title": "...",
  "description": "...(150–160 characters, includes keyword)...",
  "content": "...(full HTML body content)..."
}

The content field must be valid HTML for rendering in a React component. Use only: <p>, <h2>, <h3>, <strong>, <em>, <a href="...">, <ul>, <li>. No <html>, <body>, <head>, <script>, or <style> tags.

Published date for this post: ${publishDate}
`;
}

// ── TypeScript file builder ───────────────────────────────────────────────────

function buildTsFile(slug, title, description, dateHuman, dateISO, keyword, content) {
  const safeContent = content
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
  return `import type { BlogPost } from './types';

const post: BlogPost = {
  slug: '${slug}',
  title: ${JSON.stringify(title)},
  description: ${JSON.stringify(description)},
  date: ${JSON.stringify(dateHuman)},
  dateISO: ${JSON.stringify(dateISO)},
  keyword: ${JSON.stringify(keyword)},
  content: \`
${safeContent}
\`,
};

export default post;
`;
}

// ── index.ts updater ──────────────────────────────────────────────────────────

function updateIndex(slug) {
  const identifier = slugToIdentifier(slug);
  let src = fs.readFileSync(INDEX_PATH, 'utf8');

  if (src.includes(`from './${slug}'`)) {
    console.log(`ℹ️  ${identifier} already in index.ts — skipping`);
    return;
  }

  // Insert import after the last existing import line
  const importLine     = `import ${identifier} from './${slug}';\n`;
  const lastImportPos  = src.lastIndexOf('import ');
  const eol            = src.indexOf('\n', lastImportPos);
  src = src.slice(0, eol + 1) + importLine + src.slice(eol + 1);

  // Prepend to ALL_POSTS array (most recent first)
  src = src.replace(
    'export const ALL_POSTS: BlogPost[] = [',
    `export const ALL_POSTS: BlogPost[] = [\n  ${identifier},`
  );

  // Add to named export line
  src = src.replace(
    /^(export \{[^}]+\});$/m,
    (match) => match.replace('export {', `export { ${identifier},`)
  );

  fs.writeFileSync(INDEX_PATH, src, 'utf8');
  console.log(`✅ Updated index.ts — added ${identifier}`);
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const topic     = pickTopic();
  const dateISO   = todayISO();
  const dateHuman = humanDateUS(dateISO);

  console.log(`\n📝 Topic   : ${topic.title}`);
  console.log(`   Slug    : ${topic.slug}`);
  console.log(`   Keyword : ${topic.keyword}`);
  console.log(`   Date    : ${dateHuman}\n`);

  console.log('🤖 Calling Anthropic API…');
  const raw = await callAnthropic(buildPrompt(topic, dateHuman));

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (_) {
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) throw new Error(`Cannot parse API response as JSON:\n${raw}`);
    parsed = JSON.parse(match[0]);
  }

  const { title, description, content } = parsed;
  if (!title || !description || !content) {
    throw new Error(`API response missing fields. Got: ${JSON.stringify(Object.keys(parsed))}`);
  }

  const tsContent = buildTsFile(topic.slug, title, description, dateHuman, dateISO, topic.keyword, content);
  const outPath   = path.join(BLOG_DIR, `${topic.slug}.ts`);
  fs.writeFileSync(outPath, tsContent, 'utf8');
  console.log(`✅ Saved   : ${outPath}`);

  updateIndex(topic.slug);

  console.log(`\n🎉 Done! "${title}" published ${dateHuman}`);
}

main().catch((err) => {
  console.error('\n❌ Error:', err.message);
  process.exit(1);
});
