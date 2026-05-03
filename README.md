<div align="center">

  <h1>GitHub Profile Plus 🚀</h1>

  <p>
    Dynamic <b>SVG GitHub profile cards</b> for your README —
    📊 Stats • 📈 Top Languages • 🔥 Streak • 🏆 Trophies • 🏷️ Badges • 🧩 Skill Icons
  </p>

  <!-- Badges -->
  <p>
    <a href="https://github-profile-plus.onrender.com/api/health">
      <img alt="API" src="https://github-profile-plus.onrender.com/api/badge?label=api&message=online&color=brightgreen&style=flat-square" />
    </a>
    <a href="https://github.com/im-vishu/github-profile-plus">
      <img alt="TypeScript + Express" src="https://github-profile-plus.onrender.com/api/badge?label=TypeScript&message=Express&color=3178c6&style=flat-square" />
    </a>
    <a href="https://github-profile-plus.onrender.com/api/health">
      <img alt="Node" src="https://github-profile-plus.onrender.com/api/badge?label=node&message=20%2B&color=339933&style=flat-square" />
    </a>
    <a href="https://github-profile-plus.onrender.com/icons?i=ts,nodejs,express,mongodb,git&theme=dark">
      <img alt="Skill Icons" src="https://github-profile-plus.onrender.com/api/badge?label=skill-icons&message=ready&color=blue&style=flat-square" />
    </a>
  </p>

  <!-- Quick Links -->
  <p>
    <a href="#-quick-start"><b>⚡ Quick Start</b></a> &nbsp;•&nbsp;
    <a href="#-live-demos"><b>🖼️ Live Demos</b></a> &nbsp;•&nbsp;
    <a href="#-cards"><b>🧩 Cards</b></a> &nbsp;•&nbsp;
    <a href="#-skill-icons"><b>🧠 Skill Icons</b></a> &nbsp;•&nbsp;
    <a href="#-customization"><b>🎨 Customization</b></a> &nbsp;•&nbsp;
    <a href="#-self-hosting"><b>🏗️ Self-hosting</b></a> &nbsp;•&nbsp;
    <a href="#-api-reference"><b>📚 API Reference</b></a>
  </p>

  <!-- Mini Preview Row -->
  <p>
    <img alt="Stats preview" height="95" src="https://github-profile-plus.onrender.com/api/stats?username=octocat&theme=dark" />
    <img alt="Top langs preview" height="95" src="https://github-profile-plus.onrender.com/api/top-langs?username=octocat&theme=dark" />
  </p>

</div>

---

## ✨ Overview

**GitHub Profile Plus** is an **Express + TypeScript** API that generates lightweight **SVG assets** for GitHub profile READMEs and documentation.

It combines the most useful ideas from:
- 📊 GitHub profile stats cards
- 🔥 Streak stats
- 🏆 Trophies
- 🏷️ Shields-style badges
- 🧩 Skill icons

✅ All card and icon endpoints return **SVG** and can be embedded directly in:
- GitHub READMEs
- Docs
- Portfolio sites

🌐 Live base URL:

```txt
https://github-profile-plus.onrender.com
```

---

## ⚡ Quick Start

Replace `octocat` with your GitHub username:

```md
![GitHub Stats](https://github-profile-plus.onrender.com/api/stats?username=octocat&theme=radical)

![Top Languages](https://github-profile-plus.onrender.com/api/top-langs?username=octocat&theme=tokyonight)

![GitHub Streak](https://github-profile-plus.onrender.com/api/streak?username=octocat&theme=dark)

![Trophies](https://github-profile-plus.onrender.com/api/trophies?username=octocat&theme=gruvbox)

![My Skills](https://github-profile-plus.onrender.com/icons?i=js,ts,react,nodejs,express,mongodb,git&theme=dark)
```

---

## 🖼️ Live Demos

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

---

## 🧩 Cards

### 📊 GitHub Stats Card

✅ Shows public repository count, followers, following, stars, forks, and profile bio.

**Endpoint**
```txt
/api/stats?username=USERNAME
```

**Markdown**
```md
![GitHub Stats](https://github-profile-plus.onrender.com/api/stats?username=octocat)
```

**Theme + custom colors**
```md
![GitHub Stats](https://github-profile-plus.onrender.com/api/stats?username=octocat&theme=radical&title_color=fff&text_color=f8d847&bg_color=141321)
```

---

### 📈 Top Languages Card

✅ Shows most-used languages from public, non-forked repositories (based on GitHub language byte data).

**Endpoint**
```txt
/api/top-langs?username=USERNAME
```

**Markdown**
```md
![Top Languages](https://github-profile-plus.onrender.com/api/top-langs?username=octocat&theme=tokyonight)
```

---

### 🔥 GitHub Streak Card

✅ Shows activity streak based on public GitHub API activity.

