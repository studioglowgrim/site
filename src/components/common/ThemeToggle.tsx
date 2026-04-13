'use client';

import { useThemeStore } from '@/store/useThemeStore';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { isDark, toggle } = useThemeStore();

  return (
    <button
      onClick={toggle}
      className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
        isDark
          ? 'text-neutral-400 hover:text-white hover:bg-white/10'
          : 'text-neutral-600 hover:text-black hover:bg-black/10'
      }`}
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
