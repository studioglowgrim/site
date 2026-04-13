import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import ClientProviders from './providers';
import Analytics from '@/components/common/Analytics';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://glowgrim.com'),
  title: {
    default: 'STUDIO GLOWGRIM — Stories That Pull You In',
    template: '%s | STUDIO GLOWGRIM',
  },
  description:
    'A video planning and production studio that transforms public-interest stories into compelling, immersive content for wide audiences.',
  keywords: ['studio glowgrim', 'video production', 'documentary', 'film', 'content production', 'seoul'],
  openGraph: {
    title: 'STUDIO GLOWGRIM',
    description: 'Stories That Pull You In.',
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ko_KR',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col dark">
        <Analytics />
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
