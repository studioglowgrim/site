'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeStore } from '@/store/useThemeStore';
import { useUIStore } from '@/store/useUIStore';
import { useI18n } from '@/i18n/provider';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';

const navLinks = [
  { key: 'home', href: '/' },
  { key: 'approach', href: '/approach' },
  { key: 'project', href: '/project' },
  { key: 'contact', href: '/contact' },
] as const;

export default function Navbar() {
  const isDark = useThemeStore((s) => s.isDark);
  const { isMenuOpen, setMenuOpen } = useUIStore();
  const { t } = useI18n();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, setMenuOpen]);

  const logoSrc = isDark
    ? '/images/logo/logo-horizontal-white-en.png'
    : '/images/logo/logo-horizontal-black-en.png';

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          scrolled
            ? `${isDark ? 'bg-[#050505]/90' : 'bg-[#f7f7f7]/90'} backdrop-blur-md py-4`
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="cursor-pointer group flex items-center gap-3">
            <Image
              src={logoSrc}
              alt="STUDIO GLOWGRIM"
              width={140}
              height={32}
              className="h-6 md:h-7 w-auto transition-opacity group-hover:opacity-80"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-12">
            <div className="flex space-x-10">
              {navLinks.map(({ key, href }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={key}
                    href={href}
                    className={`text-[13px] uppercase tracking-[0.15em] transition-colors duration-300 relative group ${
                      isActive
                        ? isDark ? 'text-white font-medium' : 'text-black font-medium'
                        : isDark ? 'text-neutral-500 hover:text-white' : 'text-neutral-500 hover:text-black'
                    }`}
                  >
                    {t.nav[key]}
                    <span
                      className={`absolute -bottom-2 left-0 h-[1px] transition-all duration-300 ${
                        isDark ? 'bg-white' : 'bg-black'
                      } ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
                    />
                  </Link>
                );
              })}
            </div>

            <div className={`flex items-center gap-4 pl-8 border-l transition-colors ${
              isDark ? 'border-neutral-800' : 'border-neutral-300'
            }`}>
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen
              ? <X size={24} className={isDark ? 'text-white' : 'text-black'} />
              : <Menu size={24} className={isDark ? 'text-white' : 'text-black'} />
            }
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 z-40 flex flex-col items-center justify-center ${
              isDark ? 'bg-[#050505]/98' : 'bg-[#f7f7f7]/98'
            } backdrop-blur-lg`}
          >
            <div className="flex flex-col items-center space-y-10">
              {navLinks.map(({ key, href }, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.4 }}
                >
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={`text-3xl font-serif tracking-tight transition-colors ${
                      pathname === href
                        ? isDark ? 'text-white' : 'text-black'
                        : isDark ? 'text-neutral-500 hover:text-white' : 'text-neutral-500 hover:text-black'
                    }`}
                  >
                    {t.nav[key]}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="flex items-center gap-6 pt-8"
              >
                <LanguageToggle />
                <ThemeToggle />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
