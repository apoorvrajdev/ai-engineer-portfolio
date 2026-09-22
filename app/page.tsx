import type { Metadata } from 'next'
import { Navigation } from '@/components/navigation'
import { ScrollProgress } from '@/components/scroll-progress'
import { HeroSection } from '@/components/sections/hero'
import { AboutSection } from '@/components/sections/about'
import { ExperienceSection } from '@/components/sections/experience'
import { ProjectsSection } from '@/components/sections/projects'
import { ResearchSection } from '@/components/sections/research'
import { TechStackSection } from '@/components/sections/tech-stack'
import { GithubActivitySection } from '@/components/sections/github-activity'
import { ContactSection } from '@/components/sections/contact'
import { FooterSection } from '@/components/sections/footer'

// Canonical is set per page (not in the root layout) so not-found and other
// routes don't inherit the home URL.
export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <ResearchSection />
        <TechStackSection />
        <GithubActivitySection />
        <ContactSection />
      </main>
      <FooterSection />
    </>
  )
}
