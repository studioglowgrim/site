'use client';

import { useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { useThemeStore } from '@/store/useThemeStore';
import { useI18n } from '@/i18n/provider';
import { projectsData } from '@/data/projects';

export default function ProjectSlider() {
  const isDark = useThemeStore((s) => s.isDark);
  const { t, locale } = useI18n();
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -400, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 400, behavior: 'smooth' });
  };

  // Convert vertical wheel to card-by-card horizontal snap (infinite forward loop)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let lastScrollTime = 0;
    const COOLDOWN = 750;

    const handleWheel = (e: WheelEvent) => {
      // Only handle forward scrolling (scroll down = next card)
      if (e.deltaY <= 0) return;

      e.stopPropagation();
      e.preventDefault();

      const now = Date.now();
      if (now - lastScrollTime < COOLDOWN) return;
      lastScrollTime = now;

      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      const atEnd = el.scrollLeft >= maxScrollLeft - 5;

      if (atEnd) {
        // Loop back to start
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        // Snap one card forward
        const card = el.querySelector('.project-card') as HTMLElement;
        const cardWidth = card ? card.offsetWidth + 12 : 300; // card + gap-3 (12px)
        el.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  // GSAP entrance: title + cards stagger
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          x: -60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.1,
        });
      }

      const cards = scrollRef.current?.querySelectorAll('.project-card');
      if (cards) {
        gsap.from(cards, {
          y: 80,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.3,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="h-full flex flex-col justify-center py-10 sm:py-20 pl-4 sm:pl-6 md:pl-12">
      {/* Header */}
      <div className="flex justify-between items-end pr-4 sm:pr-6 md:pr-12 mb-6 sm:mb-12">
        <h2
          ref={titleRef}
          className={`text-2xl sm:text-3xl md:text-5xl font-serif transition-colors ${
            isDark ? 'text-white' : 'text-black'
          }`}
        >
          {t.home.selectedWorks}
        </h2>
        <div className="flex items-center space-x-3 sm:space-x-6">
          <Link
            href="/project"
            className={`hidden md:flex text-sm uppercase tracking-widest border-b pb-1 transition-colors ${
              isDark
                ? 'border-neutral-600 text-neutral-300 hover:text-white hover:border-white'
                : 'border-neutral-400 text-neutral-600 hover:text-black hover:border-black'
            }`}
          >
            {t.home.viewAllProjects}
          </Link>
          <div className="flex gap-2">
            <button
              onClick={scrollLeft}
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
              onClick={scrollRight}
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

      {/* Cards */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-3 pr-4 sm:pr-6 md:pr-12 pb-6 sm:pb-10"
      >
        {projectsData.map((project) => (
          <Link
            key={project.id}
            href={`/project/${project.slug}`}
            className="project-card snap-center shrink-0 w-[55vw] sm:w-[50vw] md:w-[320px] lg:w-[380px] group cursor-pointer"
          >
            <div
              className={`relative aspect-[2/3] max-h-[50vh] overflow-hidden transition-colors ${
                isDark ? 'bg-neutral-900' : 'bg-neutral-200'
              }`}
            >
              <Image
                src={project.posterImage}
                alt={project.title[locale]}
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes="(max-width: 640px) 55vw, (max-width: 768px) 50vw, 380px"
              />
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile: View All */}
      <div className="md:hidden flex justify-center mt-4">
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
