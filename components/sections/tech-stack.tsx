'use client'

import { motion } from 'framer-motion'
import { SectionWrapper } from '@/components/section-wrapper'
import { SectionHeading } from '@/components/section-heading'
import { skills } from '@/data/skills'

export function TechStackSection() {
  return (
    <SectionWrapper id="tech-stack">
      <SectionHeading
        eyebrow="Stack"
        title="The day-to-day"
        highlight="toolkit."
        description="Languages, model frameworks, data pipelines, deployment — the tools I actually reach for, not the resume keywords."
      />

      <div className="mt-12 grid gap-3 md:grid-cols-2">
        {skills.map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, delay: categoryIndex * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="linear-card p-6"
          >
            <div className="flex items-center justify-between border-b border-hairline pb-4">
              <p className="eyebrow text-ink-muted">{category.category}</p>
              <span className="mono text-ink-tertiary">{String(category.skills.length).padStart(2, '0')}</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {category.skills.map((skill) => (
                <span key={skill} className="chip">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}
