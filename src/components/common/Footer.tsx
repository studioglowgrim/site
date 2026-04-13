'use client';

import { useThemeStore } from '@/store/useThemeStore';

export default function Footer() {
  const isDark = useThemeStore((s) => s.isDark);

  return (
    <footer
      className={`py-12 border-t transition-colors duration-500 ${
        isDark ? 'border-neutral-900 bg-[#050505]' : 'border-neutral-200 bg-[#f7f7f7]'
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center text-xs text-neutral-600 uppercase tracking-widest">
        <p>© {new Date().getFullYear()} STUDIO GLOWGRIM. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a
            href="#"
            className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}
          >
            Instagram
          </a>
          <a
            href="#"
            className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-black'}`}
          >
            Vimeo
          </a>
        </div>
      </div>
    </footer>
  );
}
