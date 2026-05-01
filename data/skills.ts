export interface SkillCategory {
  category: string
  skills: string[]
}

export const skills: SkillCategory[] = [
  {
    category: 'Programming',
    skills: ['Python', 'JavaScript', 'SQL']
  },
  {
    category: 'Machine Learning',
    skills: ['Scikit-Learn', 'PyTorch', 'TensorFlow', 'Predictive Modeling', 'NLP']
  },
  {
    category: 'Backend & APIs',
    skills: ['REST APIs', 'JSON', 'API Development', 'Postman']
  },
  {
    category: 'Web Frameworks',
    skills: ['Next.js', 'Streamlit']
  },
  {
    category: 'Databases',
    skills: ['PostgreSQL', 'Supabase']
  },
  {
    category: 'DevOps & Tools',
    skills: ['Linux', 'CI/CD', 'Podman', 'GitHub']
  },
  {
    category: 'Cloud',
    skills: ['AWS (basic concepts)', 'Cloud Deployment']
  },
  {
    category: 'Systems',
    skills: ['Windows', 'Linux']
  }
]
