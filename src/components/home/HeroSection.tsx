'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { useThemeStore } from '@/store/useThemeStore';
import { useI18n } from '@/i18n/provider';

const bannerImages = [
  '/images/banners/the-sent-banner.jpg',
  '/images/banners/fungi-banner.png',
  '/images/banners/monster-space-banner.png',
  '/images/banners/didigo-banner.png',
  '/images/banners/moms-pedal-banner.png',
];

export default function HeroSection() {
  const isDark = useThemeStore((s) => s.isDark);
  const { t } = useI18n();
  const [currentImage, setCurrentImage] = useState(0);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % bannerImages.length);
  }, []);

  // Auto-rotate banner images
  useEffect(() => {
    const timer = setInterval(nextImage, 5000);
    return () => clearInterval(timer);
  }, [nextImage]);

  // GSAP entrance animation — split text character reveal
  useEffect(() => {
    if (hasAnimated.current || !titleRef.current) return;
    hasAnimated.current = true;

    const titleEl = titleRef.current;
    const text = titleEl.textContent || '';

    // Build split text HTML: wrap each character in a span
    const lines = text.split('\n');
    titleEl.innerHTML = lines
      .map(
        (line) =>
          `<span class="inline-block overflow-hidden"><span class="hero-char inline-block">${line
            .split('')
            .map((ch) =>
              ch === ' '
                ? '&nbsp;'
                : `<span class="hero-letter inline-block" style="transform: translateY(120%); opacity: 0">${ch}</span>`
            )
            .join('')}</span></span>`
      )
      .join('<br/>');

    const letters = titleEl.querySelectorAll('.hero-letter');

    const tl = gsap.timeline({
      defaults: { ease: 'power4.out' },
    });

    tl.to(letters, {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.03,
      delay: 0.5,
    });

    if (descRef.current) {
      tl.from(
        descRef.current,
        { y: 30, opacity: 0, duration: 0.8 },
        '-=0.4'
      );
    }
    if (ctaRef.current) {
      tl.from(
        ctaRef.current,
        { y: 20, opacity: 0, duration: 0.6 },
        '-=0.3'
      );
    }
    if (indicatorRef.current) {
      tl.from(
        indicatorRef.current,
        { opacity: 0, duration: 1 },
        '-=0.2'
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="relative h-full w-full flex items-center justify-center overflow-hidden">
      {/* Background Slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={bannerImages[currentImage]}
            alt="STUDIO GLOWGRIM"
            fill
            className={`object-cover ${isDark ? 'opacity-30' : 'opacity-20'}`}
            priority={currentImage === 0}
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div
        className={`absolute inset-0 z-[1] transition-colors duration-700 ${
          isDark
            ? 'bg-gradient-to-b from-[#050505]/60 via-[#050505]/40 to-[#050505]'
            : 'bg-gradient-to-b from-[#f7f7f7]/60 via-[#f7f7f7]/40 to-[#f7f7f7]'
        }`}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        <h1
          ref={titleRef}
          className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif mb-6 sm:mb-8 leading-[1.15] tracking-tight whitespace-pre-line transition-colors ${
            isDark ? 'text-white' : 'text-black'
          }`}
        >
          {t.hero.title}
        </h1>

        <p
          ref={descRef}
          className={`text-sm sm:text-base md:text-lg max-w-2xl font-light leading-relaxed whitespace-pre-line transition-colors ${
            isDark ? 'text-neutral-400' : 'text-neutral-600'
          }`}
        >
          {t.hero.desc}
        </p>

        <div ref={ctaRef}>
          <Link
            href="/approach"
            className={`mt-10 sm:mt-16 group inline-flex items-center space-x-3 text-xs sm:text-sm uppercase tracking-widest border px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 ${
              isDark
                ? 'border-neutral-700 hover:bg-white hover:text-black text-white'
                : 'border-neutral-300 hover:bg-black hover:text-white text-black'
            }`}
          >
            <span>{t.hero.cta}</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {bannerImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImage(i)}
            className={`h-[2px] rounded-full transition-all duration-500 ${
              i === currentImage
                ? `w-8 ${isDark ? 'bg-white' : 'bg-black'}`
                : `w-4 ${isDark ? 'bg-white/30' : 'bg-black/30'}`
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div
        ref={indicatorRef}
        className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-10 opacity-50"
      >
        <div className={`w-[1px] h-8 sm:h-12 mb-2 animate-pulse ${isDark ? 'bg-white' : 'bg-black'}`} />
        <span className={`text-[9px] sm:text-[10px] uppercase tracking-[0.2em] ${isDark ? 'text-white' : 'text-black'}`}>
          {t.hero.scroll}
        </span>
      </div>
    </section>
  );
}
