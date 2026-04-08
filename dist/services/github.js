"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGitHubProfileStats = getGitHubProfileStats;
exports.getUserTopLanguages = getUserTopLanguages;
const axios_1 = __importDefault(require("axios"));
const CACHE_TTL_MS = 120000; // 2 minutes
const cache = new Map();
function getCached(key) {
    const entry = cache.get(key);
    if (!entry)
        return null;
    if (entry.expires < Date.now()) {
        cache.delete(key);
        return null;
    }
    return entry.data;
}
function setCached(key, data, ttl = CACHE_TTL_MS) {
    cache.set(key, { expires: Date.now() + ttl, data });
}
/** Axios instance configured for GitHub API; uses GITHUB_TOKEN if provided */
const githubAxios = axios_1.default.create({
    baseURL: "https://api.github.com",
    headers: {
        Accept: "application/vnd.github.v3+json",
        ...(process.env.GITHUB_TOKEN ? { Authorization: `token ${process.env.GITHUB_TOKEN}` } : {}),
    },
    timeout: 10000,
});
/** Normalize GitHub API errors into simple Error messages */
function handleGitHubError(err) {
    if (err?.response) {
        const status = err.response.status;
        if (status === 404)
            throw new Error("Not Found");
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
async function getGitHubProfileStats(username) {
    const key = `profile:${username.toLowerCase()}`;
    const cached = getCached(key);
    if (cached)
        return cached;
    try {
        const res = await githubAxios.get(`/users/${encodeURIComponent(username)}`);
        if (!res.data || !res.data.login)
            throw new Error("Not Found");
        const result = {
            name: res.data.name || res.data.login,
            avatar_url: res.data.avatar_url,
            public_repos: res.data.public_repos,
            followers: res.data.followers,
            following: res.data.following,
            bio: res.data.bio || "",
        };
        setCached(key, result);
        return result;
    }
    catch (err) {
        handleGitHubError(err);
    }
}
/**
 * Get a user's most-used languages (by number of repos using each language)
 * Uses simple caching and returns TopLanguage[] suitable for templates.
 */
async function getUserTopLanguages(username) {
    const key = `toplangs:${username.toLowerCase()}`;
    const cached = getCached(key);
    if (cached)
        return cached;
    try {
        // fetch up to 100 repos owned by the user
        const res = await githubAxios.get(`/users/${encodeURIComponent(username)}/repos`, {
            params: { per_page: 100, type: "owner", sort: "updated" },
        });
        const repos = res.data;
        if (!repos || !Array.isArray(repos))
            throw new Error("Not Found");
        const counts = {};
        for (const repo of repos) {
            const lang = repo.language;
            if (lang)
                counts[lang] = (counts[lang] || 0) + 1;
        }
        // Demo color map (expand as needed)
        const COLOR = {
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
        const entries = Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([name, count]) => ({
            name,
            count,
            color: COLOR[name] || "#888",
        }));
        if (!entries.length)
            throw new Error("Not Found");
        setCached(key, entries);
        return entries;
    }
    catch (err) {
        handleGitHubError(err);
    }
}
