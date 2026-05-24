'use client'

import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { SectionWrapper } from '@/components/section-wrapper'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/motion/reveal'

const checkpoints = [
  {
    title: 'Production over benchmarks',
    body: 'Models that hold up under real load — recall-tuned for what the use case actually costs, not leaderboard accuracy.',
  },
  {
    title: 'Full-stack ML ownership',
    body: 'Data pipelines, model architecture, training, evaluation, inference APIs, and the UI in front of them — owned end to end.',
  },
  {
    title: 'Research plus engineering',
    body: 'IEEE-published; prior research at DRDO and IIT Mandi. The same depth applied to founding-engineer product work.',
  },
]

export function AboutSection() {
  return (
    <SectionWrapper id="about">
      <SectionHeading
        eyebrow="About"
        title="ML engineering across the stack —"
        highlight="research to deployment."
        description="I work the full ML surface: data, models, training, inference, and the systems that ship them. The thread through everything is reliability under real load, not benchmark accuracy."
      />

      <div className="mt-12 grid items-start gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <Reveal>
          <div className="space-y-5 body-lg text-ink-muted">
            <p>
              I&rsquo;ve spent time on both sides of the research / engineering divide. At
              <span className="text-ink"> DRDO</span>, I worked on hyperspectral remote-sensing models —
              applying deep learning to geospatial imagery and improving feature-extraction
              pipelines over baseline approaches.
            </p>
            <p>
              At <span className="text-ink">IIT Mandi</span>, I built automated EEG preprocessing pipelines that
              scaled to 70,000+ samples per day, unblocking the lab&rsquo;s experimental throughput. The vision-language
              work that came out of that period became my <span className="text-ink">IEEE-published</span> paper
              on AI narrative generation — InceptionV3 plus a Transformer decoder for scene-aware captioning.
            </p>
            <p>
              Today I&rsquo;m the Founding AI Engineer at <span className="text-ink">Node2</span>, architecting
              the AI stack for intelligent-infrastructure systems — predictive maintenance, energy
              optimization, real-time IoT pipelines, containerized deployment. Pilots running with
              stakeholders in Canada and the UAE.
            </p>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-hairline bg-hairline">
            {checkpoints.map((point) => (
              <div key={point.title} className="bg-surface-1 p-6">
                <div className="flex items-baseline gap-3">
                  <span className="mono text-ink-tertiary">→</span>
                  <h3 className="card-title text-ink">{point.title}</h3>
                </div>
                <p className="mt-2 body-sm text-ink-subtle pl-6">{point.body}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-90px' }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="linear-card p-6">
            <div className="flex items-center gap-2 eyebrow">
              <GraduationCap className="h-3.5 w-3.5" />
              Education
            </div>

            <h3 className="mt-4 headline text-ink">B.E. Computer Science</h3>
            <p className="mt-1.5 body-default text-ink-muted">Chandigarh University</p>
            <p className="caption">Computer Science &amp; Engineering · 2020 – 2024</p>

            <div className="mt-6 border-t border-hairline pt-5">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <dt className="caption">CGPA</dt>
                  <dd className="mt-1 mono text-ink">7.66 / 10</dd>
                </div>
                <div>
                  <dt className="caption">Graduated</dt>
                  <dd className="mt-1 mono text-ink">2024</dd>
                </div>
                <div className="col-span-2">
                  <dt className="caption">Focus</dt>
                  <dd className="mt-1 body-sm text-ink-muted">Machine learning · Algorithms · Software systems</dd>
                </div>
              </dl>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
