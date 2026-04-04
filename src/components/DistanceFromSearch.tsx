'use client';

import { useSearchParams } from 'next/navigation';
import { haversineDistance, formatDistance, driveTime } from '@/lib/geo';

interface Props {
  lat: number;
  lng: number;
}

export default function DistanceFromSearch({ lat, lng }: Props) {
  const params = useSearchParams();
  const fromLat = parseFloat(params.get('from_lat') ?? '');
  const fromLng = parseFloat(params.get('from_lng') ?? '');

  if (isNaN(fromLat) || isNaN(fromLng)) return null;

  const miles = haversineDistance(fromLat, fromLng, lat, lng);
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: '10px 16px',
        background: '#F7F7F7',
        border: '1px solid #EBEBEB',
        borderRadius: '8px',
        marginBottom: '24px',
      }}
    >
      <span style={{ fontSize: '14px' }}>📍</span>
      <div>
        <span style={{ fontSize: '13px', fontWeight: 600, color: '#222222' }}>
          {formatDistance(miles)} from your location
        </span>
        <span style={{ fontSize: '11px', color: '#888', marginLeft: '8px' }}>
          {driveTime(miles)}
        </span>
      </div>
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontSize: '11px', color: '#FF5A5F', marginLeft: '4px' }}
      >
        Directions →
      </a>
    </div>
  );
}
