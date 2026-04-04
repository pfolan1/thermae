import Link from 'next/link';
import { VENUES, CITIES } from '@/data/venues';

export default function Header() {
  return (
    <header
      style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #EBEBEB',
        position: 'sticky',
        top: 0,
        zIndex: 40,
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: '0' }}>
          <span
            style={{
              fontFamily: 'var(--font-serif, Georgia, serif)',
              fontSize: '20px',
              fontWeight: '600',
              color: '#222222',
              letterSpacing: '0.5px',
            }}
          >
            therm
          </span>
          <span
            style={{
              fontFamily: 'var(--font-serif, Georgia, serif)',
              fontSize: '20px',
              fontWeight: '600',
              color: '#c4793a',
              letterSpacing: '0.5px',
            }}
          >
            ae
          </span>
        </Link>

        {/* Meta */}
        <div
          style={{
            fontSize: '11px',
            color: '#aaa',
            letterSpacing: '0.8px',
            fontWeight: 500,
          }}
        >
          {CITIES.length - 1} cities &nbsp;&middot;&nbsp; {VENUES.length} venues
        </div>
      </div>
    </header>
  );
}
