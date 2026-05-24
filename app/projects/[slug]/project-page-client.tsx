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

const sections: Array<{
  key: keyof NonNullable<Project['fullDetails']>
  title: string
  label: string
}> = [
  { key: 'problem', title: 'Problem statement', label: '01' },
  { key: 'dataset', title: 'Dataset & data', label: '02' },
  { key: 'architecture', title: 'Architecture & design', label: '03' },
  { key: 'training', title: 'Training pipeline', label: '04' },
  { key: 'results', title: 'Results & performance', label: '05' },
]

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
              <span className="mono text-ink-tertiary">{project.year}</span>
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

          {project.fullDetails ? (
            <div className="space-y-3">
              {sections.map((section) => (
                <motion.section
                  key={section.key}
                  variants={itemVariants}
                  className="linear-card p-6 md:p-8"
                >
                  <div className="flex items-baseline gap-4 border-b border-hairline pb-5">
                    <span className="mono text-accent">{section.label}</span>
                    <h2 className="headline text-ink">{section.title}</h2>
                  </div>
                  <p className="mt-6 body-lg text-ink-muted">
                    {project.fullDetails?.[section.key]}
                  </p>
                </motion.section>
              ))}
            </div>
          ) : null}
        </motion.div>
      </main>
    </>
  )
}
