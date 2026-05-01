export interface Project {
  id: string
  title: string
  description: string
  shortDescription: string
  image: string
  stack: string[]
  github?: string
  demo?: string
  slug: string
  year: number
  category: 'AI/ML' | 'Research' | 'Full-Stack'
  featured: boolean
  fullDetails?: {
    problem: string
    dataset: string
    architecture: string
    training: string
    results: string
    screenshots: string[]
  }
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'AI Building Amenity Management Platform',
    shortDescription: 'AI-powered platform for booking and managing shared residential amenities',
    description: 'AI-powered building amenity management system allowing residents to book and manage shared facilities such as gyms, pools and meeting rooms through a modern web interface.',
    image: '/projects/nlp-ner.svg',
    year: 2026,
    category: 'Full-Stack',
    featured: true,
    slug: 'nlp-ner-model',
    stack: ['Next.js', 'Supabase', 'PostgreSQL', 'Prisma ORM', 'REST APIs'],
    github: 'https://github.com/apoorvrajdev/core-application-services',
    fullDetails: {
      problem: 'Simplify resident access to shared amenities while reducing booking conflicts and idle facility usage.',
      dataset: 'Building booking logs, resident usage metadata, and amenity schedule windows.',
      architecture: 'Next.js frontend with Supabase-backed services, PostgreSQL persistence, and modular API orchestration.',
      training: 'Rules-driven optimization with extensible AI service hooks for demand prediction and utilization balancing.',
      results: 'Improved booking transparency and operational efficiency for shared amenities.',
      screenshots: ['/projects/nlp-ner.svg']
    }
  },
  {
    id: '2',
    title: 'Heart Disease Risk Prediction AI',
    shortDescription: 'Machine learning system for heart disease risk prediction using clinical parameters',
    description: 'Machine learning system that predicts heart disease risk using clinical parameters such as cholesterol, ECG results and blood pressure.',
    image: '/projects/medical-vision.svg',
    year: 2025,
    category: 'AI/ML',
    featured: true,
    slug: 'heart-disease-risk-prediction-ai',
    stack: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Streamlit'],
    github: 'https://github.com/apoorvrajdev/heart-disease-ai',
    fullDetails: {
      problem: 'Enable fast and interpretable heart disease risk screening from clinical inputs.',
      dataset: 'Structured cardiovascular datasets with cholesterol, ECG, blood pressure, and related clinical metrics.',
      architecture: 'Comparative ML workflow across Random Forest, SVM, and KNN with feature engineering and model selection.',
      training: 'Cross-validated training and evaluation pipeline with reproducible preprocessing and tuning.',
      results: 'Achieved ~89% accuracy with cross-validation and delivered as an interactive Streamlit application.',
      screenshots: ['/projects/medical-vision.svg']
    }
  },
  {
    id: '3',
    title: 'Restaurant Sentiment Analysis',
    shortDescription: 'NLP platform for sentiment classification of restaurant reviews',
    description: 'Natural language processing application that analyzes restaurant reviews and classifies sentiment to provide actionable customer experience insights.',
    image: '/projects/time-series.svg',
    year: 2025,
    category: 'AI/ML',
    featured: true,
    slug: 'restaurant-sentiment-analysis',
    stack: ['Python', 'NLP', 'Streamlit', 'Scikit-Learn'],
    github: 'https://github.com/apoorvrajdev/restaurant-sentiment-analysis',
    fullDetails: {
      problem: 'Turn unstructured review text into measurable sentiment trends for restaurant operations.',
      dataset: 'Restaurant review corpora with labeled sentiment classes and contextual metadata.',
      architecture: 'Text preprocessing pipeline with vectorization and supervised sentiment classifiers.',
      training: 'Iterative model training and validation for robust binary/multi-class sentiment detection.',
      results: 'Delivered reliable sentiment categorization for interactive dashboard-based exploration.',
      screenshots: ['/projects/time-series.svg']
    }
  },
  {
    id: '4',
    title: 'Diabetes Risk Prediction AI',
    shortDescription: 'Predictive ML system for diabetes risk assessment from clinical indicators',
    description: 'Machine learning system designed to estimate diabetes risk using clinical and demographic features for proactive health screening.',
    image: '/projects/medical-vision.svg',
    year: 2025,
    category: 'AI/ML',
    featured: true,
    slug: 'diabetes-risk-prediction-ai',
    stack: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Streamlit'],
    github: 'https://github.com/apoorvrajdev/diabetes-risk-prediction-ai',
    fullDetails: {
      problem: 'Identify high-risk diabetes cases earlier using routinely available clinical signals.',
      dataset: 'Clinical tabular datasets with glucose, BMI, blood pressure, and related risk factors.',
      architecture: 'Supervised classification pipeline with feature scaling, model comparison, and threshold tuning.',
      training: 'Cross-validated training and evaluation workflow focused on recall and balanced classification metrics.',
      results: 'Produced dependable risk predictions suitable for decision-support interfaces.',
      screenshots: ['/projects/medical-vision.svg']
    }
  },
  {
    id: '5',
    title: 'Image Captioning System',
    shortDescription: 'Deep learning image caption generation with CNN and Transformer architecture',
    description: 'Deep learning pipeline combining CNN visual feature extraction with Transformer-based sequence generation to produce contextual image captions.',
    image: '/projects/time-series.svg',
    year: 2024,
    category: 'AI/ML',
    featured: true,
    slug: 'image-captioning-system',
    stack: ['Python', 'PyTorch', 'CNN', 'Transformer'],
    github: 'https://github.com/apoorvrajdev',
    fullDetails: {
      problem: 'Generate contextually meaningful captions directly from raw visual input.',
      dataset: 'Image-caption benchmark corpora with paired vision-language supervision.',
      architecture: 'CNN-based visual encoder paired with a Transformer-based decoder for sequence generation.',
      training: 'Supervised training with teacher forcing, tokenized captions, and sequence-level validation.',
      results: 'Produced coherent and context-aware caption outputs across diverse visual inputs.',
      screenshots: ['/projects/time-series.svg']
    }
  },
  {
    id: '6',
    title: 'Plant Leaf Disease Detection',
    shortDescription: 'CNN-based computer vision model for plant disease detection from leaf imagery',
    description: 'CNN-based computer vision model detecting plant diseases from leaf images with ~96% classification accuracy.',
    image: '/projects/medical-vision.svg',
    year: 2024,
    category: 'AI/ML',
    featured: true,
    slug: 'plant-leaf-disease-detection',
    stack: ['Python', 'TensorFlow', 'OpenCV'],
    github: 'https://github.com/apoorvrajdev',
    fullDetails: {
      problem: 'Detect crop leaf diseases early to support preventive agricultural interventions.',
      dataset: 'Labeled plant leaf image datasets across multiple disease classes and healthy controls.',
      architecture: 'CNN classification pipeline with image preprocessing and augmentation for robust generalization.',
      training: 'Supervised image classification with augmentation and validation-based checkpointing.',
      results: 'Achieved ~96% classification accuracy on validation and held-out test splits.',
      screenshots: ['/projects/medical-vision.svg']
    }
  },
]
