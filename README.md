<div align="center">
  <h1>GitHub Profile Plus</h1>
  <p>Dynamic GitHub profile cards, streak stats, trophies, badges, and skill icons for your README.</p>
</div>

<p align="center">
  <a href="https://github-profile-plus.onrender.com/api/health">
    <img alt="API Health" src="https://github-profile-plus.onrender.com/api/badge?label=api&message=online&color=brightgreen" />
  </a>
  <a href="https://github.com/im-vishu/github-profile-plus">
    <img alt="Built with TypeScript" src="https://github-profile-plus.onrender.com/api/badge?label=typescript&message=express&color=3178c6" />
  </a>
  <a href="https://github-profile-plus.onrender.com/icons?i=ts,nodejs,express,mongodb,git&theme=dark">
    <img alt="Skill Icons" src="https://github-profile-plus.onrender.com/api/badge?label=skill-icons&message=ready&color=blue" />
  </a>
</p>

<p align="center">
  <a href="#quick-start">Quick Start</a>
  -
  <a href="#cards">Cards</a>
  -
  <a href="#skill-icons">Skill Icons</a>
  -
  <a href="#customization">Customization</a>
  -
  <a href="#self-hosting">Self-hosting</a>
</p>

## Overview

GitHub Profile Plus is an Express + TypeScript API that generates lightweight SVG assets for GitHub profile READMEs. It combines the most useful ideas from GitHub Readme Stats, GitHub Readme Streak Stats, Shields-style badges, and Skill Icons into one self-hostable service.

Live base URL:

```txt
https://github-profile-plus.onrender.com
```

All card and icon endpoints return SVG and can be embedded directly in Markdown, HTML, profile READMEs, documentation pages, and portfolio sites.

## Quick Start

Replace `octocat` with your GitHub username.

```md
![GitHub Stats](https://github-profile-plus.onrender.com/api/stats?username=octocat&theme=radical)

![Top Languages](https://github-profile-plus.onrender.com/api/top-langs?username=octocat&theme=tokyonight)

![GitHub Streak](https://github-profile-plus.onrender.com/api/streak?username=octocat&theme=dark)

![Trophies](https://github-profile-plus.onrender.com/api/trophies?username=octocat&theme=gruvbox)

![My Skills](https://github-profile-plus.onrender.com/icons?i=js,ts,react,nodejs,express,mongodb,git&theme=dark)
```

## Live Demos

<p align="center">
  <img alt="GitHub stats card" src="https://github-profile-plus.onrender.com/api/stats?username=octocat&theme=radical" />
</p>

<p align="center">
  <img alt="Top languages card" src="https://github-profile-plus.onrender.com/api/top-langs?username=octocat&theme=tokyonight" />
</p>

<p align="center">
  <img alt="GitHub streak card" src="https://github-profile-plus.onrender.com/api/streak?username=octocat&theme=dark" />
</p>

<p align="center">
  <img alt="Skill icons" src="https://github-profile-plus.onrender.com/icons?i=html,css,js,ts,react,nodejs,express,mongodb,git,github&theme=dark&perline=10" />
</p>

## Cards

### GitHub Stats Card

Shows public repository count, followers, following, stars, forks, and profile bio.

Endpoint:

```txt
/api/stats?username=USERNAME
```

Markdown:

```md
![GitHub Stats](https://github-profile-plus.onrender.com/api/stats?username=octocat)
```

With theme and custom colors:

```md
![GitHub Stats](https://github-profile-plus.onrender.com/api/stats?username=octocat&theme=radical&title_color=fff&text_color=f8d847&bg_color=141321)
```

### Top Languages Card

Shows the most-used languages from public, non-forked repositories. Language usage is calculated from GitHub language byte data where available.

Endpoint:

```txt
/api/top-langs?username=USERNAME
```

Markdown:

```md
![Top Languages](https://github-profile-plus.onrender.com/api/top-langs?username=octocat&theme=tokyonight)
```

### GitHub Streak Card

Shows total recent public events, current streak, and longest streak based on public GitHub activity available through the GitHub API.

Endpoint:

```txt
/api/streak?username=USERNAME
```

The `user` parameter is also supported:

```md
![GitHub Streak](https://github-profile-plus.onrender.com/api/streak?user=octocat&theme=dark)
```

Note: this card uses public GitHub API activity, so it cannot perfectly reproduce private contribution graph data unless the service is extended with a GitHub GraphQL contribution-calendar implementation and an appropriate token.

### Trophies Card

Shows achievement-style profile trophies.

Endpoint:

```txt
/api/trophies?username=USERNAME
```

Markdown:

```md
![GitHub Trophies](https://github-profile-plus.onrender.com/api/trophies?username=octocat&theme=gruvbox)
```

### Badge Endpoint

Create Shields-style SVG badges.

Endpoint:

```txt
/api/badge?label=LABEL&message=MESSAGE&color=COLOR
```

Markdown:

```md
![Status](https://github-profile-plus.onrender.com/api/badge?label=build&message=passing&color=brightgreen)
![TypeScript](https://github-profile-plus.onrender.com/api/badge?label=code&message=typescript&color=3178c6)
```

Options:

| Name | Description | Example |
| --- | --- | --- |
| `label` | Left-side badge text | `build` |
| `message` | Right-side badge text | `passing` |
| `status` | Alias for `message` | `online` |
| `color` | Right-side color alias or hex | `brightgreen`, `blue`, `3178c6` |
| `labelColor` | Left-side color | `555` |
| `style` | Badge style | `flat`, `flat-square`, `for-the-badge` |
| `logo` | Small text logo mark | `TS` |

