# Living Map Content Library

This directory is the website-ready collection layer. It keeps each world's
approved material in one predictable place without publishing the private
reference archive by accident.

Each world uses the same five intake lanes:

- `media/` - curated photographs, video, audio, and approved derivatives
- `writing/` - essays, captions, case studies, and transcripts
- `artifacts/` - menus, cards, drawings, scans, tools, and other proof
- `presentations/` - decks and presentation source material
- `links/` - review, press, portfolio, and source-link records

Original personal files remain immutable in the external reference library.
Only approved, website-ready copies should land here. Every world has a
`manifest.json` recording its source locations and curation status.

The first deeper intake shelves are already prepared:

- `library-writing/writing/{drafts,notes,published}`
- `photo-archive/media/{argentina,travel,brooklyn-nyc,maine,burning-man,nimbus,fire-in-balance,tables-workshop}`
- `empanadas-son/presentations/{source,drafts,published}`

`content/worlds/catalog.json` is the machine-readable index. Its world IDs must
stay aligned with `src/data/bodies.ts`.
