# 2026-07-19 Tattoo Reveal 2

## What Changed

- Keeps the white-sky map and makes each object read as a small flash/tattoo drawing at rest instead of a plain dot.
- Hovering an object enlarges its glyph and floats a small photo stack into view; moving away clears it.
- Single-click locks objects on, and multiple objects can stay locked at the same time.
- Locked objects get an `Explore` button beneath their floating image stack.
- Explore triggers the zoom-cut transport and then recenters the universe around that object as local origin.
- Lens buttons now behave more like a spectrometer: active lenses tint the observed and related objects through spectral aura rings.
- Delays hover re-render slightly so hover reveal does not steal click intent.

## Verified

- Desktop initial load, hover reveal/clear, multi-lock, Explore transport, and Art world landing.
- Mobile Art lock state at 390x844.
- `node --check script.js` passes.
- No relevant console errors in Playwright Chrome fallback.
- Removed the explicit explanatory star-field copy.

## Still Not Final

- The constellation image grammar still needs a stronger pass so each lens draws a clear symbol rather than a loose overlay.
- Mobile scale and star placement are coherent but too small to feel fully intentional yet.
- The real image archive still needs proper curation.
