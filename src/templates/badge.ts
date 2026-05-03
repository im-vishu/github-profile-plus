export type BadgeStyle = "flat" | "flat-square" | "for-the-badge";

export interface BadgeOptions {
  label: string;
  message: string;
  labelColor: string;
  color: string;
  style: BadgeStyle;
  logo?: string;
}

export function renderBadge(options: BadgeOptions): string {
  const fontSize = options.style === "for-the-badge" ? 11 : 10;
  const height = options.style === "for-the-badge" ? 28 : 20;
  const radius = options.style === "flat-square" || options.style === "for-the-badge" ? 0 : 3;
  const labelWidth = measure(options.label, fontSize) + (options.logo ? 26 : 12);
  const messageWidth = measure(options.message, fontSize) + 12;
  const width = labelWidth + messageWidth;
  const logo = options.logo
    ? `<text x="7" y="${height / 2 + 4}" font-size="${fontSize}" fill="#fff">${escapeHtml(options.logo)}</text>`
    : "";
  const labelX = options.logo ? 24 : labelWidth / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" role="img" aria-label="${escapeHtml(
    `${options.label}: ${options.message}`
  )}">
  <title>${escapeHtml(`${options.label}: ${options.message}`)}</title>
  <linearGradient id="s" x2="0" y2="100%">
    <stop offset="0" stop-color="#fff" stop-opacity=".7"/>
    <stop offset=".1" stop-color="#aaa" stop-opacity=".1"/>
    <stop offset=".9" stop-color="#000" stop-opacity=".3"/>
    <stop offset="1" stop-color="#000" stop-opacity=".5"/>
  </linearGradient>
  <clipPath id="r"><rect width="${width}" height="${height}" rx="${radius}" fill="#fff"/></clipPath>
  <g clip-path="url(#r)">
    <rect width="${labelWidth}" height="${height}" fill="${options.labelColor}"/>
    <rect x="${labelWidth}" width="${messageWidth}" height="${height}" fill="${options.color}"/>
    <rect width="${width}" height="${height}" fill="url(#s)"/>
  </g>
  ${logo}
  <g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="${fontSize}">
    <text aria-hidden="true" x="${labelX}" y="${height / 2 + 4}" fill="#010101" fill-opacity=".3">${escapeHtml(options.label)}</text>
    <text x="${labelX}" y="${height / 2 + 3}">${escapeHtml(options.label)}</text>
    <text aria-hidden="true" x="${labelWidth + messageWidth / 2}" y="${height / 2 + 4}" fill="#010101" fill-opacity=".3">${escapeHtml(options.message)}</text>
    <text x="${labelWidth + messageWidth / 2}" y="${height / 2 + 3}">${escapeHtml(options.message)}</text>
  </g>
</svg>`;
}

function measure(value: string, fontSize: number): number {
  return Math.ceil(value.length * fontSize * 0.62);
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
