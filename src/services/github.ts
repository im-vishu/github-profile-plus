import axios from "axios";

/** Represents a GitHub user's top language usage (for charts/cards) */
export interface TopLanguage {
  name: string;
  color: string;
  count: number;
}

/** Represents stats for a user's public GitHub profile */
export interface GitHubProfileStats {
  name: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  bio?: string;
}

/**
 * Get basic profile stats for a GitHub user.
 */
export async function getGitHubProfileStats(username: string): Promise<GitHubProfileStats> {
  const res = await axios.get(`https://api.github.com/users/${username}`);
  if (!res.data || !res.data.login) throw new Error("Not Found");
  return {
    name: res.data.name || res.data.login,
    avatar_url: res.data.avatar_url,
    public_repos: res.data.public_repos,
    followers: res.data.followers,
    following: res.data.following,
    bio: res.data.bio || "",
  };
}

/**
 * Get a user's most-used languages (by number of repos using each language)
 */
export async function getUserTopLanguages(username: string): Promise<TopLanguage[]> {
  const reposRes = await axios.get(`https://api.github.com/users/${username}/repos?per_page=100&type=owner`);
  const repos = reposRes.data as Array<{ language: string }>;
  if (!repos || !Array.isArray(repos)) throw new Error("Not Found");

  // Count languages
  const counts: Record<string, number> = {};
  for (const repo of repos) {
    if (repo.language) {
      counts[repo.language] = (counts[repo.language] || 0) + 1;
    }
  }

  // Demo color map (expand as you wish)
  const COLOR: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    Java: "#b07219",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Shell: "#89e051",
    C: "#555555",
    "C++": "#f34b7d",
    "Jupyter Notebook": "#DA5B0B",
    Other: "#888",
  };

  // Format and sort output
  const entries: TopLanguage[] = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({
      name,
      count,
      color: COLOR[name] || "#888"
    }));

  if (!entries.length) throw new Error("Not Found");

  return entries;
}