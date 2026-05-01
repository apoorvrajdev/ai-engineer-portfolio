'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Download, Sparkles } from 'lucide-react'

const roles = [
  'production-grade AI systems',
  'neural network architectures',
  'computer vision pipelines',
  'NLP & LLM solutions',
  'intelligent data products',
]

const terminalLines = [
  { prefix: '$', text: 'python train.py --model bert-large', color: 'text-foreground' },
  { prefix: '>', text: 'Loading dataset: CoNLL-2003 (50K samples)', color: 'text-muted-foreground' },
  { prefix: '>', text: 'Epoch 12/20 loss: 0.0142 F1: 0.923', color: 'text-muted-foreground' },
  { prefix: '>', text: 'Best model saved → checkpoints/bert_ner_v3', color: 'text-primary' },
  { prefix: '$', text: 'python evaluate.py --split test', color: 'text-foreground' },
  { prefix: '>', text: 'Precision: 91.8%', color: 'text-primary' },
  { prefix: '>', text: 'Recall: 92.9%', color: 'text-primary' },
  { prefix: '>', text: 'F1: 92.3%', color: 'text-primary' },
  { prefix: '>', text: 'Exporting ONNX → production/model.onnx', color: 'text-muted-foreground' },
]

export function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const targetText = roles[currentRole]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < targetText.length) {
            setDisplayText(targetText.slice(0, displayText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1))
          } else {
            setIsDeleting(false)
            setCurrentRole((prev) => (prev + 1) % roles.length)
          }
        }
      },
      isDeleting ? 45 : 90,
    )
    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentRole])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
  }

  return (
    <section className="relative px-4 sm:px-6 pt-28 sm:pt-36 pb-16 sm:pb-24">
      {/* Background layers */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_14%_18%,oklch(0.86_0.08_218/0.42),transparent_36%),radial-gradient(circle_at_84%_16%,oklch(0.79_0.09_243/0.34),transparent_42%),linear-gradient(165deg,oklch(0.98_0.003_95),oklch(0.95_0.01_240))] dark:bg-[radial-gradient(circle_at_14%_18%,oklch(0.56_0.1_218/0.34),transparent_40%),radial-gradient(circle_at_84%_16%,oklch(0.5_0.11_243/0.28),transparent_46%),linear-gradient(165deg,oklch(0.16_0.01_257),oklch(0.14_0.02_247))]" />
      <div className="hero-gradient-drift absolute inset-0 z-0" />
      <div className="absolute inset-0 z-0 bg-[linear-gradient(180deg,transparent,oklch(0.985_0.002_95/0.86)_75%)] dark:bg-[linear-gradient(180deg,transparent,oklch(0.14_0.01_257/0.88)_72%)]" />

      {/* Floating orbs */}
      <motion.div
        className="absolute -left-24 top-20 z-0 h-96 w-96 rounded-full bg-primary/35 blur-[120px]"
        animate={{ x: [0, 18, 0], y: [0, -14, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-20 bottom-18 z-0 h-[24rem] w-[24rem] rounded-full bg-accent/30 blur-[130px]"
        animate={{ x: [0, -16, 0], y: [0, 14, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center lg:min-h-[70vh]">

          {/* Left column - text */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8 sm:space-y-10"
          >
            <div className="space-y-4">
              <motion.p
                variants={itemVariants}
                className="font-mono text-xs tracking-[0.18em] text-primary/90"
              >
                Welcome to my portfolio.
              </motion.p>

              <motion.h1
                variants={itemVariants}
                className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl text-balance"
              >
                <span className="text-black dark:text-white">APOORV RAJ</span>
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary"
              >
                AI Engineer · Building Scalable AI Systems for Real-World Impact
              </motion.p>

              <motion.h2
                variants={itemVariants}
                className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-balance"
              >
                <span style={{ color: '#1f3a8a' }}>Building</span>{' '}
                <span className="text-gradient typing-cursor">
                  {displayText}
                </span>
              </motion.h2>
            </div>

            <motion.p
              variants={itemVariants}
              className="max-w-lg text-base sm:text-lg leading-relaxed text-muted-foreground"
            >
              I design and build production-grade AI systems that transform data into intelligent products — from model
              architecture to frontend delivery.
            </motion.p>

            {/* CTA buttons (template sliding-fill style) */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-lg border border-primary bg-primary/10 px-7 py-3.5 font-mono text-sm text-primary transition-all duration-500 hover:text-primary-foreground active:scale-[0.98]"
              >
                <span className="relative z-10">Explore Projects</span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
                <span className="absolute inset-0 -translate-x-full bg-primary transition-transform duration-500 group-hover:translate-x-0" />
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 rounded-lg border border-border px-7 py-3.5 font-mono text-sm text-muted-foreground transition-all duration-300 hover:border-foreground hover:text-foreground hover:bg-secondary/50 active:scale-[0.98]"
              >
                <Download className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                <span>Download Resume</span>
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="group inline-flex items-center justify-center gap-3 rounded-lg border border-border px-7 py-3.5 font-mono text-sm text-muted-foreground transition-all duration-300 hover:border-foreground hover:text-foreground hover:bg-secondary/50 active:scale-[0.98]"
              >
                <span>Get in Touch</span>
                <span className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                  →
                </span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right column - terminal card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="relative"
          >
            <div className="relative rounded-xl border border-border bg-card/60 glass p-5 sm:p-8 hover-lift">
              {/* Terminal header dots */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-destructive/60 transition-colors hover:bg-destructive" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/60 transition-colors hover:bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-primary/60 transition-colors hover:bg-primary" />
              </div>
              <div className="absolute top-3.5 left-1/2 -translate-x-1/2 bg-background/50 rounded-md px-3 py-1 font-mono text-xs text-muted-foreground">
                terminal://apoorv-raj
              </div>

              <div className="mt-8 space-y-2">
                {terminalLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.12, ease: 'easeOut' }}
                    className={`flex items-start gap-2 font-mono text-[11px] sm:text-xs leading-relaxed ${line.color}`}
                  >
                    <span className="shrink-0 text-primary/60 select-none">{line.prefix}</span>
                    <span>{line.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -right-2 sm:-right-6 -top-2 sm:-top-6 rounded-lg border border-primary/40 bg-primary/15 glass px-3 sm:px-4 py-1.5 font-mono text-[11px] sm:text-xs text-primary animate-float">
              <span className="flex items-center gap-2">
                <Sparkles className="h-3 w-3" />
                AI Engineer
              </span>
            </div>
            <div
              className="absolute -bottom-3 sm:-bottom-6 -left-2 sm:-left-6 rounded-lg border border-border bg-card glass px-3 sm:px-4 py-1.5 font-mono text-[11px] sm:text-xs text-muted-foreground animate-float"
              style={{ animationDelay: '1s' }}
            >
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                Available for Work
              </span>
            </div>

            {/* Glow behind card */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full bg-primary/5 blur-3xl" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2">
        <span className="font-mono text-xs text-muted-foreground">scroll</span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.a
          href="#about"
          onClick={(e) => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }) }}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="rounded-full border border-border/80 p-1.5 text-muted-foreground hover:text-foreground"
          aria-label="Scroll to about section"
        >
          <ArrowDown className="h-4 w-4" />
        </motion.a>
      </div>
    </section>
  )
}
