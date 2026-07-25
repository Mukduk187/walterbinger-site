# WalterBinger.com

Walter Binger's professional site and living map.

The public front door is a restrained professional profile. Its constellation
mark opens a relative, lens-driven map of projects, places, writing, tools, and
artifacts. The architecture is durable; the exhibition is intended to grow.

## Local Development

```bash
pnpm install
pnpm run dev
```

The default local URL is `http://127.0.0.1:5173/`. The Codex working preview
uses port `8765`.

## Verification

```bash
pnpm run check
pnpm run test:e2e
```

`check` runs the domain/state tests and the production build. The Playwright
suite covers the professional doorway, PREP resources, lens behavior, world
travel, Gratitude convergence, and the Snow Globe on desktop and mobile.

## Publishing

GitHub Pages publishes the Vite `dist/` artifact from `main` through
`.github/workflows/deploy.yml`. The production artifact includes the custom
domain declaration for `walterbinger.com`.

Current construction notes and visual records live in
`docs/foundation-v0.1/`. Historical cosmology prototypes are preserved on the
`cosmology-wip` branch.
