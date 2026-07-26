import { generateAmbientStars, generateEmergingBodies } from "../domain/ambient";
import {
  type CelestialNode,
  type LensWeights,
  type Vector3,
} from "../domain/cosmology";

function weights(
  red: number,
  orange: number,
  yellow: number,
  green: number,
  blue: number,
  indigo: number,
  violet: number,
  magenta: number,
): LensWeights {
  return { red, orange, yellow, green, blue, indigo, violet, magenta };
}

interface AuthoredBodyInput {
  id: string;
  label: string;
  kind: CelestialNode["kind"];
  state: CelestialNode["state"];
  position: Vector3;
  lensWeights: LensWeights;
  importance: number;
  route: string;
  glyphKey: string;
  relatedNodeIds: string[];
  motionClass: CelestialNode["motionClass"];
  artifacts?: CelestialNode["artifacts"];
}

function authoredBody(input: AuthoredBodyInput): CelestialNode {
  return {
    id: input.id,
    kind: input.kind,
    state: input.state,
    tier: "authored",
    publicLabel: input.label,
    internalLabel: input.label,
    basePosition: input.position,
    lensWeights: input.lensWeights,
    importance: input.importance,
    inspectable: true,
    route: input.route,
    glyphKey: input.glyphKey,
    motionClass: input.motionClass,
    relatedNodeIds: input.relatedNodeIds,
    projectIds: input.kind === "project" ? [input.id] : [],
    conceptIds: input.kind === "concept" ? [input.id] : [],
    artifactIds: input.artifacts?.map((artifact) => artifact.id) ?? [],
    constellationIds: [],
    mysteryTags: [],
    artifacts: input.artifacts,
  };
}

