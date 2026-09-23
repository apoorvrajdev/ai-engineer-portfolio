/**
 * Scrolls to a section, jumping instead of gliding when the visitor asks for
 * reduced motion. CSS `scroll-behavior` does not apply to `scrollIntoView`
 * options, so the preference has to be read here.
 */
export function scrollToSection(id: string) {
  if (typeof window === 'undefined') return

  const behavior: ScrollBehavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 'auto'
    : 'smooth'

  if (id === 'home') {
    window.scrollTo({ top: 0, behavior })
    return
  }

  document.getElementById(id)?.scrollIntoView({ behavior, block: 'start' })
}
