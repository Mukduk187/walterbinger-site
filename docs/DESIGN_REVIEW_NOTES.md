# WalterBinger.com Design Review Notes

Date: 2026-07-18

These notes review the current repo, the design handoff text, and Walter's 2026 resume. They are meant to keep the next build from treating the current dark prototype as the approved direction.

Authority note: `docs/WALTER_DIRECTIVES.md` is the precedence layer. Walter's direct commands and Walter-authored attachment guidance override Scout/ChatGPT commentary and any synthesis in this file.

Update 2026-07-19: the later "custom business card" prototype is also rejected. The current homepage mechanic is now documented in `docs/HOMEPAGE_MECHANIC_NOTES.md`: a sparse star field where attention reveals flash-tattoo-like drawings, lens-based constellations, and navigable worlds. That note supersedes the business-card direction.

## Current Status

The repo currently contains a static prototype:

- `index.html`
- `styles.css`
- `script.js`
- `assets/casting-hand.jpg`
- `assets/hero-systems-map.png`

This prototype is useful as content scaffolding only. It is not the approved visual direction.

The current implementation still reads as a dark "Proof Room" with role buttons, a staged artifact, bronze/gold accents, and cinematic depth. That direction has been rejected.

## What Is Worth Keeping

The current draft contains some useful raw material:

- The proof inventory is real: Empanadas, Son!, Circus RestoBar, Nimbus, healthcare operations, Board Room, Village Commons, writing.
- The operating pattern is close: listen before naming, show the work, build the rhythm, leave it usable.
- The contact framing is close: Walter is useful in hard, messy rooms.
- The writing section has the right job: show the mind at work, not "explain the brand."
- The resume gives the recruiting spine: disrupted environments, earned trust, practical tools, adoption, accountability, and field reality.

Do not throw away the substance. Throw away the staged presentation.

## What Needs To Change

The current site overexplains and over-symbolizes Walter.

Specific misses:

- The "Thinker / Creator / Leader / Operator / Writer" controls make identity feel like a branding interface.
- "Proof Room" and "proof" language appears too early and too often.
- The casting photo becomes too literal as a hero object. It should inform texture and philosophy, not sit onstage as a symbol.
- The dark palette, grid planes, bronze accents, and 3D staging drift toward occult, cinematic, or self-important.
- The copy occasionally announces profundity before the visitor has discovered anything.

The next version should make the visitor conclude things rather than be told what to conclude.

## Resume Translation

The resume's strongest sentence is:

> I'm a culturally fluent operations systems leader with 15+ years of experience walking into disrupted environments, earning trust quickly, implementing practical tools, and turning messy field reality into workflows people actually use.

For the website, this should be compressed into a human opening spine, not copied verbatim.

Possible direction:

> I build useful things in messy human systems.

Supporting evidence from the resume:

- Healthcare Services Group: 8 facilities, 100+ employees, high-risk account stabilization, audit tools, SOP resets, MealTracker implementation, roughly 32 surveys over 3 years with over 90% deficiency-free outcomes.
- LiveWell: 11-facility crisis assignment, approximately $45K/month deficit reversed in under 6 weeks.
- Island Nursing Home: crisis continuity, resident feedback loops, COVID response, relocation of approximately 70 residents.
- Entrepreneurship: hospitality launches across Brooklyn, the Lower East Side, and Buenos Aires; menus, buildout, staffing, POS workflows, vendors, guest experience, and daily service.

The site should let the resume remain sober and specific while the website shows the range, imagination, and connective tissue.

## Revised Creative Direction

The strongest current north star is:

> Walter and the Magenta Marker.

This points away from polished fantasy and toward loose, funny, sparse, handmade intelligence.

The homepage should feel more like an illustrated endpaper than a landing page:

- warm white paper
- soft black ink
- generous negative space
- simple line drawings
- one active magenta mark
- color appearing only through attention
- stars and lights connecting after exploration

The page begins simple. Attention makes it richer. Discovery reveals relationships.

Concise design law:

> White holds the whole spectrum. Black ink draws the visible world. Magenta connects what appears separate. Attention switches on the hidden colors one light at a time.

