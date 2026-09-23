/**
 * Project content — the single source for cards, case-study pages, metadata,
 * JSON-LD and the sitemap. Every figure must name what it was measured on,
 * and every claim must be backed by the linked repository (see CLAUDE.md,
 * "Content accuracy rules").
 */

export type ProjectTier = 'flagship' | 'secondary' | 'earlier'
export type ProjectRole = 'solo' | 'collaboration' | 'contribution'
export type ProjectStatus = 'Live demo' | 'Demo offline' | 'Research stage' | 'Earlier work'

export interface ProjectSection {
  heading: string
  /** Paragraphs, rendered in order. */
  body?: string[]
  /** Optional bullet list, rendered after the paragraphs. */
  points?: string[]
  /** Optional table, for results that are genuinely tabular. */
  table?: ProjectTable
}

export interface ProjectTable {
  columns: string[]
  rows: string[][]
  caption?: string
}

/**
 * A headline figure. `population` is required: a metric without the thing it
 * was measured on is exactly the claim this site does not make.
 */
export interface ProjectEvidence {
  value: string
  label: string
  population: string
  /** Marks the result that matters most, including an unflattering one. */
  emphasis?: boolean
}

export interface ProjectLink {
  label: string
  url: string
  /** Short qualifier shown beside the link, e.g. "sleeps when idle". */
  note?: string
}

export interface Project {
  id: string
  slug: string
  title: string
  /** Short name for compact UI (palette entries, share images). */
  shortTitle: string
  /** Card blurb and meta description — keep it at or under 160 characters. */
  shortDescription: string
  /** Lede paragraph at the top of the case-study page. */
  description: string
  image: string
  /** Describes what the image shows; falls back to a generic label when absent. */
  imageAlt?: string
  stack: string[]
  github?: string
  /** Only for a demo that is actually running. */
  demo?: string
  /** Human-readable period, e.g. "2026" or "2023 – 2026". */
  period: string
  category: 'AI/ML' | 'Research' | 'Full-Stack'
  tier: ProjectTier
  role: ProjectRole
  status: ProjectStatus
  /** Headline figures, shown on the flagship panel and the case-study header. */
  evidence?: ProjectEvidence[]
  sections: ProjectSection[]
  sources: ProjectLink[]
  /** ISO date the content was last checked against the repository. */
  factsCheckedOn: string
}

const FRAUD_RADAR = 'https://github.com/apoorvrajdev/fraud-radar'
const CAPTIONING = 'https://github.com/apoorvrajdev/image-captioning-system'

