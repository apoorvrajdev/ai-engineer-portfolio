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
    id: 'node2-founding-ai-engineer',
    role: 'Founding AI Engineer | Intelligent Infrastructure Systems',
    company: 'Node2.io',
    focus: 'Full-time • Toronto, Ontario, Canada (Remote)',
    startYear: 2026,
    endYear: 'Present',
    highlights: [
      'Duration: Jan 2026 – Present',
      'Architecting and developing AI-driven building management systems from ground up',
      'Designing predictive maintenance and energy optimization models using real-time IoT data pipelines',
      'Leading end-to-end AI system architecture including model development, backend APIs and deployment workflows',
      'Implementing containerized deployment pipelines (Podman) with CI/CD integration',
      'Collaborating with stakeholders in Canada and UAE for pilot validation and early-stage funding readiness',
      'Developing modular AI framework adaptable to smart buildings, IoT ecosystems and urban infrastructure platforms',
      'Skills: Artificial Intelligence (AI), AI System Architecture, CI/CD, Containerization (Podman), Product Strategy',
    ],
  },
  {
    id: 'startup-builder-ai-researcher',
    role: 'Startup Builder & AI Researcher',
    company: 'Self-employed',
    focus: 'India (Remote)',
    startYear: 2024,
    endYear: 2025,
    highlights: [
      'Duration: Jun 2024 – Dec 2025',
      'Explored and prototyped multiple AI startup concepts across infrastructure intelligence, predictive analytics and healthcare AI',
      'Conducted extensive research on AI systems, LLM applications and real-time data pipelines for scalable product architectures',
      'Developed experimental ML prototypes using Python and Scikit-Learn',
      'Built an AI Heart Disease Risk Prediction system (92% accuracy) deployed as an interactive ML application',
      'Designed early concepts for AI-driven infrastructure monitoring and optimization systems which evolved into the Node2 intelligent infrastructure platform',
      'Developed a Restaurant Sentiment Analysis NLP platform using Streamlit',
      'Delivered freelance machine learning and data analytics solutions for small independent clients',
      'Skills: Startup Strategy, AI Systems, Product Strategy, Machine Learning, Python, Data Science',
    ],
  },
  {
    id: 'iit-mandi-ml-research-intern',
    role: 'ML Research Intern',
    company: 'IIT Mandi',
    focus: 'Internship • Mandi, Himachal Pradesh, India',
    startYear: 2024,
    endYear: 2024,
    highlights: [
      'Duration: Feb 2024 – May 2024',
      'Built automated Python-based EEG preprocessing workflows to reduce manual effort and improve consistency.',
      'Developed scalable data processing frameworks capable of handling 70,000+ data points per day, improving model accuracy and experimental efficiency.',
      'Used ChatGPT for experiment summaries and internal knowledge-style documentation.',
      'Collaborated with engineering teams to refine algorithms and improve operational efficiency.',
    ],
  },
  {
    id: 'drdo-ml-research-intern',
    role: 'ML Research Intern',
    company: 'Defence Research and Development Organisation (DRDO)',
    focus: 'Internship • Chandigarh, India',
    startYear: 2023,
    endYear: 2024,
    highlights: [
      'Duration: Aug 2023 – Jan 2024',
      'Applied ML and deep learning to hyperspectral geospatial datasets for advanced image analysis',
      'Improved algorithms for precise information extraction from remote sensing data',
      'Skills: Machine Learning, GIS, Geospatial Analysis, PyTorch, SciPy, GDAL, Rasterio, Spectral Python',
    ],
  },
  {
    id: 'quicksilver-ml-intern',
    role: 'ML Intern',
    company: 'Quicksilver Technologies Pvt Ltd',
    focus: 'Internship • Bengaluru, India',
    startYear: 2023,
    endYear: 2023,
    highlights: [
      'Duration: May 2023 – Jul 2023',
      'Performed backtesting for machine learning models to evaluate performance reliability',
      'Collaborated to establish robust testing frameworks and evaluation methodologies',
      'Skills: Data Science, Machine Learning, TensorFlow, PyTorch, Backtesting, Git',
    ],
  },
  {
    id: 'internshala-python-intern',
    role: 'Python Intern',
    company: 'Internshala',
    focus: 'Internship • Remote',
    startYear: 2022,
    endYear: 2022,
    highlights: [
      'Duration: Jun 2022 – Jul 2022',
      'Skills: Computer Science, Python',
    ],
  },
]
