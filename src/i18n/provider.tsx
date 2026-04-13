'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import en from '@/data/dictionaries/en.json';
import ko from '@/data/dictionaries/ko.json';

type Locale = 'en' | 'ko';
type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { en, ko };

interface I18nContextType {
  locale: Locale;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', l);
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocaleState((prev) => {
      const next = prev === 'en' ? 'ko' : 'en';
      if (typeof window !== 'undefined') {
        localStorage.setItem('locale', next);
      }
      return next;
    });
  }, []);

  return (
    <I18nContext.Provider value={{ locale, t: dictionaries[locale], setLocale, toggleLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within I18nProvider');
  return context;
}
