'use client'

import { ReactNode } from 'react'
import { Reveal } from '@/components/motion/reveal'
import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  id?: string
  /** Renders the section against a lifted surface-1 panel — used to break rhythm
      between the otherwise canvas-on-canvas sections. */
  dark?: boolean
}

export function SectionWrapper({ children, className = '', id, dark = false }: Readonly<SectionWrapperProps>) {
  return (
    <section
      id={id}
      className={cn(
        'section-spacing relative',
        dark && 'bg-surface-1/40 border-y border-hairline',
        className,
      )}
    >
      <Reveal className="container-shell">
        {children}
      </Reveal>
    </section>
  )
}
