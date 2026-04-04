import Link from 'next/link';
import type { Venue } from '@/data/venues';
import { FLAG, getTag } from '@/data/venues';
import { venueSlug } from '@/lib/utils';

interface Props {
  venue: Venue;
  distance?: string;
  fromLat?: number;
  fromLng?: number;
}

// Richer gradients evoking natural materials
const banners: Record<Venue['type'], string> = {
  sauna:  'radial-gradient(ellipse at 30% 50%, #ffe8e0 0%, #ffd5c8 60%, #f7f7f7 100%)',
  plunge: 'radial-gradient(ellipse at 70% 40%, #e0f0f7 0%, #c8e4f0 60%, #f7f7f7 100%)',
  both:   'radial-gradient(ellipse at 50% 50%, #ffe8e0 0%, #e0f0f7 50%, #f7f7f7 100%)',
};

const typeLabel: Record<Venue['type'], { text: string; color: string }> = {
  sauna:  { text: 'Sauna',       color: '#FF5A5F' },
  plunge: { text: 'Cold Plunge', color: '#6bafc8' },
  both:   { text: 'Sauna & Cold Plunge', color: '#8a9c82' },
};

export default function VenueCard({ venue, distance, fromLat, fromLng }: Props) {
  const slug = venueSlug(venue);
  const type = typeLabel[venue.type];

  const locationParams =
    fromLat !== undefined && fromLng !== undefined
      ? `?from_lat=${fromLat}&from_lng=${fromLng}`
      : '';

  return (
    <Link href={`/venues/${slug}/${locationParams}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
      <article
        className="venue-card"
        style={{
          background: '#ffffff',
          border: '1px solid rgba(100,130,75,0.13)',
          borderRadius: '14px',
          overflow: 'hidden',
          cursor: 'pointer',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Banner */}
        <div
          style={{
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 18px',
            background: banners[venue.type],
            flexShrink: 0,
            position: 'relative',
          }}
        >
          <span style={{ fontSize: '28px' }}>{venue.emoji}</span>
          <span
            style={{
              fontSize: '10px',
              fontWeight: 700,
              color: type.color,
              letterSpacing: '0.8px',
              textTransform: 'uppercase',
              opacity: 0.8,
            }}
          >
            {type.text}
          </span>
          {/* TASK 4: Featured badge */}
          {venue.featured && (
            <span style={{
              position: 'absolute', top: '10px', right: '10px',
              background: '#FF5A5F', color: '#fff',
              fontSize: '9px', fontWeight: 700,
              padding: '3px 7px', borderRadius: '4px',
              letterSpacing: '0.5px', textTransform: 'uppercase',
            }}>
              Featured
            </span>
          )}
        </div>

        {/* Body */}
        <div style={{ padding: '15px 17px 17px', display: 'flex', flexDirection: 'column', flex: 1 }}>
          {/* Name */}
          <div style={{ marginBottom: '10px' }}>
            <div
              style={{
                fontSize: '14px',
                fontWeight: 700,
                color: '#222222',
                marginBottom: '3px',
                lineHeight: 1.3,
              }}
            >
              {FLAG[venue.city]} {venue.name}
            </div>
            <div style={{ fontSize: '11px', color: '#4e5e48' }}>
              {venue.area} &middot; {venue.city}
            </div>
            {/* TASK 6: Google rating */}
            {venue.googleRating && (
              <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>
                ⭐ {venue.googleRating} Google
              </div>
            )}
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '12px' }}>
            {venue.tags.slice(0, 2).map(t => {
              const { bg, c } = getTag(t);
              return (
                <span
                  key={t}
                  style={{
                    padding: '3px 8px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    fontWeight: 700,
                    background: bg,
                    color: c,
                    letterSpacing: '0.2px',
                  }}
                >
                  {t}
                </span>
              );
            })}
          </div>

          {/* Spacer */}
          <div style={{ flex: 1 }} />

          {/* Distance badge */}
          {distance && (
            <div style={{ marginBottom: '8px' }}>
              <span
                style={{
                  display: 'inline-block',
                  padding: '3px 9px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  fontWeight: 700,
                  background: 'rgba(107,175,200,0.1)',
                  color: '#6bafc8',
                  border: '1px solid rgba(107,175,200,0.18)',
                  letterSpacing: '0.2px',
                }}
              >
                📍 {distance}
              </span>
            </div>
          )}

          {/* Price / rating */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              paddingTop: '10px',
              borderTop: '1px solid rgba(100,130,75,0.1)',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-serif, Georgia, serif)',
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#222222',
                  lineHeight: 1,
                }}
              >
                {venue.price}
              </div>
              <div style={{ fontSize: '10px', color: '#4e5e48', marginTop: '3px' }}>
                {venue.temp}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#c4a255' }}>
                ★ {venue.rating}
              </div>
              <div style={{ fontSize: '10px', color: '#4e5e48' }}>
                {venue.reviews} reviews
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
