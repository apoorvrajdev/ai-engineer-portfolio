import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { profile } from '@/data/profile'

/**
 * Shared so a route that calls `notFound()` can return the same title from its
 * own `generateMetadata`. Without that the server sends this title and the
 * client then falls back to the layout's, and the tab label changes on hydration.
 */
export const NOT_FOUND_TITLE = `Page not found | ${profile.name}`

// Next emits `noindex` for not-found routes on its own, so only the title is
// set here — declaring `robots` as well would duplicate the meta tag.
export const metadata: Metadata = {
  title: NOT_FOUND_TITLE,
}

export default function NotFound() {
  return (
    <main id="main-content" tabIndex={-1} className="flex min-h-screen items-center">
      <div className="container-shell">
        <div className="max-w-2xl space-y-6">
          <p className="eyebrow text-ink-tertiary">Error 404</p>

          <h1 className="display-lg text-ink text-balance">
            This page doesn&apos;t exist.
          </h1>

          <p className="subhead max-w-[52ch]">
            The address may be mistyped, or the page may have been renamed since it was linked.
            Everything published lives on the home page.
          </p>

          <div className="pt-1">
            <Link href="/" className="btn-primary btn-primary-lg">
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
