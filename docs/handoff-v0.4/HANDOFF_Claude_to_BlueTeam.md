# Handoff — Claude → Blue Team (Codex) — 2026-07-26

## Walter's decision (LOCKED)
1. The **finalized professional landing page stays** as production. Do NOT overwrite it.
2. The **living-map build is ADDED underneath** — entered *from* the landing page (the "something coming underneath" door). It never replaces the landing page.

## Current production state (walterbinger.com)
- Live = the approved **static homepage**, published from the `homepage/` folder by `.github/workflows/deploy.yml` (GitHub Pages via Actions).
- Restored at commit **`3d18c29`** on `main`, recovered from last-good production **`6adfa23`**.
- `homepage/` contains: `index.html`, `styles.css`, `script.js`, `walter-hero.jpg`, `walter-portrait.jpg`, `Walter-Binger-CV-2026.pdf` + 3 role resumes, `robots.txt`, `sitemap.xml`, `wonderland.html`, `CNAME`.
- ⚠️ The deploy publishes `homepage/`. Do not let a Vite build overwrite `homepage/index.html`.

## Why this handoff exists
Earlier in this session a merge published the React app's bare doorway *over* the polished homepage. It has been fully reverted (above). The lesson: **build the map as a subpath, never over the homepage.**

## The living-map build (Claude's work) — where it lives
- Source: `src/` (React 19 + Vite + Zustand + Motion + Zod). Branch **`codex/living-map-foundation`**, tip **`a672e5b`**.
- Routes: `#/` doorway · `#/sky` · `#/world/:id` · `#/convergence` · `#/snow-globe`.
- Builds clean: `pnpm run check` = 19 unit tests + production build pass.
- Interactive demo sketch (awakening feel): published Artifact — https://claude.ai/code/artifact/030a178b-e85c-4ad6-992d-563fff198cbc

### Claude's changes this session (in `a672e5b`)
- **Auto-spin / pause toggle** in the lens instrument. Sky drifts by default (persisted, reduced-motion safe, sky-mode only).
- **Constellation lines**: thinner, more curved ("astrological"), tinted in the active elemental lens color.

## What Blue Team does next — INTEGRATION, not rebuild
1. Give the Vite app a base path: `base: '/universe/'` in `vite.config.ts` (or `/map/`).
2. `vite build` → copy output into `homepage/universe/`.
3. Add a link/door on the landing page's "something coming underneath" → `/universe/`.
4. Update `deploy.yml` to build the app into `homepage/universe/` and keep publishing `homepage/` (so homepage + map deploy together).
5. Homepage `index.html` stays the front door. Never publish the app over it.

## Open punch-list (from Walter)
- ✅ Universe drift + auto-spin toggle (`a672e5b`)
- ✅ Constellation lines thinner / curved / elemental (`a672e5b`)
- ☐ **Color blend, not rigid**: per-star elemental hue + gradient *between* the two stars' colors (InfraNodus look)
- ☐ **Each star expandable**: blurb + info + orbiting satellite images. Engine already supports it (pin → orbit; explore → world) — needs CONTENT in `src/data/worldContent.ts`, not new code.
- ☐ **Red lens = exact heart tattoo linework** (Sylvia's arm). RECOVER + vectorize the real photo — never redraw/AI-reinterpret. Photo shared in chat; needs to land on disk (reference-library inbox).
- ☐ "One image, not two" rotating hue — appears already resolved in the React build; confirm.
- ☐ Transportation / movement animation polish.
- ☐ **PREP/PERP**: recover the finished laminated field-card system + the colorful interactive constellation board (missing APPROVED assets to recover, not fabricate). Currently only Google Doc links.

## Assets available now (on disk / Drive)
- Local reference library (~222 images): `~/Desktop/WalterBinger.com Reference Library`
- Facebook export: 37 photos (`nimbus`, `burning-man`, `table`) under `03_WALTER_ARTIFACTS/Facebook_Export_Private`
- Drive curated web-named set (folder id `1iPHEcESeZpBYanIK5Zgko38c9BkxsisJ`): `disney-nimbus-installation`, `art-casting-hand`, `maine-water`, `art-the-sun`, `art-magic-crayon-concept`, `restaurant-empanada-menu`, `systems-hero-map`, etc.
- In repo already: `public/assets/source/empanadas-son/*`, plus `homepage/walter-portrait.jpg`, `homepage/walter-hero.jpg`

## Canon (authority order in `docs/foundation-v0.1/CANON_SOURCES.md`)
Walter's decisions → Codexter Integration Brief v0.4 → Cosmology & Design Bible (Living Master) → Foundation Build Blueprint → Constellation Registry & Build Queue → Concept Art Reference Pack.
Locked: 8-lens order (Red Hospitality/Care → Magenta Exploration/Faith); Violet+Magenta=Collaboration; Green+Indigo+Violet=Legacy; all 8=Gratitude/electrum.

## Deploy mechanics (important)
- Push to `main` triggers `deploy.yml`. This automated environment has **no GitHub push credentials** — Walter pushes via **GitHub Desktop (⌘P)**, or caches a token in the macOS keychain to let automation push.
