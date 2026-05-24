export interface ResearchPaper {
  id: string
  title: string
  authors: string[]
  conference: string
  year: number
  arxiv?: string
  doi?: string
  abstract: string
  link?: string
}

export const researchPapers: ResearchPaper[] = [
  {
    id: '1',
    title: 'AI Narratives: Bridging Visual Content and Linguistic Expression',
    authors: ['Apoorv Raj'],
    conference: 'IEEE Xplore · 2024',
    year: 2024,
    link: 'https://ieeexplore.ieee.org/document/10675203',
    arxiv: 'https://ieeexplore.ieee.org/document/10675203',
    abstract:
      'A vision-language architecture that pairs an InceptionV3 visual encoder with a Transformer-based language decoder to produce scene-aware narratives from raw images — moving beyond object enumeration into description that carries spatial relationships, action, and context.\n\nThe pipeline extracts dense visual features through the pretrained Inception backbone, projects them into the decoder embedding space, and generates token-level captions under teacher-forced training with cross-attention over the visual sequence. The architecture is evaluated on standard image-caption benchmarks with BLEU-family quantitative scores and qualitative scene-coverage inspection.\n\nThe contribution is structural: combining a strong pretrained visual encoder with a Transformer-based decoder produces narrative-quality text that downstream systems can consume — accessibility tooling, multimedia indexing, and education applications where object lists fall short.',
  },
]
