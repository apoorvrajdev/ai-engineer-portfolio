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
    body: 'IEEE-published in multimodal AI. The same depth applied to applied engineering work at Node2.io.',
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
              I&rsquo;m a Computer Science graduate from <span className="text-ink">Chandigarh University</span> (2024)
              with <span className="text-ink">IEEE-published</span> research in multimodal AI. My paper —
              <em> AI Narratives: Bridging Visual Content and Linguistic Expression</em> — combines an
              InceptionV3 CNN encoder with a Transformer-based decoder for image captioning, trained on COCO.
            </p>
            <p>
              Before Node2.io, I interned as an <span className="text-ink">ML Engineer at Quicksilver Technologies</span>
              in 2023, where I built Python-based automation scripts and reusable data processing pipelines for
              ML evaluation, validation, and backtesting workflows.
            </p>
            <p>
              Today I&rsquo;m the <span className="text-ink">AI Engineer at Node2.io</span>, a Canada-based
              AI-native cloud platform for intelligent property and infrastructure management. Day-to-day I ship
              FastAPI services, PostgreSQL data workflows, and LLM-based automation for operational reporting and
              documentation — alongside CI/CD pipelines, containerized deployments, and Linux-side reliability
              work that keeps the multi-tenant production environment honest.
            </p>
            <p>
              Outside Node2.io I build the same way in public. <span className="text-ink">Fraud Radar</span> is a
              tier-1-style fraud-detection platform (FastAPI + XGBoost + SHAP, PR-AUC 0.9327, p50 3.7 ms).{' '}
              <span className="text-ink">Unhosted</span> is a Rust runtime that pools heterogeneous hardware into
              a single LLM inference cluster. Three live ML applications round it out — diabetes, heart-disease,
              and 38-class plant-disease classifiers serving real users.
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
