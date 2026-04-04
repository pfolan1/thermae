'use client';

import { useRef, useState, useEffect, useCallback } from 'react';

interface Props {
  children: React.ReactNode;
  gap?: number;
}

export default function ScrollableRow({ children, gap = 6 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    update();
    el.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => { el.removeEventListener('scroll', update); ro.disconnect(); };
  }, [update]);

  function scroll(dir: 'left' | 'right') {
    ref.current?.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' });
  }

  const arrowStyle = (visible: boolean): React.CSSProperties => ({
    display: visible ? 'flex' : 'none',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: '#fff',
    border: '1px solid #EBEBEB',
    boxShadow: '0 1px 6px rgba(0,0,0,0.10)',
    cursor: 'pointer',
    flexShrink: 0,
    fontSize: '14px',
    color: '#222',
    fontFamily: 'inherit',
    // Hide on touch screens
    pointerEvents: 'auto',
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      {/* Left arrow — hidden on mobile via CSS class */}
      <button
        className="scroll-arrow"
        onClick={() => scroll('left')}
        aria-label="Scroll left"
        style={arrowStyle(canScrollLeft)}
      >
        ‹
      </button>

      <div
        ref={ref}
        className="no-scrollbar"
        style={{ display: 'flex', gap: `${gap}px`, overflowX: 'auto', flex: 1 }}
      >
        {children}
      </div>

      {/* Right arrow — hidden on mobile via CSS class */}
      <button
        className="scroll-arrow"
        onClick={() => scroll('right')}
        aria-label="Scroll right"
        style={arrowStyle(canScrollRight)}
      >
        ›
      </button>
    </div>
  );
}
