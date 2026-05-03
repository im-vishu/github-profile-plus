import { Request, Response } from "express";
import { getGitHubProfileStats } from "../services/github";
import { renderProfileCard } from "../templates/card";
import { resolveTheme, getCustomThemeFromQuery } from "../theme";

export default async function statsRoute(req: Request, res: Response) {
  const username = (req.query.username as string | undefined)?.trim();
  const themeName = ((req.query.theme as string) || "light").toLowerCase();
  const customTheme = getCustomThemeFromQuery(req.query as any);
  const theme = resolveTheme(themeName, customTheme);

  if (!username) {
    return res
      .status(400)
      .send("Missing required parameter: username (eg. /api/stats?username=octocat)");
  }

  try {
    const stats = await getGitHubProfileStats(username);
    const svg = await renderProfileCard(stats, theme);

    res.status(200);
    res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=120");
    return res.send(svg);
  } catch (err: any) {
    // Print the real reason to your terminal (EJS ENOENT, template parse error, GitHub rate limit, etc.)
    console.error("[/api/stats] failed:", err);

    const msg = typeof err?.message === "string" ? err.message : "";

    if (msg === "Not Found") {
      return res.status(404).send(`GitHub user "${username}" not found.`);
    }

    // If your github.ts throws a rate-limit message, surface it
    if (msg.toLowerCase().includes("rate limit")) {
      return res.status(429).send(msg);
    }

    return res.status(500).send("Internal Server Error");
  }
}