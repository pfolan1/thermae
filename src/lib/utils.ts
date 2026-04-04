import type { Venue } from '@/data/venues';

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // strip diacritics (ö→o, á→a etc.)
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

export function venueSlug(venue: Pick<Venue, 'name' | 'city'>): string {
  return `${slugify(venue.name)}-${slugify(venue.city)}`;
}

export function getVenueBySlug(slug: string, venues: Venue[]): Venue | undefined {
  return venues.find(v => venueSlug(v) === slug);
}
