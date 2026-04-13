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
          gap: '16px',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: '0', flexShrink: 0 }}>
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

        {/* Nav links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Link
            href="/blog"
            style={{
              fontSize: '13px',
              fontWeight: 500,
              color: '#555',
              textDecoration: 'none',
              padding: '6px 12px',
              borderRadius: '8px',
            }}
          >
            Blog
          </Link>
          <Link
            href="/about"
            style={{
              fontSize: '13px',
              fontWeight: 500,
              color: '#555',
              textDecoration: 'none',
              padding: '6px 12px',
              borderRadius: '8px',
            }}
          >
            About
          </Link>
          <Link
            href="/submit"
            style={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#FF5A5F',
              textDecoration: 'none',
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid #FF5A5F',
            }}
          >
            Suggest a Sauna
          </Link>
        </nav>

        {/* Meta — hidden on small screens */}
        <div
          className="header-meta"
          style={{
            fontSize: '11px',
            color: '#aaa',
            letterSpacing: '0.8px',
            fontWeight: 500,
            flexShrink: 0,
          }}
        >
          {CITIES.length - 1} cities &nbsp;&middot;&nbsp; {VENUES.length} venues
        </div>
      </div>
    </header>
  );
}
