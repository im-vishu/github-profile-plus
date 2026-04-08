"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = statsRoute;
const github_1 = require("../services/github");
const card_1 = require("../templates/card");
const theme_1 = require("../theme");
async function statsRoute(req, res) {
    const username = req.query.username?.trim();
    const themeName = (req.query.theme || "light").toLowerCase();
    const customTheme = (0, theme_1.getCustomThemeFromQuery)(req.query);
    const theme = (0, theme_1.resolveTheme)(themeName, customTheme);
    if (!username) {
        return res
            .status(400)
            .send("Missing required parameter: username (eg. /api/stats?username=octocat)");
    }
    try {
        const stats = await (0, github_1.getGitHubProfileStats)(username);
        const svg = (0, card_1.renderProfileCard)(stats, theme);
        res.setHeader("Content-Type", "image/svg+xml");
        res.setHeader("Cache-Control", "public, max-age=120");
        res.send(svg);
    }
    catch (err) {
        if (err.message === 'Not Found') {
            res.status(404).send(`GitHub user "${username}" not found.`);
        }
        else {
            res.status(500).send("Internal Server Error");
        }
    }
}
