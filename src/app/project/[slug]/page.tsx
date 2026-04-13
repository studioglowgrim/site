import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { projectsData } from '@/data/projects';
import ProjectDetail from '@/components/project/ProjectDetail';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: project.title.en,
    description: project.headcopy.en,
    openGraph: {
      title: project.title.en,
      description: project.headcopy.en,
      images: [{ url: project.bannerImage }],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetail project={project} />;
}
