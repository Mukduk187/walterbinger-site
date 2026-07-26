# Living Map Content Architecture v0.3

## Boundary

This repository owns the durable website instrument:

- celestial topology, positions, relationships, and lenses
- shared navigation and world transitions
- reusable world, artifact, resource, and environment surfaces
- persistence, responsive behavior, accessibility, and tests

It does not invent the products, artworks, stories, or project-specific
interfaces placed inside those surfaces.

PREP and PERP are one project world within the larger map. Their program
definitions and interactive product surface are curated separately.

## Stable Layers

1. `content/worlds/` is the durable curation library. Every authored world has
   `media`, `writing`, `artifacts`, `presentations`, and `links` intake lanes,
   plus a manifest that records approved source locations.
2. `src/data/bodies.ts` is the topology registry. It describes where authored
   bodies live and how they relate.
3. `src/data/worldContent.ts` is the content registry. It links real resources
   and declares content slots that can be filled without changing navigation.
4. `src/components/LivingMapScene.tsx` is the shared world instrument. Every
   project enters through the same route grammar: `#/world/:id`.
5. `src/components/WorldResources.tsx` renders available tools, writing, and
   documents from the content registry.
6. Project-specific interfaces should be added only after their source
   material and interaction model are approved.

Private source archives, including Photos, Facebook exports, and the tattoo
reference, remain outside the repository. A file enters `content/worlds/` only
after it has been curated for publication.

## PREP / PERP Status

The website currently provides a real, functional doorway to authored source
material:

- PREP Beta 1.0 Complete Field Kit
- PREP 03 Field Signal Card
- PREP / PERP Closed-Circuit Architecture
- PERP Decoder Mode / PREP Field Mapping
- PREP System Integrity Pilot Tool

The interactive PREP / PERP surface remains `curation-needed`. Another task may
define it by updating the content registry or adding an approved project
component. It must not be inferred from document numbering or unrelated local
prototypes.

## Rejected Draft

The former dark field-board implementation is preserved under
`docs/rejected-drafts/field-board-v0.2/` and in commit `8a13255`. It is reference
material only. It is not an authored PREP / PERP design and is not part of the
live runtime.

## Continuation Protocol

When another task adds a project:

1. Create or update its folder and manifest under `content/worlds/`.
2. Identify the approved source files and record their links.
3. Add or update a `WORLD_CONTENT` entry.
4. Use existing content slots before adding a new surface.
5. Add project-specific UI only when the generic world cannot express the
   approved interaction.
6. Update tests and this handoff in the same change.

This keeps the architecture durable while the exhibition remains alive.
