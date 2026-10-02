---
name: add-portfolio-video
description: Add a new local video and its social-post metadata to the nehold-creator.ru portfolio. Use when the user says "добавь новое видео в портфолио" or asks to prepare, optimize, preview, or publish a new portfolio video in this repository.
---

# Add a portfolio video

Read the repository `AGENTS.md` first. Treat this as a project update, not as permission to deploy.

## Intake and source of truth

The user normally supplies a local video plus the URL of its published social post. Find the new file instead of asking for its exact name when it is unambiguous. `dist` is generated output: if the user put a source in `dist/video` or `dist/videos`, preserve it while working but create the maintained asset under `public/videos`.

Open the social URL and identify:

- the platform and canonical post URL;
- the current exact view count, without abbreviating it in `viewCount`;
- publication year and a suitable project title/category;
- the creator/client's display name, canonical profile URL, and profile image.

Prefer data visible on the original social page. Do not guess a view count, client identity, or profile URL. If the platform hides a value, explain what is unavailable and ask for that one value. Reuse an existing `clients` entry and avatar when the same client is already present. A new client avatar belongs in `public/images/clients` and should be a compact square image.

## Inspect the media, then confirm the cover

Inspect the local file with `ffprobe` and sample representative frames. Check dimensions, orientation, duration, codecs, frame rate, audio, file size, and visible content. Use this analysis to draft the title, category, short description, format (`9:16` or `16:9`), and sensible preview timing.

Before creating the static cover, ask whether the user has a cover image or wants a frame from the video. If they choose a frame, offer a few useful timestamps or a contact sheet based on the inspected content; do not silently choose a random frame. If they point to an image or location, use that source.

Run `scripts/prepare-portfolio-video.ps1` after the cover choice. Use `-AnalyzeOnly` first when helpful. The script writes the maintained MP4, static WebP cover, and animated hover WebP preview using matching basenames. Do not overwrite existing media unless the collision has been checked and replacement is intended.

## Update the site

Follow the current structure in `src/App.jsx`, rather than relying on a stale example. At minimum:

1. Add or reuse the client in `clients` with `name`, profile `url`, and `avatar`.
2. Add one base object to `projects` with `year`, `format`, `accent`, `/videos/NAME.mp4`, `/images/covers/NAME.webp`, `client`, canonical `originalUrl`, and integer `viewCount`.
3. Add matching localized entries at the same array index in both `dict.ru.projects` and `dict.en.projects`. Keep the arrays aligned with `projects`.
4. Write a concise description of the actual editing/content visible in the video. Do not invent production responsibilities that cannot be inferred.

The existing card supplies the client button, views badge, and platform-specific original-video button. Do not duplicate that markup. `ProjectPreview` derives `/images/covers/NAME-hover.webp` from the video basename, so all three media names must match exactly, including case.

Vertical projects are sorted by `viewCount`; horizontal projects currently have custom ordering logic. Check the rendered order after adding the item.

Keep both portfolio grids limited to five complete rows at the active responsive column count. Every overflow full card must stay behind the relevant show-more control until the user expands it. In the collapsed state, keep a short, dimmed, non-interactive teaser strip of the next overflow covers above the control so visitors can see that more videos exist. Size that strip from the actual number of available teasers so it never leaves empty grid cells. Do not reintroduce a fixed "hide the last N cards" count or incomplete full-card rows when adding projects.

## Verify and report

Check that every referenced media file exists and that the optimized MP4 has H.264 video, broadly compatible audio, `yuv420p`, and fast-start metadata. Then run:

```powershell
npm.cmd run lint
npm.cmd run build
```

Inspect the built page at mobile and desktop widths when the change affects card layout or media presentation. Report the added project, discovered social metadata and its observation date, media sizes before/after, cover source/timestamp, validation results, and any value that could not be verified. Do not deploy unless the user separately asks.
