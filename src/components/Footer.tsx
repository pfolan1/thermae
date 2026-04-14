import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid #EEEEEE',
      background: '#fff',
      padding: '32px 24px',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        textAlign: 'center',
      }}>
        <p style={{ fontSize: '13px', color: '#999', margin: 0 }}>
          Thermae is Europe&apos;s dedicated sauna and wellness directory.
        </p>
        <nav style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <Link href="/terms" style={{ fontSize: '12px', color: '#aaa', textDecoration: 'none' }}
            className="footer-link">
            Terms
          </Link>
          <span style={{ color: '#ddd', fontSize: '12px' }}>·</span>
          <Link href="/privacy" style={{ fontSize: '12px', color: '#aaa', textDecoration: 'none' }}
            className="footer-link">
            Privacy
          </Link>
          <span style={{ color: '#ddd', fontSize: '12px' }}>·</span>
          <Link href="/cookies" style={{ fontSize: '12px', color: '#aaa', textDecoration: 'none' }}
            className="footer-link">
            Cookies
          </Link>
        </nav>
        <p style={{ fontSize: '12px', color: '#bbb', margin: 0 }}>
          © 2026 Thermae. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
