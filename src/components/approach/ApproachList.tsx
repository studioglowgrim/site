'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useThemeStore } from '@/store/useThemeStore';
import { useI18n } from '@/i18n/provider';
import { approachesData } from '@/data/approaches';

gsap.registerPlugin(ScrollTrigger);

export default function ApproachList() {
  const isDark = useThemeStore((s) => s.isDark);
  const { t, locale } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header title reveal
      if (headerRef.current) {
        gsap.from(headerRef.current.querySelector('h1'), {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        });
      }

      // Divider line expand
      if (lineRef.current) {
        gsap.from(lineRef.current, {
          width: 0,
          duration: 0.8,
          ease: 'power2.out',
          delay: 0.3,
        });
      }

      // Approach items with ScrollTrigger parallax
      const items = containerRef.current?.querySelectorAll('.approach-item');
      items?.forEach((item, i) => {
        const numberEl = item.querySelector('.approach-number');
        const titleEl = item.querySelector('.approach-title');
        const descEl = item.querySelector('.approach-desc');
        const dividerEl = item.querySelector('.approach-divider');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            end: 'top 40%',
            toggleActions: 'play none none none',
          },
        });

        if (dividerEl) {
          tl.from(dividerEl, {
            width: 0,
            duration: 0.6,
            ease: 'power2.out',
          });
        }

        if (numberEl) {
          tl.from(numberEl, {
            y: 20,
            opacity: 0,
            duration: 0.4,
            ease: 'power3.out',
          }, '-=0.3');
        }

        if (titleEl) {
          tl.from(titleEl, {
            y: 40,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out',
          }, '-=0.2');
        }

        if (descEl) {
          tl.from(descEl, {
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out',
          }, '-=0.4');
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="pt-20 sm:pt-24 pb-20 sm:pb-32 px-4 sm:px-6 md:px-12 max-w-screen-xl mx-auto">
      <header ref={headerRef} className="mb-16 sm:mb-24 md:mb-40">
        <h1
          className={`text-4xl sm:text-5xl md:text-8xl font-serif tracking-tight mb-6 sm:mb-8 whitespace-pre-line transition-colors ${
            isDark ? 'text-white' : 'text-black'
          }`}
        >
          {t.approach.title}
        </h1>
        <div
          ref={lineRef}
          className={`w-24 h-[1px] transition-colors ${isDark ? 'bg-white' : 'bg-black'}`}
        />
      </header>

      <div className="space-y-16 sm:space-y-24 md:space-y-32">
        {approachesData.map((item, index) => (
          <div
            key={index}
            className="approach-item flex flex-col md:flex-row md:items-start md:space-x-16 group"
          >
            {/* Divider */}
            <div
              className={`approach-divider w-full h-[1px] mb-8 sm:mb-10 md:mb-0 md:hidden transition-colors ${
                isDark ? 'bg-neutral-800' : 'bg-neutral-200'
              }`}
            />

            <div className="md:w-1/3 mb-4 sm:mb-6 md:mb-0">
              <span
                className={`approach-number text-[10px] sm:text-xs font-mono block mb-3 sm:mb-4 transition-colors ${
                  isDark ? 'text-neutral-600' : 'text-neutral-400'
                }`}
              >
                0{index + 1}
              </span>
              <h2
                className={`approach-title text-2xl sm:text-3xl md:text-4xl font-serif leading-snug transition-colors ${
                  isDark ? 'text-white' : 'text-black'
                }`}
              >
                {item.title[locale]}
              </h2>
            </div>

            <div className="md:w-2/3 md:pt-10">
              {/* Desktop divider */}
              <div
                className={`approach-divider hidden md:block w-full h-[1px] mb-10 transition-colors ${
                  isDark ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              />
              <p
                className={`approach-desc text-base sm:text-lg md:text-xl leading-relaxed font-light whitespace-pre-line transition-colors ${
                  isDark ? 'text-neutral-400' : 'text-neutral-600'
                }`}
              >
                {item.desc[locale]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
