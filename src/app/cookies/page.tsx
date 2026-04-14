import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Cookie Policy — Thermae',
  description: 'Cookie policy for Thermae. How we use cookies and how to manage your preferences.',
};

const DARK = '#222222';
const GREY = '#555555';

export default function CookiesPage() {
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
          Cookie Policy
        </h1>
        <p style={{ fontSize: '13px', color: '#aaa', marginBottom: '48px' }}>Effective date: April 2026</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

          <section>
            <h2 style={{ fontFamily: 'var(--font-serif, Georgia, serif)', fontSize: '20px', fontWeight: 600, color: DARK, marginBottom: '12px' }}>
              What Are Cookies
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.75, color: GREY }}>
              Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and understand how visitors use the site. Thermae uses a small number of cookies to provide essential functionality and to understand how the directory is being used.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-serif, Georgia, serif)', fontSize: '20px', fontWeight: 600, color: DARK, marginBottom: '12px' }}>
              Essential Cookies
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.75, color: GREY, marginBottom: '16px' }}>
              Essential cookies are required for the site to function. They cannot be disabled.
            </p>
            <div style={{ background: '#FAFAFA', border: '1px solid #EBEBEB', borderRadius: '12px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #EBEBEB' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: DARK, fontWeight: 600 }}>Cookie</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: DARK, fontWeight: 600 }}>Purpose</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: DARK, fontWeight: 600 }}>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '12px 16px', color: GREY, fontFamily: 'monospace', fontSize: '12px' }}>thermae-cookie-consent</td>
                    <td style={{ padding: '12px 16px', color: GREY }}>Stores your cookie preference</td>
                    <td style={{ padding: '12px 16px', color: GREY }}>1 year</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-serif, Georgia, serif)', fontSize: '20px', fontWeight: 600, color: DARK, marginBottom: '12px' }}>
              Analytics Cookies
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.75, color: GREY, marginBottom: '16px' }}>
              Analytics cookies help us understand how visitors use Thermae. All data collected is anonymised. You can opt out of analytics cookies by selecting &ldquo;Essential Only&rdquo; in our cookie banner.
            </p>
            <div style={{ background: '#FAFAFA', border: '1px solid #EBEBEB', borderRadius: '12px', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #EBEBEB' }}>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: DARK, fontWeight: 600 }}>Cookie</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: DARK, fontWeight: 600 }}>Purpose</th>
                    <th style={{ padding: '12px 16px', textAlign: 'left', color: DARK, fontWeight: 600 }}>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #EBEBEB' }}>
                    <td style={{ padding: '12px 16px', color: GREY, fontFamily: 'monospace', fontSize: '12px' }}>_ga</td>
                    <td style={{ padding: '12px 16px', color: GREY }}>Google Analytics — distinguishes users</td>
                    <td style={{ padding: '12px 16px', color: GREY }}>2 years</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px 16px', color: GREY, fontFamily: 'monospace', fontSize: '12px' }}>_gid</td>
                    <td style={{ padding: '12px 16px', color: GREY }}>Google Analytics — distinguishes users</td>
                    <td style={{ padding: '12px 16px', color: GREY }}>24 hours</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-serif, Georgia, serif)', fontSize: '20px', fontWeight: 600, color: DARK, marginBottom: '12px' }}>
              Managing Your Preferences
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.75, color: GREY, marginBottom: '12px' }}>
              When you first visit Thermae, you will be shown a cookie banner where you can choose &ldquo;Accept Analytics&rdquo; or &ldquo;Essential Only&rdquo;. Your preference is saved for one year.
            </p>
            <p style={{ fontSize: '15px', lineHeight: 1.75, color: GREY, marginBottom: '12px' }}>
              To change your cookie preference, clear your browser&apos;s local storage for thermae.app, or use your browser&apos;s built-in cookie management tools.
            </p>
            <p style={{ fontSize: '15px', lineHeight: 1.75, color: GREY }}>
              You can also opt out of Google Analytics across all websites using the{' '}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: '#FF5A5F', textDecoration: 'none', fontWeight: 600 }}>
                Google Analytics Opt-out Browser Add-on
              </a>.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-serif, Georgia, serif)', fontSize: '20px', fontWeight: 600, color: DARK, marginBottom: '12px' }}>
              Contact
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.75, color: GREY }}>
              Questions about cookies? Email us at{' '}
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
