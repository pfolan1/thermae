'use client';

import { useEffect, useRef } from 'react';
import type { Venue } from '@/data/venues';
import { venueSlug } from '@/lib/utils';

interface Props {
  venues: { venue: Venue; km: number | null }[];
  fromLat?: number;
  fromLng?: number;
}

export default function VenueMap({ venues, fromLat, fromLng }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import('leaflet').Map | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    let L: typeof import('leaflet');

    async function init() {
      L = (await import('leaflet')).default;

      // Fix default icon paths broken by webpack
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });

      if (!containerRef.current) return;

      // Centre map on venues or user location
      const lats = venues.map(v => v.venue.lat);
      const lngs = venues.map(v => v.venue.lng);
      const centerLat = fromLat ?? (lats.length ? lats.reduce((a, b) => a + b, 0) / lats.length : 51.5);
      const centerLng = fromLng ?? (lngs.length ? lngs.reduce((a, b) => a + b, 0) / lngs.length : -0.1);

      const map = L.map(containerRef.current, { zoomControl: true }).setView([centerLat, centerLng], 5);
      mapRef.current = map;

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors © CARTO',
        maxZoom: 19,
      }).addTo(map);

      // Coral custom icon
      const coralIcon = L.divIcon({
        className: '',
        html: `<div style="
          width:28px;height:28px;border-radius:50% 50% 50% 0;
          background:#FF5A5F;transform:rotate(-45deg);
          border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);
        "></div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 28],
        popupAnchor: [0, -30],
      });

      venues.forEach(({ venue: v, km }) => {
        const slug = venueSlug(v);
        const locationParams = fromLat !== undefined && fromLng !== undefined
          ? `?from_lat=${fromLat}&from_lng=${fromLng}`
          : '';
        const distText = km !== null ? `<div style="font-size:11px;color:#888;margin-top:2px;">📍 ${km < 10 ? km.toFixed(1) : Math.round(km)} km away</div>` : '';
        const popup = `
          <div style="font-family:Inter,sans-serif;min-width:180px;">
            <div style="font-weight:700;font-size:13px;color:#222;margin-bottom:2px;">${v.name}</div>
            <div style="font-size:11px;color:#888;margin-bottom:4px;">${v.area} · ${v.city}</div>
            ${distText}
            <div style="font-size:13px;font-weight:600;color:#222;margin:4px 0 6px;">${v.price}</div>
            <a href="/venues/${slug}/${locationParams}" style="
              display:block;text-align:center;padding:6px 12px;
              background:#FF5A5F;color:#fff;border-radius:6px;
              text-decoration:none;font-size:12px;font-weight:700;
            ">View venue →</a>
          </div>
        `;
        L.marker([v.lat, v.lng], { icon: coralIcon })
          .bindPopup(popup, { maxWidth: 220 })
          .addTo(map);
      });

      // Fit bounds to markers
      if (venues.length > 0) {
        const bounds = L.latLngBounds(venues.map(v => [v.venue.lat, v.venue.lng]));
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
      }
    }

    init();

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [venues, fromLat, fromLng]);

  return (
    <div style={{ position: 'relative' }}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"
      />
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: 'clamp(400px, 60vh, 600px)',
          borderRadius: '12px',
          border: '1px solid #EBEBEB',
          overflow: 'hidden',
        }}
      />
    </div>
  );
}
