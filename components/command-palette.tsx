'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useTheme } from 'next-themes'
import { Command } from 'cmdk'
import {
  ArrowUpRight,
  Check,
  Copy,
  ExternalLink,
  FileText,
  Github,
  Linkedin,
  Mail,
  Moon,
  Search,
  Sun,
} from 'lucide-react'

type Action =
  | { kind: 'scroll'; targetId: string }
  | { kind: 'link'; href: string }
  | { kind: 'mailto'; address: string }
  | { kind: 'copy'; text: string }
  | { kind: 'toggle-theme' }

type Item = {
  id: string
  label: string
  action: Action
  icon?: React.ComponentType<{ className?: string }>
}

type Group = { heading: string; items: Item[] }

const EMAIL = 'apoorvrajmgr@gmail.com'

const groups: Group[] = [
  {
    heading: 'Navigate',
    items: [
      { id: 'nav-about', label: 'About', action: { kind: 'scroll', targetId: 'about' } },
      { id: 'nav-work', label: 'Work', action: { kind: 'scroll', targetId: 'projects' } },
      { id: 'nav-experience', label: 'Experience', action: { kind: 'scroll', targetId: 'experience' } },
      { id: 'nav-research', label: 'Research', action: { kind: 'scroll', targetId: 'research' } },
      { id: 'nav-open-source', label: 'Open Source', action: { kind: 'scroll', targetId: 'open-source' } },
      { id: 'nav-contact', label: 'Contact', action: { kind: 'scroll', targetId: 'contact' } },
    ],
  },
  {
    heading: 'Links',
    items: [
      { id: 'link-github', label: 'GitHub', icon: Github, action: { kind: 'link', href: 'https://github.com/apoorvrajdev' } },
      { id: 'link-linkedin', label: 'LinkedIn', icon: Linkedin, action: { kind: 'link', href: 'https://www.linkedin.com/in/apoorv-raj-1a35ba218/' } },
      { id: 'link-ieee', label: 'IEEE Paper', icon: ExternalLink, action: { kind: 'link', href: 'https://ieeexplore.ieee.org/document/10675203' } },
      { id: 'link-demo', label: 'Plant Disease Demo', icon: ExternalLink, action: { kind: 'link', href: 'https://huggingface.co/spaces/workface/plant-disease-detection' } },
      { id: 'link-resume', label: 'Résumé (PDF)', icon: FileText, action: { kind: 'link', href: '/resume.pdf' } },
    ],
  },
  {
    heading: 'Actions',
    items: [
      { id: 'action-copy-email', label: 'Copy email', icon: Copy, action: { kind: 'copy', text: EMAIL } },
      { id: 'action-email', label: 'Email me', icon: Mail, action: { kind: 'mailto', address: EMAIL } },
      { id: 'action-toggle-theme', label: 'Toggle theme', icon: Sun, action: { kind: 'toggle-theme' } },
    ],
  },
]

