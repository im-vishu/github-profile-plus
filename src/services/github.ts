import axios from "axios";

/** Simple in-memory cache entry */
type CacheEntry = {
  expires: number;
  data: any;
};

const CACHE_TTL_MS = 120_000; // 2 minutes
const cache = new Map<string, CacheEntry>();

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (entry.expires < Date.now()) {
    cache.delete(key);
    return null;
  }
  return entry.data as T;
}

function setCached(key: string, data: any, ttl = CACHE_TTL_MS) {
  cache.set(key, { expires: Date.now() + ttl, data });
}

/** Represents a GitHub user's top language usage (for charts/cards) */
export interface TopLanguage {
  name: string;
  color: string;
  count: number;
  bytes?: number;
}

/** Represents stats for a user's public GitHub profile */
export interface GitHubProfileStats {
  login: string;
  name: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  bio?: string;
  total_stars: number;
  total_forks: number;
  total_watchers: number;
  created_at?: string;
}

export interface ContributionStreakStats {
  username: string;
  totalContributions: number;
  currentStreak: number;
  longestStreak: number;
  currentStreakStart?: string;
  currentStreakEnd?: string;
  longestStreakStart?: string;
  longestStreakEnd?: string;
}

/** Axios instance configured for GitHub API; uses GITHUB_TOKEN if provided */
const githubAxios = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github.v3+json",
    ...(process.env.GITHUB_TOKEN ? { Authorization: `token ${process.env.GITHUB_TOKEN}` } : {}),
  },
  timeout: 10000,
});

/** Normalize GitHub API errors into simple Error messages */
function handleGitHubError(err: any): never {
  if (err?.response) {
    const status = err.response.status;
    if (status === 404) throw new Error("Not Found");
    if (status === 403) {
      const reset = err.response.headers?.["x-ratelimit-reset"];
      const rem = err.response.headers?.["x-ratelimit-remaining"];
      if (rem === "0" && reset) {
        const resetSec = parseInt(reset, 10) * 1000;
        const until = new Date(resetSec).toISOString();
        throw new Error(`Rate limit exceeded; resets at ${until}`);
      }
      throw new Error("Forbidden");
    }
    throw new Error(`GitHub API error ${status}`);
  }
  throw new Error("Network Error");
}

/**
 * Get basic profile stats for a GitHub user.
 * Uses simple caching to reduce API calls.
 */
export async function getGitHubProfileStats(username: string): Promise<GitHubProfileStats> {
  const key = `profile:${username.toLowerCase()}`;
  const cached = getCached<GitHubProfileStats>(key);
  if (cached) return cached;

  try {
    const [profileRes, reposRes] = await Promise.all([
      githubAxios.get(`/users/${encodeURIComponent(username)}`),
      githubAxios.get(`/users/${encodeURIComponent(username)}/repos`, {
        params: { per_page: 100, type: "owner", sort: "updated" },
      }),
    ]);
    if (!profileRes.data || !profileRes.data.login) throw new Error("Not Found");
    const repos = Array.isArray(reposRes.data) ? reposRes.data : [];
    const result: GitHubProfileStats = {
      login: profileRes.data.login,
      name: profileRes.data.name || profileRes.data.login,
      avatar_url: profileRes.data.avatar_url,
      public_repos: profileRes.data.public_repos,
      followers: profileRes.data.followers,
      following: profileRes.data.following,
      bio: profileRes.data.bio || "",
      total_stars: repos.reduce((sum, repo) => sum + Number(repo.stargazers_count || 0), 0),
      total_forks: repos.reduce((sum, repo) => sum + Number(repo.forks_count || 0), 0),
      total_watchers: repos.reduce((sum, repo) => sum + Number(repo.watchers_count || 0), 0),
      created_at: profileRes.data.created_at,
    };
    setCached(key, result);
    return result;
  } catch (err: any) {
    handleGitHubError(err);
  }
}

/**
 * Get a user's most-used languages (by number of repos using each language)
 * Uses simple caching and returns TopLanguage[] suitable for templates.
 */
