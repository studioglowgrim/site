'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useThemeStore } from '@/store/useThemeStore';
import { useI18n } from '@/i18n/provider';
import { newsData } from '@/data/news';

export default function NewsSection() {
  const isDark = useThemeStore((s) => s.isDark);
  const { t, locale } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  // GSAP entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          x: -40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.2,
        });
      }

      const cards = sectionRef.current?.querySelectorAll('.news-card');
      if (cards) {
        gsap.from(cards, {
          y: 60,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.4,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`h-full flex flex-col justify-center py-4 sm:py-10 md:py-20 border-t px-4 sm:px-6 md:px-12 max-w-screen-2xl mx-auto w-full transition-colors ${
        isDark ? 'border-neutral-900' : 'border-neutral-200'
      }`}
    >
      <div className="flex items-center justify-between mb-3 sm:mb-8 md:mb-16 pt-12 sm:pt-0">
        <h2
          ref={titleRef}
          className={`text-xl sm:text-3xl md:text-5xl font-serif transition-colors ${
            isDark ? 'text-white' : 'text-black'
          }`}
        >
          {t.home.newsUpdate}
        </h2>
        <button
          className={`hidden sm:inline text-xs sm:text-sm uppercase tracking-widest border-b pb-1 transition-colors ${
            isDark
              ? 'border-neutral-600 hover:text-white hover:border-white'
              : 'border-neutral-400 hover:text-black hover:border-black'
          }`}
        >
          {t.home.viewAllNews}
        </button>
      </div>

      <div className="flex-1 min-h-0 flex items-start sm:items-center">
      <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-3 sm:gap-6 md:gap-8 hide-scrollbar snap-x snap-mandatory md:snap-none pb-4 md:pb-0 w-full">
        {newsData.map((news) => (
          <a
            href={news.link}
            key={news.id}
            className={`news-card snap-center shrink-0 w-[70vw] sm:w-[80vw] md:w-auto group flex flex-col border transition-colors overflow-hidden ${
              isDark
                ? 'border-neutral-800 hover:border-neutral-500 bg-[#0a0a0a]'
                : 'border-neutral-200 hover:border-neutral-400 bg-white'
            }`}
          >
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={news.image}
                alt={news.title[locale]}
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 640px) 75vw, (max-width: 768px) 80vw, 33vw"
              />
            </div>
            <div className="p-3 sm:p-4 md:p-6 flex-1 flex flex-col">
              <span
                className={`text-[9px] sm:text-[10px] uppercase tracking-[0.2em] mb-2 sm:mb-3 transition-colors ${
                  isDark ? 'text-neutral-500' : 'text-neutral-400'
                }`}
              >
                {news.tag[locale]}
              </span>
              <h3
                className={`text-base sm:text-lg font-serif mb-2 sm:mb-3 transition-colors ${
                  isDark ? 'text-white' : 'text-black'
                }`}
              >
                {news.title[locale]}
              </h3>
              <p
                className={`text-xs sm:text-sm leading-relaxed flex-1 transition-colors line-clamp-3 ${
                  isDark ? 'text-neutral-500' : 'text-neutral-600'
                }`}
              >
                {news.desc[locale]}
              </p>
            </div>
          </a>
        ))}
      </div>
      </div>
    </section>
  );
}
