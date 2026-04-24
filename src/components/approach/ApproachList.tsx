'use client';

import { useThemeStore } from '@/store/useThemeStore';
import { useI18n } from '@/i18n/provider';
import { approachesData } from '@/data/approaches';
import FullPageScroll from '@/components/common/FullPageScroll';
import Footer from '@/components/common/Footer';

export default function ApproachList() {
  const isDark = useThemeStore((s) => s.isDark);
  const { t, locale } = useI18n();

  return (
    <FullPageScroll>
      {/* Header Section */}
      <div className="h-full flex flex-col justify-center px-4 sm:px-6 md:px-12 max-w-screen-xl mx-auto">
        <h1
          className={`text-4xl sm:text-5xl md:text-8xl font-serif tracking-tight mb-6 sm:mb-8 whitespace-pre-line transition-colors ${
            isDark ? 'text-white' : 'text-black'
          }`}
        >
          {t.approach.title}
        </h1>
        <div
          className={`w-24 h-[1px] transition-colors ${isDark ? 'bg-white' : 'bg-black'}`}
        />
      </div>

      {/* Approach Items */}
      {approachesData.map((item, index) => (
        <div
          key={index}
          className="h-full flex items-center px-4 sm:px-6 md:px-12 max-w-screen-xl mx-auto"
        >
          <div className="flex flex-col md:flex-row md:items-start md:space-x-16 w-full">
            <div className="md:w-1/3 mb-4 sm:mb-6 md:mb-0">
              <span
                className={`text-[10px] sm:text-xs font-mono block mb-3 sm:mb-4 transition-colors ${
                  isDark ? 'text-neutral-600' : 'text-neutral-400'
                }`}
              >
                0{index + 1}
              </span>
              <h2
                className={`text-2xl sm:text-3xl md:text-4xl font-serif leading-snug transition-colors ${
                  isDark ? 'text-white' : 'text-black'
                }`}
              >
                {item.title[locale]}
              </h2>
            </div>

            <div className="md:w-2/3 md:pt-10">
              <div
                className={`w-full h-[1px] mb-10 transition-colors ${
                  isDark ? 'bg-neutral-800' : 'bg-neutral-200'
                }`}
              />
              <p
                className={`text-base sm:text-lg md:text-xl leading-relaxed font-light whitespace-pre-line transition-colors ${
                  isDark ? 'text-neutral-400' : 'text-neutral-600'
                }`}
              >
                {item.desc[locale]}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Footer Section */}
      <div className="h-full flex flex-col justify-end">
        <Footer />
      </div>
    </FullPageScroll>
  );
}
