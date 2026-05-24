import type { Metadata } from 'next'
import { Onest, JetBrains_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { StructuredData } from '@/components/structured-data'
import { CommandPalette } from '@/components/command-palette'
import './globals.css'

const onest = Onest({
  subsets: ['latin'],
  variable: '--font-onest',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://ai-engineer-portfolio-pi.vercel.app'),
  title: 'Apoorv Raj — AI Engineer',
  description:
    'AI Engineer at Node2.io. IEEE-published on multimodal AI. Building production-grade ML systems end to end.',
  keywords: 'AI Engineer, Machine Learning, Multimodal AI, PyTorch, TensorFlow, FastAPI, Node2',
  authors: [{ name: 'Apoorv Raj' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ai-engineer-portfolio-pi.vercel.app',
    title: 'Apoorv Raj — AI Engineer',
    description: 'AI Engineer at Node2.io. IEEE-published on multimodal AI. Building production-grade ML systems end to end.',
    siteName: 'Apoorv Raj',
    images: ['/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apoorv Raj — AI Engineer',
    description: 'AI Engineer at Node2.io. IEEE-published on multimodal AI. Building production-grade ML systems end to end.',
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
      <body className={`${onest.variable} ${jetbrainsMono.variable} font-sans antialiased bg-canvas text-ink`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="theme-preference">
          {children}
          <CommandPalette />
        </ThemeProvider>
      </body>
    </html>
  )
}
