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
  status?: 'Live' | 'In development' | 'Pre-alpha' | 'Published'
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
    title: 'Fraud Radar — Real-time card-fraud detection',
    shortDescription:
      'Hybrid rules + XGBoost pipeline with SHAP, Stripe-style idempotency, and a React dashboard. PR-AUC 0.9327, p50 3.7 ms.',
    description:
      'A production-style fraud-monitoring platform that mirrors how tier-1 financial institutions decide, in milliseconds, whether a card transaction goes through. FastAPI backend with a layered architecture (api → service → repository → models), SQLAlchemy 2.0 + Alembic, Pydantic v2 schemas, and Stripe-pattern Idempotency-Key ingestion. A six-rule deterministic engine fronts an XGBoost classifier trained on 50,010 synthetic transactions across six injected fraud patterns; every decision is explained at inference time via a cached SHAP TreeExplainer. PR-AUC 0.9327 and Recall@1% FPR 0.9785 on a chronological held-out test fold, with service-layer p50 / p95 of 3.7 / 5.8 ms. React 18 + TypeScript + Tailwind dashboard with TanStack Query consumes the same typed schemas the backend emits.',
    image: '/projects/fraud-radar.svg',
    year: 2026,
    category: 'Full-Stack',
    featured: true,
    status: 'In development',
    slug: 'fraud-radar',
    stack: [
      'Python 3.11',
      'FastAPI',
      'XGBoost',
      'SHAP',
      'SQLAlchemy 2.0',
      'Alembic',
      'Pydantic v2',
      'React 18',
      'TypeScript',
      'Tailwind CSS',
      'TanStack Query',
    ],
    github: 'https://github.com/apoorvrajdev/fraud-radar',
    fullDetails: {
      problem:
        'Card fraud costs the global payments industry tens of billions of dollars a year. The platforms that fight it have to score transactions in single-digit milliseconds, produce explanations that hold up under regulatory scrutiny, and maintain immutable audit trails that survive compliance reviews years after the fact. The goal here was to reproduce those constraints — idempotent ingestion, hybrid rules + ML scoring, per-decision explanations, append-only audit log, decimal-precision money — inside a scope one engineer can build and reason about end to end.',
      dataset:
        '50,010 synthetic transactions across 500 customers and 200 merchants at a 1.52% fraud rate, fully reproducible from seed=42. The generator injects six real-world fraud patterns: card testing (rapid small-value bursts validating stolen numbers), geo-velocity (physically impossible travel), account takeover (long dormancy then a sudden high-value charge), high-amount anomalies, off-hours clustering, and merchant concentration. The feature extractor converts each transaction into a 17-dimensional vector covering amount, time-of-day, geographic mismatch, velocity over rolling windows, customer history, and merchant context.',
      architecture:
        'Layered FastAPI monolith with deliberate seams: api/v1 routers do thin orchestration, services own business logic, repositories hold SQLAlchemy 2.0 data access, models are typed ORM with Decimal money typing throughout. Ingestion lives at POST /api/v1/transactions with a required Idempotency-Key header following the Stripe pattern — same key + same body returns the cached response with X-Idempotency-Replay: true; same key + different body returns 409. The hash key is a SHA-256 over the normalized Pydantic dump rather than raw HTTP bytes, so it survives whitespace and field reordering. The scoring pipeline runs a six-rule deterministic engine first, then a calibrated XGBoost classifier, then a cached SHAP TreeExplainer that attaches the top contributing features to every decision. SQLite in dev, Postgres-compatible schemas via SQLAlchemy — a single DATABASE_URL change plus an Alembic run to swap engines.',
      training:
        'Chronological train/val/test split — the last 15% of transactions by created_at, no shuffling, because fraud patterns drift in time and a shuffled split would leak future information into the training set. Hyperparameters are selected by a 25-iteration RandomizedSearchCV scored on PR-AUC; the final fit uses early_stopping_rounds=50 against the validation fold. The training script calls the production FeatureExtractor directly — slower than a vectorized pandas implementation, but byte-identical bytes enter XGBoost during training and at inference, eliminating train/serve skew as a class of bug.',
      results:
        'On the held-out chronological test fold: PR-AUC 0.9327, ROC-AUC 0.9989, Recall @ 1% FPR 0.9785, Recall @ 5% FPR 1.0000. At the selected operating threshold of 0.7431, precision is 0.61 and recall is 0.96. Latency: service-layer score_transaction() runs at p50 3.7 ms / p95 5.8 ms; the full HTTP round-trip including FastAPI routing, Pydantic validation, DB transaction commit, and JSON serialization sits at p50 16 ms / p95 20 ms on a developer laptop. 146 tests cover the chronological splitter, SHAP additivity, force/waterfall plot rendering, the six-rule engine with boundary parametrization, Stripe-pattern idempotency, and the /explain and /transactions endpoints via TestClient.',
      screenshots: [],
    },
  },
  {
    id: '2',
    title: 'Image Captioning System (CNN + Transformer)',
    shortDescription:
      'IEEE-published multimodal pipeline — InceptionV3 + custom Transformer decoder, restructured into a typed Python package with a FastAPI + React serving stack.',
    description:
      'End-to-end image-captioning system built around an InceptionV3 visual encoder and a custom multi-head Transformer decoder, trained on COCO. The architecture underpins the IEEE-published paper "AI Narratives: Bridging Visual Content and Linguistic Expression"; this repository lifts the original Kaggle research notebook into a typed, tested, configuration-driven Python package with Pydantic v2 configs, mypy-strict typing, 37 unit tests, and a four-stage notebook parity audit gated by SHA-256. The serving layer is a production-style FastAPI service with a lifespan-managed CaptionPredictor singleton, structured logging with per-request UUIDs, and a React 19 + Vite 8 + Tailwind v4 SPA that drives multipart uploads against POST /v1/captions with AbortController-based timeouts and a typed ApiError boundary. Reference BLEU-4 ~24 from the IEEE notebook; beam-search decoding, CIDEr / METEOR / ROUGE-L, and a stabilized COCO training run are in active iteration.',
    image: '/projects/image-captioning.svg',
    year: 2024,
    category: 'Research',
    featured: true,
    status: 'Published',
    slug: 'image-captioning-system',
    stack: [
      'Python 3.10+',
      'TensorFlow 2.15',
      'InceptionV3',
      'Transformer',
      'Pydantic v2',
      'FastAPI',
      'React 19',
      'Vite 8',
      'pytest',
      'mypy',
      'COCO',
    ],
    github: 'https://github.com/apoorvrajdev/image-captioning-system',
    fullDetails: {
      problem:
        'The IEEE paper "AI Narratives: Bridging Visual Content and Linguistic Expression" introduced a CNN + Transformer architecture for scene-aware image captioning, but the supporting code lived in a Kaggle notebook — fine for reproducing the result, useless for evolving the system. The goal here was to lift the research artifact into a typed, tested, configuration-driven Python package that can be retrained, served, and benchmarked without reconstituting state from notebook cell order — while preserving the published architecture exactly through a SHA-256-locked parity audit.',
      dataset:
        'COCO 2017 captions: ~120,000 sampled caption-image pairs (data.sample_size in configs/base.yaml), TextVectorization-adapted to a 15,000-token vocabulary, 80/20 train/val split. Images are resized to 299×299 for InceptionV3 ingestion; captions are capped at 40 tokens. The same preprocess_image_tensor runs in the tf.data training pipeline and at inference time, eliminating train/serve skew by construction.',
      architecture:
        'Pretrained InceptionV3 (ImageNet, frozen) emits 64 spatial patches × 2048 channels per image. A single-layer Transformer encoder with one attention head projects those features into the decoder embedding dim. The decoder is two layers with eight attention heads, embedding_dim=512, learned (not sinusoidal) positional embeddings — preserved verbatim from the IEEE paper. Inference goes through CaptionPredictor.from_artifacts() with a warmup() call on first boot to kill the first-request latency cliff. The FastAPI service uses a lifespan-managed singleton so every request reuses one warm model; React 19 + Vite 8 + Tailwind v4 drives multipart uploads against POST /v1/captions with AbortController timeouts (3s health, 60s caption) and a typed ApiError boundary.',
      training:
        'Configuration is YAML validated by Pydantic v2 with extra="forbid" — typos in hyperparameters become load-time errors instead of silent drift. Env vars override at any nesting depth via the CAPTIONING__ prefix and double-underscore delimiter, useful for CI smoke runs and ablations. Optimizer is Adam with masked sparse-categorical cross-entropy and masked accuracy; callbacks include EarlyStopping(patience=3). Phase 1b adds opt-in label smoothing, cosine LR schedule, warmup steps, and a dropout-free validation path in configs/train/stabilized.yaml — byte-identical to base.yaml except for those four flags, so any quality delta is attributable to them alone.',
      results:
        'Reference BLEU-4 ~24 from the IEEE notebook. Beam-search decoding now lives at src/captioning/inference/beam.py and dispatches through the same predictor as greedy. CIDEr / METEOR / ROUGE-L are implemented under src/captioning/evaluation/ and emitted into a single metrics.json per run; benchmarking artifacts (metrics.json, predictions.jsonl, diagnostics.jsonl, run_meta.json) are written to results/<run_id>/ on a versioned contract so any two runs can be diffed mechanically. Caption quality from the current modular pipeline is still being stabilized on a freshly trained COCO checkpoint — the serving stack is production-ready; the bootstrap weights committed today are intentionally random and exist only to exercise lifespan + predictor + multipart upload + frontend integration end to end.',
      screenshots: [],
    },
  },
  {
    id: '3',
    title: 'Unhosted — Decentralized LLM inference',
    shortDescription:
      'Pool the computers you own (and your friends own) into a single LLM inference cluster. Rust, llama.cpp, AGPL-3.0 — built in public.',
    description:
      'A Rust-based runtime that pools heterogeneous hardware — MacBooks, gaming PCs, home servers, and an opt-in public swarm of strangers\' GPUs — into a single inference cluster behind one endpoint, across CUDA, Metal, and ROCm. Three trust radii (local / trusted / public): the first two are free forever; the third is a USDC-priced safety net used only when the local circle can\'t fulfill a request. Currently pre-alpha with single-host inference, LAN clustering, mDNS peer discovery + pairing, and model management shipped; VRAM-pooling via llama.cpp\'s RPC backend is in active build. Co-maintained with the original author Ankur Sinha; my scope covers infrastructure, developer experience, and documentation.',
    image: '/projects/distributed-inference.svg',
    year: 2026,
    category: 'Research',
    featured: true,
    status: 'Pre-alpha',
    slug: 'unhosted-core',
    stack: ['Rust 2021', 'llama.cpp', 'GGUF', 'mDNS', 'WireGuard', 'CUDA', 'Metal', 'ROCm', 'AGPL-3.0'],
    github: 'https://github.com/apoorvrajdev/unhosted-core',
    fullDetails: {
      problem:
        'Frontier-class language-model inference is almost always rented from someone else\'s datacenter. That\'s a defensible business model and a bad default — it ties personal compute, privacy, and cost to a handful of hosted endpoints. Most people already own enough silicon collectively (laptops, gaming PCs, home servers, idle workstations) to run a 70B-class model if the orchestration existed to pool it. Unhosted is the orchestration: one endpoint that routes inference across hardware you own first, friends and family second, and a paid public swarm only as a last resort.',
      dataset:
        'Not a model-training project. The "data" here is the network topology: heterogeneous nodes across CUDA / Metal / ROCm, variable VRAM budgets, intermittent availability, and latency that ranges from sub-millisecond on LAN to tens of milliseconds across the internet. Routing decisions depend on per-node capacity introspection, peer-trust state, and a configurable price ceiling for the public-swarm fallback (USDC per token).',
      architecture:
        'Rust runtime that wraps llama.cpp\'s llama-server for per-host inference and uses its RPC backend (GGML_RPC) for cross-node VRAM pooling so layers of a single model can split across a MacBook and a 4090. mDNS for LAN peer discovery; a one-click pair flow handles trusted peers over WireGuard-style end-to-end encryption with no public exposure. The public swarm is designed around optimistic verification plus redundancy now, with zero-knowledge proofs as a future affordability bet. Three trust radii (local / trusted / public) sit behind one CLI surface — the user picks how far the radius goes by setting a price ceiling, not by choosing a backend.',
      training:
        'No training. The engineering work is in the runtime, the routing layer, and the trust model: hot-reloading request routing when peers come and go, layer-splitting that survives node disappearance, idempotent retries across the swarm, and an audit trail for public-swarm requests that protects both the requester and the GPU provider. License is AGPL-3.0 specifically so the code stays auditable and forkable but can\'t be wrapped as a closed paid service.',
      results:
        'Pre-alpha. Single-host inference (v0.0.1), LAN cluster with round-robin routing (v0.0.2), mDNS peer discovery + pairing + model management (v0.0.3) all shipped end to end. VRAM-pooling (v0.0.4+), trusted-peer pairing (v0.1.0), web UI + Tauri desktop app (v0.1.0+ / v0.2.0+), and the USDC-priced public swarm (v0.3.0+) are next. No public benchmarks yet — reproducible scripts and honest tokens-per-second numbers land in benchmarks/ as soon as any are real.',
      screenshots: [],
    },
  },
  {
    id: '4',
    title: 'Plant Disease Detection',
    shortDescription:
      'Transfer-learned EfficientNetB0 classifying 38 diseases across 14 crops — 99.84% val accuracy, deployed on Hugging Face Spaces.',
    description:
      'End-to-end deep-learning pipeline that classifies a leaf photograph into one of 38 disease classes across 14 crop species, trained on the ~88,000-image New Plant Diseases Dataset (an augmented PlantVillage derivative). EfficientNetB0 ImageNet backbone with the last 20 layers fine-tuned, GAP + Dense(38, softmax) head, EarlyStopping / ReduceLROnPlateau / ModelCheckpoint callbacks. Reference run reaches ~99.84% validation accuracy. Production-quality inference module with thread-safe lazy loading and structured top-1 + top-3 + healthy-flag output, served by a Gradio app deployed on Hugging Face Spaces. Large model artifacts ship via a GitHub Release rather than the repo, with cold-boot weight download on first launch.',
    image: '/projects/medical-vision.svg',
    year: 2024,
    category: 'AI/ML',
    featured: true,
    status: 'Live',
    slug: 'plant-leaf-disease-detection',
    stack: ['Python 3.10+', 'TensorFlow 2.12', 'Keras', 'EfficientNetB0', 'Gradio', 'Hugging Face Spaces'],
    github: 'https://github.com/apoorvrajdev/plant-disease-detection',
    demo: 'https://huggingface.co/spaces/workface/plant-disease-detection',
    fullDetails: {
      problem:
        'Crop disease diagnosis in the field is mostly manual — a farmer or extension worker looks at a leaf, compares it against memory or a printed reference, and decides what to spray. That works for common diseases on familiar crops and fails on unfamiliar ones, on early-stage symptoms, and on the 14 different crops a smallholder might be growing in parallel. A leaf-photo classifier that runs on a phone via a web demo is a useful triage layer: not a replacement for an agronomist, but a fast first opinion that can flag economically important diseases like Tomato Yellow Leaf Curl Virus or Late Blight before they spread.',
      dataset:
        'The New Plant Diseases Dataset (Augmented) — about 88,000 labelled leaf images across 38 classes spanning 14 crop species (Apple, Tomato, Grape, Corn, Potato, Pepper, Strawberry, Cherry, Peach, Soybean, Squash, Raspberry, Blueberry, Orange). An augmented derivative of the PlantVillage dataset. Images are resized to 224×224 and batched at 32 with categorical labels. The dataset is gitignored — pulled via the Kaggle API at training time so the repository stays clones-fast.',
      architecture:
        'EfficientNetB0 backbone with ImageNet weights and include_top=False, fed into GlobalAveragePooling2D and a Dense(38, softmax) head. The last 20 backbone layers are unfrozen for fine-tuning while the earlier layers stay locked — the standard "preserve general features, adapt high-level features" transfer-learning recipe. Inference is wrapped in a thread-safe lazy loader that returns a structured dict: top-1 class with crop + condition + confidence, a top-3 breakdown, a healthy-flag derived from the class label, and the raw label for downstream logging.',
      training:
        'Adam optimizer with categorical_crossentropy loss. Three callbacks: EarlyStopping(patience=3) to halt when validation accuracy plateaus, ReduceLROnPlateau(factor=0.2, patience=2) to drop the learning rate when progress stalls, and ModelCheckpoint(save_best_only=True) so only the best epoch survives. TensorBoard logs are written alongside for inspection. The training notebook is preserved verbatim; export_model.py packages the trained weights into a single .keras artifact and writes the canonical class_names.json that the inference path reads.',
      results:
        'Reference validation accuracy ~99.84% on the held-out set. Live on Hugging Face Spaces at huggingface.co/spaces/workface/plant-disease-detection — drop a leaf photo, get top-3 predictions in a few seconds. The top-3 panel matters: on a Tomato Late Blight image the model predicted Late Blight at 89% with Early Blight at 11% as the runner-up, which is a sensible confusion (both diseases produce dark lesions) and exactly the kind of edge case a flat top-1 would hide. Weight artifacts ship through a GitHub Release with a cold-boot download on first launch, so the repo stays small and the deployed Space pulls the model once per container lifetime.',
      screenshots: [],
    },
  },
  {
    id: '5',
    title: 'Diabetes Risk Prediction',
    shortDescription:
      'Random Forest classifier on ~100k clinical records — ROC-AUC 0.996, served via Streamlit with cloud-hydrated model artifact.',
    description:
      'Clinical decision-support system that estimates the probability of Type 2 Diabetes from eight structured patient features (age, hypertension, heart disease, BMI, HbA1c, blood glucose, gender, smoking history). Random Forest selected by controlled benchmarking against Gradient Boosting, Logistic Regression, Decision Tree, and Gaussian Naive Bayes under SMOTE-balanced training and RandomizedSearchCV — ROC-AUC 0.996, stable across folds. Stateless Streamlit serving layer with deterministic 13-column feature encoding, scikit-learn 1.3.2 pinned for pickle ABI compatibility, and a lazy-loaded model cached via st.cache_resource. The serialized estimator is hydrated from Google Drive on cold start, keeping the Git history free of binary blobs.',
    image: '/projects/medical-vision.svg',
    year: 2025,
    category: 'AI/ML',
    featured: true,
    status: 'Live',
    slug: 'diabetes-risk-prediction',
    stack: ['Python 3.11', 'scikit-learn 1.3.2', 'Random Forest', 'SMOTE', 'Streamlit', 'Pandas', 'Joblib'],
    github: 'https://github.com/apoorvrajdev/diabetes-risk-prediction-ai',
    demo: 'https://diabetes-risk-prediction-ai.streamlit.app',
    fullDetails: {
      problem:
        'Type 2 Diabetes is largely preventable yet routinely under-screened. A lightweight, reproducible inference layer over a high-recall classifier can act as a triage signal in primary-care settings, employer wellness programs, and population-health analytics — none of which require a hospital-grade EHR integration to be useful. The engineering goal was to package that triage layer the right way: a single deployable artifact, a stateless serving surface, deterministic inputs, and a serving cost low enough that nothing about the platform discourages re-deploying it.',
      dataset:
        '~100,000 patient records with 13 encoded input features after one-hot expansion and a binary diabetes target. Class imbalance is significant, so SMOTE is applied to the training set before model selection — effective training size after balancing is ~175,000 samples. A stratified train/test split keeps the original class proportions on the held-out set.',
      architecture:
        'A single Random Forest classifier exported as a pickle artifact, hydrated from Google Drive on first request and pinned in process memory via st.cache_resource for the lifetime of the Streamlit container. UI inputs go through an explicit build_feature_array helper that encodes them into the exact 13-column ordering the model expects — the schema is grep-able rather than implicit in a pipeline object, which makes the system trivial to port to FastAPI or ONNX later. Every prediction returns a class label, a calibrated probability, and a categorical risk band consumable by both the UI and any downstream API wrapper.',
      training:
        'Five model families benchmarked under identical splits, SMOTE-balanced training, and RandomizedSearchCV hyperparameter selection: Random Forest, Gradient Boosting, Logistic Regression, Decision Tree, Gaussian Naive Bayes. Cross-validation runs on accuracy, precision, recall, and ROC-AUC to confirm generalization stability across folds. scikit-learn 1.3.2 is pinned across both training and serving environments — pickle compatibility across minor sklearn versions is not guaranteed, and this pin is the smallest amount of discipline that prevents the most common production failure for sklearn-based services.',
      results:
        'Random Forest: ROC-AUC 0.996. Gradient Boosting: 0.97. Logistic Regression: 0.96. Decision Tree: 0.95. Gaussian Naive Bayes: 0.93. Cross-validation was stable across folds — Random Forest also had the cleanest calibration curve and lowest variance, which mattered more than the marginal AUC delta because the system surfaces a probability, not a class label. Live at diabetes-risk-prediction-ai.streamlit.app; the cold-start hydration adds a few seconds once per container lifetime and zero cost thereafter.',
      screenshots: [],
    },
  },
  {
    id: '6',
    title: 'Heart Disease Risk Prediction',
    shortDescription:
      'XGBoost cardiovascular risk classifier — 89.42% accuracy with probabilistic outputs, served via Streamlit.',
    description:
      'Lightweight clinical decision-support system that estimates cardiovascular risk from structured indicators (age, chest pain type, cholesterol, resting BP, max heart rate, ST depression, major vessels, resting ECG, exercise-induced angina). Boosted ensemble selected by comparative benchmarking against KNN (84.96%), SVM (87.47%), Random Forest (88.02%), and a voting ensemble (86.35%); the boosted model reaches 89.42% with strong cross-validated generalization. Clean separation between the training notebook and a Streamlit serving entrypoint that loads a single Joblib artifact, assembles a fixed-order feature vector, and surfaces predict_proba as a tiered risk band rather than a binary label.',
    image: '/projects/medical-vision.svg',
    year: 2024,
    category: 'AI/ML',
    featured: true,
    status: 'Live',
    slug: 'heart-disease-risk-prediction',
    stack: ['Python 3.10+', 'XGBoost', 'scikit-learn', 'Streamlit', 'Plotly', 'Joblib'],
    github: 'https://github.com/apoorvrajdev/heart-disease-ai',
    demo: 'https://heart-disease-clinical-ai.streamlit.app',
    fullDetails: {
      problem:
        'Cardiovascular disease remains the leading cause of mortality worldwide. Risk stratification typically depends on the manual interpretation of structured indicators — age, blood pressure, cholesterol, resting ECG, exercise-induced angina, ST depression. The goal here was to package a trained boosted classifier into a maintainable, reproducible inference app that surfaces probabilistic risk (not a binary label), runs cheaply enough for low-cost deployment, and leaves a clean migration path to a hardened FastAPI service later.',
      dataset:
        'The standard heart-disease dataset under data/heart.csv — structured clinical features including chest pain type, serum cholesterol, resting blood pressure, max heart rate achieved, ST depression induced by exercise, number of major vessels colored by fluoroscopy, resting ECG results, and exercise-induced angina. Cleaned and split into train/test partitions to measure out-of-sample generalization.',
      architecture:
        'Single boosted classifier exported as a Joblib .pkl — the simplest unit of model versioning, trivial to swap, hash, audit, and load from a controlled inference boundary. Streamlit serves the inference path interactively; the app loads the artifact once, builds the feature vector explicitly (fixed column ordering, no dict-to-DataFrame coercion that could silently drift the schema), calls predict_proba, and surfaces a tiered low/moderate/high interpretation alongside a risk gauge. The training notebook and the serving app are kept mutually independent — no training imports leak into the inference runtime.',
      training:
        'Five model families compared under the same split: KNN, SVM, Voting Ensemble, Random Forest, and a boosted ensemble. The boosted model is then refined and validated with cross-validation to confirm out-of-sample behavior matches the held-out test set.',
      results:
        'KNN: 84.96%. SVM: 87.47%. Voting Ensemble: 86.35%. Random Forest: 88.02%. Boosted model: 89.42% — promoted. Cross-validation, comparative accuracy, and boosted-model behavior are captured as committed artifacts (Model accuracy.png, boosted model accuracy.png, cross validation.png). Live at heart-disease-clinical-ai.streamlit.app with sample inference snapshots for healthy vs. high-risk patient inputs.',
      screenshots: [],
    },
  },
]
