import ejs from "ejs";
import path from "path";
import type { LanguageCount } from "../services/languages";
import type { Theme } from "../theme";

const templatePath = path.join(__dirname, "langsCard.ejs");

export function renderLangsCard(username: string, langs: LanguageCount[], theme: Theme): string {
  return ejs.renderFile(templatePath, { username, langs, theme }, { rmWhitespace: true }, (err, str) => {
    if (err || !str) throw err;
    return str;
  }) as unknown as string;
}