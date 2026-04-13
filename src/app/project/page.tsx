import type { Metadata } from 'next';
import ProjectGrid from '@/components/project/ProjectGrid';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore the portfolio of STUDIO GLOWGRIM — a collection of immersive narratives spanning documentaries, series, and factual content.',
};

export default function ProjectPage() {
  return <ProjectGrid />;
}
