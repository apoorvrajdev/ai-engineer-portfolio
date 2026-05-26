# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## CRITICAL: Commit & Attribution Rules

**Claude Code MUST follow these rules without exception:**

1. **NEVER add `Co-Authored-By: Claude` or any AI co-author trailer to commit messages.**
2. **NEVER add `Generated with Claude Code` footers or any AI attribution.**
3. **NEVER mention Claude, Anthropic, AI, or LLMs in commit messages, code comments, file headers, or documentation.**
4. **All commits must be authored solely by:**
   - Name: `apoorvrajdev`
   - Email: `apoorvrajmgr@gmail.com`
5. **NEVER stage or commit changes on your own.** Only suggest commit messages — the user runs `git commit` themselves.
6. **NEVER push to remote.** Only the user pushes.

## Commit Message Format

Use Conventional Commits. Examples:
- `chore: initial repo scaffolding`
- `feat(projects): add new case study for X`
- `fix(nav): correct active-section highlight on scroll`
- `style(hero): tighten spacing on mobile breakpoint`
- `docs: update README with deployment notes`
- `refactor(sections): extract shared card primitive`

Keep subject under 72 characters. Body optional but explains *why*, not *what*.

## Code Standards

- TypeScript is `strict: true` — no `any` escape hatches; type all props, data files, and helpers.
- Use the path alias `@/*` for imports from the repo root.
- Compose classes with `cn()` from `@/lib/utils`; do not hand-roll clsx/tailwind-merge logic.
- Reach for the neo-brutalist primitives (`.brutal-card`, `.brutal-shadow`, `.btn-brutal`, `.highlight-*`) before writing new utility soup.
- Content edits belong in `data/*.ts`, not in components.
- Anything stateful, themed, or animated (`useState`/`useEffect`/framer-motion/next-themes) must be `'use client'`. Keep data-fetching sections as server components and delegate UI to a client child (see `github-activity.tsx`).
- `npm run build` runs `tsc` — builds fail on type errors. Run `npm run lint` and `npm run build` before suggesting a commit.

## Working Style

- Plan before implementing for any non-trivial change.
- One section/component at a time; keep diffs reviewable.
- After making changes, summarize what was done so the user can review and commit.
- Do not invent commits or push — surface a suggested message and stop.

## Commands

- `npm run dev` — start Next.js dev server
- `npm run build` — production build (also runs `tsc`; build will fail on type errors)
- `npm run start` — serve the production build
- `npm run lint` — ESLint (flat config in `eslint.config.mjs`, composing `eslint-config-next/core-web-vitals` + `/typescript`). The `resource/` directory is ignored.

There is no test suite configured.

## Build / config quirks worth knowing

- `next.config.mjs` sets `images.unoptimized: true`, so `<img>` is used directly across the site. When adding new images, prefer `<img>` and silence the lint warning inline (`// eslint-disable-next-line @next/next/no-img-element`).
- `tsconfig.json` excludes `resource/` (the Paperfolio inspiration template lives there but is not part of the app).
- Tailwind **v4** is used in CSS-first mode (`@import 'tailwindcss'` in `app/globals.css`). There is no `tailwind.config.js` — design tokens are CSS custom properties in `:root` (dark canvas) and `.light` (inverted) blocks in `globals.css`. **Tailwind v4 auto-generates utilities from any `--color-*` declared in the `@theme inline` block**, which is how `bg-background`, `text-foreground`, `border-border`, etc. resolve.
- `components.json` declares shadcn config: `style: new-york`, `baseColor: neutral`, `iconLibrary: lucide`, `rsc: true`. Add new primitives via `npx shadcn@latest add <name>` rather than hand-writing them under `components/ui/`.
- Path alias: `@/*` resolves to the repo root (see `tsconfig.json`).
- TS is `strict: true` with `target: ES6`, `moduleResolution: bundler`.
- Canonical site URL is `https://ai-engineer-portfolio-pi.vercel.app` and is **hardcoded in three places** that must be updated together: `app/layout.tsx` (`metadataBase` + OG), `app/sitemap.ts` (`SITE_URL`), and `components/structured-data.tsx` (`SITE_URL`). The OG artwork in `app/opengraph-image.tsx` also bakes the URL into the image.

## Design system: Linear-inspired dark theme

The site has been migrated off the early Paperfolio neo-brutalist palette to a Linear-inspired dark-first system. The full token spec lives in [`DESIGN.md`](DESIGN.md); the implementation lives in [`app/globals.css`](app/globals.css). The Paperfolio template in `resource/paperfolio-portfolio-template/` is kept as reference only — it is excluded from the build and from ESLint.

