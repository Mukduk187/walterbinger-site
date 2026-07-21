# 2026-07-19 Spectral Dash 9

## Why This Draft Exists

This snapshot tightens the rule that each star should be the object itself, not an object with a generic star pasted on top of it.

The main visual move is: black tattoo/flash glyphs remain solid when no lens is active, then become moving black-and-color dash chains when the spectrometer lenses are turned on.

## Changes Captured

- Removed the generic star mark and center-dot overlay from rendered star objects.
- Stopped rendering the duplicate flash-label layer; names now live inside the enlarged glyph state.
- Added in-glyph names that appear on hover, lock, active state, and local-origin world view.
- Changed preview logic so photo satellites appear only after a star is locked, not on hover.
- Added image twinkle by animating the image itself, without superimposed star graphics.
- Added spectral dashwork clones so active lenses create moving colored chain strokes around each glyph.
- Kept black glyphs solid with no active lenses, then animated their black stroke dashes when any related lens is active.
- Made satellite photo angles edge-aware so stars near the left or right side keep their object center clear.
- Added spacing and mobile orbit sizing so Explore does not overlap thumbnails.

## Verified

- `script.js` passed syntax check with the bundled Node runtime.
- In-app browser loaded `http://127.0.0.1:8765/?v=20260719-spectral-dash-9`.
- Initial state had no generic `.star-mark`, no `.star-core`, no duplicate `.flash`, no previews, and solid glyph lines.
- Locked Art showed the in-glyph name, two loaded image satellites, image-level twinkle animation, and one Explore button.
- Hover/previews are structurally separated: `previewNodeIds()` now returns locked nodes only.
- With Argentina, Food, NYC, and Art active, Art used `spectralInk` on the black glyph and `spectralChain` on colored dashwork.
- Empanadas Son! registered high composition strength under the active lenses.
- Desktop and mobile Art locks kept photo frames in bounds and away from the object center.
- Explore landed in the Art world with `art` as the local origin.
- No relevant console warnings or errors were observed in the in-app browser pass.

## Still Unresolved

- The big lens constellation overlays can still get too visually loud when several lenses are active at once.
- The object-level spectrometer behavior is now distinct enough that the next pass can tune or simplify those big overlays without losing the lens idea.
- The visual language of large constellations still needs a better hand-drawn grammar.
