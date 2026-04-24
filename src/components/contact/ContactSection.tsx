'use client';

import { useRef, useEffect } from 'react';
import { Mail, MapPin, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { useThemeStore } from '@/store/useThemeStore';
import { useI18n } from '@/i18n/provider';

export default function ContactSection({ isPage = false }: { isPage?: boolean }) {
  const isDark = useThemeStore((s) => s.isDark);
  const { t } = useI18n();
  const sectionRef = useRef<HTMLDivElement>(null);

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const title = sectionRef.current?.querySelector('.contact-title');
      const items = sectionRef.current?.querySelectorAll('.contact-item');

      if (title) {
        gsap.from(title, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.2,
        });
      }

      if (items) {
        gsap.from(items, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: 'power3.out',
          delay: 0.5,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`${isPage ? 'min-h-[80vh] pt-24' : 'h-full'} flex flex-col px-4 sm:px-6 md:px-12 max-w-screen-xl mx-auto w-full`}
    >
      <header className="mb-8 sm:mb-12 md:mb-20">
        <h1
          className={`contact-title text-4xl sm:text-5xl md:text-8xl font-serif tracking-tight whitespace-pre-line transition-colors ${
            isDark ? 'text-white' : 'text-black'
          }`}
        >
          {t.contact.title}
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 flex-grow">
        {/* Contact Info */}
        <div className="flex flex-col justify-center space-y-10 sm:space-y-16">
          <div className="contact-item group">
            <p className="text-[10px] sm:text-xs text-neutral-500 uppercase tracking-widest mb-3 sm:mb-4 flex items-center">
              <Mail className="mr-2" size={14} /> {t.contact.email}
            </p>
            <a
              href="mailto:contact@glowgrim.com"
              className={`text-xl sm:text-2xl md:text-4xl font-light transition-colors flex items-center relative inline-block ${
                isDark ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-600'
              }`}
            >
              <span className="break-all sm:break-normal">contact@glowgrim.com</span>
              <ArrowUpRight className="ml-2 sm:ml-4 opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300 shrink-0" size={20} />
            </a>
          </div>

          <div className="contact-item">
            <p className="text-[10px] sm:text-xs text-neutral-500 uppercase tracking-widest mb-3 sm:mb-4 flex items-center">
              <MapPin className="mr-2" size={14} /> {t.contact.address}
            </p>
            <p
              className={`text-lg sm:text-xl md:text-2xl font-light leading-relaxed max-w-md whitespace-pre-line transition-colors ${
                isDark ? 'text-neutral-300' : 'text-neutral-700'
              }`}
            >
              {t.contact.addressText}
            </p>
          </div>
        </div>

        {/* Google Map */}
        <div
          className={`contact-item relative w-full h-[280px] sm:h-[400px] md:h-full min-h-[280px] overflow-hidden group transition-colors ${
            isDark ? 'bg-neutral-900' : 'bg-neutral-200'
          }`}
        >
          <iframe
            src="https://www.google.com/maps?q=57-5+Yangsan-ro,+Yeongdeungpo-gu,+Seoul,+Korea&output=embed"
            width="100%"
            height="100%"
            style={{
              border: 0,
              filter: isDark
                ? 'grayscale(100%) invert(90%) contrast(1.2)'
                : 'grayscale(100%) contrast(1.2)',
              transition: 'filter 0.5s ease',
            }}
            allowFullScreen
            loading="lazy"
            title="Google Maps - Studio GLOWGRIM"
            className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/10 pointer-events-none group-hover:bg-transparent transition-colors duration-500" />
        </div>
      </div>
    </div>
  );
}
