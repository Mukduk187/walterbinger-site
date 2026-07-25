export const LENS_IDS = [
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
  "indigo",
  "violet",
  "magenta",
] as const;

export type LensId = (typeof LENS_IDS)[number];

export interface LensDefinition {
  id: LensId;
  name: string;
  shortName: string;
  color: string;
  meaning: string;
}

export const LENSES: readonly LensDefinition[] = [
  {
    id: "red",
    name: "Hospitality & Care",
    shortName: "Care",
    color: "#e43b45",
    meaning: "Warmth, shelter, nourishment, dignity, urgency, and protection.",
  },
  {
    id: "orange",
    name: "Craft & Create",
    shortName: "Create",
    color: "#f07b2d",
    meaning: "Skilled making, invention, fabrication, improvisation, and transformation.",
  },
  {
    id: "yellow",
    name: "Taste & Smell",
    shortName: "Sense",
    color: "#eabf2f",
    meaning: "Appetite, warning, comfort, nostalgia, scent, and bodily memory.",
  },
  {
    id: "green",
    name: "Systems & Stewardship",
    shortName: "Sustain",
    color: "#3f9b65",
    meaning: "Operations, cultivation, maintenance, preservation, and durability.",
  },
  {
    id: "blue",
    name: "Space & Sound",
    shortName: "Space",
    color: "#3785c6",
    meaning: "Architecture, atmosphere, distance, waves, resonance, and silence.",
  },
  {
    id: "indigo",
    name: "Travel & Movement",
    shortName: "Move",
    color: "#5658a8",
    meaning: "Migration, geography, momentum, transition, and movement between worlds.",
  },
  {
    id: "violet",
    name: "Communication & Connection",
    shortName: "Connect",
    color: "#8e55bb",
    meaning: "Language, listening, trust, transmission, and exchange becoming relationship.",
  },
  {
    id: "magenta",
    name: "Exploration & Faith",
    shortName: "Explore",
    color: "#d23c8e",
    meaning: "Science, wonder, uncertainty, intuition, hope, and inquiry beyond proof.",
  },
] as const;

const lensRank = new Map<LensId, number>(
  LENS_IDS.map((id, index) => [id, index]),
);

export type LensWeights = Record<LensId, number>;

export type NodeKind =
  | "concept"
  | "project"
  | "essay"
  | "artifact"
  | "person"
  | "place"
  | "memory"
  | "world"
  | "ambient";

export type CelestialState =
  | "star"
  | "cluster"
  | "constellation"
  | "nebula"
  | "dormant"
  | "remnant"
  | "supernova"
  | "world"
  | "ambient";

export type BodyTier = "authored" | "emerging" | "ambient";

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface ArtifactReference {
  id: string;
  label: string;
  src: string;
}

export interface ResourceReference {
  id: string;
  label: string;
  kind: "writing" | "tool" | "document" | "link";
  href: string;
  description?: string;
  external?: boolean;
}

export interface CelestialNode {
  id: string;
  kind: NodeKind;
  state: CelestialState;
  tier: BodyTier;
  publicLabel?: string;
  internalLabel?: string;
  basePosition: Vector3;
  lensWeights: LensWeights;
  importance: number;
  inspectable: boolean;
  route?: string;
  glyphKey?: string;
  motionClass?: "stable" | "orbital" | "pulsing" | "warp" | "reflective";
  relatedNodeIds: string[];
  projectIds: string[];
  conceptIds: string[];
  artifactIds: string[];
  constellationIds: string[];
  mysteryTags: string[];
  artifacts?: ArtifactReference[];
  resources?: ResourceReference[];
}

export interface QuartetAddress {
  id: string;
  lenses: readonly [LensId, LensId, LensId, LensId];
}

export type PhenomenonId =
  | "collaboration"
  | "legacy"
  | "kintsugi"
  | "gratitude";

export interface Phenomenon {
  id: PhenomenonId;
  name: string;
  lensIds: readonly LensId[];
  status: "locked" | "candidate";
}

export const PHENOMENA: readonly Phenomenon[] = [
  {
    id: "collaboration",
    name: "Collaboration",
    lensIds: ["violet", "magenta"],
    status: "locked",
  },
  {
    id: "legacy",
    name: "Legacy",
    lensIds: ["green", "indigo", "violet"],
    status: "locked",
  },
  {
    id: "kintsugi",
    name: "Kintsugi",
    lensIds: ["orange", "green"],
    status: "candidate",
  },
  {
    id: "gratitude",
    name: "Gratitude",
    lensIds: LENS_IDS,
    status: "locked",
  },
] as const;

