export interface ResearchPaper {
  id: string
  title: string
  /** Every author, in the published order. */
  authors: string[]
  conference: string
  year: number
  /** ISO date of publication, from the DOI record. */
  published?: string
  doi?: string
  abstract: string
  /** Publisher landing page. */
  link?: string
}

export const researchPapers: ResearchPaper[] = [
  {
    id: '1',
    title: 'AI Narratives: Bridging Visual Content and Linguistic Expression',
    authors: ['Preetam', 'Sai Chetan Muppalla', 'Apoorv Raj', 'Jasneet Chawla'],
    conference: '2024 IEEE International Conference on Smart Power Control and Renewable Energy (ICSPCRE)',
    year: 2024,
    published: '2024-07-19',
    doi: '10.1109/ICSPCRE62303.2024.10675203',
    link: 'https://ieeexplore.ieee.org/document/10675203',
    abstract:
      'Image captioning with an InceptionV3 CNN visual encoder and a Transformer-based decoder, trained on the COCO dataset.',
  },
]
