'use client'

import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/section-wrapper'
import { education } from '@/data/education'
import { CheckCircle2 } from 'lucide-react'
import { SectionHeading } from '@/components/section-heading'

export function EducationSection() {
  return (
    <SectionWrapper id="education">
      <SectionHeading
        eyebrow="Academics"
        title="Education"
        description="Academic qualifications that built the technical foundation for AI engineering and research."
      />

      <div className="mt-10 sm:mt-14 space-y-6">
        {education.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.06, ease: [0.4, 0, 0.2, 1] }}
            viewport={{ once: true, margin: '-100px' }}
            className="relative"
          >
            {index !== education.length - 1 && (
              <div className="absolute left-5 top-20 h-14 w-px bg-gradient-to-b from-primary/80 to-transparent md:left-8" />
            )}

            <div className="group relative overflow-hidden rounded-xl border border-border bg-card/40 glass p-6 md:ml-16 md:p-8 hover:border-primary/40 transition-all duration-300 hover-lift">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

              <div className="relative z-10">
                <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row">
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-foreground">
                      {item.degree}
                    </h3>
                    <p className="mt-1 text-base font-semibold text-primary sm:text-lg">
                      {item.institution}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.field}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-lg border border-border/80 bg-secondary/60 px-3 py-1.5 font-mono text-xs text-muted-foreground">
                    {item.startYear} – {item.endYear}
                  </span>
                </div>

                {item.gpa && (
                  <p className="mb-4 font-mono text-sm text-muted-foreground">
                    GPA: <span className="text-foreground font-medium">{item.gpa}</span>
                  </p>
                )}

                {item.highlights && item.highlights.length > 0 && (
                  <div className="space-y-2">
                    {item.highlights.map((highlight) => (
                      <div
                        key={`${item.id}-${highlight}`}
                        className="flex items-start gap-3 text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-transparent transition-all duration-500 group-hover:w-full" />
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
