import express from "express";
import statsRoute from "./api/stats";
import topLangsRoute from "./api/topLangs";
import trophiesRoute from "./api/trophies";
import quotesRoute from "./api/quotes";
import widgetRoute from "./api/widget";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/api/stats", statsRoute);
app.get("/api/top-langs", topLangsRoute);
app.get("/api/trophies", trophiesRoute);
app.get("/api/quotes", quotesRoute);
app.get("/api/widget/:pluginName", widgetRoute);

app.get("/", (_req, res) => {
  res.send(
    "<h1>GitHub Profile Plus API</h1>" +
    "<ul>" +
    "<li>/api/stats?username=...</li>" +
    "<li>/api/top-langs?username=...</li>" +
    "<li>/api/trophies?username=...</li>" +
    "<li>/api/quotes</li>" +
    "</ul>"
  );
});

app.listen(PORT, () => {
  console.log(`GitHub Profile Plus running: http://localhost:${PORT}`);
});