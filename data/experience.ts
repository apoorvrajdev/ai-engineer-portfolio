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

export const experience: ExperienceItem[] = [
  {
    id: 'node2-ai-engineer',
    role: 'AI Engineer',
    company: 'Node2.io',
    focus: 'AI-native cloud platform · Remote (Canada-based company)',
    startYear: 2026,
    endYear: 'Present',
    startMonth: 'Jan',
    highlights: [
      'Contributed to development of an AI-native cloud platform for intelligent property and infrastructure management, supporting real-time operational workflows, role-based access systems, and scalable SaaS architecture.',
      'Designed and optimized scalable backend APIs and modular application services using modern web architecture principles, improving system performance and maintainability.',
      'Developed and integrated AI-assisted automation workflows for operational reporting, documentation generation, and intelligent system management using LLM-based tooling.',
      'Built and maintained PostgreSQL-integrated data workflows, authentication systems, and cloud-connected application infrastructure supporting multi-tenant production environments.',
      'Contributed to CI/CD pipelines, containerized deployment workflows, and production reliability processes using Git-based development and automated validation tooling.',
      'Worked extensively in Linux-based environments — debugging, troubleshooting, performance monitoring, and root-cause analysis for distributed application systems.',
    ],
  },
  {
    id: 'quicksilver-ml-intern',
    role: 'ML Engineer Intern',
    company: 'Quicksilver Technologies Pvt. Ltd.',
    focus: 'ML evaluation infrastructure · India',
    startYear: 2023,
    endYear: 2023,
    startMonth: 'May',
    endMonth: 'Jul',
    highlights: [
      'Developed Python-based automation scripts and reusable data processing pipelines for ML evaluation, validation, and backtesting workflows.',
      'Built modular preprocessing and testing workflows aligned with software engineering best practices, improving reproducibility and execution efficiency.',
      'Implemented validation and debugging processes to ensure correctness, reliability, and consistency across ML experimentation pipelines.',
      'Leveraged LLM-assisted tooling for experiment summarization, workflow documentation, and internal reporting automation.',
    ],
  },
]
