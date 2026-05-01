import { SectionWrapper } from '@/components/section-wrapper'
import { SectionHeading } from '@/components/section-heading'
import { GithubActivityClient, type Repository, type StatIconName } from './github-activity-client'

const GITHUB_USER = 'apoorvrajdev'

const fallbackRepositories: Repository[] = [
  { name: 'diabetes-risk-prediction-ai', href: `https://github.com/${GITHUB_USER}/diabetes-risk-prediction-ai` },
  { name: 'heart-disease-ai', href: `https://github.com/${GITHUB_USER}/heart-disease-ai` },
  { name: 'restaurant-sentiment-analysis', href: `https://github.com/${GITHUB_USER}/restaurant-sentiment-analysis` },
  { name: 'core-application-services', href: `https://github.com/${GITHUB_USER}/core-application-services` },
  { name: 'ai-engineer-portfolio', href: `https://github.com/${GITHUB_USER}/ai-engineer-portfolio` },
]

const stats: Array<{ label: string; value: string; icon: StatIconName }> = [
  { label: 'GitHub Profile', value: `@${GITHUB_USER}`, icon: 'FolderGit2' },
  { label: 'Latest Repositories', value: '5', icon: 'Star' },
  { label: 'Contribution Activity', value: 'Active', icon: 'GitPullRequestArrow' },
  { label: 'Recent Commits', value: 'Visualized', icon: 'Activity' },
]

async function getLatestRepositories(): Promise<Repository[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=20`,
      { next: { revalidate: 3600 } },
    )

    if (!response.ok) return fallbackRepositories

    const repos = (await response.json()) as Array<{ name: string; html_url: string }>
    const repoMap = new Map(repos.map((repo) => [repo.name, repo.html_url]))
    const desiredOrder = fallbackRepositories.map((repo) => repo.name)

    return desiredOrder.map((name) => ({
      name,
      href: repoMap.get(name) ?? `https://github.com/${GITHUB_USER}/${name}`,
    }))
  } catch {
    return fallbackRepositories
  }
}

export async function GithubActivitySection() {
  const latestRepositories = await getLatestRepositories()

  return (
    <SectionWrapper id="open-source">
      <SectionHeading
        eyebrow="Open Source"
        title="Open Source Activity"
        description="GitHub profile, contribution activity, latest repositories, and commit activity visualization."
      />
      <GithubActivityClient
        githubProfile={`https://github.com/${GITHUB_USER}`}
        githubUser={GITHUB_USER}
        stats={stats}
        latestRepositories={latestRepositories}
      />
    </SectionWrapper>
  )
}
