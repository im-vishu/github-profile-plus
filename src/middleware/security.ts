// src/middleware/security.ts
import type { Express } from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import cors from "cors";

/**
 * Apply global security middlewares to the Express app.
 * Export the cardLimiter to reuse on specific routes.
 */

export function applySecurity(app: Express) {
  // If you're behind a proxy (Heroku, Cloudflare, etc.) enable trust proxy via env:
  if (process.env.TRUST_PROXY === "1") {
    app.set("trust proxy", 1);
  }

  // Secure headers
  app.use(helmet());

  // Prevent HTTP parameter pollution
  app.use(hpp());

  // Basic CORS - adjust origin as needed for production
  app.use(cors());
}

// Global rate limiter for overall requests (per IP)
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 400, // limit each IP to 400 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiter tuned for card endpoints
export const cardLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 120, // limit each IP to 120 requests per window
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});