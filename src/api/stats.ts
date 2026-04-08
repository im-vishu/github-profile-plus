import { Request, Response } from "express";
import { getGitHubProfileStats } from "../services/github";
import { renderProfileCard } from "../templates/card";
import { resolveTheme, getCustomThemeFromQuery } from "../theme";

export default async function statsRoute(req: Request, res: Response) {
  const username = (req.query.username as string)?.trim();
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
    const svg = renderProfileCard(stats, theme);

    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=120");
    res.send(svg);
  } catch (err: any) {
    if (err.message === 'Not Found') {
      res.status(404).send(`GitHub user "${username}" not found.`);
    } else {
      res.status(500).send("Internal Server Error");
    }
  }
}