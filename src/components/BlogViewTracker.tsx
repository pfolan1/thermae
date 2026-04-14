'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

export default function BlogViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    trackEvent('blog_view', { slug });
  }, [slug]);
  return null;
}
