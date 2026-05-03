import { Request, Response } from "express";
import { getUserContributionStreak } from "../services/github";
import { renderStreakCard } from "../templates/streakCard";
import { getCustomThemeFromQuery, resolveTheme } from "../theme";

export default async function streakRoute(req: Request, res: Response) {
  const username = ((req.query.username as string) || (req.query.user as string) || "").trim();
  const themeName = ((req.query.theme as string) || "light").toLowerCase();
  const theme = resolveTheme(themeName, getCustomThemeFromQuery(req.query as any));

  if (!username) {
    return res.status(400).send("Missing required parameter: username (e.g., /api/streak?username=octocat)");
  }

  try {
    const stats = await getUserContributionStreak(username);
    const svg = renderStreakCard(stats, theme);
    res.status(200);
    res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=120");
    return res.send(svg);
  } catch (err: any) {
    const msg = typeof err?.message === "string" ? err.message : "";
    if (msg === "Not Found") return res.status(404).send(`GitHub user "${username}" not found.`);
    if (msg.toLowerCase().includes("rate limit")) return res.status(429).send(msg);
    console.error("[/api/streak] failed:", err);
    return res.status(500).send("Internal Server Error");
  }
}
