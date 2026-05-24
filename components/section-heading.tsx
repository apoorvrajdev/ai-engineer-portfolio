import { cn } from '@/lib/utils'

type HighlightColor = 'coral' | 'blue' | 'indigo' | 'yellow' | 'black'

interface SectionHeadingProps {
  eyebrow?: string
  /** Plain leading title text. */
  title: string
  /** Phrase emphasized with the lavender accent color. */
  highlight?: string
  /** Kept for API compatibility — Linear uses a single accent so this is ignored. */
  highlightColor?: HighlightColor
  description?: string
  align?: 'left' | 'center'
  /** Kept for API compatibility — both modes render on the dark canvas. */
  invert?: boolean
}

export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = 'left',
}: Readonly<SectionHeadingProps>) {
  const alignment = align === 'center' ? 'text-center mx-auto items-center' : 'text-left'

  return (
    <div className={cn('flex max-w-2xl flex-col gap-4', alignment)}>
      {eyebrow ? (
        <div className="inline-flex items-center gap-2">
          <span className="h-px w-6 bg-hairline-strong" aria-hidden />
          <p className="eyebrow text-accent">{eyebrow}</p>
        </div>
      ) : null}
      <h2 className="display-md text-ink text-balance">
        {title}
        {highlight ? (
          <>
            {' '}
            <span className="accent-phrase">{highlight}</span>
          </>
        ) : null}
      </h2>
      {description ? (
        <p className="body-lg text-ink-subtle text-pretty">{description}</p>
      ) : null}
    </div>
  )
}
