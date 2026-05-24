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
    title: 'Amenity Booking Platform — Node2',
    shortDescription:
      'Full-stack booking platform with conflict-resolution, quotas, and demand-prediction hooks for residential buildings.',
    description:
      'Production booking platform for shared residential amenities — gyms, pools, lounges, meeting rooms. Postgres-backed scheduling with per-resident quotas, time-window conflict resolution, and a service layer that captures utilization telemetry feeding downstream demand-prediction models.',
    image: '/projects/nlp-ner.svg',
    year: 2026,
    category: 'Full-Stack',
    featured: true,
    slug: 'nlp-ner-model',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Prisma', 'REST'],
    github: 'https://github.com/apoorvrajdev/core-application-services',
    fullDetails: {
      problem:
        'Building managers operated bookings through shared spreadsheets — double-bookings were routine, idle facilities went unnoticed, and there was zero structured signal on utilization patterns. The platform replaces that workflow with an auditable booking pipeline and starts capturing the telemetry needed for downstream demand forecasting.',
      dataset:
        'Booking events, resident IDs, amenity inventories, time-window schedules, and per-amenity utilization logs — written through Prisma to a Supabase-managed Postgres instance.',
      architecture:
        'Next.js App Router frontend, Supabase Auth + Postgres for state, Prisma for the data layer. A booking service brokers conflict resolution (overlapping windows, per-resident quotas, blackout windows) and exposes a typed REST surface. The same service emits utilization events to a stream that downstream prediction models consume.',
      training:
        'v1 ships with deterministic rule-based scheduling. Demand-prediction model interfaces are wired but not yet trained — utilization data accumulating from production usage is the training corpus.',
      results:
        'Replaced ad-hoc spreadsheet workflows with an auditable booking pipeline. Captured the utilization signal that v2 prediction models consume; deployed via containerized CI/CD into pilot buildings.',
      screenshots: ['/projects/nlp-ner.svg'],
    },
  },
  {
    id: '2',
    title: 'Heart Disease Risk Classifier',
    shortDescription:
      '~89% CV accuracy on UCI heart-disease data — recall-tuned classifier with per-feature attribution, shipped as a Streamlit app.',
    description:
      'Supervised classifier that takes routinely-collected clinical signals (ECG indicators, cholesterol, blood pressure, age, exercise tolerance) and outputs a calibrated risk score for coronary heart disease. Threshold-tuned for recall over raw accuracy — the model surfaces patients who warrant deeper workup rather than optimizing for clean numbers.',
    image: '/projects/medical-vision.svg',
    year: 2025,
    category: 'AI/ML',
    featured: true,
    slug: 'heart-disease-risk-prediction-ai',
    stack: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Streamlit'],
    github: 'https://github.com/apoorvrajdev/heart-disease-ai',
    fullDetails: {
      problem:
        'Cardiologists burn cognitive load early-screening low-risk patients. The model takes the standard clinical panel and surfaces the subset that warrants deeper workup, with per-feature attributions that a clinician can inspect and override.',
      dataset:
        'UCI heart-disease tabular dataset — ~300 patients with 13 features (ECG indicators, serum cholesterol, fasting blood sugar, max heart rate, exercise-induced angina, ST depression, vessel count, thalassemia). Class-imbalanced; resampling and stratified cross-validation applied during evaluation.',
      architecture:
        'Compared Random Forest, SVM (RBF kernel), and KNN on engineered features. Standardization for distance-based models, one-hot encoding for categorical clinical codes. Decision threshold tuned post-hoc to optimize recall over raw accuracy — false negatives are the costly outcome in screening.',
      training:
        'Stratified 5-fold cross-validation with grid search over per-model hyperparameters. Held-out test split for final evaluation. Calibration via isotonic regression on the best model to make output scores act as probabilities.',
      results:
        '~89% accuracy under 5-fold cross-validation; per-class precision/recall surfaced in-app. Deployed as a Streamlit app with feature-attribution panel — the prediction sits next to the inputs that drove it, so clinicians can interrogate the signal rather than trusting a number.',
      screenshots: ['/projects/medical-vision.svg'],
    },
  },
  {
    id: '3',
    title: 'Review Sentiment Pipeline',
    shortDescription:
      'NLP pipeline classifying restaurant-review sentiment with topic surfacing — labelled corpus → TF-IDF → calibrated classifiers.',
    description:
      'End-to-end NLP pipeline that ingests free-form restaurant reviews, classifies sentiment polarity, and surfaces recurring complaint topics (service, food, pricing, ambience) for ops teams. The system replaces sampled manual review with a structured stream that ops dashboards can query.',
    image: '/projects/time-series.svg',
    year: 2025,
    category: 'AI/ML',
    featured: true,
    slug: 'restaurant-sentiment-analysis',
    stack: ['Python', 'Scikit-Learn', 'NLTK', 'TF-IDF', 'Streamlit'],
    github: 'https://github.com/apoorvrajdev/restaurant-sentiment-analysis',
    fullDetails: {
      problem:
        'Restaurants get hundreds of reviews per week across Google, Zomato, internal feedback forms — actionable signal lives in the text but doesn\'t get aggregated. The pipeline converts unstructured reviews into a structured stream that ops dashboards consume.',
      dataset:
        'Restaurant-review corpora with labelled sentiment classes plus auxiliary metadata (restaurant ID, review date). Domain-specific preprocessing: slang normalization, emoji handling, restaurant-vocabulary stemming.',
      architecture:
        'Cleaning + tokenization pipeline → TF-IDF vectorization with n-gram features → supervised classifiers (Logistic Regression, Multinomial NB, Linear SVM) compared on the same evaluation split. Class weights tuned to handle the natural skew toward positive reviews.',
      training:
        'Stratified train/val/test splits with grid-searched hyperparameters per model family. Confusion matrices inspected for failure modes — most errors landed on sarcastic or backhanded reviews, expected for a bag-of-words approach.',
      results:
        'Production-quality sentiment polarity classification. Deployed as a Streamlit dashboard with sentiment trend lines, complaint-topic surfacing, and per-review attribution. The downstream signal slots into restaurant ops review without needing manual triage.',
      screenshots: ['/projects/time-series.svg'],
    },
  },
  {
    id: '4',
    title: 'Diabetes Risk Classifier',
    shortDescription:
      'Tabular classifier for early diabetes risk screening — recall-tuned over routinely-collected clinical signals.',
    description:
      'Supervised classifier on the Pima/UCI diabetes dataset. Glucose, BMI, blood pressure, age, pregnancy history, family-history features → calibrated risk probability. Same recall-over-accuracy posture as the heart-disease model: optimize for catching at-risk patients, not for vanity metrics.',
    image: '/projects/medical-vision.svg',
    year: 2025,
    category: 'AI/ML',
    featured: true,
    slug: 'diabetes-risk-prediction-ai',
    stack: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Streamlit'],
    github: 'https://github.com/apoorvrajdev/diabetes-risk-prediction-ai',
    fullDetails: {
      problem:
        'Early diabetes diagnosis is the single largest controllable factor in long-term outcomes — but it depends on routine screening that often gets deferred. The model takes the standard clinical panel and surfaces the patients who warrant a closer look, with calibrated probabilities rather than hard yes/no labels.',
      dataset:
        'Pima Indians / UCI tabular dataset with imputation for the known-bad zeros in glucose and blood-pressure columns. Class-imbalanced; stratified resampling applied for evaluation.',
      architecture:
        'Feature-scaled pipeline → comparison across Logistic Regression, Random Forest, and SVM. Recall-weighted decision threshold; probability calibration via Platt scaling so the output behaves like a true risk score.',
      training:
        'Stratified 5-fold cross-validation with per-model grid search. Held-out test set reserved until final evaluation; no metric leakage into model selection.',
      results:
        'Calibrated risk predictions that read as probabilities, with recall-prioritized thresholds. Streamlit interface lets clinicians inspect the per-feature drivers behind each prediction.',
      screenshots: ['/projects/medical-vision.svg'],
    },
  },
  {
    id: '5',
    title: 'Vision-Language Caption Model',
    shortDescription:
      'CNN encoder + Transformer decoder for image captioning — the architecture behind the IEEE-published narrative paper.',
    description:
      'Vision-language model that generates scene-aware captions from raw images. InceptionV3 visual encoder projected into a sequence representation, decoded by a Transformer with cross-attention. The same architecture is the technical core of the IEEE-published narrative-generation paper.',
    image: '/projects/time-series.svg',
    year: 2024,
    category: 'AI/ML',
    featured: true,
    slug: 'image-captioning-system',
    stack: ['Python', 'PyTorch', 'InceptionV3', 'Transformer', 'BLEU'],
    github: 'https://github.com/apoorvrajdev',
    fullDetails: {
      problem:
        'Image classifiers tell you what objects are in a frame; they don\'t describe scenes. A useful vision-language model has to bridge from dense visual features to fluent, context-aware text — captions that read like narrative, not object lists.',
      dataset:
        'Standard image-caption benchmark corpora with paired vision-language supervision. Each image has multiple reference captions to support BLEU/CIDEr-style evaluation.',
      architecture:
        'InceptionV3 pretrained backbone extracts dense visual features; a projection layer maps them into the decoder\'s embedding space. A Transformer decoder generates captions token-by-token with cross-attention over the visual sequence. Teacher forcing during training, greedy + beam search at inference.',
      training:
        'Token-level cross-entropy loss with label smoothing. Mixed-precision training; learning-rate warmup followed by cosine decay. Evaluation on BLEU and qualitative scene-coverage checks — quantitative metrics don\'t fully capture narrative quality, so a held-out sample was inspected manually.',
      results:
        'Generates fluent, scene-aware captions across diverse visual inputs. The architecture became the technical core of the IEEE-published paper on AI-driven narrative generation.',
      screenshots: ['/projects/time-series.svg'],
    },
  },
  {
    id: '6',
    title: 'Plant Disease Classifier',
    shortDescription:
      'CNN classifier on 38 plant disease classes — ~96% test accuracy with augmentation hardened for field-captured images.',
    description:
      'Computer vision pipeline for early crop-disease detection from leaf photos. CNN classifier over 38 disease classes plus healthy controls, augmentation-heavy training regime so the model holds up on noisy mobile-camera captures — varied lighting, partial occlusion, off-center framing.',
    image: '/projects/medical-vision.svg',
    year: 2024,
    category: 'AI/ML',
    featured: true,
    slug: 'plant-leaf-disease-detection',
    stack: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'CNN'],
    github: 'https://github.com/apoorvrajdev',
    fullDetails: {
      problem:
        'Smallholder farmers need disease diagnosis before symptoms become irreversible. The model has to run on commodity hardware, accept a single leaf photo, and stay robust under the lighting/framing reality of field capture — not the clean studio dataset.',
      dataset:
        'PlantVillage-style labelled dataset across 38 disease classes plus healthy-control plants. Real-world distribution skewed toward common diseases; rare classes augmented to balance training.',
      architecture:
        'CNN classifier with transfer-learned backbone; OpenCV preprocessing for leaf segmentation against background. Augmentation pipeline covers rotation, horizontal flip, color jitter, brightness shift, and random crop — designed to simulate the variation in field-captured images.',
      training:
        'Multi-class supervised training with categorical cross-entropy; validation-based checkpointing to keep the best generalizing weights. Per-class precision/recall tracked across training to catch under-represented disease modes early.',
      results:
        '~96% test accuracy across the 38 disease classes. Robust to lighting and framing variation typical of field-captured images — validated against a held-out split deliberately curated to look like real mobile captures.',
      screenshots: ['/projects/medical-vision.svg'],
    },
  },
]
