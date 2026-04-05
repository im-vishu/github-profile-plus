import express from "express";
import statsRoute from "./api/stats";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/api/stats", statsRoute);

app.get("/", (_req, res) => {
  res.send(
    "<h1>GitHub Profile Plus API</h1><p>Use <code>/api/stats?username=&lt;github-username&gt;</code> for SVG stats cards.</p>"
  );
});

app.listen(PORT, () => {
  console.log(`GitHub Profile Plus running: http://localhost:${PORT}`);
});