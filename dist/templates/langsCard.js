"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderLangsCard = renderLangsCard;
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const templatePath = path_1.default.join(__dirname, "langsCard.ejs");
function renderLangsCard(username, langs, theme) {
    return ejs_1.default.renderFile(templatePath, { username, langs, theme }, { rmWhitespace: true }, (err, str) => {
        if (err || !str)
            throw err;
        return str;
    });
}
