'use client';

import HeroSection from '@/components/home/HeroSection';
import ProjectSlider from '@/components/home/ProjectSlider';
import NewsSection from '@/components/home/NewsSection';
import ContactSection from '@/components/contact/ContactSection';
import Footer from '@/components/common/Footer';
import FullPageScroll from '@/components/common/FullPageScroll';
import { useThemeStore } from '@/store/useThemeStore';

export default function HomePage() {
  const isDark = useThemeStore((s) => s.isDark);

  return (
    <FullPageScroll>
      <HeroSection />
      <ProjectSlider />
      <NewsSection />
      <div
        className={`h-full border-t flex flex-col transition-colors ${isDark ? 'border-neutral-900' : 'border-neutral-200'}`}
      >
        <div className="flex-1 flex flex-col justify-center py-20 w-full">
          <ContactSection />
        </div>
        <Footer />
      </div>
    </FullPageScroll>
  );
}