export function emptyLensWeights(): LensWeights {
  return {
    red: 0,
    orange: 0,
    yellow: 0,
    green: 0,
    blue: 0,
    indigo: 0,
    violet: 0,
    magenta: 0,
  };
}

export function canonicalLensSet(ids: Iterable<LensId>): LensId[] {
  return [...new Set(ids)].sort(
    (a, b) => (lensRank.get(a) ?? 0) - (lensRank.get(b) ?? 0),
  );
}

export function combinationKey(ids: Iterable<LensId>): string {
  return canonicalLensSet(ids).join("+");
}

function combinations<T>(values: readonly T[], size: number): T[][] {
  if (size === 0) {
    return [[]];
  }
  if (values.length < size) {
    return [];
  }

  const output: T[][] = [];
  for (let index = 0; index <= values.length - size; index += 1) {
    const head = values[index];
    for (const tail of combinations(values.slice(index + 1), size - 1)) {
      output.push([head, ...tail]);
    }
  }
  return output;
}

export const QUARTET_ADDRESSES: readonly QuartetAddress[] = combinations(
  LENS_IDS,
  4,
).map((lenses) => ({
  id: `q-${lenses.join("-")}`,
  lenses: lenses as [LensId, LensId, LensId, LensId],
}));

export const NON_EMPTY_LENS_STATES = LENS_IDS.flatMap((_, index) =>
  combinations(LENS_IDS, index + 1),
);

export function matchingQuartets(
  activeLensIds: Iterable<LensId>,
): QuartetAddress[] {
  const active = canonicalLensSet(activeLensIds);
  if (active.length === 0) {
    return [];
  }

  const activeSet = new Set(active);
  return QUARTET_ADDRESSES.filter((address) => {
    if (active.length <= 4) {
      return active.every((lensId) => address.lenses.includes(lensId));
    }
    return address.lenses.every((lensId) => activeSet.has(lensId));
  });
}

export function resolvePhenomena(
  activeLensIds: Iterable<LensId>,
): Phenomenon[] {
  const active = new Set(activeLensIds);
  return PHENOMENA.filter((phenomenon) =>
    phenomenon.lensIds.every((lensId) => active.has(lensId)),
  );
}

export function lensRelevance(
  node: CelestialNode,
  activeLensIds: readonly LensId[],
): number {
  if (activeLensIds.length === 0) {
    return 0;
  }
  const sum = activeLensIds.reduce(
    (total, lensId) => total + node.lensWeights[lensId],
    0,
  );
  return sum / activeLensIds.length;
}

export function validateBidirectionalRelationships(
  nodes: readonly CelestialNode[],
): string[] {
  const byId = new Map(nodes.map((node) => [node.id, node]));
  const errors: string[] = [];

  for (const node of nodes) {
    for (const relatedId of node.relatedNodeIds) {
      const related = byId.get(relatedId);
      if (!related) {
        errors.push(`${node.id} links to missing node ${relatedId}`);
        continue;
      }
      if (!related.relatedNodeIds.includes(node.id)) {
        errors.push(`${node.id} -> ${relatedId} is not bidirectional`);
      }
    }
  }

  return errors;
}

export function mixLensColors(activeLensIds: readonly LensId[]): string {
  if (activeLensIds.length === LENS_IDS.length) {
    return "#d9c991";
  }
  if (activeLensIds.length === 0) {
    return "#171717";
  }

  const colors = activeLensIds.map((lensId) => {
    const hex = LENSES.find((lens) => lens.id === lensId)?.color ?? "#171717";
    return [
      Number.parseInt(hex.slice(1, 3), 16),
      Number.parseInt(hex.slice(3, 5), 16),
      Number.parseInt(hex.slice(5, 7), 16),
    ];
  });

  const mixed = colors
    .reduce(
      (sum, color) =>
        sum.map((value, index) => value + (color[index] ?? 0)) as [
          number,
          number,
          number,
        ],
      [0, 0, 0] as [number, number, number],
    )
    .map((value) => Math.round(value / colors.length));

  return `rgb(${mixed[0]} ${mixed[1]} ${mixed[2]})`;
}
