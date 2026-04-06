import { Request, Response } from "express";
import { getPlugin, listPlugins } from "../plugins";

export default async function widgetRoute(req: Request, res: Response) {
  const pluginNameRaw = req.params.pluginName;
  const pluginName = Array.isArray(pluginNameRaw) ? pluginNameRaw[0] : pluginNameRaw;
  const theme = ((req.query.theme as string) || "light").toLowerCase();

  if (!pluginName) {
    return res
      .type("application/json")
      .send(listPlugins().map(p => ({ name: p.name, description: p.description })));
  }

  const plugin = getPlugin(pluginName);
  if (!plugin) {
    return res.status(404).send(`<svg width="400" height="50"><text x="10" y="30" fill="red" font-size="20">Plugin '${pluginName}' not found.</text></svg>`);
  }

  try {
    const svg = await plugin.handler({ query: req.query as any, theme });
    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=120");
    return res.send(svg);
  } catch (err) {
    return res.status(500).send(`<svg width="400" height="50"><text x="10" y="30" fill="red" font-size="20">Plugin error: ${(err as any).message}</text></svg>`);
  }
}