import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect } from 'react'
import { FiGithub, FiStar, FiGitBranch, FiUsers } from 'react-icons/fi'
import Section from '../ui/Section'
import LoadingSpinner from '../ui/LoadingSpinner'
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

const StatCard = ({ icon: Icon, label, value, color }) => (
  <motion.div
    whileHover={{ y: -5, scale: 1.02 }}
    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
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
    <Section id="github" className="bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            GitHub Activity
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6" />
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            My open source contributions and statistics
          </p>
        </motion.div>

        {loading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-red-500 dark:text-red-400 mb-4">
              Failed to load GitHub stats
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {error}
            </p>
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

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                GitHub Contribution Graph
              </h3>
              <div className="flex justify-center">
                <img
                  src={`https://ghchart.rshah.org/${SITE_CONFIG.githubUsername}`}
                  alt="GitHub Contributions"
                  className="w-full max-w-3xl rounded-lg"
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </Section>
  )
}

export default GitHubStats
