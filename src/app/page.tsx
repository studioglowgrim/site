'use client';

import HeroSection from '@/components/home/HeroSection';
import ProjectSlider from '@/components/home/ProjectSlider';
import NewsSection from '@/components/home/NewsSection';
import ContactSection from '@/components/contact/ContactSection';
import Footer from '@/components/common/Footer';
import { useThemeStore } from '@/store/useThemeStore';
import { useEffect } from 'react';

export default function HomePage() {
  const isDark = useThemeStore((s) => s.isDark);

  // Prevent body from scrolling when snap container is active
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      className="fixed inset-0 overflow-y-auto hide-scrollbar"
      style={{
        scrollSnapType: 'y mandatory',
        scrollBehavior: 'smooth',
      }}
    >
      {/* Section 1: Hero */}
      <section className="h-screen" style={{ scrollSnapAlign: 'start' }}>
        <HeroSection />
      </section>

      {/* Section 2: Selected Works */}
      <section className="h-screen" style={{ scrollSnapAlign: 'start' }}>
        <ProjectSlider />
      </section>

      {/* Section 3: News */}
      <section className="h-screen" style={{ scrollSnapAlign: 'start' }}>
        <NewsSection />
      </section>

      {/* Section 4: Contact + Footer */}
      <section
        className={`h-screen border-t flex flex-col transition-colors ${isDark ? 'border-neutral-900' : 'border-neutral-200'}`}
        style={{ scrollSnapAlign: 'start' }}
      >
        <div className="flex-1 flex flex-col justify-center py-20 w-full">
          <ContactSection />
        </div>
        <Footer />
      </section>
    </div>
  );
}
