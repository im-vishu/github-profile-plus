import type { Theme } from "../theme";
import type { TopLanguage } from "../services/github";

/**
 * Renders a simple SVG card showing top languages as horizontal bars.
 * This is lightweight and safe for server-side rendering.
 */
export function renderTopLangsCard(langs: TopLanguage[], theme: Theme): string {
  const WIDTH = 360;
  const PADDING = 25;
  const LINE_HEIGHT = 26;
  const BAR_HEIGHT = 8;
  const titleY = 35;
  const startY = 68;
  const total = langs.reduce((s, l) => s + l.count, 0) || 1;

  const bars = langs
    .map((lang, i) => {
      const y = startY + i * LINE_HEIGHT;
      const percent = (lang.count / total) * 100;
      const barWidth = Math.max(
        0,
        Math.min(WIDTH - PADDING * 2, Math.round(((WIDTH - PADDING * 2) * percent) / 100))
      );

      return `
        <g class="lang" style="animation-delay:${(i + 2) * 150}ms">
          <circle cx="${PADDING}" cy="${y}" r="5" fill="${lang.color}" />
          <text x="${PADDING + 13}" y="${y + 4}" class="lang-name">${escapeHtml(lang.name)}</text>
          <text x="${WIDTH - PADDING}" y="${y + 4}" class="percent" text-anchor="end">${percent.toFixed(2)}%</text>
          <rect x="${PADDING}" y="${y + 12}" width="${WIDTH - PADDING * 2}" height="${BAR_HEIGHT}" rx="5" fill="${theme.border}" opacity=".35"/>
          <rect x="${PADDING}" y="${y + 12}" width="${barWidth}" height="${BAR_HEIGHT}" rx="5" fill="${lang.color}" />
        </g>
      `;
    })
    .join("");

  return `
  <svg width="${WIDTH}" height="${startY + langs.length * LINE_HEIGHT + PADDING + 8}" viewBox="0 0 ${WIDTH} ${startY + langs.length * LINE_HEIGHT + PADDING + 8}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Top languages">
    <style>
      .title { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${theme.accent}; }
      .lang-name { font: 600 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${theme.text}; }
      .percent { font: 400 11px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${theme.mutedText || theme.text}; opacity: .9; }
      .lang { opacity: 0; animation: fadeIn .35s ease forwards; }
      @keyframes fadeIn { to { opacity: 1; } }
    </style>
    <rect width="100%" height="100%" rx="4.5" fill="${theme.background}" stroke="${theme.border}" />
    <text x="${PADDING}" y="${titleY}" class="title">Most Used Languages</text>
    ${bars || `<text x="${PADDING}" y="${startY}" font-size="14" fill="${theme.text}" font-family="'Segoe UI', Ubuntu, Sans-Serif">No languages found</text>`}
  </svg>
  `;
}

/** Minimal HTML-escape helper for language names */
function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
