import axios from "axios";

export interface GitHubProfileStats {
  username: string;
  name: string;
  avatarUrl: string;
  publicRepos: number;
  followers: number;
  following: number;
  stars: number;
  bio?: string;
}

// Fetch profile + repo data from GitHub
export async function getGitHubProfileStats(username: string): Promise<GitHubProfileStats> {
  // 1. Get user profile
  const userRes = await axios.get(`https://api.github.com/users/${username}`);
  const user = userRes.data;

  // 2. Get all repos (to sum stars)
  let page = 1, stars = 0, done = false;
  while (!done) {
    const repoRes = await axios.get(
      `https://api.github.com/users/${username}/repos`,
      { params: { per_page: 100, page: page++ } }
    );
    const repos = repoRes.data;
    for (const repo of repos) stars += repo.stargazers_count;
    if (repos.length < 100) done = true;
  }

  return {
    username,
    name: user.name || username,
    avatarUrl: user.avatar_url,
    publicRepos: user.public_repos,
    followers: user.followers,
    following: user.following,
    stars,
    bio: user.bio || "",
  };
}