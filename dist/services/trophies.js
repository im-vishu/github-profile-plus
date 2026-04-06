"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserTrophies = getUserTrophies;
const axios_1 = __importDefault(require("axios"));
async function getUserTrophies(username) {
    const { data: user } = await axios_1.default.get(`https://api.github.com/users/${username}`);
    return [
        { title: "Public Repos", emoji: "📦", value: user.public_repos },
        { title: "Followers", emoji: "🌟", value: user.followers },
        { title: "Following", emoji: "👥", value: user.following },
        { title: "Gists", emoji: "📝", value: user.public_gists },
        { title: "Created", emoji: "🎉", value: user.created_at.slice(0, 10) }
    ];
}
