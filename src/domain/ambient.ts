import {
  emptyLensWeights,
  LENS_IDS,
  type CelestialNode,
  type LensWeights,
  type Vector3,
} from "./cosmology";

function hashSeed(seed: string): number {
  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash ^= seed.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function mulberry32(seed: number): () => number {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let value = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function sphericalPoint(
  random: () => number,
  minimumRadius: number,
  maximumRadius: number,
): Vector3 {
  const theta = random() * Math.PI * 2;
  const phi = Math.acos(2 * random() - 1);
  const shellBias = 0.38 + Math.pow(random(), 0.58) * 0.62;
  const radius =
    minimumRadius + (maximumRadius - minimumRadius) * shellBias;

  return {
    x: radius * Math.sin(phi) * Math.cos(theta),
    y: radius * Math.sin(phi) * Math.sin(theta),
    z: radius * Math.cos(phi),
  };
}

function subtleWeights(random: () => number): LensWeights {
  const weights = emptyLensWeights();
  for (const lensId of LENS_IDS) {
    weights[lensId] = Number((0.08 + random() * 0.28).toFixed(3));
  }
  return weights;
}

export function generateAmbientStars(
  count: number,
  seed = "waltron-living-map-v0.4",
): CelestialNode[] {
  const random = mulberry32(hashSeed(seed));
  return Array.from({ length: count }, (_, index) => {
    const id = `ambient-${String(index + 1).padStart(3, "0")}`;
    return {
      id,
      kind: "ambient",
      state: "ambient",
      tier: "ambient",
      internalLabel: id,
      basePosition: sphericalPoint(random, 640, 1460),
      lensWeights: subtleWeights(random),
      importance: Number((0.08 + random() * 0.2).toFixed(3)),
      inspectable: false,
      motionClass: "stable",
      relatedNodeIds: [],
      projectIds: [],
      conceptIds: [],
      artifactIds: [],
      constellationIds: [],
      mysteryTags: [],
    };
  });
}

export function generateEmergingBodies(
  count: number,
  seed = "waltron-emerging-v0.1",
): CelestialNode[] {
  const random = mulberry32(hashSeed(seed));
  return Array.from({ length: count }, (_, index) => {
    const id = `emerging-${String(index + 1).padStart(2, "0")}`;
    const weights = emptyLensWeights();
    for (const lensId of LENS_IDS) {
      weights[lensId] = Number((0.12 + random() * 0.72).toFixed(3));
    }
    return {
      id,
      kind: index % 3 === 0 ? "concept" : "artifact",
      state: "dormant",
      tier: "emerging",
      internalLabel: `Provisional body ${index + 1}`,
      basePosition: sphericalPoint(random, 520, 1180),
      lensWeights: weights,
      importance: Number((0.24 + random() * 0.24).toFixed(3)),
      inspectable: false,
      motionClass: index % 4 === 0 ? "pulsing" : "orbital",
      relatedNodeIds: [],
      projectIds: [],
      conceptIds: [],
      artifactIds: [],
      constellationIds: [],
      mysteryTags: ["provisional"],
    };
  });
}
