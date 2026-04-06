import ejs from "ejs";
import path from "path";
import type { Trophy } from "../services/trophies";
import type { Theme } from "../theme";

const templatePath = path.join(__dirname, "trophiesCard.ejs");

export function renderTrophiesCard(username: string, trophies: Trophy[], theme: Theme): string {
  return ejs.renderFile(templatePath, { username, trophies, theme }, { rmWhitespace: true }, (err, str) => {
    if (err || !str) throw err;
    return str;
  }) as unknown as string;
}