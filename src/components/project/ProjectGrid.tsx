'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { useThemeStore } from '@/store/useThemeStore';
import { useI18n } from '@/i18n/provider';
import { projectsData } from '@/data/projects';
import FullPageScroll from '@/components/common/FullPageScroll';
import Footer from '@/components/common/Footer';

export default function ProjectGrid() {
  const isDark = useThemeStore((s) => s.isDark);
  const { t, locale } = useI18n();

  return (
    <FullPageScroll>
      {/* Header Section */}
      <div className="h-full flex flex-col justify-center px-4 sm:px-6 md:px-12 max-w-screen-2xl mx-auto">
        <h1
          className={`text-4xl sm:text-5xl md:text-8xl font-serif tracking-tight whitespace-pre-line transition-colors ${
            isDark ? 'text-white' : 'text-black'
          }`}
        >
          {t.project.title}
        </h1>
        <p className="text-neutral-500 tracking-widest uppercase mt-4 sm:mt-8 text-xs sm:text-sm">
          {t.project.subtitle}
        </p>
      </div>

      {/* Each Project as Full Section */}
      {projectsData.map((project) => (
        <Link
          key={project.id}
          href={`/project/${project.slug}`}
          className="h-full flex items-center px-4 sm:px-6 md:px-12 max-w-screen-2xl mx-auto group cursor-pointer w-full"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full items-center">
            {/* Poster */}
            <div
              className={`relative overflow-hidden aspect-video transition-colors ${
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

            {/* Info */}
            <div className="flex flex-col space-y-4">
              <h2
                className={`text-2xl sm:text-3xl md:text-5xl font-serif leading-tight transition-colors ${
                  isDark ? 'text-white' : 'text-black'
                }`}
              >
                {project.title[locale]}
              </h2>
              {project.subtitle[locale] && (
                <h3
                  className={`text-base sm:text-xl font-serif italic transition-colors ${
                    isDark ? 'text-neutral-400' : 'text-neutral-600'
                  }`}
                >
                  {project.subtitle[locale]}
                </h3>
              )}

              <div
                className={`h-[1px] w-full my-2 transition-colors ${
                  isDark ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              />

              <p className="text-[10px] text-neutral-500 uppercase tracking-[0.2em]">
                {project.meta[locale]}
              </p>

              <h4
                className={`text-base sm:text-lg font-medium transition-colors ${
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
        </Link>
      ))}

      {/* Footer Section */}
      <div className="h-full flex flex-col justify-end">
        <Footer />
      </div>
    </FullPageScroll>
  );
}
