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
