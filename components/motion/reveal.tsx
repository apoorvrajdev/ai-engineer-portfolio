'use client'

import { motion, useReducedMotion, type MotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

const EASE = [0.22, 1, 0.36, 1] as const

export interface RevealOptions {
  delay?: number
  /** Vertical offset to animate from. */
  y?: number
  /** Horizontal offset, for the few places that slide sideways. */
  x?: number
  once?: boolean
  duration?: number
  margin?: string
}

function buildRevealProps(prefersReducedMotion: boolean | null, options: RevealOptions = {}): MotionProps {
  // Reduced motion means the element renders where it belongs, with no fade
  // and no offset. The values are explicit rather than `initial: false`, so
  // they also overwrite the hidden inline styles that came from the server.
  if (prefersReducedMotion) {
    return {
      initial: { opacity: 1, x: 0, y: 0 },
      animate: { opacity: 1, x: 0, y: 0 },
      transition: { duration: 0 },
    }
  }

  const { delay = 0, y = 14, x, once = true, duration = 0.4, margin = '-80px' } = options

  return {
    initial: { opacity: 0, ...(x === undefined ? { y } : { x }) },
    whileInView: { opacity: 1, ...(x === undefined ? { y: 0 } : { x: 0 }) },
    viewport: { once, margin },
    transition: { duration, delay, ease: EASE },
  }
}

/** Scroll-reveal props for a single element. */
export function useRevealProps(options: RevealOptions = {}): MotionProps {
  return buildRevealProps(useReducedMotion(), options)
}

/**
 * Returns a builder, for lists where each item needs its own delay and hooks
 * cannot be called inside the map.
 */
export function useRevealFactory(): (options?: RevealOptions) => MotionProps {
  const prefersReducedMotion = useReducedMotion()
  return (options: RevealOptions = {}) => buildRevealProps(prefersReducedMotion, options)
}

interface RevealProps extends RevealOptions {
  children: ReactNode
  className?: string
}

export function Reveal({ children, className, delay = 0, y = 14, once = true }: Readonly<RevealProps>) {
  const reveal = useRevealProps({ delay, y, once })

  return (
    <motion.div {...reveal} className={className}>
      {children}
    </motion.div>
  )
}

export const staggerContainer: MotionProps = {
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, margin: '-80px' },
  variants: {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
}

export const revealItem = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeInOut' },
  },
}
