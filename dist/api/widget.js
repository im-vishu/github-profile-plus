"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = widgetRoute;
const plugins_1 = require("../plugins");
async function widgetRoute(req, res) {
    const pluginNameRaw = req.params.pluginName;
    const pluginName = Array.isArray(pluginNameRaw) ? pluginNameRaw[0] : pluginNameRaw;
    const theme = (req.query.theme || "light").toLowerCase();
    if (!pluginName) {
        return res
            .type("application/json")
            .send((0, plugins_1.listPlugins)().map(p => ({ name: p.name, description: p.description })));
    }
    const plugin = (0, plugins_1.getPlugin)(pluginName);
    if (!plugin) {
        return res.status(404).send(`<svg width="400" height="50"><text x="10" y="30" fill="red" font-size="20">Plugin '${pluginName}' not found.</text></svg>`);
    }
    try {
        const svg = await plugin.handler({ query: req.query, theme });
        res.setHeader("Content-Type", "image/svg+xml");
        res.setHeader("Cache-Control", "public, max-age=120");
        return res.send(svg);
    }
    catch (err) {
        return res.status(500).send(`<svg width="400" height="50"><text x="10" y="30" fill="red" font-size="20">Plugin error: ${err.message}</text></svg>`);
    }
}
