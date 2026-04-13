import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import { ALL_POSTS } from '@/content/blog';

export const metadata: Metadata = {
  title: 'Blog — Sauna & Wellness Guides',
  description: 'Guides to the best saunas, cold plunges and seaweed baths across the UK, Ireland and Nordics — from beginner contrast therapy guides to city-by-city venue roundups.',
};

const CORAL = '#FF5A5F';

export default function BlogIndexPage() {
  return (
    <>
      <Header />
      <main style={{ maxWidth: '860px', margin: '0 auto', padding: '64px 24px 100px' }}>

        {/* Header */}
        <div style={{ marginBottom: '56px' }}>
          <h1 style={{
            fontFamily: 'var(--font-serif, Georgia, serif)',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 700,
            color: '#222',
            marginBottom: '16px',
            lineHeight: 1.2,
          }}>
            Sauna &amp; Wellness Guides
          </h1>
          <p style={{ fontSize: '16px', color: '#666', lineHeight: 1.6, maxWidth: '580px' }}>
            In-depth guides to the best saunas, cold plunges and seaweed baths across Ireland, the UK and Nordics.
            Written by people who actually go to these places.
          </p>
        </div>

        {/* Post grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {ALL_POSTS.map((post, i) => (
            <article
              key={post.slug}
              style={{
                padding: '28px 0',
                borderBottom: i < ALL_POSTS.length - 1 ? '1px solid #EBEBEB' : 'none',
              }}
            >
              <Link
                href={`/blog/${post.slug}`}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <div style={{ marginBottom: '8px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: CORAL,
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px',
                  }}>
                    {post.keyword}
                  </span>
                  <span style={{ color: '#ddd', margin: '0 8px' }}>·</span>
                  <span style={{ fontSize: '11px', color: '#aaa' }}>{post.date}</span>
                </div>
                <h2 style={{
                  fontFamily: 'var(--font-serif, Georgia, serif)',
                  fontSize: 'clamp(18px, 2.5vw, 22px)',
                  fontWeight: 600,
                  color: '#222',
                  lineHeight: 1.3,
                  marginBottom: '10px',
                }}>
                  {post.title}
                </h2>
                <p style={{
                  fontSize: '15px',
                  color: '#666',
                  lineHeight: 1.6,
                  margin: 0,
                  maxWidth: '640px',
                }}>
                  {post.description}
                </p>
                <div style={{
                  marginTop: '14px',
                  fontSize: '13px',
                  color: CORAL,
                  fontWeight: 600,
                }}>
                  Read guide →
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Footer CTA */}
        <div style={{
          marginTop: '64px',
          padding: '32px',
          background: '#FFF8F8',
          border: '1px solid #FFD6D7',
          borderRadius: '16px',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: 'var(--font-serif, Georgia, serif)',
            fontSize: '18px',
            color: '#222',
            marginBottom: '16px',
          }}>
            Ready to find your sauna?
          </p>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              background: CORAL,
              color: '#fff',
              fontSize: '14px',
              fontWeight: 700,
              padding: '12px 28px',
              borderRadius: '999px',
              textDecoration: 'none',
            }}
          >
            Browse the Directory →
          </Link>
        </div>

      </main>
    </>
  );
}
