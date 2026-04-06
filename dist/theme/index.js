"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTheme = getTheme;
const THEMES = {
    light: {
        background: "#fff",
        text: "#222",
        accent: "#0366d6",
        border: "#E4E2E2",
    },
    dark: {
        background: "#22272e",
        text: "#fff",
        accent: "#58a6ff",
        border: "#444c56",
    },
};
function getTheme(name) {
    return THEMES[name] || THEMES.light;
}
