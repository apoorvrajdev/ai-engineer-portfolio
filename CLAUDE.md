# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Next.js dev server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — ESLint (extends `eslint-config-next` core-web-vitals + typescript)

There is no test suite configured.

## Build / config quirks worth knowing

- `next.config.mjs` sets `typescript.ignoreBuildErrors: true` and `images.unoptimized: true`. Type errors will **not** fail `next build` — rely on the editor/`tsc` for type safety. `<img>` is used directly in places (e.g. `app/projects/[slug]/page.tsx`) because image optimization is off.
- Tailwind **v4** is used in CSS-first mode (`@import 'tailwindcss'` in `app/globals.css`). There is no `tailwind.config.js` — design tokens are CSS custom properties in `:root` / `.dark` blocks in `globals.css` (oklch color space).
- `components.json` declares shadcn config: `style: new-york`, `baseColor: neutral`, `iconLibrary: lucide`, `rsc: true`. Add new primitives via `npx shadcn@latest add <name>` rather than hand-writing them under `components/ui/`.
- Path alias: `@/*` resolves to the repo root (see `tsconfig.json`).
- TS is `strict: true` with `target: ES6`, `moduleResolution: bundler`.

## Architecture

This is a Next.js 16 App Router portfolio site (React 19, framer-motion, next-themes). The home page is a single scrolling document composed of section components; project detail pages are dynamic routes.

### Routing & layout

- `app/layout.tsx` — root layout; loads Manrope + Space Grotesk fonts, wraps the tree in `ThemeProvider` (next-themes, `class` attribute, system default), and injects `<StructuredData />` JSON-LD into `<head>`. Site `metadata` (OG/Twitter/icons) lives here — update it when changing branding/URL.
- `app/template.tsx` — runs on every navigation; wraps children in `PageTransition` so route changes animate.
- `app/page.tsx` — composes the home page from `components/sections/*` in display order. Reordering or adding a section is done here.
- `app/projects/[slug]/page.tsx` — client component that does `projects.find(p => p.slug === params.slug)` against `data/projects.ts`. Adding a project is purely a data change in `data/projects.ts`; this route picks it up automatically. If `slug` is missing, it `notFound()`s.
- `app/globals.css` — theme tokens **plus** custom utility classes used throughout: `.container-shell` (page width), `.section-spacing` (vertical rhythm), `.glassmorphism` / `.glass` (card surfaces), `.hover-lift`, `.gradient-text` / `.text-gradient`, `.smooth-scroll`, `.animated-gradient`. Use these instead of reinventing equivalents.

### Components

- `components/sections/*` — one file per home-page section (hero, about, experience, projects, research, tech-stack, github-activity, contact, footer). Each is a `'use client'` component (they use framer-motion / hooks).
- `components/section-wrapper.tsx` — standard frame for sections: applies `.section-spacing`, top border, and wraps content in `Reveal` (scroll-triggered fade-up). New sections should use this and pass an `id` matching the nav anchor.
- `components/navigation.tsx` — sticky top nav with hash-link anchors. The `navLinks` array drives both the menu and an `IntersectionObserver` that highlights the active section. **When adding/removing a section, update `navLinks` and ensure the section's `id` matches.**
- `components/motion/*` — `Reveal` (the standard scroll reveal; also exports `staggerContainer` and `revealItem` variants) and `PageTransition`.
- `components/ui/*` — shadcn/ui primitives. Treat as generated; consume via `cn()` from `@/lib/utils`.
- `components/cursor-spotlight.tsx` — global mouse-tracked spotlight; reads/writes `--cursor-x` / `--cursor-y` CSS vars used by `globals.css`.
- `components/structured-data.tsx` — JSON-LD (Person/Organization/Breadcrumb/ItemList). The Person schema and `https://apoorvraj.dev` URL are duplicated here and in `app/layout.tsx` metadata; update both together.

### Content / data layer

`data/*.ts` is the single source of truth for site content. **Editing content is almost always a data-file change, not a component change.**

- `projects.ts` exports a typed `Project[]`. Each project's `slug` is the URL segment under `/projects/`. The optional `fullDetails` block (problem / dataset / architecture / training / results) is what `app/projects/[slug]/page.tsx` renders into the per-project sections. Without `fullDetails`, the detail page renders only the header.
- `experience.ts`, `education.ts`, `research.ts`, `skills.ts` — analogous, consumed by the matching section components.

### Conventions

- Anything using framer-motion, `useState`/`useEffect`, or theme/cursor state must be a client component (`'use client'`). The home page sections are all client; root layout is server.
- Use `cn()` from `@/lib/utils` for conditional class composition (clsx + tailwind-merge).
- The GitHub activity section (`components/sections/github-activity.tsx`) hits `api.github.com/users/apoorvrajdev/repos` at runtime with a hardcoded fallback list — keep the fallback in sync if the username changes.
