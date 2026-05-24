'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { SectionWrapper } from '@/components/section-wrapper'
import { SectionHeading } from '@/components/section-heading'
import { experience } from '@/data/experience'

export function ExperienceSection() {
  return (
    <SectionWrapper id="experience" dark>
      <div className="grid items-start gap-12 md:grid-cols-[1fr_1.5fr] md:gap-16">
        <div className="md:sticky md:top-28 md:self-start">
          <SectionHeading
            eyebrow="Career"
            title="From research labs"
            highlight="to founding engineer."
            description="DRDO, IIT Mandi, independent research, and the founding-engineer work at Node2 — five years of progressively deeper ML systems work."
          />
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 btn-secondary btn-secondary-lg"
          >
            View full resume
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="relative">
          {/* Vertical timeline rail */}
          <div className="absolute left-3 top-1 bottom-1 w-px bg-hairline md:left-4" aria-hidden />
          <ul className="space-y-3">
            {experience.map((item, index) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: '-80px' }}
                className="relative pl-10 md:pl-12"
              >
                {/* Timeline node */}
                <span
                  className="absolute left-2 top-6 h-2 w-2 rounded-full bg-accent ring-4 ring-canvas md:left-3"
                  aria-hidden
                />
                <article className="linear-card linear-card-hover p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="card-title text-ink">{item.role}</h3>
                      <p className="mt-0.5 body-sm text-ink-muted">{item.company}</p>
                    </div>
                    <span className="pill-tag shrink-0">
                      {item.startYear} – {item.endYear === 'Present' ? 'Present' : item.endYear}
                    </span>
                  </div>

                  {item.focus ? (
                    <p className="mt-2 caption text-ink-tertiary">{item.focus}</p>
                  ) : null}

                  <ul className="mt-4 space-y-2">
                    {item.highlights.slice(0, 4).map((highlight) => (
                      <li
                        key={`${item.id}-${highlight}`}
                        className="flex items-start gap-3 body-sm text-ink-muted"
                      >
                        <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-ink-tertiary" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </SectionWrapper>
  )
}