export async function getUserTopLanguages(username: string): Promise<TopLanguage[]> {
  const key = `toplangs:${username.toLowerCase()}`;
  const cached = getCached<TopLanguage[]>(key);
  if (cached) return cached;

  try {
    // fetch up to 100 repos owned by the user
    const res = await githubAxios.get(`/users/${encodeURIComponent(username)}/repos`, {
      params: { per_page: 100, type: "owner", sort: "updated" },
    });

    const repos = res.data as Array<{ name: string; language?: string; fork?: boolean }>;
    if (!repos || !Array.isArray(repos)) throw new Error("Not Found");

    const counts: Record<string, number> = {};
    for (const repo of repos.filter((repo) => !repo.fork)) {
      try {
        const langRes = await githubAxios.get(
          `/repos/${encodeURIComponent(username)}/${encodeURIComponent(repo.name)}/languages`
        );
        for (const [lang, bytes] of Object.entries(langRes.data || {})) {
          counts[lang] = (counts[lang] || 0) + Number(bytes || 0);
        }
      } catch {
        const lang = repo.language;
        if (lang) counts[lang] = (counts[lang] || 0) + 1;
      }
    }

    // Demo color map (expand as needed)
    const COLOR: Record<string, string> = {
      TypeScript: "#3178c6",
      JavaScript: "#f1e05a",
      Python: "#3572A5",
      Java: "#b07219",
      HTML: "#e34c26",
      CSS: "#563d7c",
      Shell: "#89e051",
      PHP: "#4F5D95",
      Go: "#00ADD8",
      Ruby: "#701516",
      Rust: "#dea584",
      Kotlin: "#A97BFF",
      Swift: "#F05138",
      C: "#555555",
      "C++": "#f34b7d",
      "Jupyter Notebook": "#DA5B0B",
      Other: "#888",
    };

    const entries: TopLanguage[] = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({
        name,
        count,
        bytes: count,
        color: COLOR[name] || "#888",
      }));

    if (!entries.length) throw new Error("Not Found");

    setCached(key, entries);
    return entries;
  } catch (err: any) {
    handleGitHubError(err);
  }
}

export async function getUserContributionStreak(username: string): Promise<ContributionStreakStats> {
  const key = `streak:${username.toLowerCase()}`;
  const cached = getCached<ContributionStreakStats>(key);
  if (cached) return cached;

  try {
    const res = await githubAxios.get(`/users/${encodeURIComponent(username)}/events/public`, {
      params: { per_page: 100 },
    });
    const events = Array.isArray(res.data) ? res.data : [];
    const contributionDays = new Set<string>();
    for (const event of events) {
      if (typeof event?.created_at === "string") {
        contributionDays.add(event.created_at.slice(0, 10));
      }
    }

    const sortedDays = [...contributionDays].sort();
    const streak = computeStreaks(sortedDays);
    const result: ContributionStreakStats = {
      username,
      totalContributions: events.length,
      ...streak,
    };
    setCached(key, result);
    return result;
  } catch (err: any) {
    handleGitHubError(err);
  }
}

function computeStreaks(days: string[]): Omit<ContributionStreakStats, "username" | "totalContributions"> {
  if (!days.length) {
    return { currentStreak: 0, longestStreak: 0 };
  }

  let longestStreak = 1;
  let longestStreakStart = days[0];
  let longestStreakEnd = days[0];
  let runStart = days[0];
  let runLength = 1;

  for (let i = 1; i < days.length; i += 1) {
    const previous = new Date(`${days[i - 1]}T00:00:00Z`);
    const current = new Date(`${days[i]}T00:00:00Z`);
    const diffDays = Math.round((current.getTime() - previous.getTime()) / 86_400_000);
    if (diffDays === 1) {
      runLength += 1;
    } else {
      runStart = days[i];
      runLength = 1;
    }
    if (runLength > longestStreak) {
      longestStreak = runLength;
      longestStreakStart = runStart;
      longestStreakEnd = days[i];
    }
  }

  const today = new Date();
  const todayKey = today.toISOString().slice(0, 10);
  const yesterday = new Date(today.getTime() - 86_400_000).toISOString().slice(0, 10);
  let currentStreak = 0;
  let currentStreakStart: string | undefined;
  let currentStreakEnd: string | undefined;
  if (days[days.length - 1] === todayKey || days[days.length - 1] === yesterday) {
    currentStreakEnd = days[days.length - 1];
    currentStreakStart = currentStreakEnd;
    currentStreak = 1;
    for (let i = days.length - 1; i > 0; i -= 1) {
      const previous = new Date(`${days[i - 1]}T00:00:00Z`);
      const current = new Date(`${days[i]}T00:00:00Z`);
      const diffDays = Math.round((current.getTime() - previous.getTime()) / 86_400_000);
      if (diffDays !== 1) break;
      currentStreak += 1;
      currentStreakStart = days[i - 1];
    }
  }

  return {
    currentStreak,
    longestStreak,
    currentStreakStart,
    currentStreakEnd,
    longestStreakStart,
    longestStreakEnd,
  };
}
