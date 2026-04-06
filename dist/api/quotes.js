"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = quotesRoute;
const quotes_1 = require("../services/quotes");
const quotesCard_1 = require("../templates/quotesCard");
const theme_1 = require("../theme");
function quotesRoute(_req, res) {
    const themeName = _req.query.theme || "light";
    const quote = (0, quotes_1.getRandomQuote)();
    const theme = (0, theme_1.getTheme)(themeName.toLowerCase());
    const svg = (0, quotesCard_1.renderQuotesCard)(quote, theme);
    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=600");
    res.send(svg);
}
