'use client';

import { useState, useMemo, useCallback, lazy, Suspense } from 'react';
import Header from '@/components/Header';
import VenueCard from '@/components/VenueCard';
import FiltersModal, { type FilterState } from '@/components/FiltersModal';
import BackToTop from '@/components/BackToTop';
import ScrollableRow from '@/components/ScrollableRow';
import { VENUES, CITIES, COUNTRY_MAP, CITY_REGION_MAP } from '@/data/venues';
import { haversineDistance, formatDistance } from '@/lib/geo';

const VenueMap = lazy(() => import('@/components/VenueMap'));

// ── CONSTANTS ────────────────────────────────────────────────────────────────

const COUNTRIES = ['All', 'England', 'Northern Ireland', 'Scotland', 'Wales', 'Ireland', 'Denmark', 'Finland', 'Norway', 'Sweden', 'Iceland'];
const COUNTRY_LABELS: Record<string, string> = {
  All: 'All Countries',
  England: '🏴󠁧󠁢󠁥󠁮󠁧󠁿 England',
  'Northern Ireland': '🏴󠁧󠁢󠁮󠁩󠁲󠁿 N. Ireland',
  Scotland: '🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland',
  Wales: '🏴󠁧󠁢󠁷󠁬󠁳󠁿 Wales',
  Ireland: '🇮🇪 Ireland',
  Denmark: '🇩🇰 Denmark',
  Finland: '🇫🇮 Finland',
  Norway: '🇳🇴 Norway',
  Sweden: '🇸🇪 Sweden',
  Iceland: '🇮🇸 Iceland',
};
const COUNTRY_REGIONS: Record<string, string[]> = {
  England: ['Greater London','South East','South West','East of England','East Midlands','West Midlands','Yorkshire','North East','North West'],
  Scotland: ['Central Belt','Highlands','Fife','Borders','Grampian','Islands'],
  Wales: ['South Wales','North Wales','Mid Wales','West Wales'],
  'Northern Ireland': ['Antrim','Armagh','Down','Fermanagh','Londonderry','Tyrone'],
  Ireland: ['Carlow','Cavan','Clare','Cork','Donegal','Dublin','Galway','Kerry','Kildare','Kilkenny','Laois','Leitrim','Limerick','Longford','Louth','Mayo','Meath','Monaghan','Offaly','Roscommon','Sligo','Tipperary','Waterford','Westmeath','Wexford','Wicklow'],
  Finland: ['Helsinki Region','Lapland','Tampere Region','Turku Region'],
  Norway: ['Oslo Region','Western Norway','Northern Norway'],
  Sweden: ['Stockholm Region','Gothenburg Region','Malmö Region','Northern Sweden'],
  Denmark: ['Copenhagen Region','Jutland'],
  Iceland: ['Reykjavík','South Iceland','North Iceland','East Iceland','West Iceland'],
};

const TYPE_OPTIONS: [string, string][] = [
  ['all', 'All'],
  ['sauna', '🔥  Sauna'],
  ['plunge', '🧊  Cold Plunge'],
  ['both', '♾️  Both'],
  ['seaweed', '🌿  Seaweed Baths'],
];
const CATEGORY_ICONS: { emoji: string; label: string; tags: string[] }[] = [
  { emoji: '🌊', label: 'Seafront',         tags: ['Seafront','Sea Plunge','Coastal','Beach','Waterside'] },
  { emoji: '🌲', label: 'Woodland',          tags: ['Forest','Countryside','Outdoor'] },
  { emoji: '🏙️', label: 'City Centre',       tags: ['City Centre'] },
  { emoji: '🛖', label: 'Wood-fired',        tags: ['Wood-fired'] },
  { emoji: '♾️', label: 'Contrast Therapy',  tags: ['Contrast Therapy','Ice Bath','Multi-plunge'] },
  { emoji: '🧂', label: 'Halotherapy',       tags: ['Himalayan Salt'] },
  { emoji: '🛁', label: 'Bathhouse',         tags: ['Historic Building','Steam','Turkish Baths','Hammam'] },
  { emoji: '❄️', label: 'Ice Bath',          tags: ['Ice Bath','Multi-plunge'] },
  { emoji: '🔥', label: 'Finnish',           tags: ['Finnish'] },
];

