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
