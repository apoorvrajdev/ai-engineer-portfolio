'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  })

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] bg-transparent">
      <motion.div
        style={{ scaleX }}
        className="h-full origin-left bg-gradient-to-r from-primary via-accent to-primary opacity-90"
      />
    </div>
  )
}
