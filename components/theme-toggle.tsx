'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { useMounted } from '@/hooks/use-mounted'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const mounted = useMounted()

  const isDark = mounted ? resolvedTheme === 'dark' : true
  const nextLabel = isDark ? 'Switch to light mode' : 'Switch to dark mode'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={nextLabel}
      title={nextLabel}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-hairline bg-surface-1 text-ink-tertiary transition-colors hover:border-accent hover:text-ink"
    >
      {/* Render both icons; CSS shows the right one once mounted to avoid hydration mismatch */}
      <Sun className={`h-3.5 w-3.5 ${mounted && isDark ? 'inline' : 'hidden'}`} aria-hidden />
      <Moon className={`h-3.5 w-3.5 ${mounted && !isDark ? 'inline' : 'hidden'}`} aria-hidden />
      {!mounted ? <span className="h-3.5 w-3.5" aria-hidden /> : null}
    </button>
  )
}
