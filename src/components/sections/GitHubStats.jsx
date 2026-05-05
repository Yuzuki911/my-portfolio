import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FiGithub, FiStar, FiGitBranch, FiUsers } from 'react-icons/fi'
import Section from '../ui/Section'
import LoadingSpinner from '../ui/LoadingSpinner'
import SectionHeader from '../ui/SectionHeader'
import { useGitHubStats } from '../../hooks/useGitHubStats'
import { SITE_CONFIG } from '../../utils/constants'

const Counter = ({ value, duration = 2 }) => {
  const count = useMotionValue(0)
  const rounded = useTransform(count, Math.round)

  useEffect(() => {
    const animation = animate(count, value, { duration })
    return animation.stop
  }, [value, count, duration])

  return <motion.span>{rounded}</motion.span>
}

const ContributionChart = ({ username }) => {
  const [imgError, setImgError] = useState(false)
  return (
    <div className="bg-white dark:bg-dark-card rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        GitHub Contribution Graph
      </h3>
      <div className="flex justify-center">
        {imgError ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Contribution graph unavailable. View on{' '}
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline"
            >
              GitHub
            </a>.
          </p>
        ) : (
          <img
            src={`https://ghchart.rshah.org/${username}`}
            alt="GitHub Contributions"
            className="w-full max-w-3xl rounded-lg"
            onError={() => setImgError(true)}
          />
        )}
      </div>
    </div>
  )
}

const StatCard = ({ icon: Icon, label, value, color }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    className="bg-white dark:bg-dark-card rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
  >
    <div className="flex items-center justify-between mb-3">
      <Icon className={`text-3xl ${color}`} />
    </div>
    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
      <Counter value={value} />
    </div>
    <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
  </motion.div>
)

const GitHubStats = () => {
  const { stats, loading, error } = useGitHubStats(SITE_CONFIG.githubUsername)

  return (
    <Section id="github" className="bg-beige dark:bg-dark-card">
      <div className="container mx-auto px-4">
        <SectionHeader
          title="GitHub Activity"
          subtitle="My open source contributions and statistics"
        />

        {loading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {error && (
          <div className="max-w-6xl mx-auto">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6 mb-8 text-center">
              <p className="text-yellow-800 dark:text-yellow-200 mb-2 font-medium">
                {error}
              </p>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                Your contribution graph is displayed below
              </p>
            </div>

            <ContributionChart username={SITE_CONFIG.githubUsername} />
          </div>
        )}

        {stats && !loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              <StatCard
                icon={FiGitBranch}
                label="Repositories"
                value={stats.publicRepos}
                color="text-blue-500"
              />
              <StatCard
                icon={FiStar}
                label="Total Stars"
                value={stats.totalStars}
                color="text-yellow-500"
              />
              <StatCard
                icon={FiUsers}
                label="Followers"
                value={stats.followers}
                color="text-purple-500"
              />
              <StatCard
                icon={FiGithub}
                label="Total Forks"
                value={stats.totalForks}
                color="text-green-500"
              />
            </div>

            <ContributionChart username={SITE_CONFIG.githubUsername} />
          </motion.div>
        )}
      </div>
    </Section>
  )
}

export default GitHubStats
