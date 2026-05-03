import "dotenv/config";

import express from "express";
import type { Request, Response, NextFunction } from "express";

import { applySecurity, globalLimiter, cardLimiter } from "./middleware/security";
import {
  usernameValidator,
  themeValidator,
  hexColorValidator,
  validateRequest,
} from "./middleware/validators";

import statsRoute from "./api/stats";
import topLangsRoute from "./api/topLangs";
import trophiesRoute from "./api/trophies";

const app = express();

// Apply parsers first
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply security & global rate limiting
applySecurity(app);
app.use(globalLimiter);

// Health endpoint
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    node_env: process.env.NODE_ENV || null,
    has_github_token: Boolean(process.env.GITHUB_TOKEN),
  });
});

/* ======= Routes (validators + per-route limiter) ======= */

app.get(
  "/api/top-langs",
  cardLimiter,
  [usernameValidator, themeValidator, hexColorValidator("bg_color"), hexColorValidator("text_color")],
  validateRequest,
  topLangsRoute as express.RequestHandler
);

app.get(
  "/api/stats",
  cardLimiter,
  [usernameValidator, themeValidator, hexColorValidator("bg_color"), hexColorValidator("text_color")],
  validateRequest,
  statsRoute as express.RequestHandler
);

app.get(
  "/api/trophies",
  cardLimiter,
  [usernameValidator, themeValidator, hexColorValidator("bg_color"), hexColorValidator("text_color")],
  validateRequest,
  trophiesRoute as express.RequestHandler
);

// LAST: global error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("UNHANDLED ERROR:", err);
  res.status(500).send("Internal Server Error");
});

const port = Number(process.env.PORT || 3000);

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});