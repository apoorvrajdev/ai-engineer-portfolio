import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { projects } from '@/data/projects'
import { profile } from '@/data/profile'
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
    return { title: `Project not found | ${profile.name}` }
  }

  const title = `${project.title} | ${profile.name}`
  const path = `/projects/${project.slug}`

  // og:image comes from the colocated opengraph-image.tsx; config-based
  // openGraph here would otherwise drop the inherited image.
  return {
    title,
    description: project.shortDescription,
    alternates: { canonical: path },
    openGraph: {
      title,
      description: project.shortDescription,
      type: 'article',
      url: path,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: project.shortDescription,
      images: [`${path}/opengraph-image`],
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
