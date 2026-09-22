'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { Project } from '@/data/projects'
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
}

// Fixed locale and time zone so server and client render the same string.
function formatCheckedDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export function ProjectPageClient({ project }: { project: Project }) {
  return (
    <>
      <div className="sticky top-0 z-40 border-b border-hairline bg-canvas/85 backdrop-blur-xl">
        <div className="container-shell flex h-14 items-center justify-between">
          <Link href="/#projects" className="btn-tertiary -ml-3">
            <ArrowLeft className="h-4 w-4" />
            All projects
          </Link>
          <div className="flex items-center gap-2">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <Github className="h-3.5 w-3.5" />
                Source
              </a>
            ) : null}
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Live demo
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <main className="pb-24 pt-16 md:pt-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container-shell max-w-4xl"
        >
          <motion.div variants={itemVariants} className="mb-12">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="pill-tag">{project.category}</span>
              <span className="mono text-ink-tertiary">
                {project.status} · {project.period}
              </span>
            </div>
            <h1 className="display-lg text-ink text-balance">{project.title}</h1>
            <p className="mt-6 max-w-3xl subhead">{project.description}</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="linear-card overflow-hidden mb-12"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- image optimization disabled */}
            <img src={project.image} alt={`${project.title} preview`} className="h-auto w-full object-cover" />
          </motion.div>

          <motion.div variants={itemVariants} className="mb-16">
            <p className="eyebrow mb-4">Technology stack</p>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <span key={tech} className="chip">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="space-y-3">
            {project.sections.map((section, index) => (
              <motion.section
                key={section.heading}
                variants={itemVariants}
                className="linear-card p-6 md:p-8"
              >
                <div className="flex items-baseline gap-4 border-b border-hairline pb-5">
                  <span className="mono text-accent">{String(index + 1).padStart(2, '0')}</span>
                  <h2 className="headline text-ink">{section.heading}</h2>
                </div>
                {section.body?.map((paragraph) => (
                  <p key={paragraph} className="mt-6 body-lg text-ink-muted">
                    {paragraph}
                  </p>
                ))}
                {section.points ? (
                  <ul className="mt-6 space-y-3">
                    {section.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 body-default text-ink-muted">
                        <span className="mt-2.5 inline-block h-1 w-1 shrink-0 rounded-full bg-ink-tertiary" aria-hidden />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </motion.section>
            ))}

            <motion.section variants={itemVariants} className="linear-card p-6 md:p-8">
              <div className="border-b border-hairline pb-5">
                <h2 className="headline text-ink">Sources</h2>
              </div>
              <ul className="mt-6 space-y-3">
                {project.sources.map((source) => (
                  <li key={source.url} className="flex flex-wrap items-baseline gap-x-2 gap-y-1 body-default">
                    <a
                      href={source.url}
                      target={source.url.startsWith('http') ? '_blank' : undefined}
                      rel={source.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-1.5 font-medium text-ink transition-colors hover:text-accent"
                    >
                      {source.label}
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                    </a>
                    {source.note ? <span className="mono text-ink-tertiary">{source.note}</span> : null}
                  </li>
                ))}
              </ul>
              <p className="mt-6 caption">
                Checked against the repositories on {formatCheckedDate(project.factsCheckedOn)}.
              </p>
            </motion.section>
          </div>
        </motion.div>
      </main>
    </>
  )
}