Supported color aliases include `brightgreen`, `green`, `yellowgreen`, `yellow`, `orange`, `red`, `blue`, `grey`, `gray`, `lightgrey`, and `lightgray`.

## Skill Icons

Show technology icons in a single SVG, compatible with the Skill Icons-style URL format.

Endpoint:

```txt
/icons?i=ICON_1,ICON_2,ICON_3
```

Markdown:

```md
[![My Skills](https://github-profile-plus.onrender.com/icons?i=js,ts,react,nodejs,express,mongodb,git&theme=dark)](https://github-profile-plus.onrender.com)
```

Light theme:

```md
![My Skills](https://github-profile-plus.onrender.com/icons?i=java,kotlin,nodejs,figma&theme=light)
```

Icons per line:

```md
![My Skills](https://github-profile-plus.onrender.com/icons?i=aws,gcp,azure,react,vue,flutter&perline=3)
```

Useful endpoints:

| Endpoint | Description |
| --- | --- |
| `/icons?i=js,html,css` | Render selected icons |
| `/icons?i=all` | Render all supported icons |
| `/api/skill-icons?icons=js,ts,react` | Alias for selected icons |
| `/api/icons` | JSON list of supported icon IDs |
| `/api/svgs` | JSON map of icon SVG content |

Common icon aliases:

| Alias | Icon |
| --- | --- |
| `js` | `javascript` |
| `ts` | `typescript` |
| `py` | `python` |
| `go` | `golang` |
| `next` | `nextjs` |
| `mongo` | `mongodb` |
| `postgres` | `postgresql` |
| `k8s` | `kubernetes` |
| `tailwind` | `tailwindcss` |
| `express` | `expressjs` |
| `md` | `markdown` |

## Customization

Common query options for card endpoints:

| Name | Description | Example |
| --- | --- | --- |
| `theme` | Built-in theme name | `radical` |
| `bg_color` | Card background color | `141321` |
| `text_color` | Body text color | `ffffff` |
| `title_color` | Title/accent color | `fe428e` |
| `icon_color` | Accent/icon color | `79ff97` |
| `border_color` | Border color | `e4e2e2` |
| `hide_border` | Transparent border | `true` |
| `background` | Direct theme background override | `#151515` |
| `text` | Direct text override | `#ffffff` |
| `accent` | Direct accent override | `#58a6ff` |
| `border` | Direct border override | `#30363d` |

Built-in themes:

```txt
light, dark, default, transparent, radical, tokyonight, gruvbox, onedark, dracula, ocean, solarized
```

Example:

```md
![Stats](https://github-profile-plus.onrender.com/api/stats?username=octocat&theme=dracula&hide_border=true)
```

Transparent card:

```md
![Stats](https://github-profile-plus.onrender.com/api/stats?username=octocat&theme=transparent)
```

## API Reference

| Endpoint | Method | Returns | Description |
| --- | --- | --- | --- |
| `/api/health` | `GET` | JSON | Service health check |
| `/api/stats` | `GET` | SVG | GitHub profile stats card |
| `/api/top-langs` | `GET` | SVG | Top languages card |
| `/api/streak` | `GET` | SVG | Contribution streak card |
| `/api/trophies` | `GET` | SVG | GitHub trophies card |
| `/api/badge` | `GET` | SVG | Custom badge |
| `/badge` | `GET` | SVG | Badge alias |
| `/icons` | `GET` | SVG | Skill icons |
| `/api/skill-icons` | `GET` | SVG | Skill icons alias |
| `/api/icons` | `GET` | JSON | Supported icon IDs |
| `/api/svgs` | `GET` | JSON | Raw icon SVG map |

Health check:

```bash
curl https://github-profile-plus.onrender.com/api/health
```

Example response:

```json
{
  "status": "ok",
  "uptime": 123.45,
  "node_env": "production",
  "has_github_token": true
}
```

## Self-hosting

### Requirements

- Node.js 18+
- npm
- Optional GitHub Personal Access Token for higher GitHub API limits

### Local Setup

```bash
git clone https://github.com/im-vishu/github-profile-plus.git
cd github-profile-plus
npm install
npm run dev
```

The development server starts on:

```txt
http://localhost:3000
```

### Production Build

```bash
npm run build
npm start
```

### Environment Variables

| Name | Description |
| --- | --- |
| `PORT` | Server port. Defaults to `3000` |
| `GITHUB_TOKEN` | Optional GitHub token for higher API limits |
| `NODE_ENV` | Runtime environment |

PowerShell example:

```powershell
$env:GITHUB_TOKEN="ghp_your_token_here"
npm run dev
```

Linux/macOS example:

```bash
export GITHUB_TOKEN="ghp_your_token_here"
npm run dev
```

## Project Structure

```txt
src/
  api/                 Route handlers
  assets/skill-icons/  Local Skill Icons SVG assets
  middleware/          Security, validation, and rate limiting
  services/            GitHub and skill icon services
  templates/           SVG renderers and EJS templates
  theme/               Theme presets and customization helpers
```

## Verification

Useful checks:

```bash
npm run build
npm run typecheck
npx jest --runInBand --coverage=false
```

## Credits

GitHub Profile Plus is inspired by the excellent README tooling ecosystem:

- GitHub Readme Stats by Anurag Hazra
- GitHub Readme Streak Stats by DenverCoder1
- Skill Icons
- Shields-style badges

This project brings similar README-friendly ideas together in one Express + TypeScript service.

## License

ISC
