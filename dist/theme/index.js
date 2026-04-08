"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveTheme = resolveTheme;
exports.getCustomThemeFromQuery = getCustomThemeFromQuery;
const presets_1 = require("./presets");
// Utility to validate hex color (basic, can improve if desired)
function isHexColor(str) {
    return /^#[0-9A-Fa-f]{6}$/.test(str);
}
// Merge user colors/config into theme preset
function resolveTheme(themeName, custom = {}) {
    const base = presets_1.THEME_PRESETS[themeName] || presets_1.THEME_PRESETS.light;
    // Only merge in valid, present (non-undefined) strings
    const customSanitized = Object.entries(custom).reduce((acc, [k, v]) => {
        if (typeof v === "string" && v)
            acc[k] = v;
        return acc;
    }, {});
    return {
        ...base,
        ...customSanitized
    };
}
// Extract custom theme params from query/config
function getCustomThemeFromQuery(query) {
    // e.g. /api/*?background=%23abcdef&text=%23333&accent=%23d11...
    const keys = ["background", "text", "accent", "border", "font"]; // whitelist
    const out = {};
    for (const k of keys) {
        if (query[k])
            out[k] = query[k];
    }
    return out;
}
