import type { ProjectEvidence } from '@/data/projects'
import { cn } from '@/lib/utils'

/**
 * One measured figure with the population it was measured on. `population` is
 * part of the type, so a bare headline number cannot reach the page.
 */
export function EvidenceStat({ item, className }: Readonly<{ item: ProjectEvidence; className?: string }>) {
  return (
    <div
      className={cn(
        'border-l-2 pl-4',
        item.emphasis ? 'border-accent' : 'border-hairline-strong',
        className,
      )}
    >
      <p
        className={cn(
          'text-[21px] font-semibold leading-tight tracking-tight tabular-nums',
          item.emphasis ? 'text-accent-ink' : 'text-ink',
        )}
      >
        {item.value}
      </p>
      <p className="mt-1.5 body-sm text-ink-muted">{item.label}</p>
      <p className="mt-1 caption">{item.population}</p>
    </div>
  )
}