const allItems = groups.flatMap((g) => g.items)

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)
  const lastFocusedRef = useRef<HTMLElement | null>(null)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  const close = useCallback(() => {
    setOpen(false)
  }, [])

  const openPalette = useCallback(() => {
    lastFocusedRef.current = (document.activeElement as HTMLElement) ?? null
    setOpen(true)
  }, [])

  // Keyboard triggers — listen at the document level
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      // ⌘K / Ctrl+K toggles
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((v) => {
          if (!v) lastFocusedRef.current = (document.activeElement as HTMLElement) ?? null
          return !v
        })
        return
      }
      // ? opens, only when no input/textarea/contenteditable is focused
      if (e.key === '?' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        const active = document.activeElement as HTMLElement | null
        const tag = active?.tagName?.toLowerCase()
        const isEditable =
          tag === 'input' ||
          tag === 'textarea' ||
          (active?.isContentEditable ?? false)
        if (!isEditable) {
          e.preventDefault()
          openPalette()
        }
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [openPalette])

  // Open via custom event so the nav hint button can trigger us
  useEffect(() => {
    const onOpen = () => openPalette()
    window.addEventListener('command-palette:open', onOpen)
    return () => window.removeEventListener('command-palette:open', onOpen)
  }, [openPalette])

  // Restore focus when closed
  useEffect(() => {
    if (!open && lastFocusedRef.current) {
      lastFocusedRef.current.focus?.()
    }
  }, [open])

  // Lock background scroll while open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  // Reset copied flag whenever palette closes
  useEffect(() => {
    if (!open) setCopied(false)
  }, [open])

  const runAction = useCallback((action: Action) => {
    switch (action.kind) {
      case 'scroll': {
        close()
        // Defer to next tick so the modal can unmount cleanly first
        requestAnimationFrame(() => {
          const el = document.getElementById(action.targetId)
          el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
        break
      }
      case 'link': {
        window.open(action.href, '_blank', 'noopener,noreferrer')
        close()
        break
      }
      case 'mailto': {
        window.location.href = `mailto:${action.address}`
        close()
        break
      }
      case 'copy': {
        navigator.clipboard?.writeText(action.text).then(() => {
          setCopied(true)
          window.setTimeout(() => setCopied(false), 1500)
        })
        break
      }
      case 'toggle-theme': {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
        close()
        break
      }
    }
  }, [close, resolvedTheme, setTheme])

  if (!mounted) return null

  const palette = (
    <div
      // Backdrop — clicking it closes
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close()
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') {
          e.preventDefault()
          close()
        }
      }}
      className={`fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[20vh] transition-opacity duration-150 ${
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(6px)' }}
      aria-hidden={!open}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="w-full max-w-[640px] overflow-hidden rounded-xl border border-hairline bg-surface-1 shadow-2xl"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <Command
          loop
          className="flex flex-col"
          filter={(value, search) => {
            if (!search) return 1
            return value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0
          }}
        >
          {/* Search input */}
          <div className="flex items-center gap-3 border-b border-hairline px-4 py-3">
            <Search className="h-4 w-4 text-ink-tertiary" aria-hidden />
            <Command.Input
              autoFocus
              aria-label="Search commands"
              placeholder="Search or jump to…"
              className="flex-1 bg-transparent text-[14px] text-ink placeholder:text-ink-tertiary font-mono outline-none"
            />
            <kbd className="hidden sm:inline-flex items-center rounded border border-hairline bg-canvas px-1.5 py-0.5 font-mono text-[11px] text-ink-tertiary">
              esc
            </kbd>
          </div>

          {/* List */}
          <Command.List className="max-h-[360px] overflow-y-auto p-2">
            <Command.Empty className="px-3 py-6 text-center italic text-[13px] text-ink-tertiary">
              No matches.
            </Command.Empty>

            {groups.map((group) => (
              <Command.Group
                key={group.heading}
                heading={group.heading}
                className="px-1 pb-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:pt-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.14em] [&_[cmdk-group-heading]]:text-ink-tertiary"
              >
                {group.items.map((item) => {
                  const Icon = item.icon
                  const isCopyAction = item.id === 'action-copy-email'
                  return (
                    <Command.Item
                      key={item.id}
                      value={`${group.heading} ${item.label}`}
                      onSelect={() => runAction(item.action)}
                      className="group flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-[13.5px] text-ink-muted outline-none data-[selected=true]:bg-canvas data-[selected=true]:text-ink"
                    >
                      {Icon ? (
                        <Icon className="h-3.5 w-3.5 text-ink-tertiary group-data-[selected=true]:text-accent" aria-hidden />
                      ) : (
                        <span className="h-3.5 w-3.5" aria-hidden />
                      )}
                      <span className="flex-1">{item.label}</span>
                      {isCopyAction && copied ? (
                        <span className="inline-flex items-center gap-1 font-mono text-[11px] text-accent">
                          <Check className="h-3 w-3" />
                          copied
                        </span>
                      ) : null}
                      {item.action.kind === 'link' ? (
                        <ArrowUpRight className="h-3.5 w-3.5 text-ink-tertiary opacity-0 group-data-[selected=true]:opacity-100" aria-hidden />
                      ) : null}
                    </Command.Item>
                  )
                })}
              </Command.Group>
            ))}
          </Command.List>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-hairline bg-canvas px-4 py-2.5 font-mono text-[11px] text-ink-tertiary">
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1">
                <kbd className="rounded border border-hairline bg-surface-1 px-1.5 py-0.5">↑↓</kbd>
                navigate
              </span>
              <span className="inline-flex items-center gap-1">
                <kbd className="rounded border border-hairline bg-surface-1 px-1.5 py-0.5">↵</kbd>
                select
              </span>
            </div>
            <span className="inline-flex items-center gap-1">
              <kbd className="rounded border border-hairline bg-surface-1 px-1.5 py-0.5">⌘K</kbd>
              toggle
            </span>
          </div>
        </Command>
      </div>
    </div>
  )

  // Always portal so the keyboard handlers + a11y stay above the rest of the page
  return createPortal(palette, document.body)
}

/**
 * Imperative helper — let other components (e.g. the nav ⌘K hint) open the
 * palette without needing to share React state. Dispatched as a window event.
 */
export function openCommandPalette() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent('command-palette:open'))
}
