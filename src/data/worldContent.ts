import type { WorldContentDefinition } from "../domain/content";

export const WORLD_CONTENT = {
  "field-tools": {
    nodeId: "field-tools",
    status: "seeded",
    resources: [
      {
        id: "prep-complete-field-kit",
        label: "PREP Beta 1.0 — Complete Field Kit",
        kind: "tool",
        href: "https://docs.google.com/document/d/1d6e135C203qSSBP1gL6vJCGL4j3gItdRGcOuE9wJ1ok/edit",
        description:
          "The ten-card field kit and its Notice, Name, Map, Repair, Return loop.",
        external: true,
      },
      {
        id: "prep-field-signal-card",
        label: "PREP 03 — Field Signal Card",
        kind: "tool",
        href: "https://docs.google.com/document/d/1yQjoe7EYyoUpJSZe82aTBbluI3vHvv_LRHfsnDFqaDM/edit",
        description:
          "A field tool for naming recurring system signals without defaulting to blame.",
        external: true,
      },
      {
        id: "prep-perp-architecture",
        label: "PREP / PERP Closed-Circuit Architecture",
        kind: "document",
        href: "https://docs.google.com/document/d/1R4UZj36SiO1VrYy0qd3WVEMwGDayOnh8XmtzLThBKoM/edit",
        description:
          "The authored relationship between field signal, leadership action, repair, proof, and system learning.",
        external: true,
      },
      {
        id: "perp-decoder-mode",
        label: "PERP Decoder Mode — PREP Field Mapping",
        kind: "document",
        href: "https://docs.google.com/document/d/1xubWmeI057D4tMTHn9bhO9fzQnZLcL4jZehmF5TB86M/edit",
        description:
          "The mapping between field-safe PREP language and the PERP executive view.",
        external: true,
      },
      {
        id: "prep-system-integrity-pilot",
        label: "PREP System Integrity Pilot Tool",
        kind: "tool",
        href: "https://docs.google.com/spreadsheets/d/1F0P8uNzVGOVVZgMLqszL36S5YacFoWZa75fKbBXn-pE/edit",
        description:
          "The current diagnostic, observation, routing, review, and learning workbook.",
        external: true,
      },
    ],
    slots: [
      {
        id: "prep-perp-interactive",
        kind: "tool",
        status: "curation-needed",
        label: "Interactive PREP / PERP field surface",
      },
      {
        id: "prep-field-cards",
        kind: "artifact",
        status: "available",
        label: "PREP field cards",
      },
      {
        id: "prep-perp-case-studies",
        kind: "writing",
        status: "planned",
        label: "Field cases and validated repairs",
      },
    ],
  },
  "thinking-in-4d": {
    nodeId: "thinking-in-4d",
    status: "curating",
    resources: [
      {
        id: "thinking-in-4d-note",
        label: "Thinking in 4D",
        kind: "writing",
        href: "#/world/thinking-in-4d",
        description:
          "Working notes on perspective, systems, and what changes when the observer moves.",
      },
    ],
    slots: [
      {
        id: "thinking-in-4d-essays",
        kind: "writing",
        status: "curation-needed",
        label: "Essays and working notes",
      },
    ],
  },
  "library-writing": {
    nodeId: "library-writing",
    status: "seeded",
    resources: [
      {
        id: "cosmology-living-master",
        label: "Cosmology & Design Bible — Living Master",
        kind: "writing",
        href: "https://docs.google.com/document/d/1lBfT_3gdxaKCt6-fOLVdUgSzFq8Zmh9ZsK4G8WLPis0/edit",
        description: "The living construction record for this universe.",
        external: true,
      },
    ],
    slots: [
      {
        id: "library-essays",
        kind: "writing",
        status: "curation-needed",
        label: "Published and working essays",
      },
      {
        id: "library-project-records",
        kind: "document",
        status: "planned",
        label: "Project records",
      },
    ],
  },
} as const satisfies Record<string, WorldContentDefinition>;

export function getWorldContent(
  nodeId: string,
): WorldContentDefinition | undefined {
  return WORLD_CONTENT[nodeId as keyof typeof WORLD_CONTENT];
}
