import { Request, Response } from "express";
import { renderBadge, type BadgeStyle } from "../templates/badge";

const COLOR_ALIASES: Record<string, string> = {
  brightgreen: "#4c1",
  green: "#97ca00",
  yellowgreen: "#a4a61d",
  yellow: "#dfb317",
  orange: "#fe7d37",
  red: "#e05d44",
  blue: "#007ec6",
  grey: "#555",
  gray: "#555",
  lightgrey: "#9f9f9f",
  lightgray: "#9f9f9f",
};

export default function badgeRoute(req: Request, res: Response) {
  const label = textParam(req.query.label) || "build";
  const message = textParam(req.query.message) || textParam(req.query.status) || "passing";
  const style = normalizeStyle(textParam(req.query.style));
  const logo = textParam(req.query.logo);
  const labelColor = normalizeColor(textParam(req.query.labelColor) || textParam(req.query.label_color), "#555");
  const color = normalizeColor(textParam(req.query.color), "#4c1");

  const svg = renderBadge({ label, message, labelColor, color, style, logo });
  res.status(200);
  res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=86400");
  res.send(svg);
}

function normalizeStyle(style?: string): BadgeStyle {
  if (style === "flat-square" || style === "for-the-badge") return style;
  return "flat";
}

function normalizeColor(value: string | undefined, fallback: string): string {
  if (!value) return fallback;
  const lower = value.toLowerCase();
  if (COLOR_ALIASES[lower]) return COLOR_ALIASES[lower];
  if (/^#?[0-9a-f]{3,8}$/i.test(value)) return value.startsWith("#") ? value : `#${value}`;
  return fallback;
}

function textParam(value: unknown): string | undefined {
  if (Array.isArray(value)) return textParam(value[0]);
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, 80) : undefined;
}
