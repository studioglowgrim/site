'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

const SCROLL_COOLDOWN = 900;

interface FullPageScrollProps {
  children: React.ReactNode[];
  showDots?: boolean;
}

export default function FullPageScroll({ children, showDots = true }: FullPageScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentSection = useRef(0);
  const isScrolling = useRef(false);
  const lastScrollTime = useRef(0);
  const [activeSection, setActiveSection] = useState(0);
  const sectionCount = children.length;

  const scrollToSection = useCallback((index: number) => {
    if (index < 0 || index >= sectionCount) return;
    if (!containerRef.current) return;

    const now = Date.now();
    if (now - lastScrollTime.current < SCROLL_COOLDOWN) return;

    isScrolling.current = true;
    lastScrollTime.current = now;
    currentSection.current = index;
    setActiveSection(index);

    const target = index * window.innerHeight;
    containerRef.current.scrollTo({
      top: target,
      behavior: 'smooth',
    });

    setTimeout(() => {
      isScrolling.current = false;
    }, SCROLL_COOLDOWN);
  }, [sectionCount]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling.current) return;
      if (Math.abs(e.deltaY) < 10) return;

      if (e.deltaY > 0) {
        scrollToSection(currentSection.current + 1);
      } else {
        scrollToSection(currentSection.current - 1);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          scrollToSection(currentSection.current + 1);
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          scrollToSection(currentSection.current - 1);
          break;
        case 'Home':
          e.preventDefault();
          scrollToSection(0);
          break;
        case 'End':
          e.preventDefault();
          scrollToSection(sectionCount - 1);
          break;
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const diff = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 50) {
        scrollToSection(currentSection.current + (diff > 0 ? 1 : -1));
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollToSection, sectionCount]);

  return (
    <>
      <div
        ref={containerRef}
        className="fixed inset-0 overflow-y-hidden hide-scrollbar"
      >
        {children.map((child, i) => (
          <section key={i} className="h-screen overflow-hidden">
            {child}
          </section>
        ))}
      </div>

      {showDots && (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
          {Array.from({ length: sectionCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToSection(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeSection === i
                  ? 'bg-white scale-150'
                  : 'bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Section ${i + 1}`}
            />
          ))}
        </div>
      )}
    </>
  );
}
