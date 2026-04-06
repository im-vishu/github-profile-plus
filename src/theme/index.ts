import { THEME_PRESETS, Theme } from "./presets";

// Utility to validate hex color (basic, improve as needed)
function isHexColor(str: string): boolean {
  return /^#[0-9A-Fa-f]{6}$/.test(str);
}

// Merge user colors/config into theme preset
export function resolveTheme(themeName: string, custom: Partial<Theme> = {}): Theme {
  const base = THEME_PRESETS[themeName] || THEME_PRESETS.light;
  return {
    ...base,
    ...Object.fromEntries(Object.entries(custom)
      .filter(([k, v]) => typeof v === "string" && (isHexColor(v) || k === "name" || k === "font")))
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
  return out;
}