const GEOCODING_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

function looksLikePostcode(s: string): boolean {
  const t = s.trim();
  return /^[A-Za-z]{1,2}\d/.test(t) || /^\d{4,5}/.test(t);
}

function priceMatchesFilter(price: string, ranges: string[]): boolean {
  if (ranges.length === 0) return true;
  const lower = price.toLowerCase();
  return ranges.some(r => {
    if (r === 'Free') return lower.includes('free') || lower === '0' || lower.includes('€0') || lower.includes('£0');
    if (r === 'Under £15') {
      const m = price.match(/[\d]+/);
      if (!m) return false;
      const n = parseInt(m[0]);
      return n < 15;
    }
    if (r === '£15–£30') {
      const m = price.match(/[\d]+/);
      if (!m) return false;
      const n = parseInt(m[0]);
      return n >= 15 && n <= 30;
    }
    if (r === 'Over £30') {
      const m = price.match(/[\d]+/);
      if (!m) return false;
      const n = parseInt(m[0]);
      return n > 30;
    }
    return false;
  });
}

function countryMatchesFilter(country: string, countries: string[]): boolean {
  if (countries.length === 0) return true;
  return countries.some(c => {
    if (c === 'UK') return country === 'UK';
    if (c === 'Ireland') return country === 'Ireland';
    if (c === 'Nordic') return ['Finland','Sweden','Denmark','Norway'].includes(country);
    return false;
  });
}

// ── COMPONENTS ───────────────────────────────────────────────────────────────

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '7px 15px',
        borderRadius: '20px',
        border: active ? '1px solid #FF5A5F' : '1px solid #EBEBEB',
        cursor: 'pointer',
        fontSize: '12px',
        fontWeight: active ? 700 : 500,
        background: active ? '#FFF0F0' : '#F7F7F7',
        color: active ? '#FF5A5F' : '#555',
        flexShrink: 0,
        fontFamily: 'inherit',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </button>
  );
}

// ── PAGE ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [city, setCity] = useState('All');
  const [countryFilter, setCountryFilter] = useState('All');
  const [regionFilter, setRegionFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null); // TASK 1
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');          // TASK 2
  const [filtersOpen, setFiltersOpen] = useState(false);                     // TASK 3
  const [advFilters, setAdvFilters] = useState<FilterState>({ priceRanges: [], countries: [], features: [] });

  const [searchInput, setSearchInput] = useState('');
  const [textSearch, setTextSearch] = useState('');
  const [userLat, setUserLat] = useState<number | null>(null);
  const [userLng, setUserLng] = useState<number | null>(null);
  const [locationLabel, setLocationLabel] = useState('');
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState('');

  const clearLocation = useCallback(() => {
    setUserLat(null); setUserLng(null);
    setLocationLabel(''); setLocationError('');
    setSearchInput(''); setTextSearch('');
  }, []);

  const tryGeocode = useCallback(async (input: string): Promise<boolean> => {
    if (!GEOCODING_API_KEY) return false;
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(input)}&key=${GEOCODING_API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.status !== 'OK' || !data.results[0]) return false;
      const loc = data.results[0].geometry.location;
      setUserLat(loc.lat); setUserLng(loc.lng);
      setLocationLabel(data.results[0].formatted_address ?? input);
      setCity('All'); setCountryFilter('All'); setRegionFilter('All'); setTextSearch('');
      return true;
    } catch { return false; }
  }, []);

  const handleSearch = useCallback(async () => {
    const val = searchInput.trim();
    if (!val) return;
    setLocationLoading(true); setLocationError('');
    const geocoded = await tryGeocode(val);
    setLocationLoading(false);
    if (!geocoded) {
      setTextSearch(val);
      setUserLat(null); setUserLng(null); setLocationLabel('');
    }
  }, [searchInput, tryGeocode]);

  const handleInputChange = useCallback((val: string) => {
    setSearchInput(val); setLocationError('');
    if (!looksLikePostcode(val)) {
      setTextSearch(val);
      if (userLat !== null) { setUserLat(null); setUserLng(null); setLocationLabel(''); }
    }
  }, [userLat]);

  const countryCities = useMemo(
    () => ['All', ...CITIES.filter(c => c !== 'All'
      && (countryFilter === 'All' || COUNTRY_MAP[c] === countryFilter)
      && (regionFilter === 'All' || CITY_REGION_MAP[c] === regionFilter)
    )],
    [countryFilter, regionFilter],
  );

  const activeRegions = countryFilter !== 'All' ? (COUNTRY_REGIONS[countryFilter] ?? []) : [];

  const filteredWithDistance = useMemo(() => {
    const q = textSearch.toLowerCase();
    const inLocationMode = userLat !== null && userLng !== null;
    const activeCatTags = categoryFilter
      ? (CATEGORY_ICONS.find(c => c.label === categoryFilter)?.tags ?? [])
      : [];

    const list = VENUES.filter(v => {
      const cityOk = inLocationMode || city === 'All' || v.city === city;
      const regionOk = inLocationMode || countryFilter === 'All' || COUNTRY_MAP[v.city] === countryFilter;
      const subRegionOk = inLocationMode || regionFilter === 'All' || CITY_REGION_MAP[v.city] === regionFilter;
      const typeOk = typeFilter === 'all' || v.type === typeFilter || (typeFilter === 'both' && v.type === 'both');
      const searchOk = !textSearch
        || v.name.toLowerCase().includes(q)
        || v.area.toLowerCase().includes(q)
        || v.city.toLowerCase().includes(q)
        || v.tags.some(t => t.toLowerCase().includes(q))
        || v.desc.toLowerCase().includes(q);
      const catOk = activeCatTags.length === 0 || v.tags.some(t => activeCatTags.includes(t));
      const priceOk = priceMatchesFilter(v.price, advFilters.priceRanges);
      const countryOk = countryMatchesFilter(v.country, advFilters.countries);
      const featureOk = advFilters.features.length === 0 || advFilters.features.some(f => v.tags.includes(f));
      return cityOk && regionOk && subRegionOk && typeOk && searchOk && catOk && priceOk && countryOk && featureOk;
    });

    if (inLocationMode) {
      return list
        .map(v => ({ venue: v, km: haversineDistance(userLat, userLng, v.lat, v.lng) }))
        .sort((a, b) => a.km - b.km);
    }
    return list.map(v => ({ venue: v, km: null }));
  }, [city, countryFilter, regionFilter, typeFilter, textSearch, categoryFilter, advFilters, userLat, userLng]);

  const nearestFallback = useMemo(() => {
    if (userLat === null || userLng === null || filteredWithDistance.length > 0) return null;
    return VENUES
      .map(v => ({ venue: v, km: haversineDistance(userLat, userLng, v.lat, v.lng) }))
      .sort((a, b) => a.km - b.km)
      .slice(0, 6);
  }, [userLat, userLng, filteredWithDistance.length]);

  const displayList = nearestFallback ?? filteredWithDistance;

  const activeFilterCount =
    advFilters.priceRanges.length + advFilters.countries.length + advFilters.features.length;

  return (
    <>
      <Header />
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 80px' }}>

        {/* ── HERO ── */}
        <div style={{ textAlign: 'center', padding: '64px 0 40px' }}>
          <h1 style={{
            fontFamily: 'var(--font-serif, Georgia, serif)',
            fontSize: 'clamp(28px, 5.5vw, 58px)',
            fontWeight: 700, color: '#222222',
            lineHeight: 1.12, marginBottom: '10px', letterSpacing: '-0.5px',
          }}>
            Find Your Perfect Sauna
          </h1>
          <p style={{
            fontFamily: 'var(--font-serif, Georgia, serif)',
            fontSize: 'clamp(15px, 2.2vw, 22px)',
            fontStyle: 'italic', color: '#FF5A5F',
            marginBottom: '36px', fontWeight: 400,
          }}>
            Hot spots, cold plunges. Find yours.
          </p>

          {/* Search + Filters button */}
          <div style={{ maxWidth: '560px', margin: '0 auto', display: 'flex', gap: '8px' }}>
            <div style={{ flex: 1 }}>
              {userLat !== null ? (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '13px 16px', borderRadius: '8px',
                  background: '#F7F7F7', border: '1px solid #EBEBEB',
                }}>
                  <span style={{ fontSize: '14px' }}>📍</span>
                  <span style={{ flex: 1, fontSize: '14px', color: '#222222', fontWeight: 500, textAlign: 'left' }}>
                    {locationLabel}
                  </span>
                  <button onClick={clearLocation} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#aaa', lineHeight: 1, padding: '0 2px', fontFamily: 'inherit' }}>×</button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ position: 'relative', flex: 1 }}>
                    <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px', color: '#bbb', pointerEvents: 'none' }}>⌕</span>
                    <input
                      value={searchInput}
                      onChange={e => handleInputChange(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSearch()}
                      placeholder="City, venue, or postcode..."
                      style={{ width: '100%', padding: '13px 16px 13px 40px', borderRadius: '8px', background: '#F7F7F7', border: '1px solid #EBEBEB', color: '#222222', fontSize: '14px', fontFamily: 'inherit', outline: 'none' }}
                    />
                  </div>
                  <button
                    onClick={handleSearch} disabled={locationLoading}
                    style={{ padding: '13px 22px', borderRadius: '8px', background: '#FF5A5F', color: '#FFFFFF', border: 'none', fontSize: '14px', fontWeight: 700, cursor: locationLoading ? 'default' : 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', opacity: locationLoading ? 0.7 : 1 }}
                  >
                    {locationLoading ? '…' : 'Search'}
                  </button>
                </div>
              )}
              {locationError && <p style={{ fontSize: '12px', color: '#FF5A5F', marginTop: '6px', textAlign: 'left' }}>{locationError}</p>}
            </div>

            {/* TASK 3: Filters button */}
            <button
              onClick={() => setFiltersOpen(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '13px 18px', borderRadius: '8px',
                background: activeFilterCount > 0 ? '#FFF0F0' : '#F7F7F7',
                border: activeFilterCount > 0 ? '1px solid #FF5A5F' : '1px solid #EBEBEB',
                color: activeFilterCount > 0 ? '#FF5A5F' : '#555',
                fontSize: '14px', fontWeight: 600,
                cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
              </svg>
              Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}
            </button>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid #EBEBEB', margin: '0 0 20px' }} />

        {/* TASK 1: Category Icons Bar */}
        <div style={{ marginBottom: '20px' }}>
          <ScrollableRow gap={8}>
            {CATEGORY_ICONS.map(cat => {
              const active = categoryFilter === cat.label;
              return (
                <button
                  key={cat.label}
                  onClick={() => setCategoryFilter(active ? null : cat.label)}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                    padding: '10px 14px', borderRadius: '12px', flexShrink: 0,
                    border: active ? '2px solid #FF5A5F' : '1px solid #EBEBEB',
                    background: active ? '#FFF0F0' : '#fff',
                    cursor: 'pointer', fontFamily: 'inherit', minWidth: '64px',
                  }}
                >
                  <span style={{ fontSize: '20px' }}>{cat.emoji}</span>
                  <span style={{ fontSize: '10px', fontWeight: 600, color: active ? '#FF5A5F' : '#555', whiteSpace: 'nowrap', letterSpacing: '0.2px' }}>
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </ScrollableRow>
        </div>

        {/* Country + city filter rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
          <ScrollableRow gap={6}>
            {COUNTRIES.map(c => (
              <Pill key={c} active={countryFilter === c} onClick={() => { setCountryFilter(c); setCity('All'); setRegionFilter('All'); }}>{COUNTRY_LABELS[c]}</Pill>
            ))}
          </ScrollableRow>
          <ScrollableRow>
            {countryCities.map(c => (
              <Pill key={c} active={city === c} onClick={() => setCity(c)}>{c === 'All' ? 'All Cities' : c}</Pill>
            ))}
          </ScrollableRow>
          {activeRegions.length > 0 && (
            <ScrollableRow gap={6}>
              {['All', ...activeRegions].map(r => {
                const hasVenues = r === 'All' || VENUES.some(v => CITY_REGION_MAP[v.city] === r && COUNTRY_MAP[v.city] === countryFilter);
                return (
                  <Pill
                    key={r}
                    active={regionFilter === r}
                    onClick={() => { setRegionFilter(r); setCity('All'); }}
                  >
                    <span style={{ opacity: hasVenues ? 1 : 0.4 }}>
                      {r === 'All' ? `All ${countryFilter === 'Ireland' || countryFilter === 'Northern Ireland' ? 'Counties' : 'Regions'}` : r}
                    </span>
                  </Pill>
                );
              })}
            </ScrollableRow>
          )}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {TYPE_OPTIONS.map(([val, label]) => (
              <Pill key={val} active={typeFilter === val} onClick={() => setTypeFilter(val)}>{label}</Pill>
            ))}
          </div>
        </div>

        {/* Result count + TASK 2: Grid/Map toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ fontSize: '12px', color: '#aaa' }}>
            {displayList.length} {displayList.length !== 1 ? 'venues' : 'venue'}
            {userLat !== null && !nearestFallback && ' · sorted by distance'}
          </div>
          <div style={{ display: 'flex', border: '1px solid #EBEBEB', borderRadius: '8px', overflow: 'hidden', background: '#F7F7F7' }}>
            {(['grid', 'map'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                style={{
                  padding: '7px 16px', border: 'none', cursor: 'pointer',
                  fontFamily: 'inherit', fontSize: '12px', fontWeight: 600,
                  background: viewMode === mode ? '#FF5A5F' : 'transparent',
                  color: viewMode === mode ? '#fff' : '#555',
                }}
              >
                {mode === 'grid' ? '⊞ Grid' : '🗺 Map'}
              </button>
            ))}
          </div>
        </div>

        {/* Nearest fallback banner */}
        {nearestFallback && (
          <div style={{ marginBottom: '24px', padding: '14px 18px', background: '#FFF8F8', border: '1px solid #FFD6D7', borderRadius: '8px' }}>
            <p style={{ fontSize: '14px', color: '#222222' }}>
              No venues found near <strong>{locationLabel}</strong> — here are the closest ones to you.
            </p>
          </div>
        )}

        {/* TASK 2: Map or Grid */}
        {viewMode === 'map' ? (
          <Suspense fallback={<div style={{ height: '400px', background: '#F7F7F7', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa', fontSize: '14px' }}>Loading map…</div>}>
            <VenueMap venues={displayList} fromLat={userLat ?? undefined} fromLng={userLng ?? undefined} />
          </Suspense>
        ) : (
          <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', alignItems: 'stretch' }}>
              {displayList.map(({ venue: v, km }) => (
                <VenueCard key={v.id} venue={v} distance={km !== null ? formatDistance(km) : undefined} fromLat={userLat ?? undefined} fromLng={userLng ?? undefined} />
              ))}
            </div>
            {displayList.length === 0 && userLat === null && (
              <div style={{ textAlign: 'center', paddingTop: '80px' }}>
                <div style={{ fontSize: '36px', marginBottom: '16px', opacity: 0.3 }}>♨</div>
                <div style={{ fontFamily: 'var(--font-serif, Georgia, serif)', fontSize: '20px', color: '#222222', marginBottom: '8px' }}>No venues found</div>
                <div style={{ fontSize: '13px', color: '#aaa' }}>Try a different search or filter</div>
              </div>
            )}
            <div style={{ textAlign: 'center', marginTop: '40px', paddingBottom: '8px' }}>
              <a href="/submit" style={{ fontSize: '13px', color: '#FF5A5F', textDecoration: 'none', fontWeight: 600 }}>
                Missing a sauna? Suggest one →
              </a>
            </div>
          </>
        )}

      </main>

      {/* TASK 3: Filters modal */}
      <FiltersModal
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        filters={advFilters}
        onChange={setAdvFilters}
        resultCount={displayList.length}
      />

      {/* TASK 8: Back to top */}
      <BackToTop />
    </>
  );
}
