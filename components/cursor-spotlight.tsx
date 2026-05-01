'use client'

import { useEffect } from 'react'

export function CursorSpotlight() {
  useEffect(() => {
    const media = globalThis.matchMedia('(hover: hover) and (pointer: fine)')
    if (!media.matches) return
    const root = document.documentElement
    let mouseX = 0
    let mouseY = 0
    let frameId = 0

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX
      mouseY = event.clientY
    }

    const updateCursor = () => {
      root.style.setProperty('--cursor-x', `${mouseX}px`)
      root.style.setProperty('--cursor-y', `${mouseY}px`)
      frameId = globalThis.requestAnimationFrame(updateCursor)
    }

    globalThis.addEventListener('mousemove', handleMouseMove, { passive: true })
    frameId = globalThis.requestAnimationFrame(updateCursor)

    return () => {
      globalThis.removeEventListener('mousemove', handleMouseMove)
      globalThis.cancelAnimationFrame(frameId)
    }
  }, [])

  return <div aria-hidden="true" className="cursor-spotlight" />
}
