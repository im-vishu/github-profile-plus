// Theme preset definitions

export interface Theme {
  name: string;
  background: string;
  text: string;
  accent: string;
  border: string;
  [key: string]: string; // For extension (font, etc)
}

export const THEME_PRESETS: Record<string, Theme> = {
  light: {
    name: "light",
    background: "#fff",
    text: "#222",
    accent: "#0366d6",
    border: "#E4E2E2",
  },
  dark: {
    name: "dark",
    background: "#22272e",
    text: "#fff",
    accent: "#58a6ff",
    border: "#444c56",
  },
  // More presets can go here
};