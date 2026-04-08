// src/theme/presets.ts

/**
 * Theme interface for all SVG widgets and cards.
 * You can extend this in future (e.g. add font, gradients, etc).
 */
export interface Theme {
  /** Human-readable theme name */
  name: string;
  /** Card background color (hex) */
  background: string;
  /** Primary text color */
  text: string;
  /** Accent color for highlights and icons */
  accent: string;
  /** Border color */
  border: string;
  /** Extendable for more properties (type safety available everywhere) */
  [key: string]: string;
}

/**
 * Theme presets (add more as needed).
 * Every property should be a valid hex color string.
 */
export const THEME_PRESETS: Record<string, Theme> = {
  light: {
    name: "light",
    background: "#ffffff",
    text: "#222222",
    accent: "#0366d6",
    border: "#E4E2E2",
  },
  dark: {
    name: "dark",
    background: "#22272e",
    text: "#ffffff",
    accent: "#58a6ff",
    border: "#444c56",
  },
  ocean: {
    name: "ocean",
    background: "#23395d",
    text: "#ffffff",
    accent: "#26c6da",
    border: "#124076",
  },
  solarized: {
    name: "solarized",
    background: "#fdf6e3",
    text: "#586e75",
    accent: "#b58900",
    border: "#eee8d5",
  },
  // You can add more themes here!
  // example:
  // dracula: {
  //   name: "dracula",
  //   background: "#282a36",
  //   text: "#f8f8f2",
  //   accent: "#bd93f9",
  //   border: "#44475a",
  // },
};