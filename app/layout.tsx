import type { Metadata } from 'next'
import { Manrope, Space_Grotesk } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { CursorSpotlight } from '@/components/cursor-spotlight'
import { StructuredData } from '@/components/structured-data'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ai-engineer-portfolio-pi.vercel.app'),
  title: 'Apoorv Raj | AI Engineer Portfolio',
  description:
    'Apoorv Raj — AI Engineer building scalable AI systems for real-world impact. Machine learning, computer vision, NLP, and production-grade software engineering.',
  keywords: 'AI Engineer, Machine Learning, Deep Learning, Computer Vision, NLP, Researcher, Full-Stack Developer, PyTorch, TensorFlow',
  authors: [{ name: 'Apoorv Raj' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ai-engineer-portfolio-pi.vercel.app',
    title: 'Apoorv Raj | AI Engineer',
    description: 'Building scalable AI systems for real-world impact.',
    siteName: 'Apoorv Raj',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apoorv Raj | AI Engineer',
    description: 'Building scalable AI systems for real-world impact.',
    images: ['/opengraph-image'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="smooth-scroll">
      <head>
        <StructuredData />
      </head>
      <body className={`${manrope.variable} ${spaceGrotesk.variable} relative font-sans antialiased bg-background text-foreground`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="theme-preference">
          <CursorSpotlight />
          <div className="relative">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  )
}
