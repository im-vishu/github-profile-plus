import { Request, Response } from "express";
import { getSkillIconCatalog, normalizeIconNames, renderSkillIcons } from "../services/skillIcons";

export function skillIconsRoute(req: Request, res: Response) {
  const iconParam = param(req.query.i) || param(req.query.icons);
  if (!iconParam) {
    return res.status(400).send("You didn't specify any icons!");
  }

  const theme = normalizeTheme(param(req.query.t) || param(req.query.theme));
  const perLine = normalizePerLine(param(req.query.perline));
  const requested = iconParam === "all" ? getSkillIconCatalog().names : iconParam.split(",");
  const iconNames = normalizeIconNames(requested, theme);

  if (!iconNames.length) {
    return res.status(400).send("You didn't format the icons param correctly!");
  }

  const svg = renderSkillIcons(iconNames, perLine);
  res.status(200);
  res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=86400");
  return res.send(svg);
}

export function skillIconNamesRoute(_req: Request, res: Response) {
  res.json(getSkillIconCatalog().names);
}

export function skillIconSvgsRoute(_req: Request, res: Response) {
  res.json(getSkillIconCatalog().icons);
}

function normalizeTheme(value?: string): "light" | "dark" {
  return value === "light" ? "light" : "dark";
}

function normalizePerLine(value?: string): number {
  const parsed = Number(value || 15);
  if (!Number.isFinite(parsed)) return 15;
  return Math.max(1, Math.min(50, Math.floor(parsed)));
}

function param(value: unknown): string | undefined {
  if (Array.isArray(value)) return param(value[0]);
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed || undefined;
}
