import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { projects } from '@/data/projects'
import { ProjectPageClient } from './project-page-client'

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return { title: 'Project not found | Apoorv Raj' }
  }

  return {
    title: `${project.title} | Apoorv Raj`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Apoorv Raj`,
      description: project.description,
      type: 'article',
      url: `/projects/${project.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Apoorv Raj`,
      description: project.description,
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  return <ProjectPageClient project={project} />
}
