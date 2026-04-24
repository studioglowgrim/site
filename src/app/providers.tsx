'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { I18nProvider } from '@/i18n/provider';
import { useThemeStore } from '@/store/useThemeStore';
import LenisProvider from '@/components/providers/LenisProvider';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import PageTransition from '@/components/common/PageTransition';

function ThemeInitializer({ children }: { children: React.ReactNode }) {
  const { isDark, setDark } = useThemeStore();

  // Initialize theme from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      setDark(false);
    } else {
      setDark(true);
    }
  }, [setDark]);

  // Apply theme class to body
  useEffect(() => {
    document.body.classList.toggle('dark', isDark);
    document.body.classList.toggle('light', !isDark);
  }, [isDark]);

  return <>{children}</>;
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Pages that use FullPageScroll — they manage their own scroll container and footer
  const isFullPage = pathname === '/' || pathname === '/approach' || pathname === '/project';

  if (isFullPage) {
    return (
      <>
        <Navbar />
        {children}
      </>
    );
  }

  return (
    <LenisProvider>
      <Navbar />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </LenisProvider>
  );
}

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <ThemeInitializer>
        <LayoutContent>{children}</LayoutContent>
      </ThemeInitializer>
    </I18nProvider>
  );
}
