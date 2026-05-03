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
  default: {
    name: "default",
    background: "#FFFEFE",
    text: "#151515",
    accent: "#FB8C00",
    border: "#E4E2E2",
    mutedText: "#464646",
  },
  transparent: {
    name: "transparent",
    background: "#0000",
    text: "#151515",
    accent: "#006AFF",
    border: "#0000",
    mutedText: "#417E87",
  },
  radical: {
    name: "radical",
    background: "#141321",
    text: "#F8D847",
    accent: "#FE428E",
    border: "#E4E2E2",
    mutedText: "#A9FEF7",
  },
  tokyonight: {
    name: "tokyonight",
    background: "#1A1B27",
    text: "#BF91F3",
    accent: "#70A5FD",
    border: "#E4E2E2",
    mutedText: "#38BDAE",
  },
  gruvbox: {
    name: "gruvbox",
    background: "#282828",
    text: "#FE8019",
    accent: "#FABD2F",
    border: "#E4E2E2",
    mutedText: "#8EC07C",
  },
  onedark: {
    name: "onedark",
    background: "#282C34",
    text: "#8EB573",
    accent: "#E4BF7A",
    border: "#E4E2E2",
    mutedText: "#DF6D74",
  },
  dracula: {
    name: "dracula",
    background: "#282A36",
    text: "#F8F8F2",
    accent: "#BD93F9",
    border: "#44475A",
    mutedText: "#FF79C6",
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
