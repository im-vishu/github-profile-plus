export interface Theme {
  background: string;
  text: string;
  accent: string;
  border: string;
}

const THEMES: Record<string, Theme> = {
  light: {
    background: "#fff",
    text: "#222",
    accent: "#0366d6",
    border: "#E4E2E2",
  },
  dark: {
    background: "#22272e",
    text: "#fff",
    accent: "#58a6ff",
    border: "#444c56",
  },
};

export function getTheme(name: string): Theme {
  return THEMES[name] || THEMES.light;
}