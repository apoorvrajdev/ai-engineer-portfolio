import { projects } from '@/data/projects'
import { SITE_URL, profile } from '@/data/profile'
import { researchPapers } from '@/data/research'

export function StructuredData() {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    url: SITE_URL,
    email: profile.email,
    image: `${SITE_URL}/opengraph-image`,
    sameAs: [profile.links.linkedin, profile.links.github],
    jobTitle: profile.title,
    worksFor: {
      '@type': 'Organization',
      name: profile.employer.name,
    },
    knowsAbout: [
      'Machine Learning',
      'Model Evaluation',
      'Software Engineering',
      'Full-Stack Development',
      'Python',
      'TypeScript',
      'FastAPI',
      'React',
    ],
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: `${profile.name} Portfolio`,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    sameAs: [profile.links.linkedin, profile.links.github],
  }

  const projectsSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    // `@id` matches the node emitted by `project-structured-data.tsx` on each
    // case-study page, so the two graphs merge rather than describe the project
    // twice.
    itemListElement: projects.map((project, index) => ({
      '@type': 'SoftwareSourceCode',
      '@id': `${SITE_URL}/projects/${project.slug}#project`,
      position: index + 1,
      name: project.title,
      description: project.shortDescription,
      url: `${SITE_URL}/projects/${project.slug}`,
    })),
  }

  const publicationsSchema = researchPapers.map((paper) => ({
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: paper.title,
    author: paper.authors.map((name) => ({ '@type': 'Person', name })),
    datePublished: paper.published ?? String(paper.year),
    isPartOf: { '@type': 'CreativeWork', name: paper.conference },
    publisher: { '@type': 'Organization', name: 'IEEE' },
    ...(paper.doi ? { sameAs: `https://doi.org/${paper.doi}` } : {}),
    ...(paper.link ? { url: paper.link } : {}),
  }))

  const schemas = [personSchema, organizationSchema, projectsSchema, ...publicationsSchema]

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  )
}
