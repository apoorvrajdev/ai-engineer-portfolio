'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'

const currentYear = new Date().getFullYear()

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Research', href: '#research' },
  { label: 'Stack', href: '#tech-stack' },
  { label: 'Open source', href: '#open-source' },
  { label: 'Contact', href: '#contact' },
]

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/apoorvrajdev', icon: Github },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/apoorv-raj-1a35ba218/', icon: Linkedin },
  { label: 'Email', href: 'mailto:apoorvrajmgr@gmail.com', icon: Mail },
]

export function FooterSection() {
  return (
    <footer className="border-t border-hairline bg-canvas">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="container-shell py-16 md:py-20"
      >
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr] md:gap-16">
          <div>
            <a href="#home" className="inline-flex items-center gap-2.5">
              <span className="relative flex h-6 w-6 items-center justify-center rounded-md bg-accent">
                <span className="font-mono text-[11px] font-semibold text-white">AR</span>
              </span>
              <span className="text-[14px] font-medium tracking-tight text-ink">Apoorv Raj</span>
            </a>
            <p className="mt-5 body-default text-ink-subtle max-w-md">
              AI Engineer building intelligent systems at the intersection of machine learning and software engineering.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 status-pill">
              <span className="dot" />
              Available for new projects
            </div>
          </div>

          <div>
            <p className="eyebrow">Pages</p>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      document
                        .getElementById(link.href.replace('#', ''))
                        ?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="body-sm text-ink-subtle transition-colors hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Connect</p>
            <ul className="mt-4 space-y-2.5">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-2 body-sm text-ink-subtle transition-colors hover:text-ink"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {link.label}
                    </a>
                  </li>
                )
              })}
            </ul>
            <p className="mt-5 mono text-ink-tertiary">
              <a href="mailto:apoorvrajmgr@gmail.com" className="hover:text-ink transition-colors">
                apoorvrajmgr@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-hairline pt-6 sm:flex-row sm:items-center">
          <p className="mono text-ink-tertiary">© {currentYear} Apoorv Raj · All rights reserved</p>
          <p className="mono text-ink-tertiary">Built with Next.js · Tailwind CSS · Framer Motion</p>
        </div>
      </motion.div>
    </footer>
  )
}
