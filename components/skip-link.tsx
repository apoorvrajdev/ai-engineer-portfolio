/**
 * First focusable element on every page. Stays off-screen until it takes
 * focus, then lands above the nav so a keyboard visitor can jump the header
 * instead of tabbing through it on every route.
 */
export function SkipLink() {
  return (
    <a href="#main-content" className="skip-link btn-primary">
      Skip to content
    </a>
  )
}
