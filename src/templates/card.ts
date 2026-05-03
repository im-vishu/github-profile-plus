import ejs from "ejs";
import path from "path";
import type { GitHubProfileStats } from "../services/github";
import type { Theme } from "../theme";

const templatePath = path.join(__dirname, "card.ejs");

/**
 * Render the profile stats SVG card using EJS template.
 * NOTE: ejs.renderFile is async and returns a Promise when no callback is provided.
 */
export async function renderProfileCard(stats: GitHubProfileStats, theme: Theme): Promise<string> {
  const svg = await ejs.renderFile(templatePath, { stats, theme }, { rmWhitespace: true });
  // renderFile can technically return a non-string depending on options; normalize.
  return String(svg);
}