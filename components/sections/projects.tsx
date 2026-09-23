'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { SectionWrapper } from '@/components/section-wrapper'
import { SectionHeading } from '@/components/section-heading'
import { ProjectCard } from '@/components/project-card'
import { FlagshipProject } from '@/components/flagship-project'
import { useRevealProps } from '@/components/motion/reveal'
import { projects } from '@/data/projects'

const flagship = projects.find((project) => project.tier === 'flagship')
const secondary = projects.filter((project) => project.tier === 'secondary')
const earlier = projects.filter((project) => project.tier === 'earlier')

export function ProjectsSection() {
  const reveal = useRevealProps({ delay: 0.05 })

  return (
    <SectionWrapper id="projects">
      <SectionHeading
        eyebrow="Selected work"
        title="One system I can defend in depth,"
        highlight="and the work behind it."
        description="Each case study states what was built, how it was evaluated, who did what, and where it falls short."
      />

      {flagship ? (
        <div className="mt-12">
          <FlagshipProject project={flagship} />
        </div>
      ) : null}

      {secondary.length ? (
        <div className="mt-16">
          <h3 className="eyebrow">Also built</h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {secondary.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      ) : null}

      {earlier.length ? (
        <motion.div {...reveal} className="mt-16">
          <h3 className="eyebrow">Earlier and collaborative work</h3>
          <ul className="mt-6 divide-y divide-hairline border-y border-hairline">
            {earlier.map((project) => (
              <li key={project.id}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group grid gap-x-6 gap-y-2 px-1 py-5 transition-colors hover:bg-surface-1 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_auto] md:items-baseline md:px-4"
                >
                  <span className="card-title text-ink transition-colors group-hover:text-accent">
                    {project.title}
                  </span>
                  <span className="body-sm text-ink-subtle">{project.shortDescription}</span>
                  <span className="flex items-center gap-2 mono text-ink-tertiary md:justify-end">
                    {project.period}
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      ) : null}
    </SectionWrapper>
  )
}
