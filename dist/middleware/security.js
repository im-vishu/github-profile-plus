"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardLimiter = exports.globalLimiter = void 0;
exports.applySecurity = applySecurity;
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const hpp_1 = __importDefault(require("hpp"));
const cors_1 = __importDefault(require("cors"));
/**
 * Apply global security middlewares to the Express app.
 * Export the cardLimiter to reuse on specific routes.
 */
function applySecurity(app) {
    // If you're behind a proxy (Heroku, Cloudflare, etc.) enable trust proxy via env:
    if (process.env.TRUST_PROXY === "1") {
        app.set("trust proxy", 1);
    }
    // Secure headers
    app.use((0, helmet_1.default)());
    // Prevent HTTP parameter pollution
    app.use((0, hpp_1.default)());
    // Basic CORS - adjust origin as needed for production
    app.use((0, cors_1.default)());
}
// Global rate limiter for overall requests (per IP)
exports.globalLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 400, // limit each IP to 400 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
});
// Rate limiter tuned for card endpoints
exports.cardLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 120, // limit each IP to 120 requests per window
    message: "Too many requests from this IP, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
});
