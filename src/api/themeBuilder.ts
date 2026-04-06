import { Request, Response } from "express";
import { resolveTheme, getCustomThemeFromQuery } from "../theme";
import { renderThemeBuilderCard } from "../templates/themeBuilder";

export default function themeBuilderRoute(req: Request, res: Response) {
  const themeName = ((req.query.theme as string) || "light").toLowerCase();
  const customTheme = getCustomThemeFromQuery(req.query as any);
  const theme = resolveTheme(themeName, customTheme);

  const svg = renderThemeBuilderCard(theme);

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "no-cache");
  res.send(svg);
}