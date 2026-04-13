'use client';

import { useI18n } from '@/i18n/provider';
import { useThemeStore } from '@/store/useThemeStore';

export default function LanguageToggle() {
  const { locale, setLocale } = useI18n();
  const isDark = useThemeStore((s) => s.isDark);

  return (
    <div className="flex items-center space-x-1 text-xs font-medium tracking-widest">
      <button
        onClick={() => setLocale('en')}
        className={`px-2 py-1 rounded transition-all duration-300 ${
          locale === 'en'
            ? isDark ? 'text-white' : 'text-black'
            : isDark ? 'text-neutral-600 hover:text-neutral-300' : 'text-neutral-400 hover:text-neutral-700'
        }`}
      >
        EN
      </button>
      <span className={isDark ? 'text-neutral-700' : 'text-neutral-300'}>|</span>
      <button
        onClick={() => setLocale('ko')}
        className={`px-2 py-1 rounded transition-all duration-300 ${
          locale === 'ko'
            ? isDark ? 'text-white' : 'text-black'
            : isDark ? 'text-neutral-600 hover:text-neutral-300' : 'text-neutral-400 hover:text-neutral-700'
        }`}
      >
        KR
      </button>
    </div>
  );
}
