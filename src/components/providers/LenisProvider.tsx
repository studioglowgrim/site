'use client';

import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom smooth scroll provider that intercepts wheel events
 * and applies eased, butter-smooth scrolling across all pages.
 */
export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const targetScroll = useRef(0);
  const currentScroll = useRef(0);
  const rafRef = useRef<number | null>(null);
  const isAnimating = useRef(false);

  const ease = 0.12; // Lower = smoother/slower, higher = snappier

  const animate = useCallback(() => {
    const diff = targetScroll.current - currentScroll.current;

    if (Math.abs(diff) < 0.5) {
      currentScroll.current = targetScroll.current;
      window.scrollTo(0, currentScroll.current);
      isAnimating.current = false;
      rafRef.current = null;
      return;
    }

    currentScroll.current += diff * ease;
    window.scrollTo(0, currentScroll.current);
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Sync initial scroll position
    currentScroll.current = window.scrollY;
    targetScroll.current = window.scrollY;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetScroll.current = Math.max(0, Math.min(maxScroll, targetScroll.current + e.deltaY));

      if (!isAnimating.current) {
        isAnimating.current = true;
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    // Sync on native scroll (e.g. keyboard, scrollbar drag)
    const handleScroll = () => {
      if (!isAnimating.current) {
        currentScroll.current = window.scrollY;
        targetScroll.current = window.scrollY;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [animate]);

  return <>{children}</>;
}
