export interface SkillCategory {
  category: string
  skills: string[]
}

export const skills: SkillCategory[] = [
  {
    category: 'Programming & Data',
    skills: ['Python', 'SQL', 'Pandas', 'NumPy'],
  },
  {
    category: 'Machine Learning & AI',
    skills: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'Predictive Modeling', 'NLP', 'Generative AI'],
  },
  {
    category: 'Backend & APIs',
    skills: ['REST APIs', 'FastAPI', 'Pydantic'],
  },
  {
    category: 'Data Processing',
    skills: ['Data Preprocessing', 'Feature Engineering', 'Model Evaluation'],
  },
  {
    category: 'DevOps & Deployment',
    skills: ['CI/CD Pipelines', 'Docker', 'Podman', 'Vercel'],
  },
  {
    category: 'Tools & Platforms',
    skills: ['Git', 'GitHub', 'Linux', 'PostgreSQL', 'AWS', 'Postman'],
  },
  {
    category: 'Software Engineering',
    skills: ['OOP', 'SDLC', 'Agile/Scrum', 'Unit Testing', 'Debugging'],
  },
]
