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
- Reach for the Linear primitives (`.linear-card`, `.linear-card-hover`, `.linear-card-featured`, `.btn-primary`, `.btn-secondary`, `.btn-tertiary`) before writing new utility soup. The `.brutal-*` / `.highlight-*` classes are compatibility aliases only — see the design-system section.
- Content edits belong in `data/*.ts`, not in components. Identity facts (name, title, employer, links, email, availability, site URL) live only in `data/profile.ts`.
- Anything stateful, themed, or animated (`useState`/`useEffect`/framer-motion/next-themes) must be `'use client'`. A section that needs server-side data should stay a server component and delegate its UI to a client child.
- Don't call `setState` synchronously inside `useEffect` (the `react-hooks/set-state-in-effect` rule fails lint). For client-only rendering use `useMounted()` from `@/hooks/use-mounted`.
- Run `npm run lint`, `npm run typecheck` and `npm run build` before suggesting a commit. CI (`.github/workflows/ci.yml`) runs the same three on every push to `main` and every pull request.

## Content accuracy rules

This site is checked by recruiters and engineers who will click through to the source. Every claim must survive that.

- **Every metric names what it was measured on**: the dataset or population, the split, and the comparison. Never show a bare headline number.
- **The repository is the source of truth for project facts; the current CV is the source of truth for titles and roles.** If they disagree, flag it — don't pick one silently.
- **Credit collaborators by name**, state who did what, and link the original repository when the work is shared. Never present co-authored or collaborative work as solo work.
- **Status must match the live URL** on the day it is written. A sleeping or broken demo is not "live"; use `Demo offline` or move the link to `sources` with a note.
- **Counts go stale** — when a project quotes test counts or similar figures, update `factsCheckedOn` in `data/projects.ts` whenever you re-verify them.
- **Never invent** metrics, users, traffic, adoption, calibration, production use, or capabilities that the linked repository does not prove. Withdrawn or leakage-affected results are explained, not quoted.
- **Skills** are limited to what current work or the CV backs.

## Working Style

- Plan before implementing for any non-trivial change.
- One section/component at a time; keep diffs reviewable.
- After making changes, summarize what was done so the user can review and commit.
- Do not invent commits or push — surface a suggested message and stop.

## Commands

- `npm run dev` — start Next.js dev server
- `npm run build` — production build (also runs `tsc`; build will fail on type errors)
- `npm run start` — serve the production build
- `npm run lint` — ESLint (flat config in `eslint.config.mjs`, composing `eslint-config-next/core-web-vitals` + `/typescript`). The `resource/` and `game/` directories are ignored.
- `npm run typecheck` — `tsc --noEmit` on its own.

There is no test suite configured. CI runs lint, typecheck and build (`.github/workflows/ci.yml`).

## Build / config quirks worth knowing

- `next.config.mjs` sets `images.unoptimized: true`, so `<img>` is used directly across the site. When adding new images, prefer `<img>` and silence the lint warning inline (`// eslint-disable-next-line @next/next/no-img-element`).
- `tsconfig.json` excludes `resource/` (the Paperfolio inspiration template lives there but is not part of the app).
- `game/` is a separate app with its own dependencies. It is excluded from `tsconfig.json`, ignored by ESLint, and kept out of Tailwind's source scan (`@source not "../game"` in `app/globals.css`), so it cannot break or bloat this build.
- Tailwind **v4** is used in CSS-first mode (`@import 'tailwindcss'` in `app/globals.css`). There is no `tailwind.config.js` — design tokens are CSS custom properties in `:root` (dark canvas) and `.light` (inverted) blocks in `globals.css`. **Tailwind v4 auto-generates utilities from any `--color-*` declared in the `@theme inline` block**, which is how `bg-background`, `text-foreground`, `border-border`, etc. resolve.
- `components.json` declares shadcn config: `style: new-york`, `baseColor: neutral`, `iconLibrary: lucide`, `rsc: true`. Add new primitives via `npx shadcn@latest add <name>` rather than hand-writing them under `components/ui/`.
- Path alias: `@/*` resolves to the repo root (see `tsconfig.json`).
- TS is `strict: true` with `target: ES6`, `moduleResolution: bundler`.
- Canonical site URL is `https://ai-engineer-portfolio-pi.vercel.app`, defined once as `SITE_URL` in `data/profile.ts`. `app/layout.tsx` (`metadataBase`), `app/sitemap.ts`, `components/structured-data.tsx` and both OG images read it from there.
- Canonical URLs are set per page (`alternates.canonical` in `app/page.tsx` and in the project `generateMetadata`), not in the root layout, so not-found and other routes don't inherit the home URL.

## Design system: Linear-inspired dark theme

