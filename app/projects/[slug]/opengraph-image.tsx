import { ImageResponse } from 'next/og'
import { projects } from '@/data/projects'
import { SITE_HOST, profile } from '@/data/profile'

export const alt = `Project case study by ${profile.name}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export default async function ProjectOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  const title = project?.shortTitle ?? profile.name
  const summary = project?.shortDescription ?? profile.tagline
  const meta = project ? `${project.status} · ${project.period}` : ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: 'linear-gradient(135deg, #0a0e1a 0%, #1a2542 50%, #0d1a3a 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '12px',
              background: 'rgba(122, 162, 255, 0.15)',
              border: '2px solid rgba(122, 162, 255, 0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#7aa2ff',
              fontSize: '28px',
              fontWeight: 700,
              fontFamily: 'monospace',
            }}
          >
            {profile.initials}
          </div>
          <span
            style={{
              fontSize: '20px',
              color: '#7aa2ff',
              fontFamily: 'monospace',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            {`${profile.name.toLowerCase()} · case study`}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div
            style={{
              fontSize: '80px',
              fontWeight: 800,
              color: 'white',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: '34px',
              fontWeight: 500,
              color: '#bcd0ff',
              lineHeight: 1.3,
              maxWidth: '1040px',
            }}
          >
            {summary}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#8ea2c8',
            fontSize: '20px',
            fontFamily: 'monospace',
          }}
        >
          <span>{meta}</span>
          <span style={{ color: '#7aa2ff' }}>{`${SITE_HOST}/projects/${slug}`}</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
