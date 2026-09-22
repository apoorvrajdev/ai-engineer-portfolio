'use client'

import { SectionWrapper } from '@/components/section-wrapper'
import { ProjectCard } from '@/components/project-card'
import { projects } from '@/data/projects'
import { SectionHeading } from '@/components/section-heading'

export function ProjectsSection() {
  return (
    <SectionWrapper id="projects">
      <SectionHeading
        eyebrow="Selected work"
        title="ML and full-stack systems,"
        highlight="built end to end."
        description="Each case study states what was built, how it was evaluated, who did what, and where it falls short."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </SectionWrapper>
  )
}
