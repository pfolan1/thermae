'use client';

import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('thermae-cookie-consent');
    if (!stored) setShow(true);
  }, []);

  const accept = () => {
    localStorage.setItem('thermae-cookie-consent', 'accepted');
    window.dispatchEvent(new Event('thermae-consent-accepted'));
    setShow(false);
  };

  const essential = () => {
    localStorage.setItem('thermae-cookie-consent', 'essential');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: '#fff',
      borderTop: '1px solid #EBEBEB',
      boxShadow: '0 -4px 24px rgba(0,0,0,0.08)',
      padding: '20px 24px',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '24px',
      flexWrap: 'wrap',
    }}>
      <p style={{ fontSize: '14px', color: '#555', margin: 0, maxWidth: '600px', lineHeight: 1.6 }}>
        We use cookies to understand how visitors use Thermae. This helps us improve the directory for everyone.{' '}
        <a href="/cookies" style={{ color: '#FF5A5F', textDecoration: 'none', fontWeight: 600 }}>
          Learn more
        </a>
      </p>
      <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
        <button
          onClick={essential}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: '1px solid #EBEBEB',
            background: '#F7F7F7',
            color: '#555',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Essential Only
        </button>
        <button
          onClick={accept}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            background: '#FF5A5F',
            color: '#fff',
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          Accept Analytics
        </button>
      </div>
    </div>
  );
}
