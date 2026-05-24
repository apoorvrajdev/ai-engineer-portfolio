'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

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
    <section id="home" className="relative">
      <div className="container-shell relative pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid items-center gap-14 md:grid-cols-[1.15fr_1fr] md:gap-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2">
              <span className="status-pill">
                <span className="dot" />
                Available for new work
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="display-xl text-ink max-w-[20ch]"
            >
              Building <span className="accent-phrase">production-grade</span> ML systems, end to end.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="subhead max-w-[58ch]"
            >
              I&apos;m Apoorv Raj — AI Engineer at Node2.io, IEEE-published on multimodal
              vision-language models. I work the full ML stack: model development, data pipelines,
              REST APIs, and CI/CD-integrated deployment.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3 pt-2"
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
                AI Engineer · Node2.io
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-ink-tertiary" />
                India · Remote
              </span>
            </motion.div>
          </motion.div>

          {/* Portrait panel — surface-1 with hairline; minimal chrome */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative md:justify-self-end w-full max-w-md"
          >
            <div className="linear-card overflow-hidden">
              <div className="relative aspect-4/5 overflow-hidden bg-surface-2">
                {/* eslint-disable-next-line @next/next/no-img-element -- image optimization disabled in next.config */}
                <img
                  src="/profile.jpg"
                  alt="Apoorv Raj portrait"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
              <div className="hairline-t px-5 py-3 flex items-center justify-between">
                <span className="mono text-ink-subtle">apoorv-raj</span>
                <span className="status-pill">
                  <span className="dot" />
                  online
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
