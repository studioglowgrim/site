'use client';

import { useRef, useEffect } from 'react';
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

  const getCardStep = () => {
    const card = scrollRef.current?.querySelector('.project-card') as HTMLElement;
    return card ? card.offsetWidth + 24 : 260; // card + gap-6
  };

  const scrollPrev = () => {
    scrollRef.current?.scrollBy({ left: -getCardStep(), behavior: 'smooth' });
  };

  const scrollNext = () => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    if (el.scrollLeft >= maxScrollLeft - 5) {
      el.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: getCardStep(), behavior: 'smooth' });
    }
  };

  // Wheel → card-by-card snap
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

      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScrollLeft - 5) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: getCardStep(), behavior: 'smooth' });
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const header = sectionRef.current?.querySelector('.slider-header');
      if (header) gsap.from(header, { y: -20, opacity: 0, duration: 0.6, ease: 'power3.out' });
      const cards = scrollRef.current?.querySelectorAll('.project-card');
      if (cards) gsap.from(cards, { y: 40, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.15 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`h-full flex flex-col justify-center py-10 sm:py-20 px-4 sm:px-6 md:px-12 max-w-screen-2xl mx-auto w-full transition-colors ${
        isDark ? 'border-neutral-900' : 'border-neutral-200'
      }`}
    >
      {/* Header — same pattern as News Update */}
      <div className="slider-header flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 sm:mb-16">
        <h2
          className={`text-2xl sm:text-3xl md:text-5xl font-serif transition-colors ${
            isDark ? 'text-white' : 'text-black'
          }`}
        >
          {t.home.selectedWorks}
        </h2>
        <div className="flex items-center gap-4 sm:gap-6 mt-4 sm:mt-0">
          <Link
            href="/project"
            className={`text-xs sm:text-sm uppercase tracking-widest border-b pb-1 transition-colors ${
              isDark
                ? 'border-neutral-600 hover:text-white hover:border-white'
                : 'border-neutral-400 hover:text-black hover:border-black'
            }`}
          >
            {t.home.viewAllProjects}
          </Link>
          <div className="flex gap-2">
            <button
              onClick={scrollPrev}
              className={`w-10 h-10 sm:w-12 sm:h-12 border rounded-full flex items-center justify-center transition-colors ${
                isDark
                  ? 'border-neutral-800 hover:bg-white hover:text-black text-white'
                  : 'border-neutral-300 hover:bg-black hover:text-white text-black'
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={scrollNext}
              className={`w-10 h-10 sm:w-12 sm:h-12 border rounded-full flex items-center justify-center transition-colors ${
                isDark
                  ? 'border-neutral-800 hover:bg-white hover:text-black text-white'
                  : 'border-neutral-300 hover:bg-black hover:text-white text-black'
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Cards — horizontal scroll */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-6 pb-6"
      >
        {projectsData.map((project) => (
          <Link
            key={project.id}
            href={`/project/${project.slug}`}
            className="project-card snap-start shrink-0 group cursor-pointer"
            style={{ width: 'clamp(180px, 20vw, 260px)' }}
          >
            <div
              className="relative overflow-hidden rounded-sm"
              style={{ aspectRatio: '2/3', maxHeight: '55vh' }}
            >
              <Image
                src={project.posterImage}
                alt={project.title[locale]}
                fill
                className="object-cover transform group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                sizes="280px"
              />
              {/* Hover: bottom gradient + title */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                <h3 className="text-white text-sm sm:text-base font-serif leading-tight drop-shadow-lg">
                  {project.title[locale]}
                </h3>
                {project.subtitle[locale] && (
                  <p className="text-white/60 text-[10px] font-serif italic mt-1">
                    {project.subtitle[locale]}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile: View All */}
      <div className="sm:hidden flex justify-center mt-4">
        <Link
          href="/project"
          className={`text-xs uppercase tracking-widest border-b pb-1 transition-colors ${
            isDark
              ? 'border-neutral-600 text-neutral-400 hover:text-white'
              : 'border-neutral-400 text-neutral-500 hover:text-black'
          }`}
        >
          {t.home.viewAllProjects}
        </Link>
      </div>
    </section>
  );
}
