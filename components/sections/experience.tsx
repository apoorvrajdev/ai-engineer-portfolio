'use client'

import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/section-wrapper'
import { SectionHeading } from '@/components/section-heading'
import { experience } from '@/data/experience'

export function ExperienceSection() {
  return (
    <SectionWrapper id="experience">
      <SectionHeading
        eyebrow="Career"
        title="Experience"
        description="Professional internships and applied AI work across research-driven environments."
      />

      <div className="mt-10 sm:mt-14 space-y-6">
        {experience.map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true, margin: '-100px' }}
            className="relative pl-10"
          >
            <span className="absolute left-3 top-3 h-3 w-3 rounded-full bg-primary" />
            {index < experience.length - 1 ? (
              <span className="absolute left-[0.92rem] top-7 h-[calc(100%+1.3rem)] w-px bg-gradient-to-b from-primary/80 to-transparent" />
            ) : null}

            <div className="group relative overflow-hidden rounded-xl border border-border bg-card/40 glass p-6 sm:p-7 hover:border-primary/40 transition-all duration-300 hover-lift">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

              <div className="relative z-10">
                <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">{item.role}</h3>
                    <p className="mt-1 text-base font-semibold text-primary sm:text-lg">{item.company}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{item.focus}</p>
                  </div>
                  <span className="shrink-0 rounded-lg border border-border/80 bg-secondary/60 px-3 py-1.5 font-mono text-xs text-muted-foreground">
                    {item.startYear} - {item.endYear}
                  </span>
                </div>

                <div className="space-y-2">
                  {item.highlights.map((highlight) => (
                    <div key={`${item.id}-${highlight}`} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-transparent transition-all duration-500 group-hover:w-full" />
            </div>
          </motion.article>
        ))}
      </div>
    </SectionWrapper>
  )
}
