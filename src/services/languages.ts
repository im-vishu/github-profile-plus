import axios from "axios";

export interface LanguageCount {
  name: string;
  count: number;
  color?: string;
}

export async function getUserTopLanguages(username: string, topN = 5): Promise<LanguageCount[]> {
  let page = 1, done = false;
  const langCounts: Record<string, number> = {};

  while (!done) {
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos`,
      { params: { per_page: 100, page: page++ } }
    );
    const repos = res.data;
    repos.forEach((repo: any) => {
      if (repo.language) {
        langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
      }
    });
    if (repos.length < 100) done = true;
  }

  // Convert to array and sort
  const sorted = Object.entries(langCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, topN);

  return sorted;
}