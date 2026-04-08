# GitHub Profile Plus

An Express + TypeScript service that generates themeable SVG profile cards for GitHub users — stats, top languages, trophies, and more. Cards are lightweight and suitable for README badges, profile pages, or any location that accepts SVG.

## Features
- /api/stats — profile stats card (repos, followers, avatar)
- /api/top-langs — top languages card (bar chart)
- /api/trophies — trophies card
- Themeable: built-in themes plus custom theme query overrides
- Server-side SVG templates for fast rendering
- Example GitHub service helpers that call the GitHub REST API

## Prerequisites
- Node.js 18+ (recommended)
- npm
- (Optional) GitHub Personal Access Token to avoid API rate limits

## Quick start

1. Clone and install
```bash
git clone <repo-url>
cd github-profile-plus
npm install
```

2. (Optional) Provide a GitHub token to increase API rate limits:
- macOS / Linux:
```bash
export GITHUB_TOKEN="ghp_..."
npm run dev
```
- Windows (PowerShell):
```powershell
$env:GITHUB_TOKEN="ghp_..."
npm run dev
```

3. Run the development server
```bash
npm run dev
```
The dev server uses `ts-node-dev` and restarts automatically on file changes.

## Available npm scripts
- `npm run dev` — start dev server with `ts-node-dev`
- (Add production build/start scripts as needed, e.g., `build` and `start` using `tsc`)

## Environment variables
- `GITHUB_TOKEN` — (optional) GitHub PAT to increase API rate limits and access private data if required.

## API Endpoints

All endpoints that return cards respond with `Content-Type: image/svg+xml`.

- GET `/api/health`
  - Returns JSON health info: `{ status: "ok", uptime: ... }`

- GET `/api/stats`
  - Query params:
    - `username` (required) — GitHub username
    - `theme` (optional) — theme name (`light`, `dark`, etc.)
    - Custom theme overrides — supported via query keys defined in `getCustomThemeFromQuery`
  - Example:
    - `/api/stats?username=octocat&theme=dark`

- GET `/api/top-langs`
  - Query params:
    - `username` (required)
    - `theme` (optional)
  - Example:
    - `/api/top-langs?username=octocat&theme=light`

- GET `/api/trophies`
  - Query params:
    - `username` (required)
    - `theme` (optional)
  - Example:
    - `/api/trophies?username=octocat&theme=radical`

Notes about theming:
- Use a built-in theme name via `?theme=light` (or `dark`, etc.).
- Use custom theme overrides via the query params supported by `getCustomThemeFromQuery` (e.g., `?bg_color=#fff&text_color=#000`). The exact parameter keys depend on your `theme` implementation — check `src/theme.ts`.

## Project layout (important files)
- src/
  - app.ts — Express app, route registration
  - api/
    - stats.ts — `/api/stats` handler (default export)
    - topLangs.ts — `/api/top-langs` handler (default export)
    - trophies.ts — `/api/trophies` handler (default export)
  - services/
    - github.ts — GitHub helpers (exports `getGitHubProfileStats`, `getUserTopLanguages`, `TopLanguage` interface)
  - templates/
    - topLangs.ts — SVG renderer for top languages
    - card.ts / trophiesCard.ts — other SVG templates
  - theme.ts — theming utilities (`resolveTheme`, `getCustomThemeFromQuery`, `Theme` type)

## Implementation notes & recommendations
- Include `GITHUB_TOKEN` in axios headers inside `src/services/github.ts` if present:
  ```ts
  const headers = process.env.GITHUB_TOKEN ? { Authorization: `token ${process.env.GITHUB_TOKEN}` } : {};
  axios.get(url, { headers });
  ```
- Add caching (in-memory or Redis) for GitHub responses to reduce API calls and improve performance.
- Sanitize and validate user-supplied query parameters (especially for colors or fonts).
- For production, build TypeScript to JS (`tsc`) and run the compiled output with Node instead of `ts-node-dev`.

## Troubleshooting / Common issues
- "Cannot find module '../templates/topLangs'":
  - Ensure `src/templates/topLangs.ts` exists and the import path matches exactly.
- "Module ... has no default export":
  - Route handlers should default-export the handler:
    ```ts
    export default async function routeHandler(req, res) { ... }
    ```
  - And import without braces:
    ```ts
    import statsRoute from "./api/stats";
    ```
- Missing types for packages (example: `cors`):
  - Install the package and its types:
    ```bash
    npm install cors
    npm install --save-dev @types/cors
    ```

## Extending the project
- Add new endpoints in `src/api/` (keep the default export pattern).
- Add new SVG templates in `src/templates/` and call them from API handlers.
- Expand `src/services/github.ts` to fetch additional data (contributions, language bytes, repo stats).
- Add unit/integration tests for handlers and templates.

## Contributing
Contributions are welcome. Suggested workflow:
1. Fork the repository
2. Create a feature branch
3. Open a pull request with a clear description and tests if applicable

## License
MIT

## Contact / Support
If you encounter issues or want additional features (more cards, themes, caching examples), open an issue or submit a PR.
```