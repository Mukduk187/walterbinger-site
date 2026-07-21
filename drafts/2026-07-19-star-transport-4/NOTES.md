# 2026-07-19 Star Transport 4

This pass responds to the latest visual/interaction feedback: points needed to read as stars, the photos needed more presence, and travel needed to feel like transport again.

- Added a hand-drawn star mark to every star point, with rays and a filled center, so the base map no longer reads as dots.
- Added a `jump-tunnel` overlay and stronger stage zoom/blur during travel.
- Added arrival settling so entering a world has a beginning, middle, and landing.
- Hid the old world panel and dock during world-to-world jumps, so transport does not feel like a label/image swap.
- Kept local-origin behavior: inside a world, the current world is the only active origin.
- Made pins visually quiet in world mode, preserving them as landing-sky choices without letting them dominate travel.
- Re-enabled the world feature image as a captionless visual artifact.
- Enlarged dock images to 96px desktop and 78px mobile, with stronger hover/focus scaling.
- Moved the mobile `sky` button to the right so it clears the world title.
- Asset cache-bust updated to `20260719-star-transport-4`.

Still not solved:

- The connection grammar is still not fully conceptualized. Lines now draw better and stars now read correctly, but the next pass should define why each constellation draws a specific symbol from a specific point of view.

QA screenshots saved in `/screenshots/`:

- `2026-07-19-star-transport-healthcare-pinned.png`
- `2026-07-19-star-transport-midjump.png`
- `2026-07-19-star-transport-healthcare-world.png`
- `2026-07-19-star-transport-world-hop-midjump.png`
- `2026-07-19-star-transport-maine-world.png`
- `2026-07-19-star-transport-mobile-healthcare-world.png`
