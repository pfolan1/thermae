import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { VENUES, FLAG } from '@/data/venues';
import { venueSlug, getVenueBySlug } from '@/lib/utils';
import Header from '@/components/Header';
import NearbyPlaces from '@/components/NearbyPlaces';
import DistanceFromSearch from '@/components/DistanceFromSearch';
import ShareButton from '@/components/ShareButton';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return VENUES.map(v => ({ slug: venueSlug(v) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const venue = getVenueBySlug(params.slug, VENUES);
  if (!venue) return {};
  return {
    title: `${venue.name} — ${venue.city}`,
    description: venue.desc,
    openGraph: {
      title: `${venue.name} — ${venue.city}`,
      description: venue.desc,
    },
  };
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        background: '#F7F7F7',
        borderRadius: '10px',
        padding: '14px 16px',
        border: '1px solid #EBEBEB',
      }}
    >
      <div style={{ fontSize: '11px', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
        {label}
      </div>
      <div style={{ fontSize: '14px', fontWeight: 700, color: '#FF5A5F', lineHeight: 1.3 }}>
        {value}
      </div>
    </div>
  );
}

export default function VenuePage({ params }: Props) {
  const venue = getVenueBySlug(params.slug, VENUES);
  if (!venue) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: venue.name,
    description: venue.desc,
    address: {
      '@type': 'PostalAddress',
      addressLocality: venue.city,
      addressCountry: venue.country,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: venue.rating,
      reviewCount: venue.reviews,
    },
  };

  return (
    <>
      <Header />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ── */}
      <div
        style={{
          height: '180px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '0 40px',
          background: '#F7F7F7',
          borderBottom: '1px solid #EBEBEB',
        }}
      >
        <div style={{ fontSize: '64px', lineHeight: 1 }}>
          {venue.emoji}
        </div>
      </div>

      <main style={{ background: '#FFFFFF', maxWidth: '860px', margin: '0 auto', padding: '0 24px 80px' }}>

        {/* ── BACK ── */}
        <div style={{ padding: '20px 0 6px' }}>
          <Link
            href="/"
            style={{ fontSize: '13px', color: '#FF5A5F', textDecoration: 'none', fontWeight: 600 }}
          >
            ← All venues
          </Link>
        </div>

        {/* ── DISTANCE FROM SEARCH ── */}
        <Suspense fallback={null}>
          <DistanceFromSearch lat={venue.lat} lng={venue.lng} />
        </Suspense>

        {/* ── TITLE ROW ── */}
        <div style={{ paddingBottom: '28px', paddingTop: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', flexWrap: 'wrap' }}>
            <div>
              {/* TASK 4: Featured badge */}
              {venue.featured && (
                <div style={{ marginBottom: '8px' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '4px',
                    background: '#FFF0F0', color: '#FF5A5F',
                    border: '1px solid #FF5A5F', borderRadius: '6px',
                    fontSize: '11px', fontWeight: 700,
                    padding: '4px 10px', letterSpacing: '0.3px',
                  }}>
                    ✓ Featured Venue
                  </span>
                </div>
              )}
              <h1
                style={{
                  fontFamily: 'var(--font-serif, Georgia, serif)',
                  fontSize: 'clamp(24px, 4vw, 36px)',
                  fontWeight: 700,
                  color: '#222222',
                  lineHeight: 1.18,
                  marginBottom: '8px',
                  letterSpacing: '-0.3px',
                }}
              >
                {FLAG[venue.city]} {venue.name}
              </h1>
              <p style={{ fontSize: '14px', color: '#666', letterSpacing: '0.1px' }}>
                {venue.area} &nbsp;&middot;&nbsp; {venue.city} &nbsp;&middot;&nbsp; {venue.country}
              </p>
              {/* TASK 6: Google rating */}
              {venue.googleRating && (
                <p style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>
                  ⭐ {venue.googleRating}{' '}
                  <a
                    href={`https://www.google.com/search?q=${encodeURIComponent(venue.name + ' ' + venue.city + ' reviews')}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{ color: '#FF5A5F', textDecoration: 'none', fontWeight: 500 }}
                  >
                    Reviews on Google →
                  </a>
                </p>
              )}
            </div>

            {/* Rating badge */}
            <div
              style={{
                flexShrink: 0,
                background: '#FFFFFF',
                border: '2px solid #FF5A5F',
                borderRadius: '10px',
                padding: '10px 18px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-serif, Georgia, serif)',
                  fontSize: '26px',
                  fontWeight: 700,
                  color: '#FF5A5F',
                  lineHeight: 1,
                }}
              >
                {venue.rating}
              </div>
              <div style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>
                ★ {venue.reviews} reviews
              </div>
            </div>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #EBEBEB', margin: '0 0 28px' }} />

        {/* ── INFO CARDS ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(155px, 1fr))',
            gap: '10px',
            marginBottom: '12px',
          }}
        >
          <InfoCard label="Entry" value={venue.price} />
          <InfoCard label="Hours" value={venue.hours} />
          <InfoCard label="Plunge" value={venue.temp} />
          <InfoCard label="Hygiene" value={venue.hygiene} />
        </div>

        {/* Lockers */}
        <div style={{ marginBottom: '28px' }}>
          <span
            style={{
              display: 'inline-block',
              padding: '5px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 500,
              background: '#F7F7F7',
              color: '#555',
              border: '1px solid #EBEBEB',
            }}
          >
            🔒 {venue.lockerNote}
          </span>
        </div>

        {/* ── TRANSPORT & PARKING ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '32px' }}>
          <div
            style={{
              background: '#F7F7F7',
              borderRadius: '10px',
              padding: '14px 16px',
              border: '1px solid #EBEBEB',
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
              🚇 Transport
            </div>
            <div style={{ fontSize: '13px', color: '#222222', lineHeight: 1.5 }}>{venue.transport}</div>
          </div>
          <div
            style={{
              background: '#F7F7F7',
              borderRadius: '10px',
              padding: '14px 16px',
              border: '1px solid #EBEBEB',
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>
              🚗 Parking
            </div>
            <div style={{ fontSize: '13px', color: '#222222', lineHeight: 1.5 }}>{venue.parking}</div>
          </div>
        </div>

        {/* ── DESCRIPTION ── */}
        <p
          style={{
            fontFamily: 'var(--font-serif, Georgia, serif)',
            fontSize: '17px',
            color: '#444',
            lineHeight: 1.8,
            marginBottom: '24px',
            fontWeight: 400,
          }}
        >
          {venue.desc}
        </p>

        {/* ── TAGS ── */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '36px' }}>
          {venue.tags.map(t => (
            <span
              key={t}
              style={{
                padding: '5px 12px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 500,
                background: '#F7F7F7',
                color: '#222222',
                border: '1px solid #EBEBEB',
                letterSpacing: '0.1px',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #EBEBEB', margin: '0 0 28px' }} />

        {/* ── NEARBY ── */}
        <div style={{ marginBottom: '16px' }}>
          <p
            style={{
              fontFamily: 'var(--font-serif, Georgia, serif)',
              fontSize: '22px',
              fontWeight: 700,
              color: '#222222',
              marginBottom: '4px',
            }}
          >
            Nearby
          </p>
          <p style={{ fontSize: '13px', color: '#888' }}>Coffee, pubs, and food within walking distance</p>
        </div>

        <NearbyPlaces lat={venue.lat} lng={venue.lng} />

        <hr style={{ border: 'none', borderTop: '1px solid #EBEBEB', margin: '32px 0 28px' }} />

        {/* ── CTA ── */}
        <div style={{ maxWidth: '400px' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'stretch' }}>
            <a
              href={venue.bookingUrl ?? '#'}
              target={venue.bookingUrl ? '_blank' : undefined}
              rel={venue.bookingUrl ? 'noopener noreferrer' : undefined}
              style={{
                flex: 1,
                padding: '16px 24px',
                borderRadius: '8px',
                background: '#FF5A5F',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '15px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                textAlign: 'center',
                textDecoration: 'none',
                letterSpacing: '0.2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Visit Website →
            </a>
            {/* TASK 5: Share button */}
            <ShareButton venueName={venue.name} venueCity={venue.city} />
          </div>
          <p style={{ fontSize: '12px', color: '#aaa', textAlign: 'center', marginTop: '8px' }}>
            {venue.bookingUrl ? 'Opens venue website in new tab' : 'Booking link coming soon'}
          </p>
        </div>

      </main>
    </>
  );
}
