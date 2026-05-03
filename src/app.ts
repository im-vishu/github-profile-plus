import "dotenv/config";

import express, { type Request, type Response, type NextFunction } from "express";

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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

applySecurity(app);
app.use(globalLimiter);

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

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error("UNHANDLED ERROR:", err);
  res.status(500).send("Internal Server Error");
});

const port = Number(process.env.PORT || 3000);

if (require.main === module) {
  app.listen(port, "::", () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

export default app;
