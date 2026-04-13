'use client';

import { create } from 'zustand';

interface ThemeState {
  isDark: boolean;
  toggle: () => void;
  setDark: (dark: boolean) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDark: true,
  toggle: () => set((state) => {
    const newDark = !state.isDark;
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newDark ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', newDark);
    }
    return { isDark: newDark };
  }),
  setDark: (dark: boolean) => set(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', dark ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', dark);
    }
    return { isDark: dark };
  }),
}));
