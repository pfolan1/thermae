#!/usr/bin/env node
/**
 * generate-blog-post.js
 * Reads the next scheduled topic from blog-schedule.json, calls the Anthropic
 * API to write a 1000+ word blog post, saves it as a TypeScript file in
 * src/content/blog/, updates src/content/blog/index.ts, and marks the topic
 * as published in blog-schedule.json.
 *
 * Used by .github/workflows/auto-blog.yml — not normally run locally.
 *
 * Environment variables:
 *   ANTHROPIC_API_KEY  — required
 *   FORCE_GENERATE     — if 'true', generate even if today is not scheduled
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ── Paths ─────────────────────────────────────────────────────────────────────
const ROOT          = path.join(__dirname, '..');
const SCHEDULE_PATH = path.join(__dirname, 'blog-schedule.json');
const BLOG_DIR      = path.join(ROOT, 'src', 'content', 'blog');
const INDEX_PATH    = path.join(BLOG_DIR, 'index.ts');

// ── Helpers ───────────────────────────────────────────────────────────────────

function todayISO() {
  return new Date().toISOString().slice(0, 10); // "2026-05-12"
}

function humanDate(iso) {
  const d = new Date(iso + 'T12:00:00Z');
  return d.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
  // "12 May 2026"  →  we want "May 12, 2026"
}

function humanDateUS(iso) {
  const d = new Date(iso + 'T12:00:00Z');
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  // "May 12, 2026"
}

function slugToIdentifier(slug) {
  // "new-sauna-openings-ireland-uk-spring-2026" → "newSaunaOpeningsIrelandUkSpring2026"
  return slug.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
}

// ── Anthropic API call ────────────────────────────────────────────────────────

async function callAnthropic(prompt) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY environment variable is not set.');

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Anthropic API error ${res.status}: ${body}`);
  }

  const data = await res.json();
  return data.content[0].text;
}

// ── Prompt builder ────────────────────────────────────────────────────────────

function buildPrompt(topic, publishDate) {
  return `You are a wellness expert and content writer for Thermae (thermae.app), the leading sauna and cold plunge directory for Ireland and the UK.

Write a high-quality, SEO-optimised blog post on this topic:
"${topic.title}"

Requirements:
- At least 1,000 words of engaging, well-researched content
- Warm, knowledgeable, human tone — like a trusted wellness guide
- Reference real scientific research where appropriate (e.g. Finnish studies, published health researchers)
- Mention specific real venues from the Thermae directory where relevant (e.g. ARC Wellness in Canary Wharf, Community Sauna Baths, Brockwell Lido Sauna, York Hall Spa, Löyly Helsinki, The Sea Sauna Dublin, Thermae Bath Spa)
- Include practical advice readers can act on today
- End with a call to action to find venues at thermae.app
- Target keyword: "${topic.keyword}"

IMPORTANT — Output format:
Return ONLY a valid JSON object (no markdown, no code fences, no explanation) with exactly these fields:
{
  "title": "...",
  "description": "...(150–160 characters, includes keyword)...",
  "content": "...(full HTML, using <p>, <h2>, <h3>, <strong>, <a> tags only)..."
}

The content field must be valid HTML suitable for rendering directly in a React component. Use only these tags: <p>, <h2>, <h3>, <strong>, <em>, <a href="...">, <ul>, <li>. No <html>, <body>, <head>, <script>, or <style> tags.

Published date for this post: ${publishDate}
`;
}

// ── TypeScript file writer ────────────────────────────────────────────────────

function buildTsFile(slug, title, description, dateHuman, dateISO, keyword, content) {
  return `import type { BlogPost } from './types';

const post: BlogPost = {
  slug: '${slug}',
  title: ${JSON.stringify(title)},
  description: ${JSON.stringify(description)},
  date: ${JSON.stringify(dateHuman)},
  dateISO: ${JSON.stringify(dateISO)},
  keyword: ${JSON.stringify(keyword)},
  content: \`
${content.replace(/`/g, '\\`').replace(/\${/g, '\\${')}
\`,
};

export default post;
`;
}

// ── index.ts updater ──────────────────────────────────────────────────────────

function updateIndex(slug) {
  const identifier = slugToIdentifier(slug);
  let src = fs.readFileSync(INDEX_PATH, 'utf8');

  // Add import line after the last existing import
  const importLine = `import ${identifier} from './${slug}';\n`;
  const lastImport = src.lastIndexOf("import ");
  const eolAfterLastImport = src.indexOf('\n', lastImport);
  src = src.slice(0, eolAfterLastImport + 1) + importLine + src.slice(eolAfterLastImport + 1);

  // Add to ALL_POSTS array — insert at top (most recent first)
  src = src.replace(
    'export const ALL_POSTS: BlogPost[] = [',
    `export const ALL_POSTS: BlogPost[] = [\n  ${identifier},`
  );

  // Add named export at the bottom
  src = src.replace(
    /^(export \{.+\});$/m,
    (match) => match.replace('{', `{ ${identifier},`)
  );

  fs.writeFileSync(INDEX_PATH, src, 'utf8');
  console.log(`✅ Updated index.ts with ${identifier}`);
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const schedule = JSON.parse(fs.readFileSync(SCHEDULE_PATH, 'utf8'));
  const today    = todayISO();
  const force    = process.env.FORCE_GENERATE === 'true';

  // Find the topic to publish today
  const topic = schedule.posts.find(
    (p) => !p.published && (force || p.date === today)
  );

  if (!topic) {
    console.log(`ℹ️  No blog post scheduled for today (${today}). Nothing to do.`);
    process.exit(0);
  }

  console.log(`📝 Generating post: "${topic.title}" (${topic.date})`);

  // Call Anthropic API
  const prompt = buildPrompt(topic, humanDateUS(topic.date));
  console.log('🤖 Calling Anthropic API...');
  const raw = await callAnthropic(prompt);

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    // Try to extract JSON from the response if it was wrapped in markdown
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) throw new Error(`Could not parse API response as JSON:\n${raw}`);
    parsed = JSON.parse(match[0]);
  }

  const { title, description, content } = parsed;

  if (!title || !description || !content) {
    throw new Error(`API response missing required fields: ${JSON.stringify(parsed)}`);
  }

  // Write the TypeScript blog post file
  const dateHuman = humanDateUS(topic.date);
  const tsContent = buildTsFile(
    topic.slug, title, description, dateHuman, topic.date, topic.keyword, content
  );

  const outPath = path.join(BLOG_DIR, `${topic.slug}.ts`);
  fs.writeFileSync(outPath, tsContent, 'utf8');
  console.log(`✅ Saved blog post: ${outPath}`);

  // Update index.ts
  updateIndex(topic.slug);

  // Mark as published
  topic.published = true;
  fs.writeFileSync(SCHEDULE_PATH, JSON.stringify(schedule, null, 2), 'utf8');
  console.log(`✅ Marked "${topic.slug}" as published in blog-schedule.json`);

  console.log(`\n🎉 Done! Post "${title}" is ready for ${topic.date}`);
}

main().catch((err) => {
  console.error('❌ Error generating blog post:', err);
  process.exit(1);
});
