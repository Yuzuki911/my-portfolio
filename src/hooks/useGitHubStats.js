import { useState, useEffect } from 'react'
import axios from 'axios'

const CACHE_KEY = 'github_stats_cache'
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds

export const useGitHubStats = (username) => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      if (!username) {
        setLoading(false)
        return
      }

      // Check cache first
      try {
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
          const { data, timestamp } = JSON.parse(cached)
          const age = Date.now() - timestamp

          // Use cached data if less than 1 hour old
          if (age < CACHE_DURATION) {
            setStats(data)
            setLoading(false)
            return
          }
        }
      } catch (e) {
        // Cache read failed, continue to fetch
      }

      try {
        setLoading(true)

        const userResponse = await axios.get(
          `https://api.github.com/users/${username}`
        )

        const reposResponse = await axios.get(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
        )

        const repos = reposResponse.data
        const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0)
        const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0)

        const statsData = {
          publicRepos: userResponse.data.public_repos,
          followers: userResponse.data.followers,
          following: userResponse.data.following,
          totalStars,
          totalForks,
          avatarUrl: userResponse.data.avatar_url,
          bio: userResponse.data.bio,
          topRepos: repos.slice(0, 6)
        }

        setStats(statsData)

        // Cache the result
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            data: statsData,
            timestamp: Date.now()
          }))
        } catch (e) {
          // Cache write failed, not critical
        }
      } catch (err) {
        // Better error message for rate limiting
        if (err.response?.status === 403) {
          setError('GitHub API rate limit exceeded. Stats will refresh in an hour.')
        } else {
          setError('Unable to load GitHub stats. Please try again later.')
        }
        console.error('Error fetching GitHub stats:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [username])

  return { stats, loading, error }
}
