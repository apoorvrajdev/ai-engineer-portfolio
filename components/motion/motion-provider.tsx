'use client'

import { MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * Honours the visitor's reduced-motion setting for every framer-motion
 * animation in the tree. Individual components additionally drop their entry
 * animation entirely (see `useRevealProps`); this is the backstop.
 */
export function MotionProvider({ children }: Readonly<{ children: ReactNode }>) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
