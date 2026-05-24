'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

const BUILDS = [
  'real-time fraud systems',
  'multimodal AI pipelines',
  'distributed LLM inference',
  'clinical decision support',
  'AI-native cloud platforms',
] as const

// Typewriter cycle: type → pause → delete → next word → repeat
function useTypewriter(words: readonly string[], typeMs = 80, deleteMs = 45, holdMs = 1400) {
  const [text, setText] = useState(words[0])
  const [wordIndex, setWordIndex] = useState(0)
  const [phase, setPhase] = useState<'holding' | 'deleting' | 'typing'>('holding')

  useEffect(() => {
    const current = words[wordIndex]
    let t: ReturnType<typeof setTimeout>

    if (phase === 'holding') {
      t = setTimeout(() => setPhase('deleting'), holdMs)
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        t = setTimeout(() => setText(current.slice(0, text.length - 1)), deleteMs)
      } else {
        const next = (wordIndex + 1) % words.length
        setWordIndex(next)
        setPhase('typing')
      }
    } else {
      const target = words[wordIndex]
      if (text.length < target.length) {
        t = setTimeout(() => setText(target.slice(0, text.length + 1)), typeMs)
      } else {
        setPhase('holding')
      }
    }
    return () => clearTimeout(t)
  }, [text, wordIndex, phase, words, typeMs, deleteMs, holdMs])

  return text
}

export function HeroSection() {
  const building = useTypewriter(BUILDS)

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
                Available for new work
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="display-xl text-ink max-w-[28ch] text-balance"
              aria-label="Building production-grade ML systems, end to end."
            >
              Building{' '}
              <span className="accent-phrase">
                <span aria-hidden>{building}</span>
                <span
                  className="terminal-cursor ml-1 inline-block h-[0.8em] w-[0.06em] translate-y-[0.04em] bg-accent align-baseline"
                  aria-hidden
                />
              </span>
              , end to end.
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
                AI Engineer · Node2.io
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-ink-tertiary" />
                India · Remote
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
                <span className="mono text-ink-tertiary">~/apoorv-raj</span>
              </div>

              {/* Body: terminal lines */}
              <div className="font-mono px-5 py-5 text-[13px] leading-[1.65] space-y-0.5">
                <p className="text-ink-tertiary">$ whoami</p>
                <p className="text-ink">ai engineer · node2.io</p>
                <p className="text-ink-tertiary pt-2">$ stack</p>
                <p className="text-ink">python · tensorflow · pytorch · fastapi</p>
                <p className="text-ink-tertiary pt-2">$ status</p>
                <p className="text-accent">open to opportunities</p>
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
