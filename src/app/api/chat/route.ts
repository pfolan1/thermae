import { NextRequest } from 'next/server';
import { VENUES } from '@/data/venues';
import { venueSlug } from '@/lib/utils';

// Build a condensed venue list for the system prompt (avoids sending huge payloads)
function buildVenueContext(): string {
  const items = VENUES.map(v => ({
    name: v.name,
    city: v.city,
    country: v.country,
    type: v.type,
    price: v.price,
    tags: v.tags.slice(0, 6),
    desc: v.desc.slice(0, 120),
    slug: venueSlug(v),
    bookingUrl: v.bookingUrl ?? null,
  }));
  return JSON.stringify(items);
}

const SYSTEM_PROMPT = `You are the Thermae wellness assistant. Thermae is Europe's dedicated directory of saunas, cold plunges, hot springs, lagoons, geothermal pools and seaweed baths across the UK, Ireland, Iceland, Scandinavia and Greenland.

Your job is to help users find the perfect venue based on their preferences. Be warm, knowledgeable and specific — like a well-travelled friend who knows all the best spots.

When recommending venues:
- Always mention the venue name, city/location, and price if known
- Include a clickable link in this exact format: [Venue Name](https://thermae.app/venues/SLUG) where SLUG is the venue's slug from the database
- If the user asks for multiple options, give 2–4 well-matched recommendations with a short explanation for each
- Mention relevant tags or features that match what the user is looking for (outdoor, wood-fired, seafront, etc.)
- If a venue has a bookingUrl, mention they can book directly

Only recommend venues from the Thermae database below. If no venues match the user's request, say so honestly and suggest the closest alternatives.

VENUES DATABASE:
`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'ANTHROPIC_API_KEY not configured' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }

  let messages: { role: string; content: string }[];
  try {
    const body = (await req.json()) as { messages?: { role: string; content: string }[] };
    if (!Array.isArray(body?.messages)) {
      return new Response(JSON.stringify({ error: 'messages must be an array' }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      });
    }
    messages = body.messages;
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  const systemPrompt = SYSTEM_PROMPT + buildVenueContext();

  const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: systemPrompt,
      messages,
      stream: true,
    }),
  });

  if (!anthropicRes.ok) {
    const err = await anthropicRes.text();
    return new Response(JSON.stringify({ error: err }), {
      status: anthropicRes.status,
      headers: { 'content-type': 'application/json' },
    });
  }

  if (!anthropicRes.body) {
    return new Response(JSON.stringify({ error: 'Empty response from Anthropic' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }

  // Pass the SSE stream straight through to the client
  return new Response(anthropicRes.body, {
    headers: {
      'content-type': 'text/event-stream',
      'cache-control': 'no-cache',
      'x-accel-buffering': 'no',
    },
  });
}
