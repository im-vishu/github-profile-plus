import type { Request, Response } from "express";
import { getUserTrophies } from "../services/trophies";
import { renderTrophiesCard } from "../templates/trophiesCard";
import { resolveTheme, getCustomThemeFromQuery } from "../theme";

export default async function trophiesRoute(req: Request, res: Response) {
  const username = (req.query.username as string | undefined)?.trim();
  const themeName = ((req.query.theme as string) || "light").toLowerCase();
  const customTheme = getCustomThemeFromQuery(req.query as any);
  const theme = resolveTheme(themeName, customTheme);

  if (!username) {
    return res
      .status(400)
      .send("Missing required parameter: username (eg. /api/trophies?username=octocat)");
  }

  try {
    const trophies = await getUserTrophies(username);
    const svg = await renderTrophiesCard(username, trophies, theme);

    res.status(200);
    res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=120");
    return res.send(svg);
  } catch (err: any) {
    console.error("[/api/trophies] failed:", err);
    return res.status(500).send("Internal Server Error");
  }
}