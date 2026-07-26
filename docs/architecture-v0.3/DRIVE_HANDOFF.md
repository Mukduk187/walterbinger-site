# WALTron Living Map Handoff — Content Skeleton v0.3

## Decision

The website task owns the durable instrument. A separate task owns the detailed
PREP / PERP program and product design.

PREP / PERP remains a first-class project world in the living map, but the
website does not infer or fabricate its interface.

## Implemented

- Removed the unverified field-board draft from the live runtime.
- Preserved that draft and its screenshots for reference.
- Restored one shared route grammar for projects: `#/world/:id`.
- Separated world content from celestial topology.
- Linked the PREP / PERP world to five verified authored sources.
- Added explicit content slots for the future interactive surface, field-card
  artifacts, and case studies.
- Added unit, production-build, desktop-browser, and mobile-browser coverage.

## Source Correction

`PREP 07` is the seventh field tool, the Five-Minute Learning Huddle. It is not
evidence of a software version called `v7`.

The local `/Users/WALtron/Documents/PERP` application is an unverified draft. It
is not evidence of Walter's remembered colorful constellation-board prototype.

## Continuation

The PREP / PERP task should return:

1. approved source files and their canonical Drive links
2. the actual interaction model for the field cards
3. visual source material or an explicitly approved reconstruction brief
4. which existing content slots it fills
5. whether the generic world remains sufficient or a project-specific surface
   is genuinely required

Website construction should continue through `src/data/worldContent.ts` and the
shared world shell unless an approved interaction cannot be expressed there.

## Verification

- 19 unit tests pass.
- 8 Playwright journeys pass across desktop and mobile.
- Production TypeScript and Vite build passes.
- Review screenshots:
  - `screenshots/desktop-field-tools-world.png`
  - `screenshots/mobile-field-tools-world.png`
