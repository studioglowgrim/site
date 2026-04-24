'use client';

import Image from 'next/image';
import Link from 'next/link';
import { X, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useThemeStore } from '@/store/useThemeStore';
import { useI18n } from '@/i18n/provider';
import type { Project } from '@/data/projects';

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?/]+)/
  );
  return match ? match[1] : null;
}

export default function ProjectDetail({ project }: { project: Project }) {
  const isDark = useThemeStore((s) => s.isDark);
  const { t, locale } = useI18n();
  const [showTrailer, setShowTrailer] = useState(false);

  const youtubeId = project.trailerUrl ? getYouTubeId(project.trailerUrl) : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="pt-24 pb-32 px-6 md:px-12 max-w-screen-xl mx-auto"
    >
      <Link
        href="/project"
        className={`flex items-center space-x-2 text-sm uppercase tracking-widest transition-colors mb-16 ${
          isDark ? 'text-neutral-500 hover:text-white' : 'text-neutral-500 hover:text-black'
        }`}
      >
        <X size={16} />
        <span>{t.project.backToProjects}</span>
      </Link>

      <div
        className={`relative aspect-video md:aspect-[21/9] w-full mb-16 overflow-hidden transition-colors ${
          isDark ? 'bg-neutral-900' : 'bg-neutral-200'
        }`}
      >
        {showTrailer && youtubeId ? (
          <div className="absolute inset-0 z-10">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
              title={project.title[locale]}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              style={{ border: 0 }}
            />
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300"
            >
              <X size={20} />
            </button>
          </div>
        ) : (
          <>
            <Image
              src={project.bannerImage}
              alt={project.title[locale]}
              fill
              className="object-cover opacity-60"
              sizes="100vw"
              priority
            />
            {youtubeId && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setShowTrailer(true)}
                  className="w-20 h-20 rounded-full border border-white/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 cursor-pointer"
                >
                  <Play className="ml-1" size={32} fill="currentColor" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
        <div className="md:col-span-1">
          <h1
            className={`text-4xl md:text-6xl font-serif mb-4 transition-colors ${
              isDark ? 'text-white' : 'text-black'
            }`}
          >
            {project.title[locale]}
          </h1>
          {project.subtitle[locale] && (
            <h2
              className={`text-xl font-serif italic mb-8 transition-colors ${
                isDark ? 'text-neutral-400' : 'text-neutral-600'
              }`}
            >
              {project.subtitle[locale]}
            </h2>
          )}

          <div
            className={`border-t pt-6 mt-8 transition-colors ${
              isDark ? 'border-neutral-800' : 'border-neutral-200'
            }`}
          >
            <p className="text-[10px] text-neutral-500 uppercase tracking-[0.2em] mb-2">
              {t.project.details}
            </p>
            <p
              className={`text-sm transition-colors ${
                isDark ? 'text-neutral-300' : 'text-neutral-700'
              }`}
            >
              {project.meta[locale]}
            </p>
          </div>
        </div>

        <div className="md:col-span-2 md:pt-4">
          <h3
            className={`text-2xl font-medium mb-8 leading-tight transition-colors ${
              isDark ? 'text-white' : 'text-black'
            }`}
          >
            {project.headcopy[locale]}
          </h3>
          <p
            className={`leading-relaxed text-lg whitespace-pre-line transition-colors ${
              isDark ? 'text-neutral-400' : 'text-neutral-600'
            }`}
          >
            {project.desc[locale]}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
