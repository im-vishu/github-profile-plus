"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stats_1 = __importDefault(require("./api/stats"));
const topLangs_1 = __importDefault(require("./api/topLangs"));
const trophies_1 = __importDefault(require("./api/trophies"));
const quotes_1 = __importDefault(require("./api/quotes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.get("/api/stats", stats_1.default);
app.get("/api/top-langs", topLangs_1.default);
app.get("/api/trophies", trophies_1.default);
app.get("/api/quotes", quotes_1.default);
app.get("/", (_req, res) => {
    res.send("<h1>GitHub Profile Plus API</h1>" +
        "<ul>" +
        "<li>/api/stats?username=...</li>" +
        "<li>/api/top-langs?username=...</li>" +
        "<li>/api/trophies?username=...</li>" +
        "<li>/api/quotes</li>" +
        "</ul>");
});
app.listen(PORT, () => {
    console.log(`GitHub Profile Plus running: http://localhost:${PORT}`);
});
