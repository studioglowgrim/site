import type { Metadata } from 'next';
import ApproachList from '@/components/approach/ApproachList';

export const metadata: Metadata = {
  title: 'Our Approach',
  description: 'Discover how STUDIO GLOWGRIM approaches content creation through strategic story design, IP development, flexible production, and AI-driven workflows.',
};

export default function ApproachPage() {
  return <ApproachList />;
}
