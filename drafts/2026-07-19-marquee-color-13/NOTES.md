# 2026-07-19 Marquee Color 13

Starting point: `2026-07-19-orbit-wheel-11` / `2026-07-19-astro-ink-10`.

## What Changed

- Removed remaining ghost-line behavior by hiding the soft spectral rings and the blurred relation wash.
- Changed active spectrometer objects from stacked colored outlines into a calmer marquee effect: colored dash segments travel through the glyph while black linework fades almost completely back.
- Reversed the color dash movement direction relative to the photo satellite orbit.
- Slowed the color dash movement and increased dash spacing so the effect reads more like a sign turning on and less like visual noise.
- Added a test version of Gratitude as a central field: when active, it quietly connects every object and gives every object at least a low warm hue.
- Kept the Gratitude/Love idea non-final and unlabeled in the drawing itself.

## Verified

- `script.js` passes `node --check`.
- Local server returns `200` for `/?v=20260719-marquee-color-13`.
- Browser QA found no console errors or warnings.
- Gratitude-only state renders one central field and all nine objects receive a spectrum state.
- Art locked with multiple lenses renders one orbiting photo, an Explore button, no visible relation wash, no visible spectral rings, and a subdued black registration layer.
- Explore transport still reaches the Art world.
- World ground art remains white, with no filter on the scene linework.
- Mobile check at `390x844` keeps the single orbiting photo and Explore button from overlapping.

## Screenshots

- `screenshots/2026-07-19-marquee13-gratitude-field.png`
- `screenshots/2026-07-19-marquee13-art-locked-lenses.png`
- `screenshots/2026-07-19-marquee13-art-world.png`
- `screenshots/2026-07-19-marquee13-mobile-art-locked.png`

## Taste Notes

- The central Gratitude heart/field may still be too literal; useful as a prototype proof, not a settled symbol.
- The multi-lens connector art is calmer than before, but still visually dense when many lenses are active at once.
- Next pass may need a more elegant way to let connection drawings appear without filling the whole page.
