'use client'

import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/section-wrapper'
import { researchPapers } from '@/data/research'
import { ExternalLink, BookOpen } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'

export function ResearchSection() {
  return (
    <SectionWrapper id="research">
      <SectionHeading
        eyebrow="Research"
        title="Research"
        description="Peer-reviewed work focused on efficient model architectures, robustness, and practical machine learning deployment."
      />

      <div className="mt-10 sm:mt-14 grid gap-5 sm:grid-cols-2 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0, ease: [0.4, 0, 0.2, 1] }}
          className="group relative overflow-hidden rounded-xl border border-border bg-card/40 glass p-5 hover:border-primary/40 hover-lift transition-all duration-300 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
          <div className="relative z-10">
            <p className="text-3xl font-bold tracking-tight text-foreground">2</p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Cites in Papers</p>
          </div>
          <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-transparent transition-all duration-500 group-hover:w-full" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.06, ease: [0.4, 0, 0.2, 1] }}
          className="group relative overflow-hidden rounded-xl border border-border bg-card/40 glass p-5 hover:border-primary/40 hover-lift transition-all duration-300 text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
          <div className="relative z-10">
            <p className="text-3xl font-bold tracking-tight text-foreground">95</p>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">Full Text Views</p>
          </div>
          <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-transparent transition-all duration-500 group-hover:w-full" />
        </motion.div>
      </div>

      <div className="space-y-5">
        {researchPapers.map((paper, index) => (
          <motion.div
            key={paper.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.06, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true, margin: '-100px' }}
            className="group relative overflow-hidden rounded-xl border border-border bg-card/40 glass p-6 md:p-7 hover:border-primary/40 transition-all duration-300 hover-lift"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <BookOpen className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <h3 className="mb-2 text-lg font-bold leading-snug tracking-tight text-foreground transition-colors duration-300 group-hover:text-gradient sm:text-xl">
                      {paper.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {paper.authors.join(', ')}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 rounded-lg border border-border/80 bg-secondary/60 px-3 py-1 font-mono text-xs text-muted-foreground whitespace-nowrap">
                  {paper.year}
                </span>
              </div>

              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-primary">{paper.conference}</span>
                {paper.doi && (
                  <>
                    <span className="text-muted-foreground/50">•</span>
                    <span className="font-mono text-xs text-muted-foreground">DOI: {paper.doi}</span>
                  </>
                )}
              </div>

              <p className="mb-5 text-sm leading-relaxed text-muted-foreground">{paper.abstract}</p>

              <div className="flex gap-4 border-t border-border/50 pt-4">
                {paper.arxiv && (
                  <a
                    href={paper.arxiv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-2 font-mono text-xs text-primary transition-all duration-200 hover:gap-3"
                  >
                    Read on IEEE Xplore
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
                {paper.doi && (
                  <a
                    href={`https://doi.org/${paper.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link inline-flex items-center gap-2 font-mono text-xs text-primary transition-all duration-200 hover:gap-3"
                  >
                    View DOI
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>

            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-transparent transition-all duration-500 group-hover:w-full" />
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
