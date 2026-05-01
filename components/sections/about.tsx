'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
import { SectionWrapper } from '@/components/section-wrapper'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/motion/reveal'

export function AboutSection() {
  return (
    <SectionWrapper id="about">
      <SectionHeading
        eyebrow="About"
        title="Engineering for clarity, speed, and real-world impact."
        description="I build AI products that are as dependable in production as they are promising in research."
      />

      <div className="mt-10 sm:mt-14 grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-start">
        <Reveal>
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              I build AI products that are as dependable in production as they are promising in research.
            </p>
            <p>
              I design and deploy intelligent systems across machine learning, computer vision, and natural language processing, focusing on models that are measurable, efficient, and production-ready.
            </p>
            <p>
              My experience spans academic research, industry internships, and entrepreneurial exploration. At DRDO and IIT Mandi, I worked on applied machine learning research, building neural architectures and experimenting with intelligent systems in constrained environments, while also publishing peer-reviewed work in applied AI.
            </p>
            <p>
              Today, as a Founding AI Engineer at Node2, I architect and develop AI-driven intelligent infrastructure systems for smart buildings, including predictive maintenance and energy optimization platforms powered by real-time IoT data.
            </p>
            <p>
              I enjoy building complete AI systems end-to-end—from data pipelines and model training to backend APIs and production deployment. My goal is simple: build intelligent systems that people can rely on.
            </p>
          </div>
        </Reveal>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-90px' }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="flex items-start"
        >
          <div className="group relative overflow-hidden rounded-xl border border-border bg-card/40 glass p-8 md:p-8 hover:border-primary/40 transition-all duration-300 hover-lift">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            <div className="relative z-10">
              <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight text-foreground">
                    B.E. in Computer Science &amp; Engineering
                  </h3>
                  <p className="mt-1 text-base font-semibold text-primary">
                    Chandigarh University
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Computer Science &amp; Engineering
                  </p>
                </div>
                <span className="shrink-0 rounded-lg border border-border/80 bg-secondary/60 px-3 py-1.5 font-mono text-xs text-muted-foreground">
                  2020 – 2024
                </span>
              </div>
              <p className="mb-4 font-mono text-sm text-muted-foreground">
                CGPA: <span className="text-foreground font-medium">7.66</span>
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>Graduated: 2024</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>Core focus in machine learning, algorithms, and software systems</span>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-transparent transition-all duration-500 group-hover:w-full" />
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
