# Curated contour 16

- Uses the Carne empanada drawing from Walter's original Empanada's Son! menu as the star artwork.
- Removes the scanned white page dynamically while preserving the original dark tonal values.
- Restricts spectral color to the outer silhouette and Keith Haring-like movement marks; interior details are never redrawn in color.
- Uses a paper-colored backing to stop fluorescent light from tinting the original interior artwork.
- Removes the generic ink-knot squiggles so distant stars are compressed versions of their actual current drawings.
- Aligns the SVG star, HTML Explore control, and photo satellites to the same measured screen coordinate.
- Adds attended-object zoom and non-overlapping art/name/Explore/satellite spacing on desktop and mobile.

Authorship rule established in this pass: curate Walter's existing art first; create new art only through explicit collaboration; keep placeholders honest in the meantime.

QA:

- Desktop viewport: no overlap between artwork, two-line name, Explore, or satellite.
- Mobile viewport (390 x 844): no overlap between artwork, name, Explore, or satellite.
- Five simultaneous lenses: color layers contain outer contour and movement marks only; zero colored interior detail paths.
- Original menu asset loaded from `assets/artifacts/empanada-menu.png`.
- No generic ink knots rendered.
- No console errors or warnings.

Screenshots:

- `screenshots/2026-07-19-curated-contour16-empanada.png`
- `screenshots/2026-07-19-curated-contour16-mobile-empanada.png`
