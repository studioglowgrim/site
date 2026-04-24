'use client';

import { useEffect, useRef, useCallback } from 'react';

/**
 * Premium smooth scroll — intercepts wheel events and applies
 * buttery-smooth inertia scrolling with fast response.
 */
export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const targetScroll = useRef(0);
  const currentScroll = useRef(0);
  const rafRef = useRef<number | null>(null);
  const velocity = useRef(0);

  const lerp = useCallback((start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  }, []);

  const animate = useCallback(() => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    targetScroll.current = Math.max(0, Math.min(maxScroll, targetScroll.current));

    // Fast lerp factor for snappy response
    currentScroll.current = lerp(currentScroll.current, targetScroll.current, 0.08);

    // Apply velocity damping for inertia feel
    velocity.current *= 0.92;

    const diff = Math.abs(targetScroll.current - currentScroll.current);

    if (diff < 0.5) {
      currentScroll.current = targetScroll.current;
      window.scrollTo(0, Math.round(currentScroll.current));
      rafRef.current = null;
      return;
    }

    window.scrollTo(0, Math.round(currentScroll.current));
    rafRef.current = requestAnimationFrame(animate);
  }, [lerp]);

  const startAnimation = useCallback(() => {
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(animate);
    }
  }, [animate]);

  useEffect(() => {
    currentScroll.current = window.scrollY;
    targetScroll.current = window.scrollY;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      // Scale wheel delta for consistent feel across devices
      // Multiply for faster scroll response
      const delta = e.deltaY * 1.5;
      velocity.current += delta;
      targetScroll.current += delta;

      startAnimation();
    };

    // Keyboard scrolling
    const handleKeyDown = (e: KeyboardEvent) => {
      const scrollAmount = window.innerHeight * 0.8;
      let delta = 0;

      switch (e.key) {
        case 'ArrowDown':
          delta = 100;
          break;
        case 'ArrowUp':
          delta = -100;
          break;
        case 'PageDown':
        case ' ':
          e.preventDefault();
          delta = scrollAmount;
          break;
        case 'PageUp':
          e.preventDefault();
          delta = -scrollAmount;
          break;
        case 'Home':
          e.preventDefault();
          targetScroll.current = 0;
          startAnimation();
          return;
        case 'End':
          e.preventDefault();
          targetScroll.current = document.documentElement.scrollHeight - window.innerHeight;
          startAnimation();
          return;
        default:
          return;
      }

      targetScroll.current += delta;
      startAnimation();
    };

    // Touch support for mobile
    let touchStartY = 0;
    let touchLastY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchLastY = touchStartY;
      // Sync to current position
      currentScroll.current = window.scrollY;
      targetScroll.current = window.scrollY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const delta = touchLastY - touchY;
      touchLastY = touchY;

      targetScroll.current += delta * 1.5;
      startAnimation();
    };

    // Sync on resize
    const handleResize = () => {
      currentScroll.current = window.scrollY;
      targetScroll.current = window.scrollY;
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [animate, startAnimation]);

  return <>{children}</>;
}
