'use client';

import Script from 'next/script';
import { useState, useEffect } from 'react';

const GA_ID = 'G-1CS1TLYCRK';

export default function GoogleAnalytics() {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('thermae-cookie-consent') === 'accepted') {
      setConsent(true);
      return;
    }
    const handler = () => setConsent(true);
    window.addEventListener('thermae-consent-accepted', handler);
    return () => window.removeEventListener('thermae-consent-accepted', handler);
  }, []);

  if (!consent) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_ID}', { anonymize_ip: true });
      `}</Script>
    </>
  );
}
