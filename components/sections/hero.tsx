'use client'

import Link from 'next/link'
import dynamic from 'next/dynamic'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { profile } from '@/data/profile'
import { scrollToSection } from '@/lib/scroll'

// Client-only canvas background — lazy-loaded so it never ships in the SSR
// payload and can't cause hydration mismatches.
const DotField = dynamic(() => import('@/components/dot-field').then(m => m.DotField), {
  ssr: false,
})

const { employer } = profile

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
  }

  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    scrollToSection(id)
  }

  return (
    <section id="home" className="relative isolate overflow-hidden">
      {/* Animated dot-field background — sits behind everything, fades at the
          edges, and is dimmed by a gradient so content stays fully legible. */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <DotField className="mask-[radial-gradient(130%_100%_at_50%_25%,#000_55%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(130%_90%_at_50%_0%,transparent_60%,var(--background)_100%)]" />
      </div>

      <div className="container-shell relative pt-10 pb-16 md:pt-16 md:pb-24">
        <motion.div
          variants={containerVariants}
          initial={prefersReducedMotion ? false : 'hidden'}
          animate="visible"
          className="max-w-4xl space-y-6"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2">
            <span className="status-pill">
              <span className="dot" />
              {profile.availability}
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="display-xl max-w-4xl text-ink text-balance"
          >
            Building ML systems end to end,{' '}
            <span className="accent-phrase">and checking that they work.</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="subhead max-w-[58ch]">
            I&apos;m {profile.name} — {profile.title} (contract) at {employer.name}, building the AI layer of{' '}
            {employer.product}, a {employer.productKind}. I work across FastAPI services, React and TypeScript front
            ends, and the evaluation that decides whether a model is worth trusting.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 pt-1">
            <Link href="/projects/fraud-radar" className="btn-primary btn-primary-lg">
              Read the flagship case study
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <a href="#projects" onClick={scrollTo('projects')} className="btn-secondary btn-secondary-lg">
              All work
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 mono text-ink-tertiary"
          >
            <span className="inline-flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-ink-tertiary" aria-hidden />
              {profile.title} · {employer.name}
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-ink-tertiary" aria-hidden />
              Co-author, IEEE paper on image captioning
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-ink-tertiary" aria-hidden />
              {profile.location}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
