import fs from "fs";
import path from "path";

const ICONS_DIR = path.join(__dirname, "..", "assets", "skill-icons");
const SHORT_NAMES: Record<string, string> = {
  js: "javascript",
  ts: "typescript",
  py: "python",
  tailwind: "tailwindcss",
  vue: "vuejs",
  nuxt: "nuxtjs",
  go: "golang",
  cf: "cloudflare",
  wasm: "webassembly",
  postgres: "postgresql",
  k8s: "kubernetes",
  next: "nextjs",
  mongo: "mongodb",
  md: "markdown",
  ps: "photoshop",
  ai: "illustrator",
  pr: "premiere",
  ae: "aftereffects",
  scss: "sass",
  sc: "scala",
  net: "dotnet",
  gql: "graphql",
  express: "expressjs",
  pwsh: "powershell",
  ghactions: "githubactions",
  sklearn: "scikitlearn",
};

export interface SkillIconCatalog {
  icons: Record<string, string>;
  names: string[];
  themedNames: Set<string>;
}

let catalog: SkillIconCatalog | null = null;

export function getSkillIconCatalog(): SkillIconCatalog {
  if (catalog) return catalog;

  const icons: Record<string, string> = {};
  for (const file of fs.readdirSync(ICONS_DIR)) {
    if (!file.toLowerCase().endsWith(".svg")) continue;
    const name = file.replace(/\.svg$/i, "").toLowerCase();
    const raw = fs.readFileSync(path.join(ICONS_DIR, file), "utf8");
    icons[name] = raw.replace(/<svg[^>]*>/i, "").replace(/<\/svg>\s*$/i, "");
  }

  const names = [...new Set(Object.keys(icons).map((name) => name.split("-")[0]))].sort();
  const themedNames = new Set(
    Object.keys(icons)
      .filter((name) => name.endsWith("-light") || name.endsWith("-dark"))
      .map((name) => name.split("-")[0])
  );
  catalog = { icons, names, themedNames };
  return catalog;
}

export function normalizeIconNames(requested: string[], theme: "light" | "dark" = "dark"): string[] {
  const { names, themedNames, icons } = getSkillIconCatalog();
  return requested
    .map((raw) => {
      const name = raw.trim().toLowerCase();
      const canonical = names.includes(name) ? name : SHORT_NAMES[name];
      if (!canonical) return undefined;
      const themed = themedNames.has(canonical) ? `${canonical}-${theme}` : canonical;
      return icons[themed] ? themed : undefined;
    })
    .filter((name): name is string => Boolean(name));
}

export function renderSkillIcons(iconNames: string[], perLine: number): string {
  const { icons } = getSkillIconCatalog();
  const iconSvgList = iconNames.map((name) => icons[name]).filter(Boolean);
  const safePerLine = Math.max(1, Math.min(50, perLine || 15));
  const length = Math.min(safePerLine * 300, iconSvgList.length * 300) - 44;
  const height = Math.ceil(iconSvgList.length / safePerLine) * 300 - 44;
  const scale = 48 / (300 - 44);
  const scaledHeight = height * scale;
  const scaledWidth = length * scale;

  return `<svg width="${scaledWidth}" height="${scaledHeight}" viewBox="0 0 ${length} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Skill icons">
${iconSvgList
  .map(
    (icon, index) =>
      `<g transform="translate(${(index % safePerLine) * 300}, ${Math.floor(index / safePerLine) * 300})">${icon}</g>`
  )
  .join("")}
</svg>`;
}
