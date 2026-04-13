'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useThemeStore } from '@/store/useThemeStore';

export default function NotFound() {
  const isDark = useThemeStore((s) => s.isDark);

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h1
            className={`text-[120px] sm:text-[180px] font-serif leading-none tracking-tighter ${
              isDark ? 'text-white' : 'text-black'
            }`}
          >
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p
            className={`text-lg sm:text-xl font-light mb-2 ${
              isDark ? 'text-neutral-400' : 'text-neutral-600'
            }`}
          >
            Page Not Found
          </p>
          <p
            className={`text-sm mb-12 ${
              isDark ? 'text-neutral-600' : 'text-neutral-400'
            }`}
          >
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link
            href="/"
            className={`group inline-flex items-center space-x-3 text-sm uppercase tracking-widest border px-8 py-4 rounded-full transition-all duration-300 ${
              isDark
                ? 'border-neutral-700 hover:bg-white hover:text-black text-white'
                : 'border-neutral-300 hover:bg-black hover:text-white text-black'
            }`}
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
