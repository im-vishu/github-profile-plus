import ejs from "ejs";
import path from "path";
import type { Trophy } from "../services/trophies";
import type { Theme } from "../theme";

const templatePath = path.join(__dirname, "trophies.ejs");

export async function renderTrophiesCard(
  username: string,
  trophies: Trophy[],
  theme: Theme
): Promise<string> {
  const svg = await ejs.renderFile(
    templatePath,
    { username, trophies, theme },
    { rmWhitespace: true }
  );
  return String(svg);
}