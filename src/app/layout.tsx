import type { Metadata } from 'next';
import { DM_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import CookieBanner from '@/components/CookieBanner';
import WellnessAssistant from '@/components/WellnessAssistant';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-serif',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://thermae.app'),
  title: {
    default: 'Thermae — Nordic Sauna & Cold Plunge Directory',
    template: '%s | Thermae',
  },
  description:
    "Discover the world's finest saunas, cold plunges, hot springs, lagoons and seaweed baths. Curated listings across the UK, Ireland, Iceland and Scandinavia.",
  keywords: [
    'sauna', 'cold plunge', 'bathhouse', 'wellness', 'ice bath',
    'Finnish sauna', 'Nordic spa', 'thermae', 'contrast therapy',
    'hot spring', 'geothermal', 'lagoon', 'Iceland spa', 'seaweed bath',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Thermae',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Thermae — Sauna & Cold Plunge Directory' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${dmSans.variable} ${playfair.variable} ${dmSans.className}`}>
        <GoogleAnalytics />
        {children}
        <Footer />
        <CookieBanner />
        <WellnessAssistant />
      </body>
    </html>
  );
}
