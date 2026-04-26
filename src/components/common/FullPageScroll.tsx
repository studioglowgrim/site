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

  // Scroll to section using actual DOM element position (not calculated)
  const scrollToSection = useCallback((index: number) => {
    if (index < 0 || index >= sectionCount) return;
    const container = containerRef.current;
    if (!container) return;

    const now = Date.now();
    if (now - lastScrollTime.current < SCROLL_COOLDOWN) return;

    isScrolling.current = true;
    lastScrollTime.current = now;
    currentSection.current = index;
    setActiveSection(index);

    // Use actual section element position instead of calculated offset
    const sections = container.querySelectorAll(':scope > section');
    const targetSection = sections[index] as HTMLElement;
    if (targetSection) {
      container.scrollTo({
        top: targetSection.offsetTop,
        behavior: 'smooth',
      });
    }

    setTimeout(() => {
      isScrolling.current = false;
    }, SCROLL_COOLDOWN);
  }, [sectionCount]);

  // Snap to nearest section after any scroll settles (catches iOS misalignment)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let snapTimer: ReturnType<typeof setTimeout>;

    const handleScrollEnd = () => {
      clearTimeout(snapTimer);
      snapTimer = setTimeout(() => {
        if (isScrolling.current) return;

        const sections = container.querySelectorAll(':scope > section');
        const scrollTop = container.scrollTop;
        let closest = 0;
        let minDist = Infinity;

        sections.forEach((section, i) => {
          const el = section as HTMLElement;
          const dist = Math.abs(el.offsetTop - scrollTop);
          if (dist < minDist) {
            minDist = dist;
            closest = i;
          }
        });

        // Only snap if misaligned by more than 5px
        if (minDist > 5 && closest !== currentSection.current) {
          currentSection.current = closest;
          setActiveSection(closest);
          const target = sections[closest] as HTMLElement;
          container.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
        } else if (minDist > 5) {
          const target = sections[closest] as HTMLElement;
          container.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
        }
      }, 150);
    };

    container.addEventListener('scroll', handleScrollEnd, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScrollEnd);
      clearTimeout(snapTimer);
    };
  }, []);

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
    let touchStartTime = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const diff = touchStartY - e.changedTouches[0].clientY;
      const elapsed = Date.now() - touchStartTime;
      // Quick swipe (< 400ms) with enough distance (> 30px)
      // Or slow drag with larger distance (> 80px)
      const isQuickSwipe = elapsed < 400 && Math.abs(diff) > 30;
      const isSlowDrag = Math.abs(diff) > 80;
      if (isQuickSwipe || isSlowDrag) {
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

  // Re-snap on resize (orientation change, address bar toggle)
  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      if (!container) return;
      const sections = container.querySelectorAll(':scope > section');
      const target = sections[currentSection.current] as HTMLElement;
      if (target) {
        container.scrollTo({ top: target.offsetTop, behavior: 'auto' });
      }
    };

    window.addEventListener('resize', handleResize);
    // Also handle iOS visual viewport resize (address bar)
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
    }
    return () => {
      window.removeEventListener('resize', handleResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="fixed inset-0 overflow-y-hidden hide-scrollbar"
      >
        {children.map((child, i) => (
          <section key={i} className="h-dvh overflow-hidden">
            {child}
          </section>
        ))}
      </div>

      {showDots && (
        <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
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
