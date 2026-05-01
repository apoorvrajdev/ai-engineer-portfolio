'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Project } from '@/data/projects'
import { Code2, ExternalLink, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProjectCardProps {
  project: Project
  index?: number
}

// Map category to a gradient overlay class for hover
const categoryGradient: Record<string, string> = {
  'AI/ML': 'from-primary/8 via-transparent to-accent/8',
  'Research': 'from-blue-500/10 via-transparent to-cyan-500/10',
  'Full-Stack': 'from-violet-500/10 via-transparent to-fuchsia-500/10',
}

export function ProjectCard({ project, index = 0 }: Readonly<ProjectCardProps>) {
  const gradient = categoryGradient[project.category] ?? 'from-primary/8 via-transparent to-transparent'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
      viewport={{ once: true, margin: '-80px' }}
      className="h-full"
    >
      <article
        className={cn(
          'group relative overflow-hidden rounded-xl border bg-card/40 glass p-6 sm:p-7',
          'transition-all duration-400 hover:border-primary/40 hover:bg-card/70 hover-lift',
          'flex flex-col h-full',
          project.featured && 'border-primary/20',
        )}
      >
        {/* Gradient overlay on hover */}
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100',
            gradient,
          )}
        />

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute left-5 top-5 flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/15 px-3 py-1 z-10">
            <Sparkles className="h-3 w-3 text-primary" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-primary font-medium">Featured</span>
          </div>
        )}

        {/* Status + year */}
        <div className={cn('relative z-10 flex items-center justify-between', project.featured ? 'mt-8 mb-4' : 'mb-4')}>
          <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary shadow-sm shadow-primary/50" />
            <span className="font-mono text-xs text-muted-foreground">shipped</span>
          </div>
        </div>

        {/* Title */}
        <div className="relative z-10 flex-1 flex flex-col">
          <Link href={`/projects/${project.slug}`}>
            <h3 className="text-xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-gradient leading-snug">
              {project.title}
            </h3>
          </Link>

          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
            {project.shortDescription}
          </p>

          {/* Tags */}
          <div className="mt-5 flex flex-wrap gap-2">
            {project.stack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-border/80 bg-secondary/60 px-3 py-1 font-mono text-[11px] text-muted-foreground transition-colors group-hover:border-primary/30 group-hover:text-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex items-center gap-3">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg border border-border px-4 py-2 font-mono text-xs text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary hover:bg-primary/5 active:scale-[0.98]"
              >
                <Code2 className="h-3.5 w-3.5" />
                GitHub
                <span className="opacity-0 -translate-x-1 transition-all duration-200 group-hover/btn:opacity-100 group-hover/btn:translate-x-0">→</span>
              </a>
            ) : null}
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg border border-primary bg-primary/10 px-4 py-2 font-mono text-xs text-primary transition-all duration-500 hover:text-primary-foreground active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <ExternalLink className="h-3.5 w-3.5" />
                  Live Demo
                </span>
                <span className="absolute inset-0 -translate-x-full bg-primary transition-transform duration-500 group-hover/btn:translate-x-0" />
              </a>
            ) : null}
          </div>
        </div>

        {/* Bottom accent line sweep */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-transparent transition-all duration-500 group-hover:w-full" />
      </article>
    </motion.div>
  )
}
