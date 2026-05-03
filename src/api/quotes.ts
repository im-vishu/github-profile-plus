import type { Request, Response } from "express";
import { resolveTheme, getCustomThemeFromQuery } from "../theme";

const QUOTES = [
  "Stay consistent. Results will follow.",
  "Build. Break. Learn. Repeat.",
  "Small steps every day.",
  "Code is poetry when it’s readable.",
  "Progress > perfection."
];

export default async function quotesRoute(req: Request, res: Response) {
  const themeName = ((req.query.theme as string) || "light").toLowerCase();
  const customTheme = getCustomThemeFromQuery(req.query as any);
  const theme = resolveTheme(themeName, customTheme);

  const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="520" height="120" viewBox="0 0 520 120" role="img" aria-label="Quote">
  <style>
    .bg { fill: ${theme.background}; }
    .border { fill: none; stroke: ${theme.border}; stroke-width: 2; }
    .text { fill: ${theme.text}; font: 600 16px 'Segoe UI', Ubuntu, Sans-Serif; }
    .muted { fill: ${theme.accent}; font: 700 12px 'Segoe UI', Ubuntu, Sans-Serif; }
  </style>
  <rect x="0" y="0" width="520" height="120" rx="12" class="bg"/>
  <rect x="1" y="1" width="518" height="118" rx="11" class="border"/>
  <text x="20" y="56" class="text">${escapeXml(quote)}</text>
  <text x="20" y="92" class="muted">github-profile-plus</text>
</svg>`;

  res.status(200);
  res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=120");
  return res.send(svg);
}

function escapeXml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}