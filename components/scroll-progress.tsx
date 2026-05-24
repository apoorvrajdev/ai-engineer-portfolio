'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  })

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-70 h-px bg-transparent">
      <motion.div
        style={{ scaleX, backgroundColor: 'var(--accent)' }}
        className="h-full origin-left"
      />
    </div>
  )
}
