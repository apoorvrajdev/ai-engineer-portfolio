'use client'

import { motion } from 'framer-motion'
import { Star, FolderGit2, Activity, GitPullRequestArrow } from 'lucide-react'

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
      {/* Stats row */}
      <div className="mt-10 sm:mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = iconMap[stat.icon]
          return (
            <motion.article
              key={stat.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: [0.4, 0, 0.2, 1] }}
              className="group relative overflow-hidden rounded-xl border border-border bg-card/40 glass p-5 hover:border-primary/40 hover-lift transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</p>
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                {stat.label === 'GitHub Profile' ? (
                  <a
                    href={githubProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 block text-3xl font-bold tracking-tight text-foreground"
                  >
                    {stat.value}
                  </a>
                ) : (
                  <p className="mt-3 text-3xl font-bold tracking-tight text-foreground">{stat.value}</p>
                )}
              </div>
              <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-transparent transition-all duration-500 group-hover:w-full" />
            </motion.article>
          )
        })}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        {/* Contribution graph */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="rounded-xl border border-border bg-card/40 glass overflow-hidden"
        >
          {/* Terminal header */}
          <div className="flex items-center gap-3 border-b border-border/50 bg-secondary/40 px-5 py-3.5">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-destructive/60" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
              <div className="h-3 w-3 rounded-full bg-primary/60" />
            </div>
            <span className="ml-2 font-mono text-xs text-muted-foreground">~/{githubUser}/contributions</span>
            <div className="ml-auto flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-xs text-muted-foreground">live</span>
            </div>
          </div>

          <div className="p-6 sm:p-7">
            <p className="mb-5 text-sm text-muted-foreground">
              Profile: <a href={githubProfile} target="_blank" rel="noopener noreferrer" className="text-primary">{githubProfile}</a>
            </p>
            <div className="overflow-x-auto">
              <img
                src={`https://ghchart.rshah.org/${githubUser}`}
                alt={`GitHub contribution calendar for ${githubUser}`}
                className="min-w-full"
                loading="lazy"
              />
            </div>
          </div>
        </motion.article>

        {/* Latest repositories */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.4, 0, 0.2, 1] }}
          className="rounded-xl border border-border bg-card/40 glass overflow-hidden"
        >
          <div className="flex items-center gap-3 border-b border-border/50 bg-secondary/40 px-5 py-3.5">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-destructive/60" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
              <div className="h-3 w-3 rounded-full bg-primary/60" />
            </div>
            <span className="ml-2 font-mono text-xs text-muted-foreground">~/latest-repositories</span>
          </div>

          <div className="divide-y divide-border/30 p-5">
            {latestRepositories.map((item) => (
              <div key={item.name} className="group flex items-start gap-3 py-3.5">
                <span className="mt-0.5 font-mono text-xs text-primary shrink-0">$</span>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground"
                >
                  {item.name}
                </a>
              </div>
            ))}
          </div>
        </motion.article>
      </div>
    </>
  )
}
