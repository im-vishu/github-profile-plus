import { Request, Response } from "express";
import { getUserTopLanguages } from "../services/github";
import { renderTopLangsCard } from "../templates/topLangs";
import { resolveTheme, getCustomThemeFromQuery } from "../theme";

async function topLangsRoute(req: Request, res: Response) {
  const username = (req.query.username as string)?.trim();
  const themeName = ((req.query.theme as string) || "light").toLowerCase();
  const customTheme = getCustomThemeFromQuery(req.query as any);
  const theme = resolveTheme(themeName, customTheme);

  if (!username) {
    return res
      .status(400)
      .send("Missing required parameter: username (e.g., /api/top-langs?username=octocat)");
  }

  try {
    const topLangs = await getUserTopLanguages(username);
    const svg = renderTopLangsCard(topLangs, theme);

    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=120");
    res.send(svg);
  } catch (err: any) {
    if (err?.message === "Not Found") {
      res.status(404).send(`GitHub user "${username}" not found.`);
    } else {
      // eslint-disable-next-line no-console
      console.error("Error in topLangsRoute:", err);
      res.status(500).send("Internal Server Error");
    }
  }
}

export default topLangsRoute;