"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const github_1 = require("../services/github");
const topLangs_1 = require("../templates/topLangs");
const theme_1 = require("../theme");
async function topLangsRoute(req, res) {
    const username = req.query.username?.trim();
    const themeName = (req.query.theme || "light").toLowerCase();
    const customTheme = (0, theme_1.getCustomThemeFromQuery)(req.query);
    const theme = (0, theme_1.resolveTheme)(themeName, customTheme);
    if (!username) {
        return res
            .status(400)
            .send("Missing required parameter: username (e.g., /api/top-langs?username=octocat)");
    }
    try {
        const topLangs = await (0, github_1.getUserTopLanguages)(username);
        const svg = (0, topLangs_1.renderTopLangsCard)(topLangs, theme);
        res.setHeader("Content-Type", "image/svg+xml");
        res.setHeader("Cache-Control", "public, max-age=120");
        res.send(svg);
    }
    catch (err) {
        if (err?.message === "Not Found") {
            res.status(404).send(`GitHub user "${username}" not found.`);
        }
        else {
            // eslint-disable-next-line no-console
            console.error("Error in topLangsRoute:", err);
            res.status(500).send("Internal Server Error");
        }
    }
}
exports.default = topLangsRoute;
