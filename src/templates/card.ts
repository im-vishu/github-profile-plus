import ejs from "ejs";
import path from "path";
import type { GitHubProfileStats } from "../services/github";
import type { Theme } from "../theme";

const templatePath = path.join(__dirname, "card.ejs");

export function renderProfileCard(stats: GitHubProfileStats, theme: Theme): string {
  // Synchronous render, fast enough for API (alternatively, use ejs.renderFile for async)
  return ejs.renderFile(templatePath, { stats, theme }, { rmWhitespace: true }, (err, str) => {
    if (err || !str) throw err;
    return str;
  }) as unknown as string;
}