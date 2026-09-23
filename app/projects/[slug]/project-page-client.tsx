'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import type { Project } from '@/data/projects'
import { ArrowLeft, ArrowUpRight, Github } from 'lucide-react'
import { EvidenceStat } from '@/components/evidence-stat'

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

const roleLabel: Partial<Record<Project['role'], string>> = {
  collaboration: 'Collaboration',
  contribution: 'Open-source contribution',
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
  const prefersReducedMotion = useReducedMotion()
  const role = roleLabel[project.role]

  return (
    <>
      <div className="sticky top-0 z-40 border-b border-hairline bg-canvas/85 backdrop-blur-xl">
        <div className="container-shell flex h-14 items-center justify-between">
          <Link href="/#projects" className="btn-tertiary -ml-3">
            <ArrowLeft className="h-4 w-4" aria-hidden />
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
                <Github className="h-3.5 w-3.5" aria-hidden />
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
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <main className="pb-24 pt-16 md:pt-20">
        <motion.div
          variants={containerVariants}
          initial={prefersReducedMotion ? false : 'hidden'}
          animate="visible"
          className="container-shell max-w-4xl"
        >
          <motion.div variants={itemVariants} className="mb-12">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="pill-tag">{project.category}</span>
              <span className="mono text-ink-tertiary">
                {project.status} · {project.period}
                {role ? ` · ${role}` : ''}
              </span>
            </div>
            <h1 className="display-lg text-ink text-balance">{project.title}</h1>
            <p className="mt-6 max-w-3xl subhead">{project.description}</p>
          </motion.div>

          {project.evidence?.length ? (
            <motion.section variants={itemVariants} className="linear-card mb-12 p-6 md:p-8" aria-label="Key figures">
              <h2 className="eyebrow">Measured, not claimed</h2>
              <div className="mt-6 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
                {project.evidence.map((item) => (
                  <EvidenceStat key={item.value + item.label} item={item} />
                ))}
              </div>
            </motion.section>
          ) : null}

          <motion.div
            variants={itemVariants}
            className="linear-card overflow-hidden mb-12"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- image optimization disabled */}
            <img
              src={project.image}
              alt={project.imageAlt ?? `${project.title} preview`}
              className="h-auto w-full object-cover"
            />
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
                  <span className="mono text-accent-ink">{String(index + 1).padStart(2, '0')}</span>
                  <h2 className="headline text-ink">{section.heading}</h2>
                </div>
                {section.body?.map((paragraph) => (
                  <p key={paragraph} className="mt-6 body-lg text-ink-muted">
                    {paragraph}
                  </p>
                ))}
                {section.table ? (
                  <figure className="mt-6">
                    <div className="overflow-x-auto rounded-lg border border-hairline">
                      <table className="w-full border-collapse text-left body-sm tabular-nums">
                        <thead>
                          <tr>
                            {section.table.columns.map((column) => (
                              <th
                                key={column}
                                scope="col"
                                className="whitespace-nowrap border-b border-hairline bg-surface-2 px-4 py-3 mono text-ink-subtle"
                              >
                                {column}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.table.rows.map((row) => (
                            <tr key={row.join('|')} className="border-b border-hairline last:border-b-0">
                              {row.map((cell, cellIndex) => (
                                <td
                                  key={`${row[0]}-${section.table?.columns[cellIndex]}`}
                                  className={
                                    cellIndex === 0
                                      ? 'px-4 py-3 align-top text-ink'
                                      : 'px-4 py-3 align-top text-ink-muted'
                                  }
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {section.table.caption ? (
                      <figcaption className="mt-3 caption">{section.table.caption}</figcaption>
                    ) : null}
                  </figure>
                ) : null}
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
                      className="inline-flex items-center gap-1.5 py-1 font-medium text-ink transition-colors hover:text-accent"
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
