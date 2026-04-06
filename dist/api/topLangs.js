"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = topLangsRoute;
const languages_1 = require("../services/languages");
const langsCard_1 = require("../templates/langsCard");
const theme_1 = require("../theme");
async function topLangsRoute(req, res) {
    const username = req.query.username?.trim();
    const themeName = (req.query.theme || "light").toLowerCase();
    if (!username) {
        return res.status(400).send("Missing required parameter: username (eg. /api/top-langs?username=octocat)");
    }
    try {
        const langs = await (0, languages_1.getUserTopLanguages)(username, 5); // Top 5 languages
        const theme = (0, theme_1.getTheme)(themeName);
        const svg = (0, langsCard_1.renderLangsCard)(username, langs, theme);
        res.setHeader("Content-Type", "image/svg+xml");
        res.setHeader("Cache-Control", "public, max-age=120");
        res.send(svg);
    }
    catch (err) {
        res.status(500).send("Internal Server Error");
    }
}
