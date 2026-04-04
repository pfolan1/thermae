'use client';

import { useState } from 'react';

interface Props {
  venueName: string;
  venueCity: string;
}

export default function ShareButton({ venueName, venueCity }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = window.location.href;
    const title = `${venueName} — ${venueCity}`;
    const text = `Check out ${venueName} on Thermae`;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={handleShare}
        style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '16px 20px', borderRadius: '8px',
          background: '#F7F7F7', color: '#222222',
          border: '1px solid #EBEBEB',
          fontSize: '14px', fontWeight: 600,
          cursor: 'pointer', fontFamily: 'inherit',
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3"/>
          <circle cx="6" cy="12" r="3"/>
          <circle cx="18" cy="19" r="3"/>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
        </svg>
        Share
      </button>
      {copied && (
        <div style={{
          position: 'absolute', bottom: 'calc(100% + 8px)', left: '50%',
          transform: 'translateX(-50%)',
          background: '#222222', color: '#fff',
          fontSize: '12px', fontWeight: 600,
          padding: '6px 12px', borderRadius: '6px',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}>
          Link copied!
        </div>
      )}
    </div>
  );
}
