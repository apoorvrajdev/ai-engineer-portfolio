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
    role: 'Founding AI Engineer',
    company: 'Node2.io',
    focus: 'Intelligent infrastructure systems · Toronto / Remote',
    startYear: 2026,
    endYear: 'Present',
    startMonth: 'Jan',
    highlights: [
      'Founding engineer architecting the AI/ML stack for an intelligent-infrastructure platform from zero — owning model development through deployment.',
      'Designed predictive-maintenance and energy-optimization models running on real-time IoT telemetry from smart-building sensors.',
      'Built containerized deployment with Podman and CI/CD; the same pipeline ships dev, staging, and production pilot environments.',
      'Validated early pilots with stakeholders across Canada and the UAE; supported funding diligence with technical architecture write-ups.',
      'Designed the platform as a modular AI framework adaptable beyond buildings — IoT, urban infrastructure, and adjacent telemetry domains.',
    ],
  },
  {
    id: 'startup-builder-ai-researcher',
    role: 'Independent AI Researcher & Builder',
    company: 'Self-employed',
    focus: 'India (Remote)',
    startYear: 2024,
    endYear: 2025,
    startMonth: 'Jun',
    endMonth: 'Dec',
    highlights: [
      'Prototyped AI products across infrastructure intelligence, predictive analytics, and clinical-decision-support — several seeded the technical direction that became Node2.',
      'Shipped a heart-disease risk-prediction system (~89% CV accuracy) as an interactive Streamlit application, recall-tuned for clinical screening.',
      'Built a restaurant-review NLP sentiment pipeline with topic surfacing for ops teams — TF-IDF + supervised classifiers over a labelled corpus.',
      'Studied LLM application patterns and real-time data architectures; delivered ML/data consulting to independent clients alongside the research work.',
    ],
  },
  {
    id: 'iit-mandi-ml-research-intern',
    role: 'ML Research Intern',
    company: 'IIT Mandi',
    focus: 'Neural signal processing · Mandi, India',
    startYear: 2024,
    endYear: 2024,
    startMonth: 'Feb',
    endMonth: 'May',
    highlights: [
      'Built automated Python pipelines for EEG signal preprocessing — eliminated manual cleanup steps that previously bottlenecked the lab.',
      'Scaled the pipeline to handle 70,000+ samples per day, unblocking experimental throughput for downstream modeling work.',
      'Contributed to algorithmic refinements alongside the engineering team; authored experiment summaries and internal documentation.',
    ],
  },
  {
    id: 'drdo-ml-research-intern',
    role: 'ML Research Intern',
    company: 'DRDO',
    focus: 'Hyperspectral remote sensing · Defence Research and Development Organisation, Chandigarh',
    startYear: 2023,
    endYear: 2024,
    startMonth: 'Aug',
    endMonth: 'Jan',
    highlights: [
      'Applied deep learning to hyperspectral geospatial imagery for remote-sensing information extraction.',
      'Improved feature-extraction algorithms over baseline pipelines on the target classification task.',
      'Worked in the geospatial Python stack: PyTorch, SciPy, GDAL, Rasterio, Spectral Python.',
    ],
  },
  {
    id: 'quicksilver-ml-intern',
    role: 'ML Intern',
    company: 'Quicksilver Technologies',
    focus: 'Model validation infrastructure · Bengaluru, India',
    startYear: 2023,
    endYear: 2023,
    startMonth: 'May',
    endMonth: 'Jul',
    highlights: [
      'Built backtesting infrastructure for production ML models — performance evaluation, reliability checks, regression testing across model versions.',
      'Contributed to the team\'s evaluation methodology; worked across the PyTorch / TensorFlow surface depending on the model under test.',
    ],
  },
  {
    id: 'internshala-python-intern',
    role: 'Python Intern',
    company: 'Internshala',
    focus: 'Remote',
    startYear: 2022,
    endYear: 2022,
    startMonth: 'Jun',
    endMonth: 'Jul',
    highlights: [
      'Early Python and CS foundations internship — the entry point into ML and applied research that followed.',
    ],
  },
]
