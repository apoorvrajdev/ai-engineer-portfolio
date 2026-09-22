'use client'

import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { profile } from '@/data/profile'

// Client-only canvas background — lazy-loaded so it never ships in the SSR
// payload and can't cause hydration mismatches.
const DotField = dynamic(() => import('@/components/dot-field').then(m => m.DotField), {
  ssr: false,
})

const { employer } = profile

export function HeroSection() {
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
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="home" className="relative isolate overflow-hidden">
      {/* Animated dot-field background — sits behind everything, fades at the
          edges, and is dimmed by a gradient so content stays fully legible. */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <DotField className="mask-[radial-gradient(130%_100%_at_50%_25%,#000_55%,transparent_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(130%_90%_at_50%_0%,transparent_60%,var(--background)_100%)]" />
      </div>

      <div className="container-shell relative pt-6 pb-12 md:pt-10 md:pb-16">
        <div className="grid items-center gap-14 md:grid-cols-[1.15fr_1fr] md:gap-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-5 md:space-y-6"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2">
              <span className="status-pill">
                <span className="dot" />
                {profile.availability}
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="display-xl text-ink max-w-[28ch] text-balance"
            >
              Building ML systems end to end,{' '}
              <span className="accent-phrase">and checking that they work.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="subhead max-w-[58ch]"
            >
              I&apos;m {profile.name} — {profile.title} (contract) at {employer.name}, building the AI
              layer of {employer.product}, a {employer.productKind}. Co-author of an IEEE paper on
              image captioning, and builder of Fraud Radar, a fraud-detection system that reports
              where its own model fails.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3 pt-1"
            >
              <a
                href="#projects"
                onClick={scrollTo('projects')}
                className="btn-primary btn-primary-lg"
              >
                View work
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                onClick={scrollTo('contact')}
                className="btn-secondary btn-secondary-lg"
              >
                Get in touch
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 mono text-ink-tertiary"
            >
              <span className="inline-flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-ink-tertiary" />
                {profile.title} · {employer.name}
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-ink-tertiary" />
                {profile.location}
              </span>
            </motion.div>
          </motion.div>

          {/* Terminal card — replaces former portrait. Static visual; palette opens via ⌘K / Ctrl+K / ? */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative md:justify-self-end w-full max-w-md"
            aria-hidden
          >
            <div className="linear-card overflow-hidden">
              {/* Header: traffic-light dots + path */}
              <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-hairline-strong" />
                  <span className="h-2.5 w-2.5 rounded-full bg-hairline-strong" />
                  <span className="h-2.5 w-2.5 rounded-full bg-hairline-strong" />
                </div>
                <span className="mono text-ink-tertiary">~/{profile.name.toLowerCase().replace(' ', '-')}</span>
              </div>

              {/* Body: terminal lines */}
              <div className="font-mono px-5 py-5 text-[13px] leading-[1.65] space-y-0.5">
                <p className="text-ink-tertiary">$ whoami</p>
                <p className="text-ink">{`${profile.title} · ${employer.name}`.toLowerCase()}</p>
                <p className="text-ink-tertiary pt-2">$ stack</p>
                <p className="text-ink">{profile.coreStack.join(' · ').toLowerCase()}</p>
                <p className="text-ink-tertiary pt-2">$ status</p>
                <p className="text-accent">{profile.availability.toLowerCase()}</p>
                <p className="pt-3 text-ink-tertiary">$ help</p>
                <p className="text-ink">
                  press <span className="text-accent">⌘K</span> (Mac) /{' '}
                  <span className="text-accent">Ctrl+K</span> (Win/Linux) /{' '}
                  <span className="text-accent">?</span>
                </p>
                <p className="pt-1 flex items-center text-ink-tertiary">
                  <span>$ </span>
                  <span className="ml-1 inline-block h-3.5 w-1.75 bg-accent terminal-cursor" />
                </p>
              </div>

              {/* Footer */}
              <div className="border-t border-hairline px-4 py-2.5 flex items-center justify-between">
                <span className="mono text-ink-tertiary">interactive</span>
                <span className="inline-flex items-center gap-1.5 mono text-ink-subtle">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  live
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
