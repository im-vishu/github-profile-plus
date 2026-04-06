import { Request, Response } from "express";
import { getRandomQuote } from "../services/quotes";
import { renderQuotesCard } from "../templates/quotesCard";
import { getTheme } from "../theme";

export default function quotesRoute(_req: Request, res: Response) {
  const themeName = (_req.query.theme as string) || "light";
  const quote = getRandomQuote();
  const theme = getTheme(themeName.toLowerCase());
  const svg = renderQuotesCard(quote, theme);

  res.setHeader("Content-Type", "image/svg+xml");
  res.setHeader("Cache-Control", "public, max-age=600");
  res.send(svg);
}