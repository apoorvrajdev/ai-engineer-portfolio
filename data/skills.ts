export interface SkillCategory {
  category: string
  skills: string[]
}

// Only skills backed by the current CV or a public repository. Tools that
// appear once historically, or that no current work uses, stay off the list.
export const skills: SkillCategory[] = [
  {
    category: 'Languages',
    skills: ['Python', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    category: 'Machine Learning',
    skills: [
      'XGBoost',
      'scikit-learn',
      'SHAP',
      'TensorFlow / Keras',
      'pandas',
      'NumPy',
      'LLM tool calling (LangChain)',
    ],
  },
  {
    category: 'Backend & Data',
    skills: [
      'FastAPI',
      'Pydantic v2',
      'SQLAlchemy 2.0',
      'Alembic',
      'PostgreSQL',
      'SQLite',
      'Prisma',
      'REST API design',
    ],
  },
  {
    category: 'Frontend',
    skills: ['React 19', 'Next.js (App Router)', 'TanStack Query', 'Tailwind CSS', 'Accessible UI'],
  },
  {
    category: 'Testing & Quality',
    skills: ['pytest', 'Jest', 'mypy', 'Ruff', 'ESLint', 'pre-commit', 'Code review'],
  },
  {
    category: 'Delivery',
    skills: ['GitHub Actions', 'Docker', 'Vercel', 'Hugging Face Hub', 'Streamlit', 'Git', 'Linux'],
  },
]
