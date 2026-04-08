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
  return out;
}

// Re-export the Theme type for consumers
export type { Theme };