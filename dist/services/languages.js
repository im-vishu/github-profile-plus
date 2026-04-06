"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserTopLanguages = getUserTopLanguages;
const axios_1 = __importDefault(require("axios"));
async function getUserTopLanguages(username, topN = 5) {
    let page = 1, done = false;
    const langCounts = {};
    while (!done) {
        const res = await axios_1.default.get(`https://api.github.com/users/${username}/repos`, { params: { per_page: 100, page: page++ } });
        const repos = res.data;
        repos.forEach((repo) => {
            if (repo.language) {
                langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
            }
        });
        if (repos.length < 100)
            done = true;
    }
    // Convert to array and sort
    const sorted = Object.entries(langCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, topN);
    return sorted;
}
