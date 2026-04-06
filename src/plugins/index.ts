export interface PluginContext {
  query: Record<string, string | undefined>;
  theme: string;
}

export type PluginHandler = (ctx: PluginContext) => Promise<string> | string;

export interface Plugin {
  name: string;
  description: string;
  handler: PluginHandler;
}

const plugins: Record<string, Plugin> = {};

// Import all plugins and register here:
import { sampleWidget } from "./sampleWidget";
import { leetcodeStats } from "./leetcodeStats";

[sampleWidget, leetcodeStats].forEach(plugin => {
  plugins[plugin.name] = plugin;
});

export function getPlugin(name: string): Plugin | undefined {
  return plugins[name];
}

export function listPlugins(): Plugin[] {
  return Object.values(plugins);
}