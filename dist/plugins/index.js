"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlugin = getPlugin;
exports.listPlugins = listPlugins;
const plugins = {};
// Import all plugins and register here:
const sampleWidget_1 = require("./sampleWidget");
const leetcodeStats_1 = require("./leetcodeStats");
[sampleWidget_1.sampleWidget, leetcodeStats_1.leetcodeStats].forEach(plugin => {
    plugins[plugin.name] = plugin;
});
function getPlugin(name) {
    return plugins[name];
}
function listPlugins() {
    return Object.values(plugins);
}
