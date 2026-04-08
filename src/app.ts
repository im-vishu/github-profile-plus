import express from "express";
import cors from "cors";

// Import route handlers
import statsRoute from "./api/stats";
import topLangsRoute from "./api/topLangs";
import trophiesRoute from "./api/trophies";
// Import other endpoints as needed

const app = express();

app.use(cors());
app.use(express.json());

/** API endpoints */
app.get("/api/stats", statsRoute);
app.get("/api/top-langs", topLangsRoute);
app.get("/api/trophies", trophiesRoute);
// Add more routes as needed...

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// Root welcome route
app.get("/", (_req, res) => {
  res.send("Welcome to GitHub Profile Plus API!");
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;