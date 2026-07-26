# Integration v0.7 - Content Homes and Tattoo Heart

## Scope

This draft adds construction infrastructure without changing the approved
professional landing page or inventing project art.

## Content Library

- Added one content home for each of the 13 authored worlds.
- Every world has `media`, `writing`, `artifacts`, `presentations`, and `links`
  intake lanes plus a machine-readable manifest.
- Added deeper shelves for writing drafts/notes/publications, travel-photo
  collections, and the Empanadas Son presentation workflow.
- Added tests that keep the folder catalog aligned with the live topology.

Private source archives are not copied into the public repository.

## Tattoo Heart

The original anatomical-heart tattoo photograph was recovered from Photos and
stored privately at:

`Reference Library/03_WALTER_ARTIFACTS/Tattoo_References/sylvia-anatomical-heart-tattoo-source.jpeg`

The red Hospitality & Care lens now arranges all 13 authored worlds as major
points in that tattoo. Helper stars complete the vessels and the curled human
figure. Curved segments preserve the source's organic line grammar.

Constellation selection is priority-aware:

- Red activates the tattoo heart.
- Red + Green activates the more specific Healthcare scales instead.

## Selection Treatment

- Removed the circular aura drawn around relevant/selected objects.
- Removed rectangular SVG focus outlines from celestial objects.
- Kept keyboard focus visible through a glow that follows the object linework.
- Pinning, multiple selection, orbiting artifacts, and Explore behavior are
  unchanged.

## Verification

- `pnpm run check`: 29 tests passed, TypeScript passed, production build passed.
- `pnpm run test:e2e`: 8 production-shaped Playwright journeys passed across
  desktop and mobile.
- The browser harness now serves the approved homepage at `/` and the living
  map at `/universe/`, matching the deployed architecture.
- Browser desktop: red lens formed `tattoo-heart` with 34 curved segments and
  18 helper stars; no body aura elements remained.
- Browser interaction: Empanadas Son pinned with no rectangular focus outline.
- Browser priority: Red + Green replaced the heart with `healthcare-scales`.
- Browser mobile: 390 x 844 rendered the complete heart in the existing
  vertically scrollable sky.
- Console: no relevant warnings or errors.

The build retains the existing Vite chunk-size advisory; it is not a runtime or
deployment failure.
