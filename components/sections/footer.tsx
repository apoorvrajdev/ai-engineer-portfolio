'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import { profile } from '@/data/profile'
import { useRevealProps } from '@/components/motion/reveal'
import { scrollToSection } from '@/lib/scroll'

const currentYear = new Date().getFullYear()

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Research', href: '#research' },
  { label: 'Stack', href: '#tech-stack' },
  { label: 'Contact', href: '#contact' },
]

const socialLinks = [
  { label: 'GitHub', href: profile.links.github, icon: Github },
  { label: 'LinkedIn', href: profile.links.linkedin, icon: Linkedin },
  { label: 'Email', href: `mailto:${profile.email}`, icon: Mail },
]

export function FooterSection() {
  const reveal = useRevealProps({ y: 12 })

  return (
    <footer className="border-t border-hairline bg-canvas">
      <motion.div
        {...reveal}
        className="container-shell py-16 md:py-20"
      >
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr] md:gap-16">
          <div>
            <a href="#home" className="inline-flex items-center gap-2.5">
              <span className="relative flex h-6 w-6 items-center justify-center rounded-md bg-accent">
                <span className="font-mono text-[11px] font-semibold text-white">{profile.initials}</span>
              </span>
              <span className="text-[14px] font-medium tracking-tight text-ink">{profile.name}</span>
            </a>
            <p className="mt-5 body-default text-ink-subtle max-w-md">{profile.tagline}</p>
            <div className="mt-6 inline-flex items-center gap-2 status-pill">
              <span className="dot" />
              {profile.availability}
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
                      scrollToSection(link.href.replace('#', ''))
                    }}
                    className="inline-flex py-1 body-sm text-ink-subtle transition-colors hover:text-ink"
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
                      className="inline-flex items-center gap-2 py-1 body-sm text-ink-subtle transition-colors hover:text-ink"
                    >
                      <Icon className="h-3.5 w-3.5" />
                      {link.label}
                    </a>
                  </li>
                )
              })}
            </ul>
            <p className="mt-5 mono text-ink-tertiary">
              <a href={`mailto:${profile.email}`} className="hover:text-ink transition-colors">
                {profile.email}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-hairline pt-6 sm:flex-row sm:items-center">
          <p className="mono text-ink-tertiary">© {currentYear} {profile.name} · All rights reserved</p>
          <p className="mono text-ink-tertiary">Built with Next.js · Tailwind CSS · Framer Motion</p>
        </div>
      </motion.div>
    </footer>
  )
}
