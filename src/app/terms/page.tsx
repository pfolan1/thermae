import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms and Conditions — Thermae',
  description: 'Terms and conditions for using Thermae, Europe\'s dedicated sauna and wellness directory.',
};

const DARK = '#222222';
const GREY = '#555555';

export default function TermsPage() {
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
          Terms and Conditions
        </h1>
        <p style={{ fontSize: '13px', color: '#aaa', marginBottom: '48px' }}>Effective date: April 2026</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

          <section>
            <h2 style={{ fontFamily: 'var(--font-serif, Georgia, serif)', fontSize: '20px', fontWeight: 600, color: DARK, marginBottom: '12px' }}>
              About Thermae
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.75, color: GREY, marginBottom: '12px' }}>
              Thermae is a directory service. We list sauna, cold plunge, seaweed bath and contrast therapy venues across the UK, Ireland and Nordics. Our listings are compiled in good faith from publicly available information and direct venue submissions.
            </p>
            <p style={{ fontSize: '15px', lineHeight: 1.75, color: GREY }}>
              We cannot guarantee the accuracy of venue details, prices or opening hours. Venues change their details, hours and pricing regularly. Users should verify venue details directly with the venue before visiting.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-serif, Georgia, serif)', fontSize: '20px', fontWeight: 600, color: DARK, marginBottom: '12px' }}>
              Directory Content
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.75, color: GREY, marginBottom: '12px' }}>
              All directory content, editorial text, and descriptions are copyright Thermae 2026. You may not reproduce or republish our content without permission.
            </p>
            <p style={{ fontSize: '15px', lineHeight: 1.75, color: GREY }}>
              We reserve the right to update listings, add new venues, and remove venues at any time and without notice. Venues may be removed if we receive evidence that they have closed, changed significantly, or if we are unable to verify their details.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-serif, Georgia, serif)', fontSize: '20px', fontWeight: 600, color: DARK, marginBottom: '12px' }}>
              Featured Listings
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.75, color: GREY }}>
              Featured listings are commercial arrangements between Thermae and venue operators. Featured venues appear prominently in our directory. The editorial integrity of our non-featured listings is not affected by commercial arrangements.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-serif, Georgia, serif)', fontSize: '20px', fontWeight: 600, color: DARK, marginBottom: '12px' }}>
              Venue Submissions
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.75, color: GREY }}>
              By submitting a venue suggestion, you confirm that you have the right to share the information provided and that the information is accurate to the best of your knowledge. We reserve the right to edit, decline or remove any submitted venue listing.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-serif, Georgia, serif)', fontSize: '20px', fontWeight: 600, color: DARK, marginBottom: '12px' }}>
              Limitation of Liability
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.75, color: GREY }}>
              Thermae is provided as an information service. We are not liable for any loss, damage or inconvenience arising from reliance on information in our directory. Always check directly with venues before travelling or booking.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-serif, Georgia, serif)', fontSize: '20px', fontWeight: 600, color: DARK, marginBottom: '12px' }}>
              Governing Law
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.75, color: GREY }}>
              These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: 'var(--font-serif, Georgia, serif)', fontSize: '20px', fontWeight: 600, color: DARK, marginBottom: '12px' }}>
              Contact
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.75, color: GREY }}>
              Questions about these terms? Email us at{' '}
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
