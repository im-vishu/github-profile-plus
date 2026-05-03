import path from "node:path";

import express, { type Request, type Response, type NextFunction } from "express";

// Load .env only in local/dev (Render sets real env vars)
if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require("dotenv").config();
}

import { applySecurity, globalLimiter, cardLimiter } from "./middleware/security";
import {
  usernameValidator,
  themeValidator,
  hexColorValidator,
  validateRequest
} from "./middleware/validators";

import statsRoute from "./api/stats";
import topLangsRoute from "./api/topLangs";
import trophiesRoute from "./api/trophies";
import streakRoute from "./api/streak";
import badgeRoute from "./api/badge";
import { skillIconNamesRoute, skillIconsRoute, skillIconSvgsRoute } from "./api/skillIcons";

const app = express();

// --- Express basics ---
app.disable("x-powered-by");
app.set("trust proxy", 1); // Render is behind a proxy

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Ensure EJS template lookup works in production ---
// When running compiled code: dist/app.js => templates are in dist/templates
const templatesDir = path.join(__dirname, "templates");
app.set("views", templatesDir);
app.set("view engine", "ejs");

applySecurity(app);
app.use(globalLimiter);

// Root page (so / doesn't show "Cannot GET /")
app.get("/", (_req: Request, res: Response) => {
  res
    .status(200)
    .type("html")
    .send(`
      <h2>github-profile-plus is running ✅</h2>
      <ul>
        <li><a href="/api/health">/api/health</a></li>
        <li><a href="/api/stats?username=im-vishu">/api/stats?username=im-vishu</a></li>
        <li><a href="/api/top-langs?username=im-vishu">/api/top-langs?username=im-vishu</a></li>
        <li><a href="/api/trophies?username=im-vishu">/api/trophies?username=im-vishu</a></li>
        <li><a href="/api/streak?username=im-vishu">/api/streak?username=im-vishu</a></li>
      </ul>
    `);
});

app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    node_env: process.env.NODE_ENV || null,
    has_github_token: Boolean(process.env.GITHUB_TOKEN)
  });
});

const commonValidators = [
  usernameValidator,
  themeValidator,
  hexColorValidator("bg_color"),
  hexColorValidator("text_color")
];

app.get(
  "/api/stats",
  cardLimiter,
  commonValidators,
  validateRequest,
  statsRoute as unknown as express.RequestHandler
);

app.get(
  "/api/top-langs",
  cardLimiter,
  commonValidators,
  validateRequest,
  topLangsRoute as unknown as express.RequestHandler
);

app.get(
  "/api/trophies",
  cardLimiter,
  commonValidators,
  validateRequest,
  trophiesRoute as unknown as express.RequestHandler
);

app.get(
  "/api/streak",
  cardLimiter,
  themeValidator,
  hexColorValidator("bg_color"),
  hexColorValidator("text_color"),
  validateRequest,
  streakRoute as unknown as express.RequestHandler
);

app.get("/api/badge", cardLimiter, badgeRoute as unknown as express.RequestHandler);
app.get("/badge", cardLimiter, badgeRoute as unknown as express.RequestHandler);

app.get("/icons", cardLimiter, skillIconsRoute as unknown as express.RequestHandler);
app.get("/api/skill-icons", cardLimiter, skillIconsRoute as unknown as express.RequestHandler);
app.get("/api/icons", cardLimiter, skillIconNamesRoute as unknown as express.RequestHandler);
app.get("/api/svgs", cardLimiter, skillIconSvgsRoute as unknown as express.RequestHandler);

// Central error handler (keep message minimal in prod)
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("UNHANDLED ERROR:", err);
  res.status(500).type("text").send("Internal Server Error");
});

const port = Number(process.env.PORT || 3000);

// Bind for Render/container environments
if (require.main === module) {
  const server = app.listen(port, "0.0.0.0", () => {
    console.log(`Server listening on port ${port}`);
  });

  // Graceful shutdown (Render sends SIGTERM during deploys)
  const shutdown = (signal: string) => {
    console.log(`Received ${signal}. Closing server...`);
    server.close(() => {
      console.log("Server closed.");
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

export default app;