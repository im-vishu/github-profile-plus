"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderTrophiesCard = renderTrophiesCard;
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const templatePath = path_1.default.join(__dirname, "trophiesCard.ejs");
function renderTrophiesCard(username, trophies, theme) {
    return ejs_1.default.renderFile(templatePath, { username, trophies, theme }, { rmWhitespace: true }, (err, str) => {
        if (err || !str)
            throw err;
        return str;
    });
}
