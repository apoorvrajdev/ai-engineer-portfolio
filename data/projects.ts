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
    title: 'Image Captioning System (CNN + Transformer)',
    shortDescription:
      'IEEE-published multimodal AI — InceptionV3 + Transformer for image captioning on COCO.',
    description:
      'End-to-end multimodal AI system for image caption generation using a hybrid InceptionV3 CNN encoder and Transformer-based decoder, trained on the COCO dataset. Re-architected the IEEE-published research notebook into a modular, production-style Python package with typed configuration management, reusable inference pipelines, and CI-integrated quality checks. Achieved a BLEU-4 score of ~24 on image-to-text generation tasks.',
    image: '/projects/time-series.svg',
    year: 2024,
    category: 'Research',
    featured: true,
    slug: 'image-captioning-system',
    stack: ['Python', 'TensorFlow', 'Transformer', 'InceptionV3 CNN', 'Pydantic', 'FastAPI', 'PyTest', 'CI/CD', 'COCO Dataset'],
    github: 'https://github.com/apoorvrajdev/image-captioning-system',
  },
  {
    id: '2',
    title: 'Heart Disease Risk Prediction',
    shortDescription:
      'Clinical decision support — 89.42% CV accuracy across KNN, Random Forest, SVM, and boosted ensembles.',
    description:
      'AI-powered clinical decision support system for heart disease risk prediction using supervised ML models trained on structured healthcare datasets. End-to-end pipeline including preprocessing, feature scaling, EDA, model training, ensemble learning, and 5-fold cross-validation. Compared KNN, Random Forest, SVM, and boosted ensemble models — best model reached 89.42% accuracy with strong generalization. Deployed as an interactive Streamlit web application for real-time patient risk prediction.',
    image: '/projects/medical-vision.svg',
    year: 2024,
    category: 'AI/ML',
    featured: true,
    slug: 'heart-disease-risk-prediction',
    stack: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Streamlit', 'Ensemble Learning'],
    github: 'https://github.com/apoorvrajdev/heart-disease-ai',
  },
  {
    id: '3',
    title: 'Plant Leaf Disease Detection',
    shortDescription:
      'CNN-based crop disease classification — 96% accuracy, deployed on Hugging Face Spaces.',
    description:
      'CNN-based image classification model for plant leaf disease detection achieving 96% accuracy. Implemented image preprocessing and augmentation techniques to improve robustness and generalization. Designed scalable inference logic for deployment in production environments with structured debugging and validation workflows.',
    image: '/projects/medical-vision.svg',
    year: 2024,
    category: 'AI/ML',
    featured: true,
    slug: 'plant-leaf-disease-detection',
    stack: ['Python', 'TensorFlow', 'CNN', 'OpenCV'],
    github: 'https://github.com/apoorvrajdev/plant-disease-detection',
    demo: 'https://huggingface.co/spaces/workface/plant-disease-detection',
  },
]
