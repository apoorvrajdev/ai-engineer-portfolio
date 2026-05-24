<h1 align="center">AI Engineer Portfolio</h1>

<p align="center">
  <strong>A production-grade personal site for an AI engineer — built like a product, not a template fork.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-live-22c55e?style=flat-square" alt="Status: Live" />
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js&logoColor=white" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript strict" />
  <img src="https://img.shields.io/badge/Tailwind-v4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind v4" />
  <img src="https://img.shields.io/badge/framer--motion-11-FF4FA3?style=flat-square" alt="framer-motion 11" />
  <img src="https://img.shields.io/badge/shadcn%2Fui-new--york-111?style=flat-square" alt="shadcn/ui new-york" />
  <img src="https://img.shields.io/badge/deploy-Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Deployed on Vercel" />
  <img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="License: MIT" />
</p>

<p align="center">
  A statically-generated, single-page-scroll portfolio with per-project case study pages, server-fetched GitHub activity, JSON-LD structured data, and a deliberately opinionated design system. Every section, project, and metric is a typed entry in <code>data/*.ts</code> — content edits are diffs, not CMS round-trips.
</p>

<p align="center">
  🌐 <strong>Live:</strong> <a href="https://ai-engineer-portfolio-pi.vercel.app">ai-engineer-portfolio-pi.vercel.app</a>
</p>

---

## Status

> 🟢 **Live and deploying from `main`.** The site is shipped on Vercel and rebuilds on every push. Phase 1 (App Router scaffold, theming, content schema) and Phase 2 (full neo-brutalist visual language, all sections, project case study pages, GitHub Activity ISR, sitemap, JSON-LD, OG image generator) are both complete. The codebase recently absorbed a **Linear-inspired design overhaul** — near-black canvas (`#010102`), lavender-blue accent (`#5e6ad2`), measured negative tracking on display type, hairline-bordered charcoal cards — captured as a typed spec in [`DESIGN.md`](DESIGN.md). Phase 3 (interaction polish, motion tuning, deeper case study templates) is the active surface area; the intent is to keep the site evolving in public, with honest commits.

> 📐 **Why this exists.** A portfolio for an AI engineer should *look like* engineering: typed data, statically-generated routes, structured metadata, an actual design system. The site is the deliverable, but the repo is the demonstration.

---

## 🎯 What Is This Project?

This is a portfolio site for **Apoorv Raj** — Founding AI Engineer at Node2, IEEE-published on vision-language models, with prior research time at DRDO and IIT Mandi. It is the public-facing surface for the work: shipped products, research papers, conference posters, the open-source surface, and the projects that don't fit neatly into any of those buckets.

It is **not** a template fork dressed up with new copy, and it is **not** a CMS-backed site. It is a hand-built Next.js 16 App Router application where every section is a typed React component, every project is a typed entry in `data/projects.ts`, and every page that gets indexed by search engines is statically pre-rendered with its own metadata, OG image, and JSON-LD structured data.

The design system is its own piece of work. The site has been through two complete visual languages — first a Paperfolio neo-brutalist palette (thick black borders, hard offset shadows, solid highlight spans), and now a Linear-inspired dark canvas with lavender as the single chromatic accent. Both languages are captured in committed specs so the decisions are auditable, not vibes.

---

## 🎯 Why It Matters

A portfolio is the first interface a hiring manager, collaborator, or conference organizer ever touches. Most engineering portfolios fall into one of two failure modes: they are either generic template builds that say nothing about how the person actually thinks, or they are over-built single-page React experiments with broken SEO, no metadata, and no path to grow.

This project is the answer to both:

- **Content is typed data, not markup.** Adding a project is one entry in `data/projects.ts` — the route, the sitemap, the OG metadata, the case study page, and the search-engine indexing all update automatically.
- **Every page is statically generated.** Per-project case study routes are pre-rendered at build time via `generateStaticParams`, so cold-load TTFB is measured in tens of milliseconds and crawlers see fully-rendered HTML.
- **SEO is treated as engineering.** JSON-LD structured data (Person, Organization, BreadcrumbList, ItemList), dynamic OG images via `next/og`, per-project Twitter metadata, and an auto-generated sitemap — wired once, no afterthought.
- **The design system is committed.** Tokens live in CSS custom properties, typography scale is named, and the entire visual language can be diffed across redesigns.

---

## 💡 What This Project Demonstrates

- Production-style **Next.js 16 App Router** architecture with React 19 server and client components correctly partitioned.
- **TypeScript strict-mode** end to end — all data files, props, and helpers are typed; no `any` escape hatches.
- **Statically-generated project routes** with per-project `generateMetadata` for OG / Twitter / canonical tags.
- **Server-side data fetching** for GitHub activity via async server components, with **ISR** (1-hour revalidate) and a deterministic fallback list so the section never goes blank.
- **Tailwind v4 CSS-first** configuration — no `tailwind.config.js`, design tokens declared as CSS custom properties in `@theme inline`, palette utilities auto-generated.
- **shadcn/ui** primitives (new-york style, lucide icons) composed via `cn()` from a tiny `clsx + tailwind-merge` helper.
- **Theming** via `next-themes` with a class-based dark mode and a typed `ThemeProvider` wrapper.
- **Motion as a system** — a reusable `Reveal` scroll-trigger, `PageTransition` route wrapper, and shared `staggerContainer / revealItem` variants — not a pile of one-off `motion.div` props.
- **Structured data + dynamic OG image** rendered via `next/og` `ImageResponse`, baked at the edge.
- **Auto-generated sitemap** that iterates the typed project list, so it never drifts from the routes that actually exist.
- **Conventional Commits** with a strict no-AI-attribution authoring policy enforced in [`CLAUDE.md`](CLAUDE.md).

---

## 🏗️ Architecture

```
                    ┌───────────────────────────────────────┐
                    │   Browser (client) · Next.js Router   │
                    │   framer-motion · next-themes · RSC   │
                    └────────────────────┬──────────────────┘
                                         │ static HTML + hydration
                    ┌────────────────────┴──────────────────┐
                    │     Next.js 16 App Router (Vercel)    │
                    │   layout.tsx · template.tsx · page    │
                    └────────────────────┬──────────────────┘
                                         │
              ┌──────────────────────────┼──────────────────────────┐
              │                          │                          │
      ┌───────┴────────┐         ┌───────┴────────┐         ┌───────┴────────┐
      │  components/   │         │   data/*.ts    │         │  GitHub REST   │
      │  sections/*    │ ◀────── │  typed content │         │   (ISR 1h)     │
      │  (UI surface)  │         │  single source │         │  + fallback    │
      └───────┬────────┘         └────────────────┘         └────────┬───────┘
              │                                                      │
              ▼                                                      ▼
      ┌────────────────┐                                    ┌────────────────┐
      │ /projects/     │   generateStaticParams             │  github-       │
      │ [slug] (SSG)   │ ──────────────▶  pre-rendered      │  activity.tsx  │
      │ + OG metadata  │                  per-project page  │  (async RSC)   │
      └────────────────┘                                    └────────────────┘

                    ┌───────────────────────────────────────┐
                    │ Cross-cutting: sitemap.ts · OG image  │
                    │ structured-data.tsx (JSON-LD)         │
                    └───────────────────────────────────────┘
```

**Why a single-scrolling page with per-project detail routes?** Recruiters skim, deep readers click. The scroll-page hits the recruiter case; the statically-generated `/projects/[slug]` routes hit the deep-reader case and earn their own indexable URLs. Two surfaces, one data layer.

**Why server components for GitHub activity?** Fetching at the edge with ISR gives us a fresh repo list every hour without exposing API rate limits to the browser, and the deterministic fallback list means the section degrades gracefully when GitHub is rate-limiting or unreachable.

**Why typed `data/*.ts` instead of MDX or a CMS?** A portfolio that lives in version control is a portfolio that survives. Every content edit is a reviewable diff, every project change rebuilds the sitemap and OG tags automatically, and there is no third-party content service to outlive.

---

## 🎨 Design System

The visual language is captured in [`DESIGN.md`](DESIGN.md) as a typed spec — colors, typography scale, spacing, motion tokens — so the design is auditable across redesigns.

```
Page → Section → Reveal-wrapped card grid → Themed primitive
                    │
                    ├── tokens   ──▶ CSS custom properties (:root / .dark)
                    ├── motion   ──▶ Reveal / staggerContainer / revealItem
                    ├── density  ──▶ container-shell · section-spacing
                    └── surface  ──▶ brutal-card · brutal-shadow · hover-lift
```

- **Tokens-first.** All colors, type sizes, and shadows are CSS custom properties — Tailwind v4 auto-generates utility classes from `@theme inline`, so `bg-hl-coral`, `text-ink`, and `border-hairline` are real classes without a config file.
- **Two visual languages on disk.** The Paperfolio neo-brutalist primitives (`.brutal-card`, `.brutal-shadow`, `.btn-brutal`, `.highlight-*`) and the Linear-inspired dark surfaces co-exist while the redesign settles — both are documented so the migration is a deliberate refactor, not a guess.
- **One motion vocabulary.** `Reveal` is the only scroll-triggered fade-up used in the codebase; `PageTransition` wraps route changes. No per-section bespoke animations.

---

## 🛠️ Tech Stack

| Layer              | Technologies                                                                                  |
| ------------------ | --------------------------------------------------------------------------------------------- |
| **Framework**      | Next.js 16 (App Router, RSC), React 19, TypeScript 5.7 strict                                 |
| **Styling**        | Tailwind CSS v4 (CSS-first config), PostCSS, tw-animate-css                                   |
| **UI primitives**  | shadcn/ui (new-york style), Radix UI, lucide-react icons                                      |
| **Motion**         | framer-motion 11, react-intersection-observer                                                 |
| **Theming**        | next-themes (class strategy, light default, system fallback)                                  |
| **Forms / state**  | react-hook-form + zod + @hookform/resolvers, sonner toasts                                    |
| **Fonts**          | Onest + JetBrains Mono via `next/font/google`                                                 |
| **SEO**            | `next/og` dynamic OG image, JSON-LD structured data, auto sitemap                             |
| **Quality**        | ESLint 9 flat config (`eslint-config-next/core-web-vitals` + `/typescript`)                   |
| **Hosting**        | Vercel (Edge runtime for OG, ISR for GitHub Activity)                                         |

---

## 📁 Repository Structure

```
ai-engineer-portfolio/
├── app/                                  # Next.js App Router
│   ├── layout.tsx                        # Root layout · fonts · ThemeProvider · StructuredData
│   ├── template.tsx                      # PageTransition wrapper (runs on every navigation)
│   ├── page.tsx                          # Home page — composes sections in display order
│   ├── globals.css                       # Tailwind v4 + design tokens + utility primitives
│   ├── sitemap.ts                        # Auto-generated from data/projects.ts
│   ├── opengraph-image.tsx               # Edge-rendered OG image via next/og
│   └── projects/[slug]/
│       ├── page.tsx                      # SSG server route · generateStaticParams + Metadata
│       └── project-page-client.tsx       # Interactive client half (framer-motion, scroll)
├── components/
│   ├── sections/                         # One file per home-page section
│   │   ├── hero.tsx                      # Headline + primary CTAs + status pill
│   │   ├── about.tsx
│   │   ├── experience.tsx
│   │   ├── projects.tsx
│   │   ├── research.tsx
│   │   ├── tech-stack.tsx
│   │   ├── github-activity.tsx           # async server component (ISR 1h + fallback)
│   │   ├── github-activity-client.tsx    # interactive client child
│   │   ├── contact.tsx
│   │   └── footer.tsx
│   ├── motion/
│   │   ├── reveal.tsx                    # Scroll-triggered fade-up (the one motion primitive)
│   │   └── page-transition.tsx           # Route-change wrapper
│   ├── navigation.tsx                    # Floating pill nav · IntersectionObserver active state
│   ├── section-wrapper.tsx               # Standard section frame + Reveal + dark variant
│   ├── section-heading.tsx               # Eyebrow + title + highlight span + description
│   ├── project-card.tsx                  # Category-tinted card → /projects/[slug]
│   ├── scroll-progress.tsx               # Top-of-page scroll progress bar
│   ├── structured-data.tsx               # JSON-LD (Person · Organization · Breadcrumb · ItemList)
│   └── ui/                               # shadcn/ui primitives (generated · consume via cn())
├── data/                                 # Typed single source of truth for site content
│   ├── projects.ts                       # Project[] · drives routes, sitemap, OG, ItemList
│   ├── experience.ts
│   ├── research.ts
│   ├── skills.ts
│   └── education.ts                      # Defined; not currently mounted in page.tsx
├── lib/
│   └── utils.ts                          # cn() helper (clsx + tailwind-merge)
├── hooks/                                # Reusable React hooks
├── public/                               # Static assets (project SVGs, icons, robots.txt)
├── CLAUDE.md                             # Project rules · commit policy · architecture map
├── DESIGN.md                             # Typed design-system spec (colors, type, motion)
├── components.json                       # shadcn config (style: new-york · iconLibrary: lucide)
├── eslint.config.mjs                     # Flat config (core-web-vitals + typescript)
├── next.config.mjs                       # images.unoptimized: true
├── tsconfig.json                         # strict · target ES6 · @/* path alias
└── package.json
```

---

## 🚀 Quick Start

### Prerequisites

- Node **20+**
- npm (or pnpm / yarn — lockfile is `package-lock.json`)
- Git

### Install and run

```bash
git clone https://github.com/apoorvrajdev/ai-engineer-portfolio.git
cd ai-engineer-portfolio
npm install
npm run dev
```

The site will be live at **http://localhost:3000**.

### Build for production

```bash
npm run build      # runs `tsc` — build fails on type errors
npm run start      # serves the production build
```

### Lint

```bash
npm run lint       # ESLint flat config · ignores resource/
```

---

## ✍️ Customizing the Content

Every piece of visible content is a typed entry in `data/*.ts`. **Editing the site is almost always a data-file change, not a component change.**

```bash
data/projects.ts        # → /projects/[slug] routes, sitemap, ItemList JSON-LD
data/experience.ts      # → Experience section timeline
data/research.ts        # → Research section cards
data/skills.ts          # → Tech Stack section chips
data/education.ts       # → defined but not mounted in app/page.tsx (wire it back if needed)
```

Each project's `slug` becomes its URL. Adding a project with a `fullDetails` block triggers the per-project case study layout (problem → dataset → architecture → training → results). Without `fullDetails`, the detail page renders just the header.

**Three URL constants must stay in sync** when changing the canonical site URL: `app/layout.tsx` (metadataBase + OG), `app/sitemap.ts` (`SITE_URL`), and `components/structured-data.tsx` (`SITE_URL`). The OG image (`app/opengraph-image.tsx`) also bakes the URL into the artwork.

---

## 🗺️ Roadmap

### Phase 1 — Foundations

- [x] **1A** — Next.js 16 App Router scaffold with React 19
- [x] **1B** — TypeScript strict mode, ESLint flat config, Tailwind v4 CSS-first
- [x] **1C** — Typed content schema (`data/*.ts`) as single source of truth
- [x] **1D** — `next-themes` provider with class-based dark mode

### Phase 2 — Visual System + Site Surface

- [x] **2A** — Paperfolio neo-brutalist design language (tokens, primitives, highlight spans)
- [x] **2B** — All home-page sections: Hero, About, Experience, Projects, Research, Tech Stack, GitHub Activity, Contact, Footer
- [x] **2C** — Floating pill navigation with IntersectionObserver active-section highlighting
- [x] **2D** — Reveal scroll-trigger + PageTransition route wrapper as the only motion primitives
- [x] **2E** — Statically-generated `/projects/[slug]` case study pages with `generateStaticParams`
- [x] **2F** — Per-project `generateMetadata` for OG / Twitter / canonical tags
- [x] **2G** — JSON-LD structured data (Person, Organization, BreadcrumbList, ItemList)
- [x] **2H** — Auto-generated sitemap iterating typed project list
- [x] **2I** — Dynamic OG image via `next/og` `ImageResponse`
- [x] **2J** — Server-side GitHub Activity with ISR (1h) + deterministic fallback

### Phase 3 — Linear-Inspired Redesign

- [x] **3A** — `DESIGN.md` spec: near-black canvas, lavender accent, typography scale
- [x] **3B** — Token migration in `globals.css` (CSS custom properties for ink, surface, hairline, accent)
- [x] **3C** — Hero and Navigation reworked to the new visual language
- [x] **3D** — Section primitives updated (`section-wrapper`, `section-heading`, `project-card`)
- [ ] **3E** — Per-project case study template polish (typography rhythm, screenshot framing)
- [ ] **3F** — Motion tuning pass (easing curves, stagger timings, hover affordances)
- [ ] **3G** — Accessibility audit (contrast against new dark surface, focus rings on lavender)

### Phase 4 — Performance + Tooling

- [ ] **4A** — Lighthouse + Core Web Vitals baseline captured and committed
- [ ] **4B** — Image optimization revisit (current `images.unoptimized: true` is a deliberate trade-off)
- [ ] **4C** — Bundle analysis pass; remove unused Radix primitives
- [ ] **4D** — Optional MDX support for long-form project case studies

---

## 🎨 Engineering Decisions

> **Why Next.js App Router over Pages Router?**
> The App Router lets server components fetch GitHub data at the edge without ever shipping the API call to the browser, and `generateStaticParams` on `/projects/[slug]` gives us pre-rendered per-project pages with their own metadata for free. The Pages Router would have required `getStaticProps` boilerplate per route and would not have cleanly supported the server/client split for the GitHub Activity section.

> **Why Tailwind v4 CSS-first instead of `tailwind.config.js`?**
> Design tokens belong in CSS custom properties anyway — they need to flip with the theme, and they need to be inspectable in DevTools. v4's `@theme inline` block reads those properties and auto-generates utility classes from them, which collapses two sources of truth (config file + CSS variables) into one. There is no `tailwind.config.js` in this repo and there does not need to be.

> **Why `data/*.ts` instead of MDX, Contentlayer, or a headless CMS?**
> A portfolio that lives in version control is a portfolio that survives. Typed entries give us autocomplete on every field, the TypeScript compiler enforces shape on every project, the diff for a content edit is reviewable, and there is no third-party content service to outlive. MDX is a fine upgrade later for long-form case studies, but the structured fields (slug, year, category, stack, GitHub URL, demo URL) belong in TypeScript.

> **Why a typed `DESIGN.md` instead of a Figma link?**
> Figma rots; committed specs do not. Capturing colors, typography, spacing, and motion as a structured spec in the repo means the design and the implementation can be diffed against each other, and the next redesign starts from a defensible baseline rather than vibes.

> **Why `images.unoptimized: true`?**
> Vercel's image optimizer adds cost and a runtime dependency that the current image set — a small number of project SVGs and icons — does not justify. The trade-off is documented in [`CLAUDE.md`](CLAUDE.md) and is one of the first things to revisit in Phase 4.

> **Why no Co-Authored-By trailers on any commit?**
> Authorship matters. Every commit in this repo is authored solely by the human who wrote the code, and the rules that enforce that are committed at the top of [`CLAUDE.md`](CLAUDE.md) so future contributors (human or otherwise) cannot drift.

---

## 📈 What's Shipped vs Measured

| Surface                            | Status     | Notes                                                                  |
| ---------------------------------- | ---------- | ---------------------------------------------------------------------- |
| Home page (9 sections)             | ✅ Live    | Hero · About · Experience · Projects · Research · Tech Stack · GitHub · Contact · Footer |
| Per-project case study routes      | ✅ Live    | Statically generated via `generateStaticParams` from `data/projects.ts` |
| Dynamic OG image                   | ✅ Live    | `app/opengraph-image.tsx` via `next/og` `ImageResponse`                |
| Sitemap                            | ✅ Live    | Auto-iterates typed project list                                        |
| JSON-LD structured data            | ✅ Live    | Person · Organization · BreadcrumbList · ItemList                       |
| GitHub Activity (ISR + fallback)   | ✅ Live    | `revalidate: 3600`, deterministic fallback list                         |
| Dark mode                          | ✅ Live    | `next-themes`, class strategy, system fallback                          |
| Lighthouse baseline                | ⏳ Planned | Phase 4A — capture and commit alongside redesign                        |
| Bundle analysis                    | ⏳ Planned | Phase 4C — prune unused Radix primitives                                |

---

## 🧪 What I'd Build Next

Honest extension paths beyond the current scope, ordered by reviewer-impact:

- **MDX for long-form case studies** — keep the typed `Project` schema for the index, layer MDX for the body of each project page where prose, code, and embedded screenshots matter.
- **View Transitions API** for the project card → case study navigation, so the card visually morphs into the detail page header.
- **Real metrics from a real visit** — Lighthouse, Core Web Vitals, and bundle-analyzer output committed to the repo alongside each major redesign.
- **i18n surface** — internationalized routing for an English / Hindi split, since at least one of my target audiences reads both.
- **Search across projects + research** — small client-side index (FlexSearch or similar), no third-party service.
- **Optional CMS slot for `experience.ts`** — the one section that updates more often than the rest; everything else can stay in TypeScript.
- **Test surface** — Playwright smoke test that boots the site, scrolls through every section, and snapshots the rendered OG image.

---

## 📝 Lessons Being Learned

> The portfolio is the product. Every shortcut you take in your own site is a shortcut a reviewer will mentally apply to your work. Building it like a real Next.js application — typed content, statically-generated routes, structured metadata, a committed design system — costs more time up front than a template fork would, and pays back the first time someone clicks `view source` on the case study page.

> Tokens-first design infrastructure outlives any visual language. The site has been through two complete redesigns and the surface area of each change was bounded by the token layer — colors flipped, typography scale rebalanced, spacing rhythm adjusted, components stayed structurally the same. The shortcut would have been hard-coded hex values in every component, and it would have made the second redesign three times the work.

> Author-only commit policy is a one-line rule that catches a thousand sloppy moments later. Locking commit attribution down at the project level — and writing the rules into [`CLAUDE.md`](CLAUDE.md) so any future tooling sees them on day one — is cheap insurance against the kind of provenance ambiguity that gets surfaced six months later in a code review.

---

## 📜 License & Contact

This project is released under the [MIT License](LICENSE).

**Built by [apoorvrajdev](https://github.com/apoorvrajdev)** — reach me at [apoorvrajmgr@gmail.com](mailto:apoorvrajmgr@gmail.com).

🌐 Live site: [ai-engineer-portfolio-pi.vercel.app](https://ai-engineer-portfolio-pi.vercel.app)

---

<p align="center">
  <em>Built as the public-facing surface for an AI engineering practice — and as a demonstration of how to build one.</em>
</p>
