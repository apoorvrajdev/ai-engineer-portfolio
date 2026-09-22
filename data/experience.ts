export interface ExperienceItem {
  id: string
  role: string
  company: string
  focus: string
  startYear: number
  endYear: number | 'Present'
  startMonth?: string
  endMonth?: string
  highlights: string[]
}

// Mirrors the current CV. Node2.io work is private, so keep the wording exactly
// as specific as the CV and no more.
export const experience: ExperienceItem[] = [
  {
    id: 'node2-ai-engineer',
    role: 'AI Engineer',
    company: 'Node2.io',
    focus:
      'Independent contractor · Software Engineer (Founding Contributor) · PropTech SaaS (BuildingSync) · Remote, Canada',
    startYear: 2026,
    endYear: 'Present',
    startMonth: 'Jan',
    highlights: [
      'Ship resident- and staff-facing product features across a commercial Next.js (App Router) + TypeScript codebase — UI components through Prisma data-access modules to PostgreSQL (Supabase) under Row-Level Security.',
      'Built accessibility features for the resident-facing product — large-text and high-contrast display modes — and keep interactive components keyboard-accessible.',
      'Build the platform’s AI layer as a Python FastAPI service — an LLM booking assistant (LangChain tool calling against a 50+ slot schema, structured response validation, voice interface in development) plus a complaint-prioritization engine.',
      'Contribute code reviews, Jest unit/integration suites, CI/CD pipelines, Docker deployments, and Linux debugging in Agile sprints, collaborating remotely with a Canada-based team across time zones.',
    ],
  },
  {
    id: 'quicksilver-ml-intern',
    role: 'ML Engineering Intern',
    company: 'Quicksilver Technologies Pvt. Ltd.',
    focus: 'India',
    startYear: 2023,
    endYear: 2023,
    startMonth: 'May',
    endMonth: 'Jul',
    highlights: [
      'Supported software-validation workflows with Python data-processing scripts, debugging utilities, and basic unit tests.',
    ],
  },
]
