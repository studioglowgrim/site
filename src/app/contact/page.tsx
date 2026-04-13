import type { Metadata } from 'next';
import ContactSection from '@/components/contact/ContactSection';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with STUDIO GLOWGRIM. Based in Seoul, creating content that pulls you in.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center py-20">
      <ContactSection isPage />
    </div>
  );
}
