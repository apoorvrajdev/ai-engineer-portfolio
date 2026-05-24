'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'
import { SectionWrapper } from '@/components/section-wrapper'
import { SectionHeading } from '@/components/section-heading'

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
    icon: Linkedin,
  },
  {
    label: 'GitHub',
    handle: 'github.com/apoorvrajdev',
    href: 'https://github.com/apoorvrajdev',
    icon: Github,
  },
] as const

export function ContactSection() {
  return (
    <SectionWrapper id="contact">
      <SectionHeading
        eyebrow="Contact"
        title="Building something"
        highlight="serious?"
        description="Open to elite AI engineering roles, founding-engineer work, and research collaboration. If the system has to ship under real load — let&rsquo;s talk."
      />

      <div className="mt-12 grid items-stretch gap-3 md:grid-cols-[1.2fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="linear-card-featured flex flex-col justify-between gap-8 p-7 md:p-8"
        >
          <div>
            <p className="eyebrow text-accent">Direct line</p>
            <h3 className="mt-3 display-md text-ink text-balance">Email is the fastest channel.</h3>
            <p className="mt-4 body-lg text-ink-muted max-w-md">
              Architecture, data, deployment — describe the system. The more specific, the easier it is to tell you whether I&rsquo;m the right engineer for it.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a href="mailto:apoorvrajmgr@gmail.com" className="btn-primary btn-primary-lg">
              <Mail className="h-4 w-4" />
              apoorvrajmgr@gmail.com
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary btn-secondary-lg"
            >
              Resume
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-px overflow-hidden rounded-xl border border-hairline bg-hairline"
        >
          {socialLinks.map((link, index) => {
            const Icon = link.icon
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-1 items-center justify-between gap-4 bg-surface-1 px-6 py-5 transition-colors hover:bg-surface-2"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md border border-hairline bg-surface-2 text-ink-muted group-hover:text-ink group-hover:border-hairline-strong">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="body-default text-ink font-medium">{link.label}</p>
                    <p className="mono text-ink-subtle">{link.handle}</p>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-ink-tertiary transition-colors group-hover:text-ink" />
              </motion.a>
            )
          })}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
