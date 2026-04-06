"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leetcodeStats = void 0;
exports.leetcodeStats = {
    name: "leetcode-stats",
    description: "Displays LeetCode stats for a user.",
    handler: async ({ query, theme }) => {
        const username = query.username || "leetcode";
        // Real LeetCode API would require their GraphQL endpoint or scraping; use mock for example
        // In a real-world app, you would implement the API call and cache!
        // Here, fake demo data:
        const stats = { totalSolved: 256, easy: 100, medium: 120, hard: 36 };
        return `
      <svg width="400" height="90" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="90" rx="10" fill="${theme === "dark" ? "#22272e" : "#fff"}" stroke="#ccc"/>
        <text x="200" y="30" text-anchor="middle" font-size="20" fill="#f89f1b" font-family="Segoe UI, Ubuntu, Sans-Serif">LeetCode Stats</text>
        <text x="200" y="55" text-anchor="middle" font-size="16" fill="${theme === "dark" ? "#ddd" : "#333"}">User: ${username}</text>
        <text x="200" y="75" text-anchor="middle" font-size="15" fill="${theme === "dark" ? "#33b" : "#292"}">${stats.totalSolved} solved | Easy: ${stats.easy} | Medium: ${stats.medium} | Hard: ${stats.hard}</text>
      </svg>
    `;
    }
};
