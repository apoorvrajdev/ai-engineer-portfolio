import { projects } from '@/data/projects'

const SITE_URL = 'https://ai-engineer-portfolio-pi.vercel.app'

export function StructuredData() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Apoorv Raj',
    url: SITE_URL,
    email: 'apoorvrajmgr@gmail.com',
    image: `${SITE_URL}/opengraph-image`,
    sameAs: [
      'https://www.linkedin.com/in/apoorv-raj-1a35ba218/',
      'https://github.com/apoorvrajdev',
    ],
    jobTitle: 'AI Engineer',
    affiliation: {
      '@type': 'Organization',
      name: 'Defense Research and Development Organisation (DRDO)',
    },
    knowsAbout: [
      'Machine Learning',
      'Deep Learning',
      'Computer Vision',
      'Natural Language Processing',
      'Full-Stack Development',
      'PyTorch',
      'TensorFlow',
      'Research & Publication',
    ],
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Apoorv Raj Portfolio',
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    sameAs: [
      'https://www.linkedin.com/in/apoorv-raj-1a35ba218/',
      'https://github.com/apoorvrajdev',
    ],
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Projects',
        item: `${SITE_URL}#projects`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Research',
        item: `${SITE_URL}#research`,
      },
    ],
  }

  const projectsSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: projects.map((project, index) => ({
      '@type': 'CreativeWork',
      position: index + 1,
      name: project.title,
      description: project.description,
      url: `${SITE_URL}/projects/${project.slug}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(projectsSchema),
        }}
      />
    </>
  )
}
