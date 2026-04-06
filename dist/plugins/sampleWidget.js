"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleWidget = void 0;
exports.sampleWidget = {
    name: "sample-widget",
    description: "A sample hello-world SVG widget.",
    handler: ({ query, theme }) => {
        // Just returns an SVG with theme as color, plus optional message arg
        const message = query.message || "Hello, Open Source World!";
        const color = theme === "dark" ? "#f8f8f8" : "#222";
        return `
      <svg width="400" height="60" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="60" rx="10" fill="${theme === "dark" ? "#22272e" : "#fff"}" stroke="#999"/>
        <text x="200" y="35" text-anchor="middle" font-size="24" fill="${color}" font-family="Segoe UI, Ubuntu, Sans-Serif">${message}</text>
      </svg>
    `;
    },
};
