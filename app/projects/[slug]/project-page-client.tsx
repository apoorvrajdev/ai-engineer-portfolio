'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { Project } from '@/data/projects'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Code2, ExternalLink } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' as const },
  },
}

export function ProjectPageClient({ project }: { project: Project }) {
  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
        <div className="container-shell flex h-16 items-center">
          <Link href="/#projects">
            <Button variant="ghost" size="sm" className="gap-2 rounded-full">
              <ArrowLeft className="w-4 h-4" />
              Back to projects
            </Button>
          </Link>
        </div>
      </div>

      <main className="pb-20 pt-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container-shell max-w-5xl"
        >
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Badge className="rounded-full">{project.category}</Badge>
              <span className="text-muted-foreground text-sm">{project.year}</span>
            </div>
            <h1 className="mb-4 text-balance text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
              {project.title}
            </h1>
            <p className="mb-6 max-w-3xl text-lg text-muted-foreground sm:text-xl">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-3">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2 rounded-full">
                    <Code2 className="w-4 h-4" />
                    View on GitHub
                  </Button>
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  <Button className="gap-2 rounded-full">
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </Button>
                </a>
              )}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="glassmorphism mb-12 overflow-hidden">
            <img src={project.image} alt={`${project.title} preview`} className="h-auto w-full object-cover" />
          </motion.div>

          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="mb-4 text-2xl font-semibold">Technology Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Badge key={tech} variant="secondary" className="rounded-full">
                  {tech}
                </Badge>
              ))}
            </div>
          </motion.div>

          {project.fullDetails && (
            <div className="space-y-12">
              <motion.section variants={itemVariants} className="glassmorphism p-8">
                <h2 className="text-2xl font-semibold mb-4">Problem Statement</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {project.fullDetails.problem}
                </p>
              </motion.section>

              <motion.section variants={itemVariants} className="glassmorphism p-8">
                <h2 className="text-2xl font-semibold mb-4">Dataset & Data</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {project.fullDetails.dataset}
                </p>
              </motion.section>

              <motion.section variants={itemVariants} className="glassmorphism p-8">
                <h2 className="text-2xl font-semibold mb-4">Architecture & Design</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {project.fullDetails.architecture}
                </p>
              </motion.section>

              <motion.section variants={itemVariants} className="glassmorphism p-8">
                <h2 className="text-2xl font-semibold mb-4">Training Pipeline</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {project.fullDetails.training}
                </p>
              </motion.section>

              <motion.section variants={itemVariants} className="glassmorphism border-primary/30 bg-gradient-to-br from-primary/6 to-accent/5 p-8">
                <h2 className="text-2xl font-semibold mb-4">Results & Performance</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {project.fullDetails.results}
                </p>
              </motion.section>
            </div>
          )}
        </motion.div>
      </main>
    </>
  )
}
