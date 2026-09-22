/**
 * Single source of truth for identity facts used across the site: metadata,
 * JSON-LD, OG images, hero, navigation, footer, contact and the command
 * palette. Keep every value consistent with the current CV.
 */

export const SITE_URL = 'https://ai-engineer-portfolio-pi.vercel.app'
export const SITE_HOST = new URL(SITE_URL).host

export const profile = {
  name: 'Apoorv Raj',
  initials: 'AR',
  /** Official job title at the current employer (per the CV). */
  title: 'AI Engineer',
  /** Positioning line — used in the footer and as the OG subtitle. */
  tagline: 'Software engineer building ML systems end to end, and checking that they work.',
  employer: {
    name: 'Node2.io',
    engagement: 'Independent contractor',
    product: 'BuildingSync',
    productKind: 'PropTech SaaS',
  },
  location: 'India · Remote',
  availability: 'Available for new work',
  email: 'apoorvrajmgr@gmail.com',
  githubUser: 'apoorvrajdev',
  links: {
    github: 'https://github.com/apoorvrajdev',
    linkedin: 'https://www.linkedin.com/in/apoorv-raj-1a35ba218/',
    linkedinHandle: '/in/apoorv-raj-1a35ba218',
    resume: '/resume.pdf',
  },
  /** Languages and frameworks shown in compact one-line stack summaries. */
  coreStack: ['Python', 'TypeScript', 'FastAPI', 'React'],
  /** Site-wide meta description — keep it at or under 160 characters. */
  description:
    'Software engineer building ML systems end to end. AI Engineer (contract) at Node2.io. Co-author of an IEEE paper on image captioning.',
  keywords: [
    'Software Engineer',
    'AI Engineer',
    'ML Engineer',
    'Machine Learning',
    'Model Evaluation',
    'FastAPI',
    'TypeScript',
    'React',
  ],
} as const

/** "AI Engineer (contract) at Node2.io" — the one-line current-role summary. */
export const currentRole = `${profile.title} (contract) at ${profile.employer.name}`
