import { ImageResponse } from 'next/og'

export const alt = 'Apoorv Raj — AI Engineer at Node2.io · IEEE-published on multimodal AI'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
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
            AR
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
            apoorv raj · portfolio
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              fontSize: '88px',
              fontWeight: 800,
              color: 'white',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            APOORV RAJ
          </div>
          <div
            style={{
              fontSize: '40px',
              fontWeight: 600,
              color: '#bcd0ff',
              lineHeight: 1.2,
              maxWidth: '900px',
            }}
          >
            AI Engineer at Node2.io · IEEE-published on multimodal AI
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
          <span>Python · PyTorch · TensorFlow · FastAPI · CI/CD</span>
          <span style={{ color: '#7aa2ff' }}>ai-engineer-portfolio-pi.vercel.app</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
