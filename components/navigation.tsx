'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { openCommandPalette } from '@/components/command-palette'
import { ThemeToggle } from '@/components/theme-toggle'
import { profile } from '@/data/profile'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Research', href: '#research' },
  { label: 'Open source', href: '#open-source' },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeHash, setActiveHash] = useState('#home')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const ids = ['home', ...navLinks.map((l) => l.href.replace('#', '')), 'contact']
    const observers: IntersectionObserver[] = []
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveHash(`#${id}`)
        },
        { threshold: 0.3 },
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavScroll = (href: string) => {
    const elementId = href.replace('#', '')
    if (elementId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setActiveHash(href)
      setIsOpen(false)
      return
    }
    const target = document.getElementById(elementId)
    if (!target) return
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setIsOpen(false)
    setActiveHash(href)
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-colors duration-200',
        scrolled
          ? 'bg-canvas/85 backdrop-blur-xl border-b border-hairline'
          : 'bg-transparent border-b border-transparent',
      )}
    >
      <div className="container-shell">
        <nav className="flex h-14 items-center justify-between">
          {/* Wordmark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault()
              handleNavScroll('#home')
            }}
            aria-label="Home"
            className="group inline-flex items-center gap-2.5"
          >
            <span className="relative flex h-6 w-6 items-center justify-center">
              <span
                className="absolute inset-0 rounded-md"
                style={{ background: 'var(--accent)' }}
                aria-hidden
              />
              <span className="relative font-mono text-[11px] font-semibold text-white">{profile.initials}</span>
            </span>
            <span className="text-[14px] font-medium tracking-tight text-ink">
              {profile.name}
            </span>
          </a>

          {/* Center links — desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeHash === link.href
              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleNavScroll(link.href)}
                  className={cn(
                    'px-3 py-1.5 text-[13.5px] font-medium rounded-md transition-colors duration-150',
                    isActive
                      ? 'text-ink'
                      : 'text-ink-subtle hover:text-ink',
                  )}
                >
                  {link.label}
                </button>
              )
            })}
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={openCommandPalette}
              aria-label="Open command palette"
              className="hidden md:inline-flex items-center gap-1 rounded-md border border-hairline bg-surface-1 px-2 py-1 font-mono text-[11px] text-ink-tertiary transition-colors hover:border-accent hover:text-ink"
            >
              <span aria-hidden>⌘</span>
              <span>K</span>
            </button>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex btn-tertiary"
            >
              GitHub
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                handleNavScroll('#contact')
              }}
              className="hidden sm:inline-flex btn-primary"
            >
              Get in touch
            </a>

            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-hairline bg-surface-1 text-ink hover:bg-surface-2"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out border-t border-hairline',
          isOpen ? 'max-h-105 opacity-100' : 'max-h-0 opacity-0 border-0',
        )}
      >
        <div className="container-shell py-3">
          <div className="flex flex-col">
            {navLinks.map((link) => {
              const isActive = activeHash === link.href
              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleNavScroll(link.href)}
                  className={cn(
                    'rounded-md px-3 py-2.5 text-left text-[14px] font-medium transition-colors',
                    isActive ? 'bg-surface-1 text-ink' : 'text-ink-subtle hover:bg-surface-1 hover:text-ink',
                  )}
                >
                  {link.label}
                </button>
              )
            })}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                handleNavScroll('#contact')
              }}
              className="mt-2 btn-primary w-full"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