Use this as internal design logic. Do not put it all on the page as copy.

## Tone Rules

Keep:

- handmade
- funny
- sparse
- literate
- useful
- slightly unruly
- emotionally precise

Avoid:

- manifesto voice
- expensive mysticism
- tarot/card imagery
- dark celestial luxury
- ornate gold typography
- overexplained metaphors
- scene objects chosen only because they are clever
- color systems that become brand-token homework before the artwork exists

The site should whisper "look again" through behavior, not print it everywhere.

## Interaction Grammar

Every scene should support four states:

1. Blank: mostly warm paper.
2. Drawn: black linework sketches itself in.
3. Awake: hover, focus, or touch adds a small local color/light response.
4. Connected: several explored elements leave dim traces and reveal a route, relationship, phrase, or next scene.

Motion rules:

- The first scene should establish itself in about 3-4 seconds.
- Visitors should be able to interact before decorative drawing finishes.
- Color should stay scarce, local, and earned.
- Prefer SVG/path drawing, CSS stroke animation, and small DOM/SVG interactions before adding heavy canvas complexity.
- Reduced motion must show the complete line drawing immediately, with static focus/hover/discovery states.
- Keyboard and touch interactions need first-class treatment.

## Homepage Structure Recommendation

Do not lead with roles. Lead with a world and a useful sentence.

Recommended first layer:

- One plain opening sentence about what Walter does.
- A sparse illustrated "endpaper" world.
- A small magenta mark that behaves like curiosity, route, correction, or intention.
- A few evidence doorways, framed as actions or artifacts rather than identity labels.

Possible doorways:

- Build
- Repair
- Gather
- Write
- Operate

Or:

- Work
- Notes
- Systems
- Rooms
- Contact

The best labels should be tested in the drawing. If they feel like a menu bar first and a world second, revise.

## Blueprint Notes

The handoff material is strongest when it gives buildable rules:

- default is line drawing on warm paper
- attention wakes color
- discovered points connect
- scenes should have a main anchor, 4-7 interactive elements, exits, and one hidden detail
- reduced motion is required

It is weakest when it explains the metaphor repeatedly.

Cut or demote:

- grand philosophical interpretations
- long lists of what the site is not
- fixed symbolic meanings for every color
- prewritten hover slogans
- overly specific scene objects before composition testing

Keep references as design calibration, not interface copy.

The Village Green may be a useful first scene, but its objects are not locked. The drawing should prove the scene before the blueprint hard-codes the objects.

## Precedent Library

Before another visual build, create a precedent library organized by design problem, not by "pretty references."

Recommended buckets:

- Linework: Shel Silverstein, Le Petit Prince, Harold and the Purple Crayon, Quentin Blake, field sketches.
- Interaction: sites or games where curiosity reveals hidden states without overwhelming the visitor.
- Childhood without childishness: children's museums, science exhibits, book endpapers, handmade educational displays.
- Maps and systems: constellations, infrastructure diagrams, root drawings, transit maps, field guides.
- Typography inside drawings: book titles, marginal notes, museum captions, hand-lettered labels.
- Motion: line drawing, marker movement, light points switching on, simple page-travel.
- Emotional calibration: images that immediately feel like "yes, that."

The goal is to give the build thread references that solve specific problems.

## Recommended Next Deliverable

Do not continue production code yet.

Next deliverable should be a blueprint package:

- desktop homepage sketch
- mobile homepage sketch
- default/hover/discovered/connected states
- arrival animation storyboard
- one transition storyboard
- typography shown inside the drawing
- reduced-motion version
- short build notes for implementation

The current website can stay as scaffolding until the blueprint is approved.

## Open Questions

1. What is the sentence Walter would say out loud to a serious person he respects if asked, "So what do you actually do?"
2. Is "Walter and the Magenta Marker" the working creative north star?
3. Should the first scene be The Village Green, or should that remain one candidate until the precedent library is built?
4. Which proof anchors must appear on the first screen for credibility: healthcare outcomes, Empanadas, writing, or the broader pattern?
5. Should the website begin as a recruitment credibility object, an interactive essay, or an illustrated archive? It can become all three, but the first screen needs one lead job.
