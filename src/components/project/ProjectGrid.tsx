'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Play } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);
import { useThemeStore } from '@/store/useThemeStore';
import { useI18n } from '@/i18n/provider';
import { projectsData } from '@/data/projects';

export default function ProjectGrid() {
  const isDark = useThemeStore((s) => s.isDark);
  const { t, locale } = useI18n();

  return (
    <div className="pt-20 sm:pt-24 pb-20 sm:pb-32 px-4 sm:px-6 md:px-12 max-w-screen-2xl mx-auto">
      <motion.header
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-12 sm:mb-16 md:mb-24 flex flex-col md:flex-row justify-between md:items-end"
      >
        <h1
          className={`text-4xl sm:text-5xl md:text-8xl font-serif tracking-tight whitespace-pre-line transition-colors ${
            isDark ? 'text-white' : 'text-black'
          }`}
        >
          {t.project.title}
        </h1>
        <p className="text-neutral-500 tracking-widest uppercase mt-4 sm:mt-8 md:mt-0 text-xs sm:text-sm">
          {t.project.subtitle}
        </p>
      </motion.header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-16 sm:gap-y-24 md:gap-y-32">
        {projectsData.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: (index % 2) * 0.15 }}
          >
            <Link
              href={`/project/${project.slug}`}
              className={`group cursor-pointer block ${index % 2 !== 0 ? 'md:mt-40' : ''}`}
            >
              <div
                className={`relative overflow-hidden mb-4 sm:mb-8 aspect-video transition-colors ${
                  isDark ? 'bg-neutral-900' : 'bg-neutral-200'
                }`}
              >
                <Image
                  src={project.posterImage}
                  alt={project.title[locale]}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-70 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-white/30 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-50 group-hover:scale-100">
                    <Play className="ml-1" size={24} fill="currentColor" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2
                      className={`text-2xl sm:text-3xl md:text-4xl font-serif leading-tight transition-colors ${
                        isDark ? 'text-white' : 'text-black'
                      }`}
                    >
                      {project.title[locale]}
                    </h2>
                    {project.subtitle[locale] && (
                      <h3
                        className={`text-base sm:text-xl mt-1 font-serif italic transition-colors ${
                          isDark ? 'text-neutral-400' : 'text-neutral-600'
                        }`}
                      >
                        {project.subtitle[locale]}
                      </h3>
                    )}
                  </div>
                </div>

                <div
                  className={`h-[1px] w-full my-4 transition-colors ${
                    isDark ? 'bg-neutral-800' : 'bg-neutral-200'
                  }`}
                />

                <div className="flex flex-col md:flex-row md:space-x-8">
                  <div className="md:w-1/3 mb-4 md:mb-0">
                    <p className="text-[10px] text-neutral-500 uppercase tracking-[0.2em] mb-2">
                      {t.project.info}
                    </p>
                    <p
                      className={`text-sm transition-colors ${
                        isDark ? 'text-neutral-300' : 'text-neutral-700'
                      }`}
                    >
                      {project.meta[locale]}
                    </p>
                  </div>
                  <div className="md:w-2/3">
                    <h4
                      className={`text-base sm:text-lg mb-2 sm:mb-3 font-medium transition-colors ${
                        isDark ? 'text-white' : 'text-black'
                      }`}
                    >
                      {project.headcopy[locale]}
                    </h4>
                    <p
                      className={`text-sm leading-relaxed transition-colors line-clamp-3 ${
                        isDark ? 'text-neutral-400' : 'text-neutral-600'
                      }`}
                    >
                      {project.desc[locale]}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
