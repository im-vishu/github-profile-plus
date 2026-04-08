"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = themeBuilderRoute;
const theme_1 = require("../theme");
const themeBuilder_1 = require("../templates/themeBuilder");
function themeBuilderRoute(req, res) {
    const themeName = (req.query.theme || "light").toLowerCase();
    const customTheme = (0, theme_1.getCustomThemeFromQuery)(req.query);
    const theme = (0, theme_1.resolveTheme)(themeName, customTheme);
    const svg = (0, themeBuilder_1.renderThemeBuilderCard)(theme);
    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "no-cache");
    res.send(svg);
}
