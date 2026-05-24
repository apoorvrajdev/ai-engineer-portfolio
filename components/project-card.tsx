'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Project } from '@/data/projects'
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react'

interface ProjectCardProps {
  project: Project
  index?: number
}

const statusDotClass: Record<NonNullable<Project['status']>, string> = {
  Live: 'bg-[var(--success)]',
  'In development': 'bg-accent',
  'Pre-alpha': 'bg-ink-subtle',
  Published: 'bg-accent',
}

export function ProjectCard({ project, index = 0 }: Readonly<ProjectCardProps>) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-80px' }}
      className="h-full"
    >
      <article className="linear-card linear-card-hover group/card relative flex h-full flex-col overflow-hidden">
        {/* Image well — framed by an inner hairline, sits on surface-2 for elevation */}
        <Link
          href={`/projects/${project.slug}`}
          className="relative block overflow-hidden border-b border-hairline bg-surface-2"
        >
          <div className="relative aspect-16/10">
            {project.image ? (
              // eslint-disable-next-line @next/next/no-img-element -- image optimization disabled in next.config
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className="h-full w-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            ) : null}
            <div className="absolute left-4 top-4 inline-flex items-center gap-1.5">
              <span className="pill-tag">{project.category}</span>
            </div>
            <div className="absolute right-4 top-4 inline-flex items-center gap-2 mono text-ink-subtle">
              {project.status ? (
                <span className="inline-flex items-center gap-1.5">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${statusDotClass[project.status]}`}
                    aria-hidden
                  />
                  <span>{project.status}</span>
                  <span aria-hidden>·</span>
                </span>
              ) : null}
              <span>{project.year}</span>
            </div>
          </div>
        </Link>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5 md:p-6">
          <Link href={`/projects/${project.slug}`} className="group/title">
            <h3 className="card-title text-ink transition-colors group-hover/title:text-accent">
              {project.title}
            </h3>
          </Link>

          <p className="mt-2.5 flex-1 body-sm text-ink-subtle">
            {project.shortDescription}
          </p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((tech) => (
              <span key={tech} className="chip">
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between gap-3 border-t border-hairline pt-4">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink transition-colors hover:text-accent"
            >
              Case study
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
            </Link>
            <div className="flex items-center gap-1">
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} on GitHub`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-ink-subtle transition-colors hover:bg-surface-2 hover:text-ink"
                >
                  <Github className="h-3.5 w-3.5" />
                </a>
              ) : null}
              {project.demo ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} live demo`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md text-ink-subtle transition-colors hover:bg-surface-2 hover:text-ink"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </article>
    </motion.div>
  )
}
