import express from "express";
import { applySecurity, globalLimiter, cardLimiter } from "./middleware/security";
import { usernameValidator, themeValidator, hexColorValidator, validateRequest } from "./middleware/validators";

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
  [usernameValidator, themeValidator],
  validateRequest,
  trophiesRoute as express.RequestHandler
);

// Health and root
app.get("/api/health", (_req, res) => res.json({ status: "ok", uptime: process.uptime() }));
app.get("/", (_req, res) => res.send("Welcome to GitHub Profile Plus API!"));

// 404 handler
app.use((_req, res) => res.status(404).json({ error: "Endpoint not found" }));

// Central error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Unhandled error:", err);
  if (!res.headersSent) res.status(500).send("Internal Server Error");
});

// Start server
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
if (require.main === module) {
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
}

export default app;