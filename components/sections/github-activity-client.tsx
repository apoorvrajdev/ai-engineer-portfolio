'use client'

import { motion } from 'framer-motion'
import { Activity, FolderGit2, GitPullRequestArrow, Star, ArrowUpRight } from 'lucide-react'

export interface Repository {
  name: string
  href: string
}

export type StatIconName = 'Star' | 'FolderGit2' | 'Activity' | 'GitPullRequestArrow'

interface Stat {
  label: string
  value: string
  icon: StatIconName
}

interface GithubActivityClientProps {
  githubProfile: string
  githubUser: string
  stats: Stat[]
  latestRepositories: Repository[]
}

const iconMap = { Star, FolderGit2, Activity, GitPullRequestArrow } as const

export function GithubActivityClient({
  githubProfile,
  githubUser,
  stats,
  latestRepositories,
}: GithubActivityClientProps) {
  return (
    <>
      <div className="mt-12 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = iconMap[stat.icon]
          return (
            <motion.article
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="linear-card p-5"
            >
              <div className="flex items-center justify-between">
                <p className="eyebrow">{stat.label}</p>
                <Icon className="h-3.5 w-3.5 text-ink-tertiary" />
              </div>
              {stat.label === 'GitHub Profile' ? (
                <a
                  href={githubProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block headline text-ink hover:text-accent transition-colors"
                >
                  {stat.value}
                </a>
              ) : (
                <p className="mt-3 headline text-ink">{stat.value}</p>
              )}
            </motion.article>
          )
        })}
      </div>

      <div className="mt-6 grid gap-3 lg:grid-cols-[1.3fr_1fr]">
        <motion.article
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="linear-card overflow-hidden"
        >
          <div className="flex items-center justify-between gap-3 border-b border-hairline px-5 py-3">
            <span className="mono text-ink-muted">~/{githubUser}/contributions</span>
            <span className="status-pill">
              <span className="dot" />
              live
            </span>
          </div>
          <div className="p-6">
            <p className="caption">
              Profile:{' '}
              <a
                href={githubProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink hover:text-accent transition-colors"
              >
                {githubProfile}
              </a>
            </p>
            <div className="mt-4 overflow-x-auto rounded-md border border-hairline bg-canvas p-4">
              {/* eslint-disable-next-line @next/next/no-img-element -- external svg chart, image optimization disabled */}
              <img
                src={`https://ghchart.rshah.org/5e6ad2/${githubUser}`}
                alt={`GitHub contribution calendar for ${githubUser}`}
                className="min-w-full opacity-90"
                loading="lazy"
              />
            </div>
          </div>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="linear-card overflow-hidden"
        >
          <div className="border-b border-hairline px-5 py-3">
            <span className="mono text-ink-muted">~/latest-repositories</span>
          </div>
          <ul className="divide-y divide-hairline">
            {latestRepositories.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-3 px-5 py-3 transition-colors hover:bg-surface-2"
                >
                  <span className="inline-flex items-center gap-3">
                    <span className="mono text-ink-tertiary">$</span>
                    <span className="body-sm text-ink transition-colors group-hover:text-accent">
                      {item.name}
                    </span>
                  </span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-ink-tertiary transition-colors group-hover:text-ink" />
                </a>
              </li>
            ))}
          </ul>
        </motion.article>
      </div>
    </>
  )
}
