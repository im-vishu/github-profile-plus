import { Request, Response } from "express";
import { getUserTopLanguages } from "../services/languages";
import { renderLangsCard } from "../templates/langsCard";
import { getTheme } from "../theme";

export default async function topLangsRoute(req: Request, res: Response) {
  const username = (req.query.username as string)?.trim();
  const themeName = ((req.query.theme as string) || "light").toLowerCase();

  if (!username) {
    return res.status(400).send("Missing required parameter: username (eg. /api/top-langs?username=octocat)");
  }
  try {
    const langs = await getUserTopLanguages(username, 5); // Top 5 languages
    const theme = getTheme(themeName);
    const svg = renderLangsCard(username, langs, theme);

    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=120");
    res.send(svg);
  } catch (err: any) {
    res.status(500).send("Internal Server Error");
  }
}