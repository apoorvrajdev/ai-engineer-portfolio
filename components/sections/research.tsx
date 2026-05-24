'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, FileText } from 'lucide-react'
import { SectionWrapper } from '@/components/section-wrapper'
import { SectionHeading } from '@/components/section-heading'
import { researchPapers } from '@/data/research'

const stats = [
  { label: 'Cites in papers', value: '2' },
  { label: 'Full-text views', value: '95' },
  { label: 'Peer-reviewed', value: 'IEEE' },
]

export function ResearchSection() {
  return (
    <SectionWrapper id="research">
      <SectionHeading
        eyebrow="Research"
        title="Vision-language models,"
        highlight="peer-reviewed."
        description="Published research on architectures that bridge visual encoders and Transformer-based language decoders — IEEE-indexed."
      />

      <div className="mt-12 grid gap-3 sm:grid-cols-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="linear-card p-5"
          >
            <p className="eyebrow">{stat.label}</p>
            <p className="mt-2 display-md text-ink">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {researchPapers.map((paper, index) => (
          <motion.article
            key={paper.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, margin: '-80px' }}
            className="linear-card linear-card-hover p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-hairline bg-surface-2">
                  <FileText className="h-4 w-4 text-ink-muted" />
                </span>
                <div>
                  <h3 className="card-title text-ink">{paper.title}</h3>
                  <p className="mt-1 body-sm text-ink-subtle">{paper.authors.join(', ')}</p>
                </div>
              </div>
              <span className="pill-tag shrink-0">{paper.year}</span>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 mono text-ink-tertiary">
              <span className="text-ink-muted">{paper.conference}</span>
              {paper.doi ? (
                <>
                  <span>·</span>
                  <span>DOI {paper.doi}</span>
                </>
              ) : null}
            </div>

            <p className="mt-4 body-default text-ink-muted">{paper.abstract}</p>

            <div className="mt-5 flex flex-wrap gap-5 border-t border-hairline pt-4">
              {paper.arxiv ? (
                <a
                  href={paper.arxiv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink hover:text-accent transition-colors"
                >
                  Read on IEEE Xplore
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ) : null}
              {paper.doi ? (
                <a
                  href={`https://doi.org/${paper.doi}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-subtle hover:text-ink transition-colors"
                >
                  View DOI
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ) : null}
            </div>
          </motion.article>
        ))}
      </div>
    </SectionWrapper>
  )
}
