"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const security_1 = require("./middleware/security");
const validators_1 = require("./middleware/validators");
const stats_1 = __importDefault(require("./api/stats"));
const topLangs_1 = __importDefault(require("./api/topLangs"));
const trophies_1 = __importDefault(require("./api/trophies"));
const app = (0, express_1.default)();
// Apply parsers first
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Apply security & global rate limiting
(0, security_1.applySecurity)(app);
app.use(security_1.globalLimiter);
/* ======= Routes (validators + per-route limiter) ======= */
app.get("/api/top-langs", security_1.cardLimiter, [validators_1.usernameValidator, validators_1.themeValidator, (0, validators_1.hexColorValidator)("bg_color"), (0, validators_1.hexColorValidator)("text_color")], validators_1.validateRequest, topLangs_1.default);
app.get("/api/stats", security_1.cardLimiter, [validators_1.usernameValidator, validators_1.themeValidator, (0, validators_1.hexColorValidator)("bg_color"), (0, validators_1.hexColorValidator)("text_color")], validators_1.validateRequest, stats_1.default);
app.get("/api/trophies", security_1.cardLimiter, [validators_1.usernameValidator, validators_1.themeValidator], validators_1.validateRequest, trophies_1.default);
// Health and root
app.get("/api/health", (_req, res) => res.json({ status: "ok", uptime: process.uptime() }));
app.get("/", (_req, res) => res.send("Welcome to GitHub Profile Plus API!"));
// 404 handler
app.use((_req, res) => res.status(404).json({ error: "Endpoint not found" }));
// Central error handler
app.use((err, _req, res, _next) => {
    console.error("Unhandled error:", err);
    if (!res.headersSent)
        res.status(500).send("Internal Server Error");
});
// Start server
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
if (require.main === module) {
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}
exports.default = app;
