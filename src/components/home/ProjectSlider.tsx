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
    return card ? card.offsetWidth + 16 : 260;
  };

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const total = projectsData.length;
    const target = ((index % total) + total) % total;
    setActiveIndex(target);
    el.scrollTo({ left: target * getCardWidth(), behavior: 'smooth' });
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

      setActiveIndex((prev) => {
        const next = prev + 1;
        if (next >= projectsData.length) {
          el.scrollTo({ left: 0, behavior: 'smooth' });
          return 0;
        }
        el.scrollTo({ left: next * getCardWidth(), behavior: 'smooth' });
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
      if (header) gsap.from(header, { y: -20, opacity: 0, duration: 0.6, ease: 'power3.out' });
      const cards = scrollRef.current?.querySelectorAll('.project-card');
      if (cards) gsap.from(cards, { y: 40, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out', delay: 0.15 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="h-full flex flex-col">
      {/* Header — below navbar with breathing room */}
      <div className="slider-header flex justify-between items-center px-4 sm:px-6 md:px-12 pt-20 sm:pt-24 pb-4 sm:pb-6">
        <h2
          className={`text-lg sm:text-xl md:text-2xl font-serif tracking-tight transition-colors ${
            isDark ? 'text-white' : 'text-black'
          }`}
        >
          {t.home.selectedWorks}
        </h2>
        <div className="flex items-center gap-3">
          <Link
            href="/project"
            className={`hidden sm:inline text-[10px] uppercase tracking-[0.2em] transition-colors ${
              isDark ? 'text-neutral-500 hover:text-white' : 'text-neutral-400 hover:text-black'
            }`}
          >
            {t.home.viewAllProjects} →
          </Link>
          <div className="flex gap-1.5">
            <button
              onClick={() => scrollToIndex(activeIndex - 1)}
              className={`w-7 h-7 border rounded-full flex items-center justify-center transition-all ${
                isDark ? 'border-neutral-700 text-neutral-500 hover:bg-white hover:text-black hover:border-white' : 'border-neutral-300 text-neutral-400 hover:bg-black hover:text-white'
              }`}
              aria-label="Previous"
            >
              <ChevronLeft size={12} />
            </button>
            <button
              onClick={() => scrollToIndex(activeIndex + 1)}
              className={`w-7 h-7 border rounded-full flex items-center justify-center transition-all ${
                isDark ? 'border-neutral-700 text-neutral-500 hover:bg-white hover:text-black hover:border-white' : 'border-neutral-300 text-neutral-400 hover:bg-black hover:text-white'
              }`}
              aria-label="Next"
            >
              <ChevronRight size={12} />
            </button>
          </div>
        </div>
      </div>

      {/* Cards — centered vertically, constrained height */}
      <div className="flex-1 flex items-center px-4 sm:px-6 md:px-12 pb-6 sm:pb-10 min-h-0">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-4 w-full"
          style={{ maxHeight: '60vh' }}
        >
          {projectsData.map((project, i) => (
            <Link
              key={project.id}
              href={`/project/${project.slug}`}
              className="project-card snap-start shrink-0 group cursor-pointer"
              style={{ width: 'clamp(200px, 22vw, 280px)' }}
            >
              <div
                className="relative overflow-hidden rounded-sm transition-all duration-500 group-hover:ring-1 group-hover:ring-white/20"
                style={{ aspectRatio: '2/3' }}
              >
                <Image
                  src={project.posterImage}
                  alt={project.title[locale]}
                  fill
                  className="object-cover transform group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                  sizes="280px"
                />
                {/* Hover overlay with title */}
                <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                  <p className="text-white text-xs sm:text-sm font-serif leading-snug">
                    {project.title[locale]}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom dots + mobile link */}
      <div className="flex justify-center items-center gap-4 pb-4 sm:pb-6">
        <div className="flex items-center gap-1.5">
          {projectsData.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`rounded-full transition-all duration-300 ${
                activeIndex === i
                  ? `w-4 h-1 ${isDark ? 'bg-white' : 'bg-black'}`
                  : `w-1 h-1 ${isDark ? 'bg-neutral-700 hover:bg-neutral-500' : 'bg-neutral-300 hover:bg-neutral-500'}`
              }`}
              aria-label={`Poster ${i + 1}`}
            />
          ))}
        </div>
        <Link
          href="/project"
          className={`sm:hidden text-[9px] uppercase tracking-[0.2em] transition-colors ${
            isDark ? 'text-neutral-600 hover:text-white' : 'text-neutral-400 hover:text-black'
          }`}
        >
          {t.home.viewAllProjects}
        </Link>
      </div>
    </section>
  );
}
