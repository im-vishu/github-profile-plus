"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = trophiesRoute;
const trophies_1 = require("../services/trophies");
const trophiesCard_1 = require("../templates/trophiesCard");
const theme_1 = require("../theme");
async function trophiesRoute(req, res) {
    const username = req.query.username?.trim();
    const themeName = (req.query.theme || "light").toLowerCase();
    if (!username) {
        return res.status(400).send("Missing required parameter: username (eg. /api/trophies?username=octocat)");
    }
    try {
        const trophies = await (0, trophies_1.getUserTrophies)(username);
        const theme = (0, theme_1.getTheme)(themeName);
        const svg = (0, trophiesCard_1.renderTrophiesCard)(username, trophies, theme);
        res.setHeader("Content-Type", "image/svg+xml");
        res.setHeader("Cache-Control", "public, max-age=120");
        res.send(svg);
    }
    catch (err) {
        res.status(500).send("Internal Server Error");
    }
}
