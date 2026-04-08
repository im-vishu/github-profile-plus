"use strict";
// src/theme/presets.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.THEME_PRESETS = void 0;
/**
 * Theme presets (add more as needed).
 * Every property should be a valid hex color string.
 */
exports.THEME_PRESETS = {
    light: {
        name: "light",
        background: "#ffffff",
        text: "#222222",
        accent: "#0366d6",
        border: "#E4E2E2",
    },
    dark: {
        name: "dark",
        background: "#22272e",
        text: "#ffffff",
        accent: "#58a6ff",
        border: "#444c56",
    },
    ocean: {
        name: "ocean",
        background: "#23395d",
        text: "#ffffff",
        accent: "#26c6da",
        border: "#124076",
    },
    solarized: {
        name: "solarized",
        background: "#fdf6e3",
        text: "#586e75",
        accent: "#b58900",
        border: "#eee8d5",
    },
    // You can add more themes here!
    // example:
    // dracula: {
    //   name: "dracula",
    //   background: "#282a36",
    //   text: "#f8f8f2",
    //   accent: "#bd93f9",
    //   border: "#44475a",
    // },
};
