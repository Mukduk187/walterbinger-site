# Living Map v0.6 — Frequency Gravity and Healthcare Scales

Date: 2026-07-26

## Locked Boundary

- The approved landing page remains the production front door.
- No visible landing-page layout, copy, imagery, or styling changed.
- This draft changes the living map under `/universe/`.
- The landing page received machine-readable `Person` metadata only.

## What This Draft Adds

### Frequency gravity

- The living map now uses a persistent three-dimensional force simulation.
- Lens relevance controls each star's distance from the observable center.
- Multiple lenses use each star's composition to create directional pull.
- Authored relationships act as springs; stronger affinities settle closer.
- Repulsion and collision preserve breathing room.
- Velocity limits turn lens changes into slides instead of cuts.
- World-space trails briefly record movement and disappear after settling.
- Hover and selection do not recreate the simulation.

### Healthcare scales

Care (`red`) plus Systems & Stewardship (`green`) now reveals the first major
three-dimensional constellation:

- Healthcare: fulcrum
- Professional Archive: left beam anchor
- Thinking in 4D: right beam anchor
- Hospitality: left pan anchor
- PREP / PERP Field Tools: right pan anchor

Helper stars complete the crown, suspension lines, pans, stem, and base. They
exist to finish the drawing without inventing additional projects. The ordinary
relationship web quiets while the scales are visible so the image is created by
the connections instead of being lost behind them.

The constellation has real depth. Dragging the sky rotates it from a readable
front view into an edge-on view; entering Healthcare recenters the same geometry
from Healthcare's position.

## ChatGPT Discovery

`robots.txt` now explicitly:

- allows `OAI-SearchBot` for ChatGPT search discovery;
- allows `ChatGPT-User` for user-requested page visits;
- blocks `GPTBot`, keeping search/view access separate from model training;
- points crawlers to `https://walterbinger.com/sitemap.xml`.

The living map also has a canonical URL and descriptive Open Graph metadata.
GitHub Pages has no separate WAF or bot challenge to allowlist.

## Verification

- 24 unit tests pass across 10 test files.
- TypeScript production build passes.
- Desktop: resting sky, two-lens formation, settled scales, 3D drag, and
  Healthcare transport verified in the in-app browser.
- Mobile portrait at 390 x 844 verified with the existing scrollable universe.
- Browser console: no relevant errors or warnings.
- Reduced motion retains static constellation geometry and suppresses trails.

## Next Approved Extensions

1. Add another major constellation from already approved imagery rather than
   generalizing a procedural symbol generator.
2. Curate exact constellation membership and lens weights in content data.
3. Give helper stars their own tiny flash-art vocabulary.
4. Build a quiet pull-back control that makes the ontology visible again after
   entering a world.

Git history is the versioned draft archive. This report is the handoff record
for Blue Team, Red Team, Claude, Scout, and future Codex tasks.