- **Dark-first**: canvas `#010102`, surface ladder `#0f1011 → #1c1d1e`, hairline borders (`--hairline #23252a`), no drop shadows on dark. Light mode (toggled via the nav button) inverts onto a `#ffffff` canvas with `#e6e7e9` hairlines. There is no system theme fallback — `ThemeProvider` is configured with `defaultTheme="dark"`, `enableSystem={false}`, `storageKey="theme-preference"`.
- **Single chromatic accent**: lavender `#5e6ad2` (`--accent`) is the only color used for emphasis, links, focus rings, and primary CTAs. `--accent-hover` `#828fff`, `--accent-focus` `#5e69d1`, `--accent-soft` `rgba(94,106,210,0.12)`.
- **Typography**: Onest (sans) + JetBrains Mono (mono), loaded via `next/font/google` in `app/layout.tsx`. Exposed to Tailwind as `var(--font-onest)` and `var(--font-jetbrains-mono)`.
- **Ink scale**: `--ink #f7f8f8`, `--ink-muted #d0d6e0`, `--ink-subtle #8a8f98`, `--ink-tertiary #62666d`.

### Core utility classes (in `app/globals.css`)

- `.container-shell` — page width wrapper (`max-w-7xl`, responsive padding).
- `.section-spacing` — standard vertical rhythm (`py-16 md:py-24`).
- `.linear-card` — `border: 1px solid var(--hairline)` over `var(--surface-1)`, `12px` radius, top-edge highlight (`::before` 1px gradient, hidden in light mode).
- `.linear-card-hover` — hairline strengthens to `--hairline-strong` and surface lifts to `--surface-2` on hover. The signature interaction; no translate, no shadow.
- `.linear-card-featured` — same card with an accent-tinted border for the primary project tile.
- `.btn-primary` — lavender fill, white text, accent-hover on hover. The single primary CTA.
- `.btn-secondary` — surface-1 fill with hairline border, surface-2 on hover.
- `.btn-tertiary` — text-only ink-subtle button (used for tertiary navigation actions).
- `.animate-{fade-in,fade-in-up,scale-in,float,marquee}` and `.stagger-{1..6}` — kept lightweight; no glow/gradient animations.

### Compatibility aliases (do not author new code against these)

The following classes from the previous neo-brutalist phase still exist in `globals.css` so legacy components compile without churn. They are **aliases mapped onto the Linear tokens**, not a coexisting design language. New code should use the `.linear-*` / `.btn-*` primitives above.

- `.brutal-card` → resolves to a hairline-bordered surface card (same visual as `.linear-card`).
- `.brutal-shadow{,-sm,-lg}` → `box-shadow: none` on dark. No hard offset drop-shadows.
- `.btn-brutal` / `.btn-brutal-outline` → alias to `.btn-primary` / `.btn-secondary`.
- `.highlight-{coral,blue,indigo,yellow,black}` → render as inline accent-colored text (`color: var(--accent)`), not solid-background spans. There is no multi-color highlight palette anymore.
- `--hl-coral`, `--hl-blue`, `--hl-indigo` all alias to `--accent`; `--hl-yellow` aliases to `--ink-muted`; `--hl-mint` aliases to `--success #27a644`. The `bg-hl-*` / `text-hl-*` Tailwind utilities still resolve, but produce a single-accent rendering.

### Known design-system gaps

- **No `prefers-reduced-motion` support yet** — `globals.css` has no `@media (prefers-reduced-motion: reduce)` block, and the framer-motion primitives in `components/motion/*` do not consult `useReducedMotion()`. Tracked as roadmap **3G**. When adding new motion, gate it on reduced-motion or it will ship the accessibility regression with you.

## Architecture

This is a Next.js 16 App Router portfolio site (React 19, framer-motion, next-themes). The home page is a single scrolling document composed of section components; each project has a statically-generated detail page.

### Routing & layout

- `app/layout.tsx` — root server layout. Loads Onest + JetBrains Mono via `next/font`, wraps the tree in `ThemeProvider` (next-themes, `class` attribute, `defaultTheme="dark"`, `enableSystem={false}`, `storageKey="theme-preference"`), and injects `<StructuredData />` JSON-LD into `<head>`. Site `metadata` (OG/Twitter/icons) lives here — update it alongside the URL constants noted above when changing branding.
- `app/template.tsx` — runs on every navigation; wraps children in `PageTransition` so route changes animate.
- `app/page.tsx` — composes the home page from `components/sections/*` in display order. Reordering or adding a section is done here. **Note:** `components/sections/education.tsx` and `data/education.ts` exist but are **not currently mounted** in `app/page.tsx` or `navLinks`; wire both up if reintroducing the section.
- `app/projects/[slug]/page.tsx` — **server** component. Calls `generateStaticParams()` from `data/projects.ts` so every project page is pre-rendered at build time, and exports `generateMetadata` for per-project OG/Twitter tags. Adding a project is purely a data change in `data/projects.ts`; the route and sitemap pick it up automatically. Missing slugs `notFound()`.
- `app/projects/[slug]/project-page-client.tsx` — the interactive client half of the project detail page (framer-motion, scroll, etc.). The server `page.tsx` resolves the project and renders this with the project as a prop.
- `app/sitemap.ts` — generates the sitemap by iterating `projects` from `data/projects.ts`. Uses `SITE_URL` (see hardcoded-URL note above).
- `app/opengraph-image.tsx` — dynamic OG image via `next/og` `ImageResponse`. The site URL string is duplicated in the bottom-right of the image; update it when the canonical URL changes.
- `app/globals.css` — see the **Design system** section above.

