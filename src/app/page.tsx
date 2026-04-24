'use client';

import HeroSection from '@/components/home/HeroSection';
import ProjectSlider from '@/components/home/ProjectSlider';
import NewsSection from '@/components/home/NewsSection';
import ContactSection from '@/components/contact/ContactSection';
import Footer from '@/components/common/Footer';
import { useThemeStore } from '@/store/useThemeStore';
import { useEffect, useRef, useCallback, useState } from 'react';

const SECTION_COUNT = 4;
const SCROLL_COOLDOWN = 900; // ms between scroll events

export default function HomePage() {
  const isDark = useThemeStore((s) => s.isDark);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentSection = useRef(0);
  const isScrolling = useRef(false);
  const lastScrollTime = useRef(0);
  const [activeSection, setActiveSection] = useState(0);

  const scrollToSection = useCallback((index: number) => {
    if (index < 0 || index >= SECTION_COUNT) return;
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

      const delta = e.deltaY;
      if (Math.abs(delta) < 10) return;

      if (delta > 0) {
        scrollToSection(currentSection.current + 1);
      } else {
        scrollToSection(currentSection.current - 1);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        scrollToSection(currentSection.current + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        scrollToSection(currentSection.current - 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        scrollToSection(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        scrollToSection(SECTION_COUNT - 1);
      }
    };

    // Touch support
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          scrollToSection(currentSection.current + 1);
        } else {
          scrollToSection(currentSection.current - 1);
        }
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
  }, [scrollToSection]);

  return (
    <>
      <div
        ref={containerRef}
        className="fixed inset-0 overflow-y-hidden hide-scrollbar"
      >
        {/* Section 0: Hero */}
        <section className="h-screen">
          <HeroSection />
        </section>

        {/* Section 1: Selected Works */}
        <section className="h-screen">
          <ProjectSlider />
        </section>

        {/* Section 2: News */}
        <section className="h-screen">
          <NewsSection />
        </section>

        {/* Section 3: Contact + Footer */}
        <section
          className={`h-screen border-t flex flex-col transition-colors ${isDark ? 'border-neutral-900' : 'border-neutral-200'}`}
        >
          <div className="flex-1 flex flex-col justify-center py-20 w-full">
            <ContactSection />
          </div>
          <Footer />
        </section>
      </div>

      {/* Section dots indicator */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {Array.from({ length: SECTION_COUNT }).map((_, i) => (
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
    </>
  );
}
