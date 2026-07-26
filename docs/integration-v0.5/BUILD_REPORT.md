# Living Map Integration v0.5

Date: 2026-07-26

## Locked Boundary

- The approved professional landing page remains the production root.
- Its existing footer doorway now opens `/universe/#/sky`.
- The living map is built inside `homepage/universe/`.
- The rejected React CV doorway is not exposed from the living map.
- The Snow Globe remains a destination inside the same universe.

## Claude Work Incorporated

The original `starfield-sketch.html` was recovered from Claude's local session
record before implementation. Its accepted rule is now part of the living map:

- Resting state: warm white paper, black ink, sparse celestial bodies.
- Awakened state: attention reveals a connected neighborhood.
- Related bodies receive soft watercolor atmosphere behind the line art.
- Relationship strength controls line weight.
- Cross-cluster bridges use moving dashed paths.
- Small signals travel continuously along relationships.
- Active lenses color the relationship spectrum without changing the white sky.

This behavior was added to the existing React map. It did not replace the
current bodies, lens instrument, auto-spin, transport, orbiting artifacts,
world scenes, or Snow Globe.

## Deployment

The GitHub Pages workflow now:

1. Installs the locked pnpm dependencies.
2. Builds Vite with the `/universe/` base path.
3. Writes the application to `homepage/universe/`.
4. Publishes the approved homepage and living map as one artifact.

The repository's Pages source is set to GitHub Actions. The older branch-based
publisher is disabled so it cannot overwrite the built artifact after a push.

## Verification

- 19 unit tests pass.
- Production TypeScript and Vite build passes.
- Landing doorway reaches `/universe/#/sky`.
- Direct visits to `/universe/` open the sky instead of the retired CV doorway.
- Continuous relationship motion was measured across animation frames.
- Snow Globe route, controls, and discovery markers remain intact.
- The mobile map remains vertically scrollable at 390 by 844.

Screenshots:

- `screenshots/locked-landing-page.jpg`
- `screenshots/desktop-awakened-healthcare.jpg`
- `screenshots/desktop-snow-globe.jpg`
- `screenshots/mobile-awakened-network.jpg`

## Still Missing

- The final approved replacement glyphs from the other design tasks.
- The real laminated PREP/PERP card assets. Current source material is still
  document-based and should not be presented as the finished tool.
- Final authored blurbs, links, reviews, and photo satellites for most worlds.
- A dedicated animation-polish pass after the remaining source art is curated.
