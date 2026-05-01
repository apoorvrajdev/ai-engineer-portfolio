'use client'

import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/section-wrapper'
import { skills } from '@/data/skills'
import { SectionHeading } from '@/components/section-heading'

export function TechStackSection() {
  return (
    <SectionWrapper id="tech-stack">
      <SectionHeading
        eyebrow="Tech Stack"
        title="Skills"
        description="From model training to frontend delivery, this is the core stack behind my day-to-day execution."
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-90px' }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="mt-10 sm:mt-14 grid gap-6 md:grid-cols-2"
      >
        {skills.map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: categoryIndex * 0.06, ease: [0.4, 0, 0.2, 1] }}
            className="group relative overflow-hidden rounded-xl border border-border bg-card/40 glass p-6 sm:p-7 hover:border-primary/40 transition-all duration-300 hover-lift"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

            <div className="relative z-10">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                  {category.category}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-border/80 bg-secondary/60 px-3 py-1.5 font-mono text-[11px] text-muted-foreground transition-all duration-200 hover:border-primary/50 hover:text-foreground hover:bg-secondary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-transparent transition-all duration-500 group-hover:w-full" />
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