### Components

- `components/sections/*` — one file per home-page section. All `'use client'` except `github-activity.tsx`, which is an async server component (see below).
- `components/section-wrapper.tsx` — standard frame for sections: applies `.section-spacing`, wraps content in `Reveal` (scroll-triggered fade-up), and accepts a `dark` prop for sections that need to invert against the canvas (kept for API compatibility; on the dark-first canvas the inversion is mostly a no-op). New sections should use this and pass an `id` matching the nav anchor.
- `components/section-heading.tsx` — eyebrow + title + optional `highlight` span + description. The `highlight` prop renders an inline accent-colored span; `highlightColor` is accepted for API compatibility but all values now resolve to the single lavender accent. Use `invert` for headings inside a `dark` section.
- `components/navigation.tsx` — floating pill nav (`max-w-3xl` centered, hairline border, surface-1 background, backdrop blur). The `navLinks` array drives both the menu and an `IntersectionObserver` that highlights the active section. **When adding/removing a section, update `navLinks` and ensure the section's `id` matches.** The footer still links to `#open-source` (the github-activity section) even though it's not in the top nav.
- `components/motion/*` — `Reveal` (the standard scroll reveal; also exports `staggerContainer` and `revealItem` variants) and `PageTransition`. Neither currently consults `useReducedMotion()` — see the design-system gaps note above.
- `components/scroll-progress.tsx` — top-of-page scroll progress bar (lavender accent fill); mounted once in `app/page.tsx` above `<Navigation />`.
- `components/command-palette.tsx` — global ⌘K / Ctrl+K / `?` palette built on `cmdk` and rendered through a portal. Three groups (Navigate · Links · Actions), substring filter, focus restored on close, body scroll locked while open, `role="dialog"` + `aria-modal="true"` + `aria-label="Command palette"`.
- `components/theme-toggle.tsx` — Sun ⇄ Moon button wired through `next-themes`. Hydration-safe via a `mounted` guard.
- `components/project-card.tsx` — hairline-bordered project card with a category-tinted header swatch, GitHub/demo icon buttons, status dot, and a "View case study" link to `/projects/[slug]`.
- `components/ui/*` — shadcn/ui primitives. Treat as generated; consume via `cn()` from `@/lib/utils`.
- `components/structured-data.tsx` — JSON-LD (Person/Organization/Breadcrumb/ItemList). Keep in sync with `app/layout.tsx` metadata.

### GitHub activity (server + client split)

`components/sections/github-activity.tsx` is an `async` server component. It fetches `api.github.com/users/<GITHUB_USER>/repos?sort=updated` with `next: { revalidate: 3600 }` (ISR every hour), falls back to a hardcoded `fallbackRepositories` list on any failure, then passes results to the `'use client'` `github-activity-client.tsx` for the interactive UI. **When changing the GitHub username, update `GITHUB_USER` and the `fallbackRepositories` list together** — the fallback names also define the display order (the fetched URLs are merged by name).

### Content / data layer

`data/*.ts` is the single source of truth for site content. **Editing content is almost always a data-file change, not a component change.**

- `projects.ts` exports a typed `Project[]`. Each project's `slug` is the URL segment under `/projects/`. The optional `fullDetails` block (problem / dataset / architecture / training / results) is what the project detail page renders into the per-project sections — each rendered with a different highlight-color swatch. Without `fullDetails`, the detail page renders only the header. Adding a project also extends the sitemap (`app/sitemap.ts`) and static params automatically.
- `experience.ts`, `education.ts`, `research.ts`, `skills.ts` — analogous, consumed by the matching section components.

### Conventions

- Anything using framer-motion, `useState`/`useEffect`, or theme state must be a client component (`'use client'`). Sections that need server-side data (e.g. `github-activity.tsx`) stay server and delegate UI to a client child.
- Use `cn()` from `@/lib/utils` for conditional class composition (clsx + tailwind-merge).
- Prefer the neo-brutalist primitives (`.brutal-card`, `.brutal-shadow`, `.btn-brutal`, `.highlight-*`) over hand-rolling equivalents — the visual language depends on consistency.
