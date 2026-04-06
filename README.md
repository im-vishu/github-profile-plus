# GitHub Profile Plus

Generate dynamic GitHub profile stats as SVG cards!  
**API Endpoint:** `/api/stats?username=octocat[&theme=dark]`

## Features

- Generates dynamic SVG cards for any GitHub user
- `/api/stats?username=…` endpoint
- Theming support (`theme=light` or `theme=dark`)
- Docker/self-hosting ready

## Usage

```bash
# 1. Install
npm install

# 2. Dev mode (hot reload)
npm run dev

# 3. Build + Run
npm run build
npm start

# 4. Docker
docker build -t github-profile-plus .
docker run -p 3000:3000 github-profile-plus
```

Open [http://localhost:3000/api/stats?username=octocat](http://localhost:3000/api/stats?username=octocat)

## Next

- Add support for `/api/top-langs`, `/api/trophies`, plugin system, and more!
- For contributors: see `CONTRIBUTING.md` (coming soon)
- ProfilePlus Architecture Milestone 1/10: feat(server): initialize Express.js core with modular middleware stack

- ProfilePlus Architecture Milestone 2/10: feat(utils): implement high-performance SVG string template engine

- ProfilePlus Architecture Milestone 3/10: feat(api): create /api/stats endpoint with real-time GitHub fetching

- ProfilePlus Architecture Milestone 4/10: feat(utils): implement GitHub GraphQL fetcher with PAT fallback logic

- ProfilePlus Architecture Milestone 5/10: feat(themes): initialize centralized theme registry (Dark/Monokai/High-Contrast)

- ProfilePlus Architecture Milestone 6/10: feat(plugins): implement auto-discovery logic for user-contributed widgets

- ProfilePlus Architecture Milestone 7/10: test(api): add supertest suite for SVG response validation and headers

- ProfilePlus Architecture Milestone 8/10: build(infra): configure production Dockerfile with Node-20 Alpine base

- ProfilePlus Architecture Milestone 9/10: chore(config): set up .env.example for secure GitHub Token management

- ProfilePlus Architecture Milestone 10/10: docs: finalize README.md with deployment guides and API usage examples

- GitHub Profile Plus Milestone 1/31: chore: initialize TypeScript project structure and compiler options

- GitHub Profile Plus Milestone 2/31: feat(infra): set up app.ts entrypoint with Express and TS-Node support

- GitHub Profile Plus Milestone 3/31: feat(theme): implement centralized theme engine in theme/index.ts

- GitHub Profile Plus Milestone 4/31: feat(services): initialize GitHub API GraphQL service for core stats

- GitHub Profile Plus Milestone 5/31: feat(services): implement repository and user data fetching logic

- GitHub Profile Plus Milestone 6/31: feat(services): implement languages.ts for top language aggregation

- GitHub Profile Plus Milestone 7/31: feat(services): implement trophies.ts for achievement rank calculation

- GitHub Profile Plus Milestone 8/31: feat(services): implement quotes.ts for developer quote retrieval

- GitHub Profile Plus Milestone 9/31: feat(templates): initialize core card.ts base SVG renderer

- GitHub Profile Plus Milestone 10/31: feat(templates): implement EJS-based card.ejs base layout

- GitHub Profile Plus Milestone 11/31: feat(templates): implement langsCard.ts for language SVG rendering

- GitHub Profile Plus Milestone 12/31: feat(templates): create langsCard.ejs template with bar-chart logic

- GitHub Profile Plus Milestone 13/31: feat(templates): implement trophiesCard.ts for badge rendering

- GitHub Profile Plus Milestone 14/31: feat(templates): create trophiesCard.ejs with trophy-grid layout