The site has been migrated off the early Paperfolio neo-brutalist palette to a Linear-inspired dark-first system. The full token spec lives in [`DESIGN.md`](DESIGN.md); the implementation lives in [`app/globals.css`](app/globals.css). The Paperfolio template in `resource/paperfolio-portfolio-template/` is kept as reference only — it is excluded from the build and from ESLint.

- **Dark-first**: canvas `#010102`, surface ladder `#0f1011 → #1c1d1e`, hairline borders (`--hairline #23252a`), no drop shadows on dark. Light mode (toggled via the nav button) inverts onto a `#ffffff` canvas with `#e6e7e9` hairlines. There is no system theme fallback — `ThemeProvider` is configured with `defaultTheme="dark"`, `enableSystem={false}`, `storageKey="theme-preference"`.
- **Single chromatic accent**: lavender `#5e6ad2` (`--accent`) is the only color used for emphasis, links, focus rings, and primary CTAs. `--accent-hover` `#828fff`, `--accent-focus` `#5e69d1`, `--accent-soft` `rgba(94,106,210,0.12)`.
- **Typography**: Onest (sans) + JetBrains Mono (mono), loaded via `next/font/google` in `app/layout.tsx`. Exposed to Tailwind as `var(--font-onest)` and `var(--font-jetbrains-mono)`.
- **Ink scale**: `--ink #f7f8f8`, `--ink-muted #d0d6e0`, `--ink-subtle #8a8f98`, `--ink-tertiary #7a7f88` (light theme `#6b6e75`). Tertiary was raised from Linear's `#62666d` so small text clears WCAG AA (≥ 4.5:1) on every surface — don't lower it.

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

### Accessibility invariants

