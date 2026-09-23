'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Github } from 'lucide-react'
import type { Project } from '@/data/projects'
import { EvidenceStat } from '@/components/evidence-stat'
import { useRevealProps } from '@/components/motion/reveal'

/**
 * The flagship presentation: what it is, what its evaluation found, and the
 * figures behind both. Deliberately heavier than a project card — this is the
 * one project a reviewer should be able to judge without leaving the page.
 */
export function FlagshipProject({ project }: Readonly<{ project: Project }>) {
  const reveal = useRevealProps()

  return (
    <motion.article {...reveal} className="linear-card-featured overflow-hidden">
      <div className="grid gap-0 lg:grid-cols-[1.05fr_1fr]">
        {/* Narrative */}
        <div className="flex flex-col justify-between gap-8 p-6 md:p-8 lg:p-10">
          <div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="eyebrow text-accent-ink">Flagship</span>
              <span className="mono text-ink-tertiary">
                {project.status} · {project.period}
              </span>
            </div>

            <h3 className="mt-4 display-md text-ink text-balance">{project.title}</h3>

            <p className="mt-4 body-lg text-ink-muted max-w-[52ch]">{project.shortDescription}</p>

            <ol className="mt-7 flex flex-wrap items-center gap-x-2 gap-y-2 mono text-ink-subtle">
              {['Build', 'Evaluate', 'Discover', 'Report'].map((step, index) => (
                <li key={step} className="flex items-center gap-2">
                  {index > 0 ? <span className="text-ink-tertiary" aria-hidden>→</span> : null}
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href={`/projects/${project.slug}`} className="btn-primary btn-primary-lg">
              Read the case study
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
            {project.demo ? (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-secondary btn-secondary-lg">
                Live demo
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            ) : null}
            {project.github ? (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-tertiary">
                <Github className="h-3.5 w-3.5" aria-hidden />
                Source
              </a>
            ) : null}
          </div>
        </div>

        {/* Product still */}
        <figure className="relative m-0 border-t border-hairline bg-surface-2 lg:border-l lg:border-t-0">
          {/* eslint-disable-next-line @next/next/no-img-element -- image optimization disabled in next.config */}
          <img
            src={project.image}
            alt={project.imageAlt ?? `${project.title} interface`}
            width={1440}
            height={900}
            className="h-full max-h-[380px] w-full object-cover object-left-top"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="border-t border-hairline px-5 py-3 caption">
            The public demo, reading the frozen snapshot it ships with. There is no hosted backend.
          </figcaption>
        </figure>
      </div>

      {/* Evidence */}
      {project.evidence?.length ? (
        <div className="border-t border-hairline p-6 md:p-8 lg:p-10">
          <h4 className="eyebrow">Measured, not claimed</h4>
          <div className="mt-6 grid gap-x-8 gap-y-7 sm:grid-cols-2 xl:grid-cols-3">
            {project.evidence.map((item) => (
              <EvidenceStat key={item.value + item.label} item={item} />
            ))}
          </div>
          <p className="mt-8 border-l-2 border-accent pl-4 body-default text-ink-muted max-w-[72ch]">
            The same 17-feature pipeline scores 0.9327 on the generator it was trained on and 0.0087 when carried
            across to an independent one without retraining. Five of its features are constant on the target data, and
            the operating threshold does not transfer either. That result is published in the repository rather than
            left out.
          </p>
        </div>
      ) : null}
    </motion.article>
  )
}
