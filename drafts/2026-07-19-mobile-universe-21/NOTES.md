# Mobile Universe 21

Saved on 2026-07-19 after the first spectral-beacon mobile screenshot revealed that the desktop map was being squeezed into a horizontal strip.

## Changes

- Mobile switches from the 1200 x 760 desktop map to a 620 x 1480 coordinate frame.
- Existing relationship positions are projected vertically without stretching the artwork itself.
- The mobile page is deliberately taller than the viewport and scrolls vertically.
- The name and lens controls are part of the page rather than permanently fixed over the scrolling sky.
- Expanding an edge star shifts its preview toward the screen center.
- Mobile satellite radii scale to the available width so Art's three approved images and Explore control remain visible.
- The transport tunnel now calculates its origin from the clicked object's actual viewport position, including after scrolling.

## Preserved

- Spectral-beacon size and twinkle behavior from draft 20.
- The approved Empanadas, Son! outline.
- The Art hand's multiple satellites.
- Desktop coordinates and motion.

## Verification

- Tested at 390 x 844.
- The document scrolls vertically with no horizontal overflow.
- The star field spans 461 CSS pixels vertically in the mobile projection.
- Art expands with all three satellite frames and Explore inside the viewport.
- No broken loaded images or console warnings were observed.