- **Reduced motion is supported** — `globals.css` has a `@media (prefers-reduced-motion: reduce)` block, the motion primitives drop entry animations, and `lib/scroll.ts` stops smooth scrolling. Route new motion through `components/motion/*` or it will ship an accessibility regression.
- **Accent text**: `--accent` (#5e6ad2) only clears AA at display sizes. For small text use `text-accent-ink` (`--accent-ink`: #828fff dark, #4f5bc4 light).
- **Without JavaScript** the scroll-reveal wrappers never run, so the root layout ships a `<noscript>` rule that clears their inline `opacity:0`. Keep it when changing motion.
- Verified at 1440px and 390px: no horizontal overflow, no heading-level jumps, AA contrast for small text, and tap targets of at least 24px.

## Architecture

This is a Next.js 16 App Router portfolio site (React 19, framer-motion, next-themes). The home page is a single scrolling document composed of section components; each project has a statically-generated detail page.

### Routing & layout

- `app/layout.tsx` — root server layout. Loads Onest + JetBrains Mono via `next/font`, wraps the tree in `ThemeProvider` (next-themes, `class` attribute, `defaultTheme="dark"`, `enableSystem={false}`, `storageKey="theme-preference"`), and injects `<StructuredData />` JSON-LD into `<head>`. Site `metadata` (OG/Twitter/icons) lives here and reads its values from `data/profile.ts`.
- `app/template.tsx` — runs on every navigation; wraps children in `PageTransition` so route changes animate.
- `app/page.tsx` — composes the home page from `components/sections/*` in display order: Hero → About → Work → Experience → Research → Stack → Contact. Reordering or adding a section is done here. **Note:** `components/sections/education.tsx` and `data/education.ts` exist but the section is **not mounted** (`about.tsx` renders the education card from `data/education.ts` instead).
- `app/projects/[slug]/page.tsx` — **server** component. Calls `generateStaticParams()` from `data/projects.ts` so every project page is pre-rendered at build time, and exports `generateMetadata` for per-project description (`shortDescription`), canonical URL and OG/Twitter tags. Adding a project is purely a data change in `data/projects.ts`; the route, share image and sitemap pick it up automatically. Missing slugs `notFound()`.
- `app/projects/[slug]/opengraph-image.tsx` — per-project share image generated at build time from the project's `shortTitle`, `shortDescription`, `status` and `period`. It supplies `og:image`; a config-based `openGraph` in `generateMetadata` would otherwise drop the inherited image.
- `app/projects/[slug]/project-page-client.tsx` — the interactive client half of the project detail page (framer-motion, scroll, etc.). The server `page.tsx` resolves the project and renders this with the project as a prop.
- `app/sitemap.ts` — generates the sitemap by iterating `projects` from `data/projects.ts`, using `SITE_URL` from `data/profile.ts`.
- `app/opengraph-image.tsx` — site-wide OG image via `next/og` `ImageResponse`, with text taken from `data/profile.ts`.
- `app/globals.css` — see the **Design system** section above.

### Components

- `components/sections/*` — one file per home-page section, all `'use client'` (they animate). `projects.tsx` composes the three tiers: flagship, "Also built" cards, and a compact list of earlier and collaborative work.
- `components/section-wrapper.tsx` — standard frame for sections: applies `.section-spacing`, wraps content in `Reveal` (scroll-triggered fade-up), and accepts a `dark` prop for sections that need to invert against the canvas (kept for API compatibility; on the dark-first canvas the inversion is mostly a no-op). New sections should use this and pass an `id` matching the nav anchor.
- `components/section-heading.tsx` — eyebrow + title + optional `highlight` span + description. The `highlight` prop renders an inline accent-colored span; `highlightColor` is accepted for API compatibility but all values now resolve to the single lavender accent. Use `invert` for headings inside a `dark` section.
- `components/navigation.tsx` — sticky nav. The `navLinks` array (About · Work · Experience · Research) drives both the menu and an `IntersectionObserver` that highlights the active section. **When adding or removing a section, update `navLinks`, the footer list and the command palette, and make sure the section's `id` matches.**
- `components/motion/*` — `Reveal` plus `useRevealProps()` / `useRevealFactory()` (use the factory inside a `map`, where hooks cannot be called), and `PageTransition`. All of them drop the entry animation entirely under reduced motion, returning explicit visible values so the hidden server-rendered styles are overwritten. New motion must go through these.
- `components/scroll-progress.tsx` — top-of-page scroll progress bar (lavender accent fill); mounted once in `app/page.tsx` above `<Navigation />`.
- `components/command-palette.tsx` — global ⌘K / Ctrl+K / `?` palette built on `cmdk` and rendered through a portal. Three groups (Navigate · Links · Actions), substring filter, focus restored on close, body scroll locked while open, `role="dialog"` + `aria-modal="true"` + `aria-label="Command palette"`.
- `components/theme-toggle.tsx` — Sun ⇄ Moon button wired through `next-themes`. Hydration-safe via `useMounted()` (`hooks/use-mounted.ts`, a `useSyncExternalStore` guard).
- `components/project-card.tsx` — hairline-bordered project card used for the `secondary` tier: header image, GitHub/demo icon buttons, status dot, period, and a "Case study" link to `/projects/[slug]`.
- `components/flagship-project.tsx` — the `flagship` tier: narrative, product still, and the evidence grid. One per site; driven entirely by `data/projects.ts`.
- `components/evidence-stat.tsx` — one measured figure. `population` is required by the type, so a bare number cannot reach the page.
- `components/motion/motion-provider.tsx` — `MotionConfig reducedMotion="user"`, mounted in the root layout.
- `lib/scroll.ts` — `scrollToSection()`; jumps instead of gliding when the visitor prefers reduced motion (CSS `scroll-behavior` does not apply to `scrollIntoView`). Every in-page link goes through it.
- `components/ui/*` — shadcn/ui primitives, added on demand with `npx shadcn@latest add <name>` (none are installed at present). Treat them as generated; consume via `cn()` from `@/lib/utils`.
- `components/structured-data.tsx` — JSON-LD (Person, Organization, ItemList of projects, ScholarlyArticle per paper with every author), built from `data/profile.ts`, `data/projects.ts` and `data/research.ts`.

### Content / data layer

`data/*.ts` is the single source of truth for site content. **Editing content is almost always a data-file change, not a component change.**

- `profile.ts` — identity facts (`profile`, `SITE_URL`, `currentRole`) consumed by metadata, JSON-LD, OG images, hero, navigation, about, contact, footer and the command palette.
- `projects.ts` exports a typed `Project[]` in display order. Each project's `slug` is the URL segment under `/projects/` (don't rename slugs — they are linked from outside). Key fields: `tier` (`flagship` / `secondary` / `earlier` — this drives the homepage hierarchy), `role` (`solo` / `collaboration` / `contribution`, shown as a label on the case study), `status`, `period`, `shortDescription` (≤ 160 chars; card blurb and meta description), `description` (case-study lede), `image` + `imageAlt`, `evidence` (headline figures — `population` is required, so a bare number cannot be shown), `sections` (project-specific `{ heading, body?, points?, table? }` blocks rendered in order — render only what exists, never an empty placeholder), `sources` and `factsCheckedOn`. Adding a project also extends the sitemap, share images and static params automatically.
- `research.ts` — publications with the full author list in published order, DOI and publisher link.
- `experience.ts`, `education.ts`, `skills.ts` — analogous, consumed by the matching section components (`about.tsx` reads `education.ts` for its education card).

### Conventions

- Anything using framer-motion, `useState`/`useEffect`, or theme state must be a client component (`'use client'`). A section needing server-side data stays a server component and delegates its UI to a client child.
- Use `cn()` from `@/lib/utils` for conditional class composition (clsx + tailwind-merge).
- Prefer the Linear primitives (`.linear-card*`, `.btn-*`) over hand-rolling equivalents — the visual language depends on consistency.
