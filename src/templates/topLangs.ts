import type { Theme } from "../theme";
import type { TopLanguage } from "../services/github";

/**
 * Renders a simple SVG card showing top languages as horizontal bars.
 * This is lightweight and safe for server-side rendering.
 */
export function renderTopLangsCard(langs: TopLanguage[], theme: Theme): string {
  const WIDTH = 520;
  const PADDING = 20;
  const LINE_HEIGHT = 28;
  const BAR_HEIGHT = 14;
  const titleY = 36;
  const startY = 60;
  const total = langs.reduce((s, l) => s + l.count, 0) || 1;

  const bars = langs
    .map((lang, i) => {
      const y = startY + i * LINE_HEIGHT;
      const percent = Math.round((lang.count / total) * 100);
      const barWidth = Math.max(0, Math.min(WIDTH - PADDING * 2 - 120, Math.round(((WIDTH - PADDING * 2 - 120) * percent) / 100)));

      return `
        <g>
          <text x="${PADDING}" y="${y}" font-size="13" fill="${theme.text}" font-family="Arial, sans-serif">${escapeHtml(lang.name)}</text>
          <rect x="${PADDING + 110}" y="${y - BAR_HEIGHT + 4}" width="${barWidth}" height="${BAR_HEIGHT}" rx="6" fill="${lang.color}" />
          <text x="${WIDTH - PADDING}" y="${y}" font-size="12" fill="${theme.text}" font-family="Arial, sans-serif" text-anchor="end">${percent}%</text>
        </g>
      `;
    })
    .join("");

  return `
  <svg width="${WIDTH}" height="${startY + langs.length * LINE_HEIGHT + PADDING}" viewBox="0 0 ${WIDTH} ${startY + langs.length * LINE_HEIGHT + PADDING}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Top languages">
    <style>
      .bg { shape-rendering: crispEdges; }
      text { dominant-baseline: middle; }
    </style>
    <rect class="bg" width="100%" height="100%" rx="12" fill="${theme.background}" stroke="${theme.border}" />
    <text x="${PADDING}" y="${titleY}" font-size="20" font-weight="600" fill="${theme.text}" font-family="Arial, sans-serif">Top Languages</text>
    ${bars || `<text x="${PADDING}" y="${startY}" font-size="14" fill="${theme.text}" font-family="Arial, sans-serif">No languages found</text>`}
    <text x="${PADDING}" y="${startY + langs.length * LINE_HEIGHT + 8}" font-size="11" fill="${theme.accent}" font-family="Arial, sans-serif">Analyzed from public repos</text>
  </svg>
  `;
}

/** Minimal HTML-escape helper for language names */
function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}