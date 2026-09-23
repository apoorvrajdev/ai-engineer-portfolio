import type { Project } from '@/data/projects'
import { SITE_URL, profile } from '@/data/profile'

/**
 * Per-project JSON-LD, rendered only on a case-study page.
 *
 * The site-wide `ItemList` in `structured-data.tsx` lists every project by the
 * same `@id`, so these two graphs merge into one node per project instead of
 * competing descriptions of it.
 */
export function ProjectStructuredData({ project }: { readonly project: Project }) {
  const url = `${SITE_URL}/projects/${project.slug}`

  const projectSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    '@id': `${url}#project`,
    name: project.title,
    description: project.shortDescription,
    url,
    mainEntityOfPage: url,
    author: { '@type': 'Person', name: profile.name, url: SITE_URL },
    keywords: project.stack.join(', '),
    programmingLanguage: project.stack,
    ...(project.github ? { codeRepository: project.github } : {}),
    ...(project.image ? { image: `${SITE_URL}${project.image}` } : {}),
  }

  // Home → project. There is no /projects index route, so the trail has two
  // levels and does not invent one.
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: project.title, item: url },
    ],
  }

  return (
    <>
      {[projectSchema, breadcrumbSchema].map((schema) => (
        <script
          key={schema['@type']}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
