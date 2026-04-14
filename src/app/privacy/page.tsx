import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy — Thermae',
  description: 'Privacy policy for Thermae, Europe\'s dedicated sauna and wellness directory. How we collect and use data.',
};

const DARK = '#222222';
const GREY = '#555555';

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main style={{ maxWidth: '720px', margin: '0 auto', padding: '64px 24px 100px' }}>
        <h1 style={{
          fontFamily: 'var(--font-serif, Georgia, serif)',
          fontSize: 'clamp(28px, 4vw, 40px)',
          fontWeight: 700,
          color: DARK,
          marginBottom: '8px',
          lineHeight: 1.2,
        }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: '13px', color: '#aaa', marginBottom: '48px' }}>Effective date: April 2026</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

          <section>
            <h2 style={{ fontFamily: 'var(--font-serif, Georgia, serif)', fontSize: '20px', fontWeight: 600, color: DARK, marginBottom: '12px' }}>
              What We Collect
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.75, color: GREY, marginBottom: '12px' }}>
              We collect anonymous usage data via Google Analytics to understand how visitors use Thermae and to help us improve the directory. This data is anonymised and cannot be used to identify individual visitors.
            </p>
            <p style={{ fontSize: '15px', lineHeight: 1.75, color: GREY }}>
              When you submit a venue suggestion via our submit form, we collect the information you provide (venue name, location, contact details) via Formspree. This information is used solely to process and evaluate your venue submission.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-serif, Georgia, serif)', fontSize: '20px', fontWeight: 600, color: DARK, marginBottom: '12px' }}>
              How We Use Data
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.75, color: GREY, marginBottom: '12px' }}>
              Anonymous analytics data is used to understand which parts of the directory are most useful, which countries and cities attract the most interest, and how to improve the overall experience.
            </p>
            <p style={{ fontSize: '15px', lineHeight: 1.75, color: GREY }}>
              We do not sell personal data. We do not use data for advertising targeting. We do not store personal data on our own servers.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-serif, Georgia, serif)', fontSize: '20px', fontWeight: 600, color: DARK, marginBottom: '12px' }}>
              Third-Party Processors
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.75, color: GREY, marginBottom: '12px' }}>
              <strong>Google Analytics:</strong> We use Google Analytics 4 with IP anonymisation enabled. Google Analytics processes anonymised usage data on our behalf. You can opt out via our cookie banner.
            </p>
            <p style={{ fontSize: '15px', lineHeight: 1.75, color: GREY }}>
              <strong>Formspree:</strong> Venue submission data is processed by Formspree. Please review{' '}
              <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: '#FF5A5F', textDecoration: 'none', fontWeight: 600 }}>
                Formspree&apos;s privacy policy
              </a>{' '}for details of how they handle submitted data.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-serif, Georgia, serif)', fontSize: '20px', fontWeight: 600, color: DARK, marginBottom: '12px' }}>
              Cookies
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.75, color: GREY }}>
              We use essential cookies for site functionality and optional Google Analytics cookies for anonymous usage tracking. You can manage your cookie preferences via our cookie banner. See our{' '}
              <a href="/cookies" style={{ color: '#FF5A5F', textDecoration: 'none', fontWeight: 600 }}>
                Cookie Policy
              </a>{' '}for full details.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-serif, Georgia, serif)', fontSize: '20px', fontWeight: 600, color: DARK, marginBottom: '12px' }}>
              Your Rights
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.75, color: GREY, marginBottom: '12px' }}>
              We comply with GDPR and UK data protection law. You have the right to access, correct or delete any personal data we hold. Since we do not store personal data on our servers, most requests can be fulfilled by opting out of Google Analytics.
            </p>
            <p style={{ fontSize: '15px', lineHeight: 1.75, color: GREY }}>
              For any privacy requests or questions, contact us at{' '}
              <a href="mailto:hello@thermae.app" style={{ color: '#FF5A5F', textDecoration: 'none', fontWeight: 600 }}>
                hello@thermae.app
              </a>
            </p>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
}
