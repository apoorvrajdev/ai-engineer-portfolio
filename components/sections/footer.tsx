'use client'

import { motion } from 'framer-motion'
import { Code2, ExternalLink, Heart, Mail, Network } from 'lucide-react'

const currentYear = new Date().getFullYear()

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Research', href: '#research' },
  { label: 'Skills', href: '#tech-stack' },
  { label: 'Open Source', href: '#open-source' },
  { label: 'Contact', href: '#contact' },
]

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/apoorvrajdev', icon: Code2 },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/apoorv-raj-1a35ba218/', icon: Network },
  { label: 'Email', href: 'mailto:apoorvrajmgr@gmail.com', icon: Mail },
]

export function FooterSection() {
  return (
    <footer className="border-t border-border/30 px-4 sm:px-6 py-16 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="mx-auto max-w-7xl"
      >
        <div className="grid gap-10 sm:gap-12 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/50 bg-primary/10 font-mono text-sm text-primary">
                AI
              </div>
              <span className="font-mono text-sm tracking-tight">
                APOORV<span className="text-gradient font-semibold">.RAJ</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground max-w-xs">
              AI/ML Engineer building intelligent systems at the intersection of machine learning and software engineering.
            </p>
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span>Available for new projects</span>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">Navigation</p>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(link.href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="group flex items-center gap-2 font-mono text-sm text-muted-foreground transition-all duration-200 hover:text-primary"
                  >
                    <span className="opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 text-primary">{'>'}</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">Connect</p>
            <div className="space-y-2">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={link.label}
                    className="group flex items-center gap-3 rounded-lg p-2 -ml-2 font-mono text-sm text-muted-foreground transition-all duration-200 hover:text-primary"
                  >
                    <Icon className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
                    <span>{link.label}</span>
                    {link.href.startsWith('http') && (
                      <ExternalLink className="h-3 w-3 opacity-0 transition-all duration-200 group-hover:opacity-100" />
                    )}
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 sm:mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/30 pt-8 sm:flex-row">
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <span>Built with</span>
            <Heart className="h-3 w-3 text-destructive" />
            <span>&amp; Next.js</span>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={link.label}
                  className="text-muted-foreground/50 transition-all duration-300 hover:text-primary hover:scale-110"
                >
                  <Icon className="h-5 w-5" />
                </a>
              )
            })}
          </div>

          <p className="font-mono text-xs text-muted-foreground text-center sm:text-right">
            © {currentYear} Apoorv Raj — All rights reserved
          </p>
        </div>
      </motion.div>
    </footer>
  )
}

