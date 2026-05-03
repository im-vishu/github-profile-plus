import { THEME_PRESETS, Theme } from "./presets";

// Utility to validate hex color (basic, can improve if desired)
function isHexColor(str: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(str);
}

// Merge user colors/config into theme preset
export function resolveTheme(themeName: string, custom: Partial<Theme> = {}): Theme {
  const base = THEME_PRESETS[themeName] || THEME_PRESETS.light;
  // Only merge in valid, present (non-undefined) strings
  const customSanitized = Object.entries(custom).reduce((acc, [k, v]) => {
    if (typeof v === "string" && v) acc[k] = v;
    return acc;
  }, {} as Record<string, string>);
  return {
    ...base,
    ...customSanitized
  };
}

// Extract custom theme params from query/config
export function getCustomThemeFromQuery(query: Record<string, string | undefined>): Partial<Theme> {
  // e.g. /api/*?background=%23abcdef&text=%23333&accent=%23d11...
  const keys = ["background", "text", "accent", "border", "font"]; // whitelist
  const out: Partial<Theme> = {};
  for (const k of keys) {
    if (query[k]) out[k] = query[k]!;
  }
  if (query.bg_color) out.background = withHash(query.bg_color);
  if (query.text_color) out.text = withHash(query.text_color);
  if (query.title_color) out.accent = withHash(query.title_color);
  if (query.icon_color) out.accent = withHash(query.icon_color);
  if (query.border_color) out.border = withHash(query.border_color);
  if (query.hide_border === "true") out.border = "#0000";
  return out;
}

function withHash(value: string): string {
  if (/^[0-9a-f]{3,8}$/i.test(value)) return `#${value}`;
  return value;
}

// Re-export the Theme type for consumers
export type { Theme };
