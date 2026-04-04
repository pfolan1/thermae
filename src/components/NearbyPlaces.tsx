'use client';

import { useEffect, useState } from 'react';

interface Place {
  name: string;
  rating?: number;
  distance?: string;
  type: string;
}

interface NearbySection {
  label: string;
  emoji: string;
  places: Place[];
}

interface Props {
  lat: number;
  lng: number;
}

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
const RADIUS = 800; // metres

async function searchNearby(lat: number, lng: number, types: string[], label: string): Promise<Place[]> {
  if (!API_KEY) return [];

  const res = await fetch('https://places.googleapis.com/v1/places:searchNearby', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask': 'places.displayName,places.rating,places.businessStatus,places.location',
    },
    body: JSON.stringify({
      includedTypes: types,
      maxResultCount: 5,
      locationRestriction: {
        circle: {
          center: { latitude: lat, longitude: lng },
          radius: RADIUS,
        },
      },
      rankPreference: 'POPULARITY',
    }),
  });

  if (!res.ok) return [];

  const data = await res.json();
  const places: Place[] = [];

  for (const p of data.places ?? []) {
    if (p.businessStatus === 'CLOSED_PERMANENTLY') continue;
    if (places.length >= 3) break;

    // Rough walking distance in metres
    const dLat = (p.location.latitude - lat) * 111320;
    const dLng = (p.location.longitude - lng) * 111320 * Math.cos((lat * Math.PI) / 180);
    const metres = Math.round(Math.sqrt(dLat ** 2 + dLng ** 2));
    const walkMins = Math.max(1, Math.round(metres / 80)); // ~80m/min walking

    places.push({
      name: p.displayName?.text ?? 'Unknown',
      rating: p.rating,
      distance: metres < 100 ? 'on-site' : `${walkMins} min walk`,
      type: label,
    });
  }

  return places;
}

export default function NearbyPlaces({ lat, lng }: Props) {
  const [sections, setSections] = useState<NearbySection[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!API_KEY) {
      setError(true);
      return;
    }

    Promise.all([
      searchNearby(lat, lng, ['cafe', 'coffee_shop'], 'Coffee'),
      searchNearby(lat, lng, ['bar', 'pub'], 'Pub / Bar'),
      searchNearby(lat, lng, ['restaurant'], 'Restaurant'),
    ])
      .then(([coffee, pubs, food]) => {
        setSections([
          { label: 'Coffee', emoji: '☕', places: coffee },
          { label: 'Pubs & Bars', emoji: '🍺', places: pubs },
          { label: 'Food', emoji: '🍽️', places: food },
        ]);
      })
      .catch(() => setError(true));
  }, [lat, lng]);

  const mapsUrl = `https://www.google.com/maps/search/food+and+drink/@${lat},${lng},15z`;

  if (error || (sections && sections.every(s => s.places.length === 0))) {
    return (
      <div style={{ padding: '16px 0' }}>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: '13px', color: '#FF5A5F', textDecoration: 'none' }}
        >
          See nearby options on Google Maps →
        </a>
      </div>
    );
  }

  if (!sections) {
    return (
      <div style={{ padding: '16px 0', fontSize: '12px', color: '#888' }}>
        Loading nearby places…
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '28px',
        marginBottom: '16px',
      }}
    >
      {sections.map(section =>
        section.places.length === 0 ? null : (
          <div key={section.label}>
            <div style={{ fontSize: '11px', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px' }}>
              {section.emoji} {section.label}
            </div>
            {section.places.map((place, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  padding: '10px 12px',
                  background: '#F7F7F7',
                  borderRadius: '8px',
                  border: '1px solid #EBEBEB',
                  marginBottom: '6px',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#222222' }}>
                    {place.name}
                  </div>
                  {place.rating && (
                    <div style={{ fontSize: '11px', color: '#888', marginTop: '2px' }}>
                      ★ {place.rating.toFixed(1)}
                    </div>
                  )}
                </div>
                {place.distance && (
                  <span
                    style={{
                      fontSize: '11px',
                      color: '#FF5A5F',
                      fontWeight: 600,
                      flexShrink: 0,
                      marginLeft: '10px',
                    }}
                  >
                    {place.distance}
                  </span>
                )}
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
