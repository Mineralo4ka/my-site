# AGENTS.md

This file is the operating guide for Codex sessions in this repository.

Start every new chat or resumed coding session by reading this file before making assumptions about the project.

## Project Overview

This is a one-page portfolio site for Andrew Pavlenko, a video editor. The site presents:

- hero block with profile photo and positioning;
- vertical and horizontal portfolio videos;
- services;
- process;
- brief/contact CTA;
- modal brief form that sends requests to Telegram;
- Yandex.Metrika counter;
- Docker-based deployment to a FastVPS server.

The live domain is:

```text
https://nehold-creator.ru
```

## Tech Stack

- React
- Vite
- Tailwind CSS
- Plain Node.js HTTP server for production
- Docker Compose for deployment
- Telegram Bot API for brief delivery

There is no Express dependency. The production server is intentionally small and dependency-free.

## Important Files

```text
src/App.jsx                 Main React app: content, cards, modal, brief form
src/index.css               Global CSS, Tailwind import, fullscreen video fix
src/main.jsx                React entry
index.html                  Meta tags, favicon, Yandex.Metrika
server/production.js        Production Node server for dist and /api/brief
server/telegram.js          Telegram Bot API helper
server/viteBriefApiPlugin.js Local Vite middleware for /api/brief
api/brief.js                Vercel-style serverless endpoint, kept as optional fallback
public/videos               MP4 portfolio videos
public/images/covers        Static WebP covers and animated hover WebP previews
public/images/avatar.jpg    Hero/profile image
public/images/favicon.ico   Site favicon
Dockerfile                  Runtime-only Docker image, copies dist and server
compose.yaml                Docker Compose service binding 127.0.0.1:3000
scripts/deploy.sh           Incremental deploy script
scripts/deploy.cmd          Windows wrapper for Git Bash
.env.local                  Local/server secrets. Do not commit.
.env.example                Example env file
```

## Local Commands

Use `npm.cmd` in PowerShell on Windows when needed.

```bash
npm.cmd run dev
npm.cmd run build
npm.cmd run lint
npm.cmd run preview
```

Always run at least:

```bash
npm.cmd run lint
npm.cmd run build
```

after code changes.

## Environment Variables

The brief form needs Telegram credentials:

```env
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
PORT=3000
```

`TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` must stay server-side only. Never place them in `src/App.jsx` or any client bundle.

## Brief Form Flow

Frontend:

- `buildBriefMessage(formData)` creates the message text.
- `handleBriefSubmit` posts `{ text }` to `/api/brief`.

Backend:

- `server/production.js` handles `POST /api/brief`.
- `server/telegram.js` sends the message with Telegram Bot API.

For local Vite dev:

- `vite.config.js` loads env values and installs `briefApiPlugin`.

## Video Behavior

Portfolio cards use:

- static WebP cover before play;
- animated WebP hover preview on devices with real mouse hover;
- real MP4 playback after pressing the play overlay;
- no autoplay;
- `preload="none"`;
- native controls after play.

Important current behavior:

- clicking the video itself must not toggle play/pause;
- playback starts from the play overlay button or native player controls only;
- fullscreen vertical video must show the whole frame, not crop.

The fullscreen fix is in `src/index.css`:

```css
video:fullscreen,
video:-webkit-full-screen {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #000;
}
```

Production server supports MP4 Range requests. Keep this behavior, because mobile browsers need `206 Partial Content` for reliable playback.

## Media Naming Rules

For each video:

```text
public/videos/NAME.mp4
public/images/covers/NAME.webp
public/images/covers/NAME-hover.webp
```

`ProjectPreview` automatically derives hover preview paths from the video filename:

```text
/videos/NAME.mp4 -> /images/covers/NAME-hover.webp
```

If a video filename changes, make sure cover and hover filenames match.

## Original Video Links

Project cards can include:

```js
originalUrl: "https://..."
```

When `originalUrl` exists, the card shows a separate button:

```text
Смотреть полное видео
```

The title itself should remain plain text.

## Deployment

Deployment is Docker-based and uses an already-built `dist`.

The Docker image does not run `npm install` and does not build Vite inside the container.

Current `Dockerfile` copies only:

```text
server
dist
```

Deployment script:

```bat
scripts\deploy.cmd
```

The Windows wrapper calls Git Bash:

```text
C:\Program Files\Git\bin\bash.exe
```

`scripts/deploy.sh` does:

- `npm run build`;
- hashes deploy files;
- uploads only changed files to the VPS;
- removes stale remote files tracked by `.deploy-manifest`;
- runs `docker compose up -d --build` only when deploy files changed.

Default server target:

```text
root@5.45.122.81:/root/public_html
```

Useful deploy flags:

```bash
RESTART_CONTAINER=0 scripts/deploy.cmd
FORCE_RESTART=1 scripts/deploy.cmd
REMOTE_DIR=/custom/path scripts/deploy.cmd
```

## Server Layout

On the VPS:

```text
/root/public_html
```

contains:

```text
dist
server
Dockerfile
compose.yaml
.env.local
.deploy-manifest
```

Docker Compose exposes the container only on localhost:

```text
127.0.0.1:3000:3000
```

Nginx proxies the public domain to:

```text
http://127.0.0.1:3000
```

## Nginx Notes

FastVPS has provider-managed Nginx config. Be careful.

Important:

- prefer `sudo systemctl reload nginx`;
- avoid `sudo systemctl restart nginx` unless the user explicitly accepts the risk;
- do not edit provider FastVPS default SSL blocks unless absolutely necessary;
- always run `sudo nginx -t` before reload.

Working checks:

```bash
docker compose ps
curl -I http://127.0.0.1:3000
curl -I -H "Range: bytes=0-1024" http://127.0.0.1:3000/videos/KURS_gangsters.mp4
curl -k -I https://nehold-creator.ru
```

Expected Range response:

```text
HTTP/1.1 206 Partial Content
Accept-Ranges: bytes
Content-Type: video/mp4
```

## Git Notes

The repo may be seen as dubious ownership inside Codex sandbox. If Git refuses commands, add this safe directory:

```bash
git config --global --add safe.directory C:/Users/andre/my-site
```

Do not commit `.env.local`.

Before committing:

```bash
npm.cmd run lint
npm.cmd run build
git status --short
```

## Style And Editing Guidance

- Prefer existing React/Tailwind patterns.
- Keep content changes in `src/App.jsx`.
- Use `apply_patch` for manual file edits.
- Keep UI dark, minimal, and consistent.
- Avoid returning red accent styling unless explicitly requested.
- Cards should keep small radius and restrained styling.
- Do not add broad refactors during small content/UI requests.
- Do not remove user media unless checking references first.

## Current Known Good State

At the time this file was created:

- deploy script works with incremental uploads;
- Docker container starts successfully;
- HTTPS domain returns `200`;
- MP4 Range responses work;
- unused public media were removed;
- `dist` is generated locally and copied into Docker.