**Endpoint**
```txt
/api/streak?username=USERNAME
```

Also supports `user=`:

```md
![GitHub Streak](https://github-profile-plus.onrender.com/api/streak?user=octocat&theme=dark)
```

ℹ️ Note: This uses public activity and cannot perfectly reproduce private contributions unless extended with a GraphQL contribution-calendar approach + token.

---

### 🏆 Trophies Card

✅ Achievement-style trophies.

**Endpoint**
```txt
/api/trophies?username=USERNAME
```

**Markdown**
```md
![GitHub Trophies](https://github-profile-plus.onrender.com/api/trophies?username=octocat&theme=gruvbox)
```

---

### 🏷️ Badge Endpoint

Create Shields-style badges.

**Endpoint**
```txt
/api/badge?label=LABEL&message=MESSAGE&color=COLOR
```

**Markdown**
```md
![Status](https://github-profile-plus.onrender.com/api/badge?label=build&message=passing&color=brightgreen)
![TypeScript](https://github-profile-plus.onrender.com/api/badge?label=code&message=typescript&color=3178c6)
```

**Options**

| Name | Description | Example |
| --- | --- | --- |
| `label` | Left-side badge text | `build` |
| `message` | Right-side badge text | `passing` |
| `status` | Alias for `message` | `online` |
| `color` | Right-side color alias or hex | `brightgreen`, `blue`, `3178c6` |
| `labelColor` | Left-side color | `555` |
| `style` | Badge style | `flat`, `flat-square`, `for-the-badge` |
| `logo` | Small text logo mark | `TS` |

🎨 Supported color aliases include: `brightgreen`, `green`, `yellowgreen`, `yellow`, `orange`, `red`, `blue`, `grey`, `gray`, `lightgrey`, and `lightgray`.

---

## 🧠 Skill Icons

Render technology icons in a single SVG.

**Endpoint**
```txt
/icons?i=ICON_1,ICON_2,ICON_3
```

**Markdown**
```md
[![My Skills](https://github-profile-plus.onrender.com/icons?i=js,ts,react,nodejs,express,mongodb,git&theme=dark)](https://github-profile-plus.onrender.com)
```

**Light theme**
```md
![My Skills](https://github-profile-plus.onrender.com/icons?i=java,kotlin,nodejs,figma&theme=light)
```

**Icons per line**
```md
![My Skills](https://github-profile-plus.onrender.com/icons?i=aws,gcp,azure,react,vue,flutter&perline=3)
```

**Useful endpoints**

| Endpoint | Description |
| --- | --- |
| `/icons?i=js,html,css` | Render selected icons |
| `/icons?i=all` | Render all supported icons |
| `/api/skill-icons?icons=js,ts,react` | Alias for selected icons |
| `/api/icons` | JSON list of supported icon IDs |
| `/api/svgs` | JSON map of icon SVG content |

**Common aliases**

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

---

## 🎨 Customization

Common query options:

| Name | Description | Example |
| --- | --- | --- |
| `theme` | Built-in theme name | `radical` |
| `bg_color` | Card background color | `141321` |
| `text_color` | Body text color | `ffffff` |
| `title_color` | Title/accent color | `fe428e` |
| `icon_color` | Accent/icon color | `79ff97` |
| `border_color` | Border color | `e4e2e2` |
| `hide_border` | Transparent border | `true` |
| `style` | Badge style | `flat-square` |

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

---

## 📚 API Reference

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

---

## 🏗️ Self-hosting

### ✅ Requirements
- Node.js 18+
- npm
- (Optional) GitHub Personal Access Token for higher GitHub API limits

### 🧪 Local Setup

```bash
git clone https://github.com/im-vishu/github-profile-plus.git
cd github-profile-plus
npm install
npm run dev
```

Dev server:

```txt
http://localhost:3000
```

### 🚀 Production Build

```bash
npm run build
npm start
```

### 🔐 Environment Variables

| Name | Description |
| --- | --- |
| `PORT` | Server port (default: `3000`) |
| `GITHUB_TOKEN` | Optional GitHub token (higher API limits) |
| `NODE_ENV` | Runtime environment (`development` / `production`) |

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

---

## 🗂️ Project Structure

```txt
src/
  api/                 Route handlers
  assets/skill-icons/  Local Skill Icons SVG assets
  middleware/          Security, validation, and rate limiting
  services/            GitHub and skill icon services
  templates/           SVG renderers and EJS templates
  theme/               Theme presets and customization helpers
```

---

## ✅ Verification

Helpful commands:

```bash
npm run build
npm run typecheck
npx jest --runInBand --coverage=false
```

---

## 🙌 Credits

Inspired by the excellent README tooling ecosystem:
- GitHub Readme Stats
- GitHub Readme Streak Stats
- Skill Icons
- Shields-style badges

---

## 📄 License

ISC