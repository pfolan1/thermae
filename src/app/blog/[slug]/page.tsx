import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import BlogViewTracker from '@/components/BlogViewTracker';
import { ALL_POSTS, getPostBySlug } from '@/content/blog';

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return ALL_POSTS.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: [post.keyword, 'sauna', 'wellness', 'thermae'],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.dateISO,
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const CORAL = '#FF5A5F';

  return (
    <>
      <Header />
      <BlogViewTracker slug={post.slug} />
      <main style={{ maxWidth: '720px', margin: '0 auto', padding: '48px 24px 100px' }}>

        {/* Breadcrumb */}
        <nav style={{ marginBottom: '36px' }}>
          <Link href="/blog" style={{ fontSize: '13px', color: '#aaa', textDecoration: 'none' }}>
            ← All guides
          </Link>
        </nav>

        {/* Post header */}
        <header style={{ marginBottom: '48px' }}>
          <div style={{ marginBottom: '16px' }}>
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
            <time dateTime={post.dateISO} style={{ fontSize: '11px', color: '#aaa' }}>
              {post.date}
            </time>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-serif, Georgia, serif)',
            fontSize: 'clamp(26px, 4vw, 38px)',
            fontWeight: 700,
            color: '#222',
            lineHeight: 1.2,
            marginBottom: '20px',
            letterSpacing: '-0.3px',
          }}>
            {post.title}
          </h1>
          <p style={{
            fontSize: '17px',
            color: '#666',
            lineHeight: 1.65,
            fontStyle: 'italic',
            borderLeft: `3px solid ${CORAL}`,
            paddingLeft: '16px',
            margin: 0,
          }}>
            {post.description}
          </p>
        </header>

        <hr style={{ border: 'none', borderTop: '1px solid #EBEBEB', marginBottom: '48px' }} />

        {/* Post content */}
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <hr style={{ border: 'none', borderTop: '1px solid #EBEBEB', margin: '48px 0' }} />

        {/* Footer CTA */}
        <div style={{
          background: '#FFF8F8',
          border: '1px solid #FFD6D7',
          borderRadius: '16px',
          padding: '32px',
          textAlign: 'center',
          marginBottom: '48px',
        }}>
          <p style={{
            fontFamily: 'var(--font-serif, Georgia, serif)',
            fontSize: '18px',
            color: '#222',
            marginBottom: '8px',
          }}>
            Find sauna venues near you
          </p>
          <p style={{ fontSize: '14px', color: '#888', marginBottom: '20px' }}>
            Browse Europe&apos;s most complete directory of saunas, cold plunges and seaweed baths.
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
            Browse Thermae →
          </Link>
        </div>

        {/* Other posts */}
        <div>
          <h3 style={{
            fontFamily: 'var(--font-serif, Georgia, serif)',
            fontSize: '18px',
            fontWeight: 600,
            color: '#222',
            marginBottom: '20px',
          }}>
            More guides
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {ALL_POSTS.filter(p => p.slug !== post.slug).slice(0, 4).map((p, i, arr) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                style={{
                  display: 'block',
                  padding: '16px 0',
                  borderBottom: i < arr.length - 1 ? '1px solid #EBEBEB' : 'none',
                  textDecoration: 'none',
                }}
              >
                <div style={{ fontSize: '11px', color: CORAL, fontWeight: 600, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                  {p.keyword}
                </div>
                <div style={{ fontSize: '15px', color: '#222', fontWeight: 500, lineHeight: 1.4 }}>
                  {p.title}
                </div>
              </Link>
            ))}
          </div>
        </div>

      </main>
    </>
  );
}
