'use client'

import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/section-wrapper'
import { Code2, ExternalLink, Mail, Network } from 'lucide-react'

const socialLinks = [
  {
    label: 'Email',
    handle: 'apoorvrajmgr@gmail.com',
    href: 'mailto:apoorvrajmgr@gmail.com',
    icon: Mail,
  },
  {
    label: 'LinkedIn',
    handle: '/in/apoorv-raj-1a35ba218',
    href: 'https://www.linkedin.com/in/apoorv-raj-1a35ba218/',
    icon: Network,
  },
  {
    label: 'GitHub',
    handle: 'github.com/apoorvrajdev',
    href: 'https://github.com/apoorvrajdev',
    icon: Code2,
  },
]

export function ContactSection() {
  return (
    <SectionWrapper id="contact">
      <div className="grid gap-12 sm:gap-16 lg:grid-cols-2">
        {/* Left — CTA text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="space-y-6 sm:space-y-8"
        >
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-primary">Contact</p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-balance">
              {"Let's build something "}
              <span className="text-gradient">intelligent</span>
            </h2>
          </div>

          <p className="max-w-md text-base sm:text-lg text-muted-foreground leading-relaxed">
            Open to collaborations, research opportunities, and ambitious AI
            engineering projects. If you’re building something that matters, let’s
            talk architecture, implementation, and launch strategy.
          </p>

          <div className="pt-2">
            <a
              href="mailto:apoorvrajmgr@gmail.com"
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-xl border border-primary bg-primary/10 px-8 py-4 font-mono text-sm text-primary transition-all duration-500 hover:text-primary-foreground active:scale-[0.98] w-full sm:w-auto"
            >
              <span className="relative z-10">Send a Message</span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">→</span>
              <span className="absolute inset-0 -translate-x-full bg-primary transition-transform duration-500 group-hover:translate-x-0" />
            </a>
          </div>
        </motion.div>

        {/* Right — social links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          className="space-y-4"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] sm:tracking-[0.35em] text-muted-foreground">
            Find me elsewhere
          </p>
          <div className="space-y-2">
            {socialLinks.map((link, index) => {
              const Icon = link.icon
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.08, ease: [0.4, 0, 0.2, 1] }}
                  className="group flex items-center justify-between gap-4 rounded-xl border border-transparent p-4 transition-all duration-300 hover:border-border/50 hover:bg-card/50 glass hover-lift active:bg-secondary/30"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 bg-secondary/50 transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary/10">
                      <Icon className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:text-primary" />
                    </div>
                    <span className="font-mono text-sm font-medium transition-colors group-hover:text-gradient">
                      {link.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-muted-foreground truncate">{link.handle}</span>
                    {link.href.startsWith('http') && (
                      <ExternalLink className="h-3 w-3 text-muted-foreground/50 opacity-0 transition-all duration-300 group-hover:opacity-100" />
                    )}
                  </div>
                </motion.a>
              )
            })}
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