export const projects: Project[] = [
  {
    id: '1',
    slug: 'fraud-radar',
    title: 'Fraud Radar — Real-time card-fraud detection',
    shortTitle: 'Fraud Radar',
    shortDescription:
      'Real-time fraud scoring with rules, XGBoost and per-decision SHAP. 1,407 tests, a live demo, and a benchmark that shows where the model fails.',
    description:
      'A real-time card-fraud detection platform built end to end. A FastAPI service scores each transaction with six deterministic rules and an XGBoost model in single-digit milliseconds, attaches a SHAP explanation to every decision, and routes it to an analyst review queue with an append-only audit trail; a React 19 + TypeScript dashboard sits on top. An offline evaluation programme then tested whether the model generalises beyond the synthetic data it was trained on. It does not transfer across data generators without retraining, and the project reports that in full.',
    image: '/projects/fraud-radar-dashboard.webp',
    imageAlt:
      'The Fraud Radar transactions view: scored transactions with decisions, amounts converted to a reporting currency, and filters.',
    period: '2026',
    category: 'Full-Stack',
    tier: 'flagship',
    role: 'solo',
    status: 'Live demo',
    evidence: [
      {
        value: '0.9327 PR-AUC',
        label: 'In-distribution',
        population: 'Synthetic held-out fold · 93 frauds in 7,502',
      },
      {
        value: '0.8653 PR-AUC',
        label: 'Retrained on an independent generator',
        population: 'Sparkov fold · 924 frauds in 277,860',
      },
      {
        value: '0.0087 PR-AUC',
        label: 'Carried across generators, no retraining',
        population: 'Same Sparkov fold · 0.0033 prevalence',
        emphasis: true,
      },
      {
        value: '0.7670 PR-AUC',
        label: 'Real anonymised card data, isolated track',
        population: 'ULB seed 42 · 52 frauds in 42,722',
      },
      {
        value: '3.7 ms',
        label: 'Service-layer scoring, p50',
        population: 'n = 500, developer laptop',
      },
      {
        value: '1,407 tests',
        label: 'Green in CI',
        population: 'ruff · mypy --strict · tsc · eslint',
      },
    ],
    stack: [
      'Python 3.11',
      'FastAPI',
      'XGBoost',
      'SHAP',
      'Pydantic v2',
      'SQLAlchemy 2.0',
      'Alembic',
      'scikit-learn',
      'React 19',
      'TypeScript',
      'TanStack Query',
      'Tailwind CSS',
      'Vite',
    ],
    github: FRAUD_RADAR,
    demo: 'https://fraud-radar-lilac.vercel.app',
    sections: [
      {
        heading: 'The problem',
        body: [
          'Fraud decisions sit on the payment authorisation path. They have to be made in milliseconds, explained to the customer and eventually a regulator, survive network retries without double-charging or double-blocking, keep a human in the loop, and leave an audit trail that still makes sense years later.',
          'Underneath all of that is a model trained on data that resembles production only as closely as whoever built the dataset managed. Most of this project’s effort goes into measuring that gap.',
        ],
      },
      {
        heading: 'What I built',
        points: [
          'A FastAPI service layered api → services → repositories → models, with Pydantic v2 wire contracts, SQLAlchemy 2.0 and five Alembic migrations whose CHECK constraints encode real invariants.',
          'Stripe-pattern idempotent ingestion: the same key and body replays the cached response; the same key with a different body returns 409. The key is a SHA-256 of the normalised payload, not the raw bytes.',
          'A scoring pipeline of six pure rules (a hard block short-circuits the model) → a 17-feature extractor over a 180-day history window → XGBoost → SHAP TreeExplainer → a conservative-wins decision → an append-only audit log → an analyst review queue.',
          'An analyst loop that records human verdicts without overwriting the model’s original decision, so the model’s call stays clean for evaluation and retraining.',
          'Keyset-paginated transaction and alert APIs, Decimal money end to end, and multi-currency FX enrichment that degrades gracefully when the rate provider is unavailable.',
          'A React 19 + TypeScript dashboard (TanStack Query) with live KPIs, a filterable transaction feed, a per-transaction page showing the stored SHAP attribution, and an alerts worklist.',
        ],
      },
      {
        heading: 'Train/serve parity by construction',
        body: [
          'The offline batch feature builder calls the same FeatureExtractor the API uses, behind a session that raises if anything tries to reach a database. A golden test compares batch and serving output element by element with exact float equality, on a fixture where no feature is constant.',
        ],
      },
      {
        heading: 'How it was evaluated',
        body: [
          'Four evaluations, never merged or averaged. Each splits its corpus chronologically 70/15/15: hyperparameters are searched on the training fold, the operating threshold is chosen on validation, and the test fold is scored once. Both benchmark methodologies were frozen in decision records before any test fold was scored, and the published benchmark cards are generated from committed run records.',
        ],
        points: [
          'In-house synthetic: 50,010 transactions, 500 customers, 200 merchants, 1.52% fraud, six injected fraud patterns.',
          'Sparkov: an independent transaction generator, 1,852,394 rows. Simulated, not real card data.',
          'Cross-generator transfer: the synthetic-trained model, unchanged, scored on Sparkov’s test fold.',
          'ULB: real, publisher-anonymised card data (284,807 rows, 492 frauds) on an isolated featureset that can be neither promoted nor served.',
        ],
      },
      {
        heading: 'Results, each read against its prevalence',
        table: {
          caption:
            'Four evaluations, never merged or averaged. A scorer with no signal scores about the prevalence, so read each PR-AUC against the column beside it.',
          columns: ['Evaluation', 'Population', 'PR-AUC', 'ROC-AUC', 'Recall @ 1% FPR'],
          rows: [
            ['In-distribution (synthetic)', '93 frauds in 7,502 · prevalence 0.0124', '0.9327', '0.9989', '0.9785'],
            ['Retrained on Sparkov', '924 frauds in 277,860 · prevalence 0.0033', '0.8653', '0.9963', '0.9459'],
            ['Transferred, no retraining', 'Same Sparkov fold · prevalence 0.0033', '0.0087', '0.7354', '0.0390'],
            ['ULB real data, isolated track', '52 frauds in 42,722 · prevalence 0.0012, seed 42', '0.7670', '0.9751', '0.8269'],
          ],
        },
        points: [
          'At the threshold chosen on the synthetic validation fold, in-distribution precision is 0.61 and recall 0.96. Applied unchanged to Sparkov, that same threshold flags 19,215 legitimate transactions to catch 58 frauds.',
          'The ULB repeats (seeds 43 and 44) score 0.7569 and 0.7751, which shows how much the figure moves with the fit’s randomness on a fold holding 52 frauds.',
          'Temporal drift: with the threshold selected once on late-2019 data, monthly recall across 2020 stays between 0.906 and 0.970 while precision falls from about 0.40 to 0.16 as prevalence drops.',
          'Rules audit: across all 1.85M Sparkov rows the production rules would approve 9,385 of 9,651 frauds; two rules never fire and one cannot be evaluated on that data.',
          'Latency: service-layer scoring p50 3.7 ms / p95 5.8 ms; full HTTP round trip p50 16 ms / p95 20 ms (n = 500, developer laptop).',
        ],
      },
      {
        heading: 'What the evaluation found',
        body: [
          'In-distribution performance said almost nothing about generalisation. The same 17-feature pipeline scores 0.9327 on its own generator, 0.8653 when retrained on an independent one, and 0.0087 when carried across without retraining.',
        ],
        points: [
          'Five of the 17 features are constant on Sparkov, so the model leans on signal the target data does not carry.',
          'The operating threshold does not transfer: chosen for a 1% false-positive rate on its own validation fold, it produces 6.94% on Sparkov.',
          'The synthetic generator contains structural shortcuts. Six countries enter the training data only through a fraud pattern, so the model never saw a legitimate transaction from them. A closed-loop evaluation hides exactly this kind of shortcut.',
        ],
      },
      {
        heading: 'Limitations',
        points: [
          'The served model is trained on synthetic data. Its 0.9327 measures how learnable the generator is, not how detectable real fraud is.',
          'Sparkov is simulated; ULB is real but isolated on its own featureset and not comparable with the other tracks.',
          'Scores are not calibrated probabilities. Calibration is measured, never fitted.',
          'Label delay (chargebacks arriving weeks later) is not modelled, so every result is optimistic in a way the benchmark does not measure.',
          'The public demo reads a static snapshot of a few hundred synthetic transactions; it is not production traffic, and there is no authentication or role-based access yet.',
        ],
      },
      {
        heading: 'Status',
        body: [
          'Phases 1–5 are complete: the stack runs end to end, the demo is deployed, the benchmarks are executed and written up, and FX enrichment is in the live path. Phase 6 (observability, model governance, production drift monitoring and authentication) is planned; none of it exists yet.',
        ],
      },
    ],
    sources: [
      { label: 'Source code', url: FRAUD_RADAR },
      { label: 'Live demo', url: 'https://fraud-radar-lilac.vercel.app', note: 'static snapshot, no live backend' },
      { label: 'Benchmark card', url: `${FRAUD_RADAR}/blob/main/backend/ml/BENCHMARK_CARD.md` },
      { label: 'Real-data (ULB) benchmark card', url: `${FRAUD_RADAR}/blob/main/backend/ml/ULB_BENCHMARK_CARD.md` },
      { label: 'Architecture', url: `${FRAUD_RADAR}/blob/main/docs/ARCHITECTURE.md` },
      { label: 'Architecture decision records', url: `${FRAUD_RADAR}/tree/main/docs/adr` },
      { label: 'CI runs', url: `${FRAUD_RADAR}/actions/workflows/ci.yml` },
    ],
    factsCheckedOn: '2026-09-22',
  },
  {
    id: '2',
    slug: 'image-captioning-system',
    title: 'Image Captioning System — CNN + Transformer',
    shortTitle: 'Image Captioning',
    shortDescription:
      'Co-authored IEEE research rebuilt as a tested Python package and FastAPI service, with an audit of what its BLEU score does and does not show.',
    description:
      'The code behind a co-authored IEEE conference paper on image captioning, lifted from a research notebook into a typed, tested, configuration-driven Python package with a FastAPI inference service and a React 19 front end. The trained model is versioned on the Hugging Face Hub, and a pre-registered evaluation audit tests whether its scores mean what they appear to.',
    image: '/projects/image-captioning.svg',
    period: '2024 – 2026',
    category: 'Research',
    tier: 'secondary',
    role: 'solo',
    status: 'Demo offline',
    evidence: [
      {
        value: '10.4 BLEU-4',
        label: 'Beam search, as committed',
        population: '500 COCO images · ~1.5 references each',
      },
      {
        value: '25.9 BLEU-4',
        label: 'Same predictions, five-reference rescore',
        population: 'sacreBLEU · identical 500 predictions',
      },
      {
        value: '3 of 30',
        label: 'Captions judged image-specific',
        population: 'Blinded rubric review, judged without sight of the BLEU result',
        emphasis: true,
      },
      {
        value: '94 tests',
        label: 'Four-job CI',
        population: 'ruff · mypy · notebook freeze · frontend build',
      },
    ],
    stack: [
      'Python',
      'TensorFlow / Keras',
      'InceptionV3',
      'Transformer',
      'FastAPI',
      'Pydantic v2',
      'React 19',
      'pytest',
      'mypy',
      'Hugging Face Hub',
    ],
    github: CAPTIONING,
    sections: [
      {
        heading: 'The paper',
        body: [
          '“AI Narratives: Bridging Visual Content and Linguistic Expression”, 2024 IEEE International Conference on Smart Power Control and Renewable Energy (ICSPCRE). Authors: Preetam, Sai Chetan Muppalla, Apoorv Raj and Jasneet Chawla. It applies an InceptionV3 image encoder and a Transformer decoder to COCO image captioning.',
        ],
      },
      {
        heading: 'From notebook to package',
        points: [
          'YAML configuration validated by Pydantic v2 (unknown keys are rejected) and overridable through environment variables. Hyperparameters mirror the notebook: COCO 2017, 120,000 sampled captions, a 15,000-token vocabulary, 40-token captions and an 80/20 split.',
          'Frozen ImageNet InceptionV3 features feed a Transformer encoder and a single Transformer decoder layer with 8 attention heads.',
          'The original research notebook is frozen by SHA-256 and checked in CI, so the reference implementation cannot drift silently.',
          '94 automated tests. CI runs ruff and mypy, a Python test matrix, the notebook freeze check and a frontend build.',
        ],
      },
      {
        heading: 'Serving',
        points: [
          'A FastAPI service with a lifespan-managed predictor, so one warm model is reused across requests, plus request-scoped structured logging and a multipart POST /v1/captions endpoint.',
          'A React 19 + Vite + Tailwind front end with request timeouts and structured error handling.',
          'Trained weights (v2.0.0) versioned on the Hugging Face Hub.',
        ],
      },
      {
        heading: 'The evaluation audit',
        body: [
          'A reproducible harness computes BLEU-1–4, CIDEr, METEOR and ROUGE-L for greedy and beam-search decoding and writes per-run metrics, predictions and diagnostics, so two runs can be compared mechanically.',
          'Scored against about 1.5 reference captions per image, the v2.0.0 model reaches BLEU-4 10.4 with beam search (10.6 greedy). A pre-registered rescore of the same 500 predictions against all five COCO references gives 25.9 (sacreBLEU; NLTK variants give 22.2 and 23.8). The low single-reference score was mostly a property of the scoring setup, not the model.',
          'A blinded review of 30 captions, run separately so the BLEU number could not bias it, found 3 image-specific and correct, 11 generic, 15 partially correct and 1 wrong. A good corpus score does not mean the captions are good, so the audit’s decision rule flags the result for human review instead of declaring success.',
        ],
      },
      {
        heading: 'Status',
        body: [
          'Paper published in 2024; the package, service and evaluation work followed in 2026. The hosted inference Space is currently offline because of a deployment configuration error since June 2026, so there is no live demo. Baselines against other captioning models, latency benchmarks and observability are on the roadmap, not done.',
        ],
      },
    ],
    sources: [
      { label: 'Source code', url: CAPTIONING },
      { label: 'Paper on IEEE Xplore', url: 'https://ieeexplore.ieee.org/document/10675203' },
      { label: 'DOI 10.1109/ICSPCRE62303.2024.10675203', url: 'https://doi.org/10.1109/ICSPCRE62303.2024.10675203' },
      { label: 'Model weights on the Hugging Face Hub', url: 'https://huggingface.co/apoorvrajdev/captioning-inceptionv3-transformer' },
      { label: 'Evaluation audit verdict', url: `${CAPTIONING}/blob/main/results/stabilized-beam-w4-lp07-rp12/verdict.md` },
    ],
    factsCheckedOn: '2026-09-22',
  },
  {
    id: '3',
    slug: 'plant-leaf-disease-detection',
    title: 'Plant Disease Detection',
    shortTitle: 'Plant Disease',
    shortDescription:
      'Built with Tejaswi Raj: an EfficientNetB0 classifier for 38 leaf-disease classes. My part: backend, inference pipeline, deployment and hardening.',
    description:
      'A leaf-photo classifier for 38 disease classes across 14 crops, started as a university project with Tejaswi Raj and published in 2026. Tejaswi led research, data preparation, model training, notebook authoring, evaluation and the frontend; I worked on the backend and inference pipeline, deployment, testing, algorithm implementation and technical guidance.',
    image: '/projects/medical-vision.svg',
    period: '2023 – 2026',
    category: 'AI/ML',
    tier: 'earlier',
    role: 'collaboration',
    status: 'Earlier work',
    stack: ['Python', 'TensorFlow / Keras', 'EfficientNetB0', 'Pillow', 'Gradio'],
    github: 'https://github.com/apoorvrajdev/plant-disease-detection',
    sections: [
      {
        heading: 'Who did what',
        points: [
          'Tejaswi Raj: research, data preparation, model training, notebook authoring, evaluation and the frontend.',
          'Apoorv Raj: backend, inference pipeline, deployment, testing, algorithm implementation and technical guidance.',
          'The joint project’s original repository is tejaswirajgit/Plant-Disease-Detection; this repository carries the same code plus my later inference and download hardening.',
        ],
      },
      {
        heading: 'Model',
        body: [
          'EfficientNetB0 with ImageNet weights, the last 20 layers fine-tuned, and a global-average-pooling + 38-way softmax head, trained on the ~88,000-image New Plant Diseases dataset (an augmented PlantVillage derivative) at 224×224.',
          'Reported accuracy is 99.84% on the validation split, the same split used for early stopping and checkpoint selection. There is no separate held-out test set, so treat the figure as optimistic.',
        ],
      },
      {
        heading: 'My inference hardening',
        points: [
          'Honour EXIF orientation before inference, so phone photos stored rotated reach the model upright.',
          'Bound the input size, validate the input type, and check the model’s output dimension against the class list.',
          'Download the model with a connect timeout, retry with backoff, a minimum-size sanity check and optional SHA-256 verification.',
        ],
      },
      {
        heading: 'Status',
        body: [
          'The Gradio demo is hosted on Tejaswi Raj’s Hugging Face account and sleeps when idle; it runs the joint project’s code and does not include the hardening above. There are no automated tests or CI yet.',
        ],
      },
    ],
    sources: [
      { label: 'Source code', url: 'https://github.com/apoorvrajdev/plant-disease-detection' },
      { label: 'Original joint repository', url: 'https://github.com/tejaswirajgit/Plant-Disease-Detection', note: 'Tejaswi Raj' },
      { label: 'Gradio demo', url: 'https://huggingface.co/spaces/workface/plant-disease-detection', note: 'Tejaswi Raj’s account; sleeps when idle' },
    ],
    factsCheckedOn: '2026-09-22',
  },
  {
    id: '4',
    slug: 'heart-disease-risk-prediction',
    title: 'Heart Disease Risk Prediction',
    shortTitle: 'Heart Disease',
    shortDescription:
      'Earlier work: 2023 coursework comparing classifiers for heart-disease risk, packaged as a Streamlit app in 2026.',
    description:
      'Sixth-semester coursework from 2023 that compared KNN, SVM, Random Forest, a voting ensemble and XGBoost on the widely used 1,025-row heart-disease dataset, later packaged as a Streamlit app that turns the model’s probability into a low / moderate / high risk band.',
    image: '/projects/medical-vision.svg',
    period: '2023 – 2026',
    category: 'AI/ML',
    tier: 'earlier',
    role: 'solo',
    status: 'Earlier work',
    stack: ['Python', 'scikit-learn', 'XGBoost', 'pandas', 'Streamlit'],
    github: 'https://github.com/apoorvrajdev/heart-disease-ai',
    sections: [
      {
        heading: 'What it is',
        points: [
          'A training notebook comparing five classifiers on structured clinical features such as age, chest-pain type, resting blood pressure, cholesterol, maximum heart rate and ST depression.',
          'A Streamlit app that loads a single joblib artifact, builds the feature vector in a fixed order, and shows the predicted probability as a risk band and gauge.',
        ],
      },
      {
        heading: 'Why no accuracy is shown',
        body: [
          'The dataset has 1,025 rows but only 302 unique ones, and the notebook splits without de-duplicating, so most test rows have an identical copy in the training split. The accuracies it reports (up to 89.42%) are therefore not a reliable estimate of performance on new patients, and the probabilities are not calibrated.',
        ],
      },
    ],
    sources: [
      { label: 'Source code', url: 'https://github.com/apoorvrajdev/heart-disease-ai' },
      { label: 'Streamlit app', url: 'https://heart-disease-clinical-ai.streamlit.app', note: 'sleeps when idle' },
    ],
    factsCheckedOn: '2026-09-22',
  },
  {
    id: '5',
    slug: 'unhosted-core',
    title: 'Unhosted — open-source contributions',
    shortTitle: 'Unhosted',
    shortDescription:
      'Contributions to Ankur Sinha’s research-stage Rust runtime for LLM inference across personal hardware: onboarding docs, CI and a Windows fix.',
    description:
      'Unhosted is an AGPL-licensed, research-stage Rust runtime by Ankur Sinha that routes LLM inference across machines you own. My contributions were to its developer experience: onboarding and maintainer documentation, a commit-message workflow, a formatting pass, and a cross-platform configuration fix.',
    image: '/projects/distributed-inference.svg',
    period: '2026',
    category: 'Research',
    tier: 'earlier',
    role: 'contribution',
    status: 'Research stage',
    stack: ['Rust', 'llama.cpp', 'mDNS', 'GitHub Actions'],
    github: 'https://github.com/apoorvrajdev/unhosted-core',
    sections: [
      {
        heading: 'About the project',
        body: [
          'Unhosted wraps llama.cpp’s inference server and routes requests across peers discovered on the local network over mDNS. It is research-stage: in the version I worked on, several planned capabilities, such as pooling GPU memory across machines and a paid public swarm, existed as design documents rather than code.',
        ],
      },
      {
        heading: 'My contributions',
        points: [
          'A getting-started guide and maintainer documentation.',
          'A Windows %APPDATA% fallback for the peer-registry configuration path, with three tests.',
          'A rustfmt pass across the Rust sources.',
          'Contribution-workflow documentation, a tracked commit-message hook and a matching CI check.',
        ],
        body: [
          'These changes live in my copy of the repository, imported from upstream in May 2026. They were not merged upstream, where development continues independently.',
        ],
      },
    ],
    sources: [
      { label: 'Upstream repository', url: 'https://github.com/unhosted-ai/unhosted-core', note: 'Ankur Sinha' },
      { label: 'My copy with these contributions', url: 'https://github.com/apoorvrajdev/unhosted-core' },
    ],
    factsCheckedOn: '2026-09-22',
  },
  {
    id: '6',
    slug: 'diabetes-risk-prediction',
    title: 'Diabetes Risk Prediction',
    shortTitle: 'Diabetes Risk',
    shortDescription:
      'Earlier work: a 2023 diabetes-risk classifier packaged as a Streamlit app. Its earlier headline score came from data leakage and is withdrawn.',
    description:
      'A 2023 notebook that estimates Type 2 diabetes risk from eight clinical features on a ~100,000-row public dataset, later packaged as a Streamlit app with an explicit 13-column feature encoding and a model loaded once per container.',
    image: '/projects/medical-vision.svg',
    period: '2023 – 2026',
    category: 'AI/ML',
    tier: 'earlier',
    role: 'solo',
    status: 'Earlier work',
    stack: ['Python', 'scikit-learn', 'SMOTE', 'pandas', 'Streamlit'],
    github: 'https://github.com/apoorvrajdev/diabetes-risk-prediction-ai',
    sections: [
      {
        heading: 'What it is',
        points: [
          'Five model families compared (Random Forest, Gradient Boosting, Logistic Regression, Decision Tree and Gaussian Naive Bayes); Random Forest is served.',
          'A Streamlit app with an explicit feature-encoding helper, scikit-learn pinned for pickle compatibility, and the model downloaded from Google Drive on cold start, cached per container, and mapped from probability to a risk band.',
        ],
      },
      {
        heading: 'Why no headline metric',
        body: [
          'The ROC-AUC of 0.996 reported earlier came from oversampling (SMOTE) the whole dataset before the train/test split, which leaks synthetic neighbours of test rows into training. The code now applies SMOTE to the training fold only, but the notebook has not been re-run, so there is no trustworthy metric to show yet.',
        ],
      },
    ],
    sources: [
      { label: 'Source code', url: 'https://github.com/apoorvrajdev/diabetes-risk-prediction-ai' },
      { label: 'Streamlit app', url: 'https://diabetes-risk-prediction-ai.streamlit.app', note: 'sleeps when idle' },
    ],
    factsCheckedOn: '2026-09-22',
  },
]
