import { useState, useEffect } from 'react'
import axios from 'axios'

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

        setStats({
          publicRepos: userResponse.data.public_repos,
          followers: userResponse.data.followers,
          following: userResponse.data.following,
          totalStars,
          totalForks,
          avatarUrl: userResponse.data.avatar_url,
          bio: userResponse.data.bio,
          topRepos: repos.slice(0, 6)
        })
      } catch (err) {
        setError(err.message)
        console.error('Error fetching GitHub stats:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [username])

  return { stats, loading, error }
}
