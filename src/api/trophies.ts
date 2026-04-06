import { Request, Response } from "express";
import { getUserTrophies } from "../services/trophies";
import { renderTrophiesCard } from "../templates/trophiesCard";
import { getTheme } from "../theme";

export default async function trophiesRoute(req: Request, res: Response) {
  const username = (req.query.username as string)?.trim();
  const themeName = ((req.query.theme as string) || "light").toLowerCase();

  if (!username) {
    return res.status(400).send("Missing required parameter: username (eg. /api/trophies?username=octocat)");
  }
  try {
    const trophies = await getUserTrophies(username);
    const theme = getTheme(themeName);
    const svg = renderTrophiesCard(username, trophies, theme);

    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=120");
    res.send(svg);
  } catch (err: any) {
    res.status(500).send("Internal Server Error");
  }
}