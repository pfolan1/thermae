'use client';

import { useState, useEffect } from 'react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      style={{
        position: 'fixed', bottom: '24px', right: '24px',
        width: '44px', height: '44px',
        background: '#FF5A5F', color: '#fff',
        border: 'none', borderRadius: '50%',
        fontSize: '18px', cursor: 'pointer',
        boxShadow: '0 2px 12px rgba(255,90,95,0.4)',
        zIndex: 50, lineHeight: 1,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      ↑
    </button>
  );
}
