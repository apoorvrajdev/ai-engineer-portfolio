'use client'

import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { SectionWrapper } from '@/components/section-wrapper'
import { SectionHeading } from '@/components/section-heading'
import { Reveal } from '@/components/motion/reveal'
import { education } from '@/data/education'
import { profile } from '@/data/profile'
import { researchPapers } from '@/data/research'

const degree = education[0]
const paper = researchPapers[0]
const { employer } = profile

const checkpoints = [
  {
    title: 'Evaluate before claiming',
    body: 'Every figure names what it was measured on. Fraud Radar froze its benchmark methodology before scoring and published a cross-generator transfer result of PR-AUC 0.0087.',
  },
  {
    title: 'Tested, typed boundaries',
    body: 'Pydantic and TypeScript at the edges, strict type checking, and CI gates on every push. Fraud Radar runs 1,407 tests in CI.',
  },
  {
    title: 'Decisions written down',
    body: 'Architecture, methodology and limitations recorded next to the code. Fraud Radar alone carries eleven decision records.',
  },
]

export function AboutSection() {
  return (
    <SectionWrapper id="about">
      <SectionHeading
        eyebrow="About"
        title="ML engineering across the stack —"
        highlight="research to deployment."
        description="I build the whole path: data, models, evaluation, inference APIs and the product around them. The thread through everything is checking whether a system actually works before claiming it does."
      />

      <div className="mt-12 grid items-start gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <Reveal>
          <div className="space-y-5 body-lg text-ink-muted">
            <p>
              I&rsquo;m a Computer Science graduate from <span className="text-ink">{degree.institution}</span> (
              {degree.endYear}) and a <span className="text-ink">co-author</span> of an IEEE conference paper,{' '}
              <em>{paper.title}</em>, on image captioning with an InceptionV3 CNN encoder and a Transformer
              decoder trained on COCO.
            </p>
            <p>
              In 2023 I was an <span className="text-ink">ML Engineering Intern at Quicksilver Technologies</span>,
              writing Python data-processing scripts, debugging utilities and basic unit tests for software-validation
              workflows.
            </p>
            <p>
              Today I&rsquo;m an <span className="text-ink">{profile.title} (contract) at {employer.name}</span> and a
              founding contributor to {employer.product}, a {employer.productKind}. I ship product features in a
              Next.js and TypeScript codebase backed by PostgreSQL with Row-Level Security, and I&rsquo;m building its
              AI layer: a FastAPI service with an LLM booking assistant that uses LangChain tool calling, and a
              complaint-prioritization engine.
            </p>
            <p>
              Outside work, <span className="text-ink">Fraud Radar</span> is the clearest example of how I build: a
              real-time fraud-scoring system with 1,407 tests and an evaluation showing that its model does not
              transfer across data generators without retraining, reported rather than hidden.
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

            <h3 className="mt-4 headline text-ink">{degree.degree}</h3>
            <p className="mt-1.5 body-default text-ink-muted">{degree.institution}</p>
            <p className="caption">
              {degree.field} · {degree.startYear} – {degree.endYear}
            </p>

            <div className="mt-6 border-t border-hairline pt-5">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
                {degree.gpa ? (
                  <div>
                    <dt className="caption">CGPA</dt>
                    <dd className="mt-1 mono text-ink">{degree.gpa} / 10</dd>
                  </div>
                ) : null}
                <div>
                  <dt className="caption">Graduated</dt>
                  <dd className="mt-1 mono text-ink">{degree.endYear}</dd>
                </div>
              </dl>
            </div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
