'use client'

import { SectionWrapper } from '@/components/section-wrapper'
import { ProjectCard } from '@/components/project-card'
import { projects } from '@/data/projects'
import { SectionHeading } from '@/components/section-heading'

export function ProjectsSection() {
  const featuredProjects = projects.filter(p => p.featured)

  return (
    <SectionWrapper id="projects">
      <SectionHeading
        eyebrow="Selected Work"
        title="Projects"
        description="Each project emphasizes measurable model performance, clean implementation, and developer-quality UX."
      />

      <div className="mt-10 sm:mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </SectionWrapper>
  )
}
