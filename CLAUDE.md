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
- Tailwind **v4** is used in CSS-first mode (`@import 'tailwindcss'` in `app/globals.css`). There is no `tailwind.config.js` — design tokens are CSS custom properties in `:root` / `.dark` blocks in `globals.css`. **Tailwind v4 auto-generates utilities from any `--color-*` declared in the `@theme inline` block**, which is how `bg-hl-coral`, `bg-hl-blue`, `bg-hl-yellow`, etc. resolve to the highlight palette.
- `components.json` declares shadcn config: `style: new-york`, `baseColor: neutral`, `iconLibrary: lucide`, `rsc: true`. Add new primitives via `npx shadcn@latest add <name>` rather than hand-writing them under `components/ui/`.
- Path alias: `@/*` resolves to the repo root (see `tsconfig.json`).
- TS is `strict: true` with `target: ES6`, `moduleResolution: bundler`.
- Canonical site URL is `https://ai-engineer-portfolio-pi.vercel.app` and is **hardcoded in three places** that must be updated together: `app/layout.tsx` (`metadataBase` + OG), `app/sitemap.ts` (`SITE_URL`), and `components/structured-data.tsx` (`SITE_URL`).

## Design system: Paperfolio neo-brutalism

The visual language is adapted from the Paperfolio template in `resource/paperfolio-portfolio-template/`:

- **Light-first**: pure-white background, pure-black text. Dark mode is opt-in via the nav toggle (palette flipped, but the same neo-brutalist primitives — borders go white, shadows go white).
- **Thick black borders** (`border-[3px]` or `border-4`) and **hard offset drop-shadows** (`box-shadow: 8px 8px 0 #000`) instead of soft shadows / glassmorphism.
- **Highlight spans** for emphasis in headings — solid-color background, white text, inline padding. Use the `.highlight-coral` / `.highlight-blue` / `.highlight-indigo` / `.highlight-yellow` / `.highlight-black` utilities from `globals.css`.
- **Fonts**: Onest (sans) + JetBrains Mono (mono), loaded via `next/font/google` in `app/layout.tsx`. Exposed to Tailwind as `var(--font-onest)` and `var(--font-jetbrains-mono)`.

### Core utility classes (in `app/globals.css`)

- `.container-shell` — page width wrapper (`max-w-7xl`, responsive padding).
- `.section-spacing` — standard vertical rhythm (`py-16 md:py-24`).
- `.brutal-card` — `rounded-[28px] border-[3px] border-black bg-white` (auto-flips to white border + dark card in dark mode).
- `.brutal-shadow` / `.brutal-shadow-sm` / `.brutal-shadow-lg` — hard offset drop-shadow at 8/6/12 px (color flips with theme).
- `.hover-lift` — combined translate + shadow on hover (the signature interaction).
- `.btn-brutal` / `.btn-brutal-outline` — primary CTA (black fill) and secondary CTA (white fill with thick black border). Both gain a 6px shadow on hover.
- `.pill-tag` — uppercase mono chip (black bg, white text). **Heads up:** in dark mode it flips to white-bg/black-text, so don't use it inside cards that are forced-white-in-dark (e.g. inside the dark Experience section's white cards) — write the chip inline there.
- `.highlight-{coral,blue,indigo,yellow,black}` — the inline solid-color highlight span used in section headings.
- `.animate-{fade-in,fade-in-up,scale-in,float,marquee}` and `.stagger-{1..6}` — kept lightweight; no glow/gradient animations.

### Highlight palette (CSS custom properties)

`--hl-coral` `#FF4A60` · `--hl-blue` `#2F81F7` · `--hl-indigo` `#6366F1` · `--hl-yellow` `#FFC224` · `--hl-mint` `#34D399`. Available as `bg-hl-coral`, `text-hl-blue`, etc. via Tailwind v4's `@theme inline`.

## Architecture

This is a Next.js 16 App Router portfolio site (React 19, framer-motion, next-themes). The home page is a single scrolling document composed of section components; each project has a statically-generated detail page.

### Routing & layout

- `app/layout.tsx` — root server layout. Loads Onest + JetBrains Mono via `next/font`, wraps the tree in `ThemeProvider` (next-themes, `class` attribute, `defaultTheme="light"`, system fallback), and injects `<StructuredData />` JSON-LD into `<head>`. Site `metadata` (OG/Twitter/icons) lives here — update it alongside the URL constants noted above when changing branding.
- `app/template.tsx` — runs on every navigation; wraps children in `PageTransition` so route changes animate.
- `app/page.tsx` — composes the home page from `components/sections/*` in display order. Reordering or adding a section is done here. **Note:** `components/sections/education.tsx` and `data/education.ts` exist but are **not currently mounted** in `app/page.tsx` or `navLinks`; wire both up if reintroducing the section.
- `app/projects/[slug]/page.tsx` — **server** component. Calls `generateStaticParams()` from `data/projects.ts` so every project page is pre-rendered at build time, and exports `generateMetadata` for per-project OG/Twitter tags. Adding a project is purely a data change in `data/projects.ts`; the route and sitemap pick it up automatically. Missing slugs `notFound()`.
- `app/projects/[slug]/project-page-client.tsx` — the interactive client half of the project detail page (framer-motion, scroll, etc.). The server `page.tsx` resolves the project and renders this with the project as a prop.
- `app/sitemap.ts` — generates the sitemap by iterating `projects` from `data/projects.ts`. Uses `SITE_URL` (see hardcoded-URL note above).
- `app/opengraph-image.tsx` — dynamic OG image via `next/og` `ImageResponse`. The site URL string is duplicated in the bottom-right of the image; update it when the canonical URL changes.
- `app/globals.css` — see the **Design system** section above.

### Components

- `components/sections/*` — one file per home-page section. All `'use client'` except `github-activity.tsx`, which is an async server component (see below).
- `components/section-wrapper.tsx` — standard frame for sections: applies `.section-spacing`, wraps content in `Reveal` (scroll-triggered fade-up), and accepts a `dark` prop that flips the section to a black background with light text (used by Experience). New sections should use this and pass an `id` matching the nav anchor.
- `components/section-heading.tsx` — eyebrow + title + optional `highlight` span + description. The `highlight` prop renders an inline colored span via the `.highlight-*` utilities; pass `highlightColor` to pick the palette swatch. Use `invert` for headings inside a `dark` section.
- `components/navigation.tsx` — **floating pill** nav (`max-w-3xl` centered, `border-[3px] border-black`, `brutal-shadow-sm`). The `navLinks` array drives both the menu and an `IntersectionObserver` that highlights the active section. **When adding/removing a section, update `navLinks` and ensure the section's `id` matches.** The footer still links to `#open-source` (the github-activity section) even though it's not in the top nav.
- `components/motion/*` — `Reveal` (the standard scroll reveal; also exports `staggerContainer` and `revealItem` variants) and `PageTransition`.
- `components/scroll-progress.tsx` — top-of-page scroll progress bar (4px, coral fill); mounted once in `app/page.tsx` above `<Navigation />`.
- `components/project-card.tsx` — neo-brutalist project card with a colored header swatch (mapped from `project.category`), GitHub/demo icon buttons, and a "View case study" link to `/projects/[slug]`.
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
