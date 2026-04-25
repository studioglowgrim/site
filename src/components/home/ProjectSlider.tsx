'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { useThemeStore } from '@/store/useThemeStore';
import { useI18n } from '@/i18n/provider';
import { projectsData } from '@/data/projects';

export default function ProjectSlider() {
  const isDark = useThemeStore((s) => s.isDark);
  const { t, locale } = useI18n();
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const getCardWidth = () => {
    const card = scrollRef.current?.querySelector('.project-card') as HTMLElement;
    return card ? card.offsetWidth + 16 : 300; // card + gap-4
  };

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const total = projectsData.length;
    const target = ((index % total) + total) % total;
    setActiveIndex(target);

    if (target === 0 && index >= total) {
      el.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      el.scrollTo({ left: target * getCardWidth(), behavior: 'smooth' });
    }
  };

  // Wheel → card-by-card horizontal snap
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let lastScrollTime = 0;
    const COOLDOWN = 700;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY <= 0) return;

      e.stopPropagation();
      e.preventDefault();

      const now = Date.now();
      if (now - lastScrollTime < COOLDOWN) return;
      lastScrollTime = now;

      setActiveIndex((prev) => {
        const next = prev + 1;
        if (next >= projectsData.length) {
          el.scrollTo({ left: 0, behavior: 'smooth' });
          return 0;
        }
        const cardW = getCardWidth();
        el.scrollTo({ left: next * cardW, behavior: 'smooth' });
        return next;
      });
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const header = sectionRef.current?.querySelector('.slider-header');
      if (header) {
        gsap.from(header, { y: -30, opacity: 0, duration: 0.8, ease: 'power3.out' });
      }
      const cards = scrollRef.current?.querySelectorAll('.project-card');
      if (cards) {
        gsap.from(cards, {
          y: 60, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out', delay: 0.2,
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="h-full flex flex-col px-4 sm:px-6 md:px-12">
      {/* Compact Header */}
      <div className="slider-header flex justify-between items-center pt-6 sm:pt-10 pb-4 sm:pb-6">
        <div className="flex items-baseline gap-4 sm:gap-8">
          <h2
            className={`text-xl sm:text-2xl md:text-3xl font-serif tracking-tight transition-colors ${
              isDark ? 'text-white' : 'text-black'
            }`}
          >
            {t.home.selectedWorks}
          </h2>
          <Link
            href="/project"
            className={`hidden md:inline text-[11px] uppercase tracking-[0.2em] transition-colors ${
              isDark ? 'text-neutral-500 hover:text-white' : 'text-neutral-400 hover:text-black'
            }`}
          >
            {t.home.viewAllProjects} →
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {/* Dots indicator */}
          <div className="hidden sm:flex items-center gap-1.5 mr-4">
            {projectsData.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`rounded-full transition-all duration-300 ${
                  activeIndex === i
                    ? `w-5 h-1.5 ${isDark ? 'bg-white' : 'bg-black'}`
                    : `w-1.5 h-1.5 ${isDark ? 'bg-neutral-700 hover:bg-neutral-500' : 'bg-neutral-300 hover:bg-neutral-500'}`
                }`}
                aria-label={`Poster ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={() => scrollToIndex(activeIndex - 1)}
            className={`w-8 h-8 sm:w-9 sm:h-9 border rounded-full flex items-center justify-center transition-all duration-200 ${
              isDark
                ? 'border-neutral-800 hover:bg-white hover:text-black text-neutral-400 hover:border-white'
                : 'border-neutral-300 hover:bg-black hover:text-white text-neutral-600'
            }`}
            aria-label="Previous"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={() => scrollToIndex(activeIndex + 1)}
            className={`w-8 h-8 sm:w-9 sm:h-9 border rounded-full flex items-center justify-center transition-all duration-200 ${
              isDark
                ? 'border-neutral-800 hover:bg-white hover:text-black text-neutral-400 hover:border-white'
                : 'border-neutral-300 hover:bg-black hover:text-white text-neutral-600'
            }`}
            aria-label="Next"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      {/* Cards — fill remaining height */}
      <div
        ref={scrollRef}
        className="flex-1 flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-4 pb-6 sm:pb-10 items-stretch"
      >
        {projectsData.map((project, i) => (
          <Link
            key={project.id}
            href={`/project/${project.slug}`}
            className={`project-card snap-start shrink-0 group cursor-pointer transition-opacity duration-500 ${
              activeIndex === i ? 'opacity-100' : 'opacity-60 hover:opacity-90'
            }`}
            style={{ width: 'clamp(240px, 28vw, 340px)' }}
          >
            <div
              className={`relative h-full overflow-hidden rounded-sm transition-all duration-500 ${
                isDark ? 'bg-neutral-900' : 'bg-neutral-100'
              } ${activeIndex === i ? 'ring-1 ring-white/10' : ''}`}
            >
              <Image
                src={project.posterImage}
                alt={project.title[locale]}
                fill
                className="object-cover transform group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
                sizes="(max-width: 640px) 55vw, 340px"
              />
              {/* Bottom gradient with title on hover */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-white text-sm sm:text-base font-serif leading-snug">
                  {project.title[locale]}
                </p>
                <p className="text-white/50 text-[10px] uppercase tracking-widest mt-1">
                  {project.meta[locale].split('/')[0]}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile: View All */}
      <div className="md:hidden flex justify-center pb-4">
        <Link
          href="/project"
          className={`text-[10px] uppercase tracking-[0.2em] transition-colors ${
            isDark ? 'text-neutral-500 hover:text-white' : 'text-neutral-400 hover:text-black'
          }`}
        >
          {t.home.viewAllProjects} →
        </Link>
      </div>
    </section>
  );
}
