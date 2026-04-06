import ejs from "ejs";
import path from "path";
import type { Theme } from "../theme";

const templatePath = path.join(__dirname, "themeBuilder.ejs");
export function renderThemeBuilderCard(theme: Theme): string {
  return ejs.renderFile(templatePath, { theme }, { rmWhitespace: true }, (err, str) => {
    if (err || !str) throw err;
    return str;
  }) as unknown as string;
}