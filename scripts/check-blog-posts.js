#!/usr/bin/env node
/**
 * Thermae — Blog Post Checker
 * Reads all blog posts from src/content/blog/ and checks that any venue names
 * mentioned still exist in src/data/venues.ts.
 * Flags posts that reference venues no longer in the database.
 * Saves report to scripts/blog-report.txt
 *
 * Usage: node scripts/check-blog-posts.js
 *        npm run check-blogs
 */

const fs   = require('fs');
const path = require('path');

const VENUES_FILE  = path.join(__dirname, '../src/data/venues.ts');
const BLOG_DIR     = path.join(__dirname, '../src/content/blog');
const REPORT_FILE  = path.join(__dirname, 'blog-report.txt');

// ── PARSE VENUES ──────────────────────────────────────────────────────────────
function parseVenues(src) {
  const venues = [];
  const blocks = src.split(/\n\s*\{/);
  for (const block of blocks) {
    const id      = (block.match(/\bid\s*:\s*(\d+)/)         || [])[1];
    const name    = (block.match(/\bname\s*:\s*"([^"]+)"/)    || [])[1];
    const city    = (block.match(/\bcity\s*:\s*"([^"]+)"/)    || [])[1];
    const country = (block.match(/\bcountry\s*:\s*"([^"]+)"/) || [])[1];
    const open    = block.match(/\bopen\s*:\s*(true|false)/);
    if (id && name) {
      venues.push({
        id:      Number(id),
        name,
        city:    city    || '',
        country: country || '',
        open:    open ? open[1] === 'true' : true,
      });
    }
  }
  return venues;
}

// ── PARSE BLOG POSTS ──────────────────────────────────────────────────────────
function readBlogPosts(blogDir) {
  if (!fs.existsSync(blogDir)) return [];
  const posts = [];
  const files = fs.readdirSync(blogDir).filter(f =>
    f.endsWith('.md') || f.endsWith('.mdx') || f.endsWith('.tsx') || f.endsWith('.ts')
  );
  for (const file of files) {
    const filePath = path.join(blogDir, file);
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      posts.push({ file, filePath, content });
    } catch (err) {
      posts.push({ file, filePath, content: '', error: err.message });
    }
  }
  return posts;
}

