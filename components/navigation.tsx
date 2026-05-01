'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Research', href: '#research' },
  { label: 'Skills', href: '#tech-stack' },
  { label: 'Open Source', href: '#open-source' },
  { label: 'Contact', href: '#contact' },
]

export function Navigation() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeHash, setActiveHash] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration guard for next-themes; theme cannot be read during SSR
    setMounted(true)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Track active section via IntersectionObserver
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace('#', ''))
    const observers: IntersectionObserver[] = []
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveHash(`#${id}`) },
        { threshold: 0.3 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const handleNavScroll = (href: string) => {
    const elementId = href.replace('#', '')
    const target = document.getElementById(elementId)
    if (!target) return
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setIsOpen(false)
    setActiveHash(href)
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-border/50 bg-background/80 backdrop-blur-xl shadow-sm'
          : 'bg-transparent',
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="group flex items-center gap-3"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-primary/50 bg-primary/10 font-mono text-sm text-primary transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/25">
              <span>AR</span>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link, index) => {
              const isActive = activeHash === link.href
              return (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleNavScroll(link.href)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={cn(
                    'relative px-4 py-2.5 font-mono text-xs uppercase tracking-widest transition-all duration-300 rounded-lg',
                    isActive
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50',
                    hoveredIndex === index && !isActive && 'text-foreground',
                  )}
                >
                  {/* > indicator */}
                  <span
                    className={cn(
                      'absolute left-1.5 text-primary transition-all duration-200',
                      isActive
                        ? 'opacity-100 translate-x-0'
                        : hoveredIndex === index
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-2',
                    )}
                  >
                    {'>'}
                  </span>
                  <span
                    className={cn(
                      'transition-transform duration-200',
                      (hoveredIndex === index || isActive) && 'translate-x-2',
                    )}
                  >
                    {link.label}
                  </span>
                  {/* Bottom underline indicator */}
                  <span
                    className={cn(
                      'absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-primary rounded-full transition-all duration-300',
                      isActive ? 'w-6' : hoveredIndex === index ? 'w-6' : 'w-0',
                    )}
                  />
                </button>
              )
            })}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            {/* Status pill */}
            <div className="hidden items-center gap-2.5 font-mono text-xs text-muted-foreground sm:flex px-3 py-1.5 rounded-full bg-secondary/50 border border-border/50">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span>available</span>
            </div>

            {/* Theme toggle */}
            {mounted ? (
              <button
                type="button"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card/50 text-muted-foreground transition-all duration-300 hover:border-primary/50 hover:text-primary hover:bg-primary/10"
                aria-label="Toggle color theme"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            ) : null}

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card/50 md:hidden transition-colors hover:bg-secondary"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1.5 w-5">
                <span
                  className={cn(
                    'h-0.5 bg-foreground transition-all duration-300 origin-center',
                    isOpen ? 'w-5 translate-y-2 rotate-45' : 'w-5',
                  )}
                />
                <span
                  className={cn(
                    'h-0.5 w-3.5 bg-foreground transition-all duration-300',
                    isOpen && 'opacity-0 translate-x-2',
                  )}
                />
                <span
                  className={cn(
                    'h-0.5 bg-foreground transition-all duration-300 origin-center',
                    isOpen ? 'w-5 -translate-y-2 -rotate-45' : 'w-5',
                  )}
                />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div
          className={cn(
            'overflow-hidden transition-all duration-400 md:hidden bg-background',
            isOpen ? 'max-h-96 opacity-100 pt-4' : 'max-h-0 opacity-0',
          )}
        >
          <div className="flex flex-col gap-1 border-t border-border/50 pt-4">
            {navLinks.map((link, index) => (
              <button
                key={link.label}
                type="button"
                onClick={() => handleNavScroll(link.href)}
                className="flex items-center gap-3 rounded-lg px-4 py-3.5 font-mono text-sm uppercase tracking-widest text-muted-foreground transition-all duration-200 hover:text-foreground hover:bg-secondary/50"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="text-primary">{'>'}</span>
                {link.label}
              </button>
            ))}

            {/* Mobile status */}
            <div className="mt-4 flex items-center gap-2 border-t border-border/50 pt-4 px-4">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <span className="font-mono text-xs text-muted-foreground">status: available</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
