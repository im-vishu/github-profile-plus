"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderProfileCard = renderProfileCard;
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const templatePath = path_1.default.join(__dirname, "card.ejs");
function renderProfileCard(stats, theme) {
    // Synchronous render, fast enough for API (alternatively, use ejs.renderFile for async)
    return ejs_1.default.renderFile(templatePath, { stats, theme }, { rmWhitespace: true }, (err, str) => {
        if (err || !str)
            throw err;
        return str;
    });
}
