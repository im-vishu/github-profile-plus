import ejs from "ejs";
import path from "path";
import type { Theme } from "../theme";

const templatePath = path.join(__dirname, "quotesCard.ejs");

export function renderQuotesCard(quote: { quote: string; author: string }, theme: Theme): string {
  return ejs.renderFile(templatePath, { quote, theme }, { rmWhitespace: true }, (err, str) => {
    if (err || !str) throw err;
    return str;
  }) as unknown as string;
}