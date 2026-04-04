/** Haversine distance between two lat/lng points, returns kilometres */
export function haversineDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth radius in kilometres
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}

/** Format a distance in kilometres for display */
export function formatDistance(km: number): string {
  if (km < 0.1) return 'nearby';
  if (km < 10) return `${km.toFixed(1)} km`;
  return `${Math.round(km)} km`;
}

/** Rough driving time estimate from kilometres */
export function driveTime(km: number): string {
  const mins = Math.round((km / 48) * 60); // ~48 km/h average urban
  if (mins < 2) return '< 2 min drive';
  if (mins < 60) return `~${mins} min drive`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `~${h}h drive` : `~${h}h ${m}min drive`;
}