// Check if a venue name is mentioned in a blog post (case-insensitive, word-boundary-ish)
function venueMentionedIn(venueName, text) {
  // Require at least 3 consecutive words of the venue name to match
  const words    = venueName.toLowerCase().split(/\s+/).filter(w => w.length > 2);
  const textLow  = text.toLowerCase();
  if (words.length === 0) return false;
  if (words.length === 1) return textLow.includes(words[0]);
  // For multi-word names, check if the full name appears (or first 3 words)
  const checkPhrase = words.slice(0, 3).join(' ');
  return textLow.includes(checkPhrase) || textLow.includes(venueName.toLowerCase());
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
(async () => {
  console.log('');
  console.log('Thermae Blog Post Checker');
  console.log('=========================');

  const src    = fs.readFileSync(VENUES_FILE, 'utf-8');
  const venues = parseVenues(src);
  console.log(`Loaded ${venues.length} venues from venues.ts`);

  const venueNames  = new Set(venues.map(v => v.name.toLowerCase()));
  const closedNames = new Set(venues.filter(v => !v.open).map(v => v.name.toLowerCase()));

  if (!fs.existsSync(BLOG_DIR)) {
    const msg = [
      '═══════════════════════════════════════════════════════════════',
      '  THERMAE BLOG POST CHECKER',
      `  ${new Date().toLocaleDateString('en-GB', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}`,
      '═══════════════════════════════════════════════════════════════',
      '',
      `ℹ No blog directory found at: ${BLOG_DIR}`,
      '',
      'This project does not yet have a blog. When blog posts are added to',
      'src/content/blog/, this script will automatically check them for',
      'references to venues that have since been removed or closed.',
      '',
      `Report generated: ${new Date().toISOString()}`,
      '',
    ].join('\n');

    fs.writeFileSync(REPORT_FILE, msg, 'utf-8');
    console.log(`\nNo blog directory found at ${BLOG_DIR}`);
    console.log('Report saved to:', REPORT_FILE);
    return;
  }

  const posts = readBlogPosts(BLOG_DIR);
  console.log(`Found ${posts.length} blog post(s) in ${BLOG_DIR}\n`);

  const date = new Date().toLocaleDateString('en-GB', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const issues    = []; // posts that reference venues no longer in db
  const warnings  = []; // posts that mention closed venues
  const clean     = []; // posts that look fine

  for (const post of posts) {
    if (post.error) {
      issues.push({ post, type: 'READ_ERROR', venues: [], note: post.error });
      continue;
    }

    const missingVenues = [];
    const closedVenues  = [];

    // Check for any venue name mentioned in this post
    for (const v of venues) {
      if (venueMentionedIn(v.name, post.content)) {
        if (!venueNames.has(v.name.toLowerCase())) {
          missingVenues.push(v);
        } else if (closedNames.has(v.name.toLowerCase())) {
          closedVenues.push(v);
        }
      }
    }

    // Also look for venue names in the post that don't exist in the database
    // by scanning for quoted or title-case multi-word phrases
    const titleCaseRe = /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,4})\b/g;
    let tcm;
    while ((tcm = titleCaseRe.exec(post.content)) !== null) {
      const phrase = tcm[1];
      // Skip short common phrases
      if (phrase.split(' ').length < 2) continue;
      const lower = phrase.toLowerCase();
      // Skip if it matches an existing venue (already handled above)
      if (venueNames.has(lower)) continue;
      // Skip if it's a generic phrase
      const generic = ['The Map', 'The Guide', 'Read More', 'Find Out', 'Book Now',
        'Learn More', 'Sign Up', 'Get Started', 'Back To', 'Jump To'];
      if (generic.some(g => phrase.startsWith(g))) continue;
    }

    if (missingVenues.length > 0) {
      issues.push({ post, type: 'MISSING_VENUE', venues: missingVenues });
    } else if (closedVenues.length > 0) {
      warnings.push({ post, type: 'CLOSED_VENUE', venues: closedVenues });
    } else {
      clean.push(post);
    }
  }

  // ── Build report ──
  const lines = [
    '═══════════════════════════════════════════════════════════════',
    '  THERMAE BLOG POST CHECKER',
    `  ${date}`,
    '═══════════════════════════════════════════════════════════════',
    '',
    `  Blog posts checked   : ${posts.length}`,
    `  ✅ Clean             : ${clean.length}`,
    `  ⚠️  Reference closed  : ${warnings.length}`,
    `  ❌ Venue not in DB   : ${issues.length}`,
    '',
  ];

  if (issues.length > 0) {
    lines.push('── POSTS REFERENCING MISSING VENUES ────────────────────────────');
    for (const item of issues) {
      lines.push(`  File: ${item.post.file}`);
      if (item.type === 'READ_ERROR') {
        lines.push(`  ⚠ Could not read file: ${item.note}`);
      } else {
        for (const v of item.venues) {
          lines.push(`  ❌ "${v.name}" (ID ${v.id}) is no longer in venues.ts`);
          lines.push(`     → Update or remove this mention from the blog post`);
        }
      }
      lines.push('');
    }
  }

  if (warnings.length > 0) {
    lines.push('── POSTS MENTIONING CLOSED VENUES ──────────────────────────────');
    for (const item of warnings) {
      lines.push(`  File: ${item.post.file}`);
      for (const v of item.venues) {
        lines.push(`  ⚠️  "${v.name}" (${v.city}) is marked open:false in venues.ts`);
        lines.push(`     → Consider adding a note that this venue is temporarily closed`);
      }
      lines.push('');
    }
  }

  if (clean.length > 0 && issues.length === 0 && warnings.length === 0) {
    lines.push('── ALL POSTS LOOK HEALTHY ───────────────────────────────────────');
    lines.push('  All blog posts reference venues that still exist. 🎉');
    lines.push('');
  }

  lines.push('── SUGGESTED ACTIONS ────────────────────────────────────────────');
  if (issues.length === 0 && warnings.length === 0) {
    lines.push('  No action required.');
  } else {
    for (const item of issues) {
      lines.push(`• Review: ${item.post.file}`);
      for (const v of item.venues) {
        lines.push(`  Missing venue: "${v.name}" — update or remove the reference`);
      }
    }
    for (const item of warnings) {
      lines.push(`• Review: ${item.post.file}`);
      for (const v of item.venues) {
        lines.push(`  Closed venue: "${v.name}" — consider adding a note in the post`);
      }
    }
  }
  lines.push('');
  lines.push(`Report generated: ${new Date().toISOString()}`);
  lines.push('');

  const report = lines.join('\n');
  fs.writeFileSync(REPORT_FILE, report, 'utf-8');
  console.log(report);
  console.log(`Report saved to: ${REPORT_FILE}`);
})();