export const AUTHORED_BODIES: readonly CelestialNode[] = [
  authoredBody({
    id: "cv-archive",
    label: "Professional Archive",
    kind: "world",
    state: "world",
    position: { x: -840, y: -390, z: 220 },
    lensWeights: weights(0.62, 0.55, 0.22, 0.92, 0.58, 0.42, 0.84, 0.51),
    importance: 0.92,
    route: "professional-archive",
    glyphKey: "archive",
    relatedNodeIds: ["healthcare", "hospitality", "library-writing"],
    motionClass: "stable",
  }),
  authoredBody({
    id: "brooklyn",
    label: "Brooklyn / NYC",
    kind: "place",
    state: "world",
    position: { x: -1040, y: 260, z: -180 },
    lensWeights: weights(0.66, 0.57, 0.7, 0.46, 0.72, 0.86, 0.96, 0.72),
    importance: 0.86,
    route: "brooklyn",
    glyphKey: "bridge",
    relatedNodeIds: ["empanadas-son", "hospitality", "photo-archive"],
    motionClass: "orbital",
  }),
  authoredBody({
    id: "maine",
    label: "Maine",
    kind: "place",
    state: "world",
    position: { x: -440, y: 820, z: 360 },
    lensWeights: weights(0.48, 0.42, 0.65, 0.94, 0.8, 0.68, 0.58, 0.74),
    importance: 0.78,
    route: "maine",
    glyphKey: "pine",
    relatedNodeIds: ["photo-archive", "sports-playbook"],
    motionClass: "orbital",
  }),
  authoredBody({
    id: "argentina",
    label: "Argentina",
    kind: "place",
    state: "world",
    position: { x: 180, y: 980, z: -360 },
    lensWeights: weights(0.78, 0.62, 0.84, 0.45, 0.7, 0.98, 0.91, 0.82),
    importance: 0.9,
    route: "argentina",
    glyphKey: "sun-of-may",
    relatedNodeIds: ["hospitality", "empanadas-son", "photo-archive"],
    motionClass: "orbital",
  }),
  authoredBody({
    id: "hospitality",
    label: "Hospitality",
    kind: "world",
    state: "world",
    position: { x: 840, y: 660, z: 260 },
    lensWeights: weights(0.96, 0.92, 0.88, 0.72, 0.62, 0.66, 0.92, 0.65),
    importance: 1,
    route: "hospitality",
    glyphKey: "doorway",
    relatedNodeIds: [
      "cv-archive",
      "brooklyn",
      "argentina",
      "empanadas-son",
      "healthcare",
    ],
    motionClass: "stable",
  }),
  authoredBody({
    id: "healthcare",
    label: "Healthcare",
    kind: "world",
    state: "world",
    position: { x: 1110, y: -10, z: -220 },
    lensWeights: weights(1, 0.62, 0.55, 1, 0.66, 0.28, 0.86, 0.54),
    importance: 1,
    route: "healthcare",
    glyphKey: "balance",
    relatedNodeIds: [
      "cv-archive",
      "hospitality",
      "thinking-in-4d",
      "field-tools",
    ],
    motionClass: "stable",
  }),
  authoredBody({
    id: "field-tools",
    label: "PREP / PERP Field Tools",
    kind: "project",
    state: "world",
    position: { x: 560, y: -430, z: 690 },
    lensWeights: weights(0.86, 0.74, 0.28, 1, 0.54, 0.42, 0.92, 0.78),
    importance: 0.94,
    route: "field-tools",
    glyphKey: "field-tools",
    relatedNodeIds: ["healthcare", "thinking-in-4d", "library-writing"],
    motionClass: "stable",
  }),
  authoredBody({
    id: "thinking-in-4d",
    label: "Thinking in 4D",
    kind: "essay",
    state: "world",
    position: { x: 960, y: -720, z: 420 },
    lensWeights: weights(0.42, 0.66, 0.34, 0.78, 0.92, 0.58, 0.88, 1),
    importance: 0.94,
    route: "thinking-in-4d",
    glyphKey: "torus",
    relatedNodeIds: [
      "healthcare",
      "library-writing",
      "listening-room",
      "field-tools",
    ],
    motionClass: "warp",
  }),
  authoredBody({
    id: "empanadas-son",
    label: "Empanadas Son!",
    kind: "project",
    state: "world",
    position: { x: 230, y: -980, z: -290 },
    lensWeights: weights(0.82, 0.96, 1, 0.68, 0.52, 0.82, 0.88, 0.72),
    importance: 1,
    route: "empanadas-son",
    glyphKey: "empanadas-sun",
    relatedNodeIds: ["brooklyn", "argentina", "hospitality"],
    motionClass: "orbital",
    artifacts: [
      {
        id: "empanada-beef-burgundy",
        label: "Beef Burgundy menu drawing",
        src: "/assets/source/empanadas-son/beef-burgundy.png",
      },
      {
        id: "empanada-verduras",
        label: "Verduras menu drawing",
        src: "/assets/source/empanadas-son/verduras.png",
      },
      {
        id: "empanada-smores",
        label: "S'mores menu drawing",
        src: "/assets/source/empanadas-son/smores.png",
      },
      {
        id: "empanada-carne",
        label: "Carne menu drawing",
        src: "/assets/source/empanadas-son/carne.png",
      },
      {
        id: "empanada-apple-pie",
        label: "Apple pie menu drawing",
        src: "/assets/source/empanadas-son/apple-pie.png",
      },
    ],
  }),
  authoredBody({
    id: "library-writing",
    label: "Library / Writing",
    kind: "world",
    state: "world",
    position: { x: -360, y: -900, z: 480 },
    lensWeights: weights(0.42, 0.58, 0.56, 0.72, 0.8, 0.48, 0.98, 0.92),
    importance: 0.84,
    route: "library-writing",
    glyphKey: "book",
    relatedNodeIds: [
      "cv-archive",
      "thinking-in-4d",
      "listening-room",
      "field-tools",
    ],
    motionClass: "stable",
  }),
  authoredBody({
    id: "listening-room",
    label: "Listening Room",
    kind: "world",
    state: "world",
    position: { x: -930, y: -720, z: -430 },
    lensWeights: weights(0.56, 0.36, 0.7, 0.32, 1, 0.66, 0.96, 0.88),
    importance: 0.74,
    route: "listening-room",
    glyphKey: "wave",
    relatedNodeIds: ["thinking-in-4d", "library-writing", "sports-playbook"],
    motionClass: "pulsing",
  }),
  authoredBody({
    id: "photo-archive",
    label: "Photo Archive",
    kind: "world",
    state: "world",
    position: { x: -1160, y: 40, z: 590 },
    lensWeights: weights(0.56, 0.52, 0.82, 0.58, 0.88, 0.92, 0.86, 0.9),
    importance: 0.8,
    route: "photo-archive",
    glyphKey: "aperture",
    relatedNodeIds: ["brooklyn", "maine", "argentina"],
    motionClass: "reflective",
  }),
  authoredBody({
    id: "sports-playbook",
    label: "Sports Field / Playbook",
    kind: "world",
    state: "world",
    position: { x: 540, y: 260, z: 880 },
    lensWeights: weights(0.78, 0.4, 0.48, 0.7, 0.68, 0.96, 0.9, 0.72),
    importance: 0.68,
    route: "sports-playbook",
    glyphKey: "play",
    relatedNodeIds: ["maine", "listening-room"],
    motionClass: "pulsing",
  }),
] as const;

export const EMERGING_BODIES = generateEmergingBodies(16);
export const AMBIENT_BODIES = generateAmbientStars(64);

export const ALL_BODIES: readonly CelestialNode[] = [
  ...AUTHORED_BODIES,
  ...EMERGING_BODIES,
  ...AMBIENT_BODIES,
];
