# 🚀 GitHub Profile Plus

Modern, extensible platform for generating dynamic GitHub profile stats, badges, and widgets!

---

## 🎯 Features

- **Dynamic SVG/PNG Stats Cards** for GitHub profiles
- **Top Languages, Trophies, Quotes & Contribution Heatmaps**
- **Robust Plugin System:** Add your own widgets via `/api/widget/:pluginName`
- **Easy Theming:** Light/dark/custom themes; theme builder planned
- **Fast, Modular REST API:** Production-ready
- **Multi-source Integrations:** LeetCode, Stack Overflow, more (plugin-based)
- **Self-hosting:** Via Docker or Node.js
- **Developer-first:** Great docs, API DX, plugin scaffolding
- **Scalable, Open Source, Community-Driven**

---

## 🚀 Quickstart

### 1. **Clone & Install**

```bash
git clone https://github.com/im-vishu/github-profile-plus.git
cd github-profile-plus
npm install
```

### 2. **Run in Dev Mode**

```bash
npm run dev
# or, for production:
npm run build
npm start
```

### 3. **Try the Endpoints!**

- **GitHub Stats Card:**  
  `http://localhost:3000/api/stats?username=octocat`

- **Top Languages:**  
  `http://localhost:3000/api/top-langs?username=octocat`

- **Trophies:**  
  `http://localhost:3000/api/trophies?username=octocat`

- **Random Quote:**  
  `http://localhost:3000/api/quotes`

- **Widgets/Plugins:**  
  `http://localhost:3000/api/widget/sample-widget`  
  `http://localhost:3000/api/widget/leetcode-stats?username=octocat`  
  `http://localhost:3000/api/widget` (list)

### 4. **Try with Docker**

```bash
docker build -t github-profile-plus .
docker run -p 3000:3000 github-profile-plus
```

---

## 🧩 API Endpoints

| Endpoint                          | Description                                    |
|------------------------------------|------------------------------------------------|
| `/api/stats?username=USER`         | GitHub profile stats card (SVG)                |
| `/api/top-langs?username=USER`     | Top used programming languages (SVG)           |
| `/api/trophies?username=USER`      | Achievement/trophy card                        |
| `/api/quotes`                      | Random dev/programming quote                   |
| `/api/widget/:pluginName[...]`     | Dynamic widget/plugin, supports params         |
| `/api/widget`                      | Lists all registered plugins                   |


---

## 🧑‍💻 **Creating a Plugin**

1. **Create a new file** in `src/plugins/`, e.g. `myWidget.ts`:

    ```typescript
    import type { Plugin } from "./index";
    const myPlugin: Plugin = {
      name: "my-widget",
      description: "My custom widget.",
      handler: ({ query, theme }) => {
        return `<svg width="200" ...>...</svg>`;
      }
    };
    export default myPlugin;
    ```

2. **Your widget shows up automatically** at  
   `http://localhost:3000/api/widget/my-widget`

3. **Visit** `/api/widget` for a full list of available plugins.

_See [`docs/plugins.md`](docs/plugins.md) for full authoring guide!_

---

## 📦 Configuration & Theming

- Pass `theme=light|dark|custom` as a query param to any endpoint
- (WIP) Full config import/export and theme builder coming soon

---

## 🛡️ Production & Docker

- **Dockerfile** included for ready-to-run deployments
- **.env support** for configuration (add GITHUB_TOKEN, etc.)

---

## 🧪 Testing

- Visit any endpoint in your browser or use `curl`
- (Upcoming) Jest-based automated suite for API, plugins, SVGs

---

## 🔌 Integrations & Marketplace

- Use `/api/widget/:pluginName` for new sources (LeetCode, Stack Overflow, RSS, etc.)
- Submit your own plugin—see [Contributing](#contributing)!

---

## 📝 Roadmap

- [x] Core GitHub profile stats
- [x] Top languages, trophies, quotes
- [x] Extensible plugin system, auto-discovery
- [ ] Advanced theming, config import/export, a11y
- [ ] External data sources (LeetCode, Stack Overflow...)
- [ ] CLI for card/widget preview
- [ ] Marketplace/gallery for plugins & themes

---

## 🤝 Contributing

PRs are welcome!
- New widgets/plugins? Just add a `.ts` file to `src/plugins/`.
- Issues, feature requests, and docs are encouraged.
- See [`docs/plugins.md`](docs/plugins.md) for the plugin contract.

---

## ⭐ License

MIT © [im-vishu](https://github.com/im-vishu)

---

> **GitHub Profile Plus** — making your README pop, together with the open source community!

- ProfilePlus Plugin Milestone 1/10: feat(plugins): define Plugin and PluginContext interfaces in index.ts

- ProfilePlus Plugin Milestone 2/10: feat(plugins): implement centralized plugin registry and loader logic

- ProfilePlus Plugin Milestone 3/10: feat(plugins): create sampleWidget plugin for SVG architecture testing

- ProfilePlus Plugin Milestone 4/10: feat(plugins): implement leetcodeStats plugin for external API integration

- ProfilePlus Plugin Milestone 5/10: feat(api): initialize /api/widget/:pluginName route handler

- ProfilePlus Plugin Milestone 6/10: fix(api): resolve TS2345 type error by sanitizing pluginName parameters

- ProfilePlus Plugin Milestone 7/10: feat(api): implement auto-listing of registered plugins via /api/widget
