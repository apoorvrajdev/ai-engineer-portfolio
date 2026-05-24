export interface SkillCategory {
  category: string
  skills: string[]
}

export const skills: SkillCategory[] = [
  {
    category: 'Languages',
    skills: ['Python', 'TypeScript', 'Rust', 'SQL', 'Bash'],
  },
  {
    category: 'Machine Learning & AI',
    skills: [
      'PyTorch',
      'TensorFlow',
      'Keras',
      'Scikit-learn',
      'XGBoost',
      'SHAP',
      'Transformer',
      'InceptionV3',
      'EfficientNetB0',
      'SMOTE',
      'Generative AI',
      'NLP',
    ],
  },
  {
    category: 'Backend & APIs',
    skills: [
      'FastAPI',
      'Pydantic v2',
      'SQLAlchemy 2.0',
      'Alembic',
      'PostgreSQL',
      'SQLite',
      'structlog',
      'Uvicorn',
      'REST',
    ],
  },
  {
    category: 'Frontend',
    skills: ['React 19', 'Next.js', 'Vite', 'Tailwind CSS', 'TanStack Query', 'Recharts', 'framer-motion'],
  },
  {
    category: 'Data & Pipelines',
    skills: ['Pandas', 'NumPy', 'Feature Engineering', 'Model Evaluation', 'SMOTE', 'Faker'],
  },
  {
    category: 'Serving & Deployment',
    skills: [
      'Streamlit',
      'Gradio',
      'Hugging Face Spaces',
      'Vercel',
      'Docker',
      'Podman',
      'CI/CD',
      'GitHub Actions',
    ],
  },
  {
    category: 'Quality & Testing',
    skills: ['pytest', 'mypy (strict)', 'Ruff', 'ESLint', 'pre-commit', 'nbstripout'],
  },
  {
    category: 'Tools & Platforms',
    skills: ['Git', 'GitHub', 'Linux', 'AWS', 'uv', 'npm'],
  },
]
