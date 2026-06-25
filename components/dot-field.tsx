'use client'

import { useEffect, useRef } from 'react'

import { cn } from '@/lib/utils'

// Single-accent palette pulled straight from the design system — no stray hues.
const PALETTE = ['#5e6ad2', '#8b5cf6', '#6d7de3', '#7f8ff8'] as const

type Rgb = { r: number; g: number; b: number }

function hexToRgb(hex: string): Rgb {
  const n = Number.parseInt(hex.slice(1), 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

interface DotFieldProps {
  className?: string
  /** Pixel gap between dots. Larger = sparser, lighter to render. */
  gap?: number
  /** Base dot radius in CSS pixels. */
  radius?: number
  /** Resting opacity ceiling for a single dot. */
  baseOpacity?: number
}

/**
 * Subtle animated dot grid for section backgrounds. Pure Canvas 2D (no WebGL
 * deps), SSR-safe (client-only, `aria-hidden`, `pointer-events-none`), and it
 * renders a single static frame when `prefers-reduced-motion` is set.
 */
export function DotField({
  className,
  gap = 30,
  radius = 1.3,
  baseOpacity = 0.4,
}: DotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const parent = canvas.parentElement ?? canvas
    const colors = PALETTE.map(hexToRgb)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const INTERACT_RADIUS = 130

    let width = 0
    let height = 0
    let raf = 0
    let dots: { x: number; y: number; c: Rgb; phase: number }[] = []

    // Pointer in CSS px relative to the canvas; lerped toward the raw target.
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: false }

    const build = () => {
      const rect = parent.getBoundingClientRect()
      width = rect.width
      height = rect.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      dots = []
      let i = 0
      for (let y = gap / 2; y < height; y += gap) {
        for (let x = gap / 2; x < width; x += gap) {
          dots.push({
            x,
            y,
            c: colors[i % colors.length],
            phase: (x * 0.013 + y * 0.017) % (Math.PI * 2),
          })
          i++
        }
      }
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height)
      pointer.x += (pointer.tx - pointer.x) * 0.1
      pointer.y += (pointer.ty - pointer.y) * 0.1

      const time = t * 0.001
      for (const d of dots) {
        const twinkle = reduceMotion ? 0.5 : 0.5 + 0.5 * Math.sin(time * 0.6 + d.phase)
        let alpha = baseOpacity * (0.55 + 0.45 * twinkle)
        let r = radius

        if (pointer.active) {
          const dist = Math.hypot(d.x - pointer.x, d.y - pointer.y)
          if (dist < INTERACT_RADIUS) {
            const f = 1 - dist / INTERACT_RADIUS
            alpha += f * 0.5
            r += f * 0.9
          }
        }

        ctx.beginPath()
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${d.c.r},${d.c.g},${d.c.b},${Math.min(alpha, 0.85)})`
        ctx.fill()
      }
    }

    const loop = (t: number) => {
      draw(t)
      raf = requestAnimationFrame(loop)
    }

    // `raf === 0` doubles as the "stopped" flag, so resume can't double-schedule.
    const start = () => {
      if (!raf) raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      if (raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      pointer.active = x >= 0 && x <= width && y >= 0 && y <= height
      pointer.tx = x
      pointer.ty = y
    }

    const ro = new ResizeObserver(() => {
      build()
      if (reduceMotion) draw(0)
    })
    ro.observe(parent)
    build()

    if (reduceMotion) {
      draw(0)
      return () => ro.disconnect()
    }

    window.addEventListener('mousemove', onMove, { passive: true })

    // Pause the RAF loop whenever the hero scrolls out of view, resume on return.
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 },
    )
    io.observe(parent)

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('mousemove', onMove)
    }
  }, [gap, radius, baseOpacity])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn('pointer-events-none block h-full w-full', className)}
    />
  )
}
