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
    conference: 'IEEE International Conference on Smart Power Control and Renewable Energy · 2024',
    year: 2024,
    link: 'https://ieeexplore.ieee.org/document/10675203',
    arxiv: 'https://ieeexplore.ieee.org/document/10675203',
    abstract:
      'A multimodal AI system combining an InceptionV3 CNN visual encoder with a Transformer-based decoder for scene-aware image captioning, trained on the COCO dataset, achieving BLEU-4 ~24.',
  },
]
