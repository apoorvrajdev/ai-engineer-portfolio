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
    conference: 'IEEE Conference Paper (2024)',
    year: 2024,
    link: 'https://ieeexplore.ieee.org/document/10675203',
    arxiv: 'https://ieeexplore.ieee.org/document/10675203',
    abstract: 'This research explores how artificial intelligence can bridge visual understanding and linguistic storytelling by combining computer vision and natural language processing techniques. The work integrates Convolutional Neural Networks with the Inception V3 architecture to extract meaningful visual features from images and translate them into context-aware textual narratives.\n\nBy combining deep visual feature extraction with language generation models, the system is able to interpret visual content and generate semantically coherent descriptions that resemble human-like storytelling. The research demonstrates how AI can analyze multimedia inputs and transform them into rich narratives that connect visual perception with linguistic expression.\n\nThis approach highlights the growing potential of AI-driven narrative systems across domains such as digital storytelling, education, multimedia production, and human-computer interaction. By integrating visual understanding with language models, the framework opens new possibilities for intelligent systems capable of producing descriptive and context-aware narratives from visual information.',
  },
]
