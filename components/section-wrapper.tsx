'use client'

import { ReactNode } from 'react'
import { Reveal } from '@/components/motion/reveal'

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  id?: string
}

export function SectionWrapper({ children, className = '', id }: Readonly<SectionWrapperProps>) {
  return (
    <section
      id={id}
      className={`section-spacing border-t border-border/30 ${className}`}
    >
      <Reveal className="container-shell">
        {children}
      </Reveal>
    </section>
  )
}
