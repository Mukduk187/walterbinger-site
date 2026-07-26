import { Vector3 as ThreeVector3 } from "three";
import type { LensId, Vector3 } from "./cosmology";

export interface ConstellationPoint {
  id: string;
  position: Vector3;
  anchorNodeId?: string;
}

export interface ConstellationSegment {
  id: string;
  from: string;
  to: string;
  bend?: number;
}

export interface ConstellationDefinition {
  id: string;
  className: string;
  gradientId: string;
  priority: number;
  triggerLensIds: readonly LensId[];
  sourceReference?: string;
  points: readonly ConstellationPoint[];
  segments: readonly ConstellationSegment[];
}

const point = (
  id: string,
  x: number,
  y: number,
  z: number,
  anchorNodeId?: string,
): ConstellationPoint => {
  const position = new ThreeVector3(x, y, z);
  return {
    id,
    position: { x: position.x, y: position.y, z: position.z },
    anchorNodeId,
  };
};

export const HEALTHCARE_SCALES: ConstellationDefinition = {
  id: "healthcare-scales",
  className: "healthcare-scales",
  gradientId: "healthcare-constellation-gradient",
  priority: 20,
  triggerLensIds: ["red", "green"],
  points: [
    point("crown", 0, -455, 34),
    point("healthcare", 0, -292, 0, "healthcare"),
    point("professional-archive", -455, -132, -126, "cv-archive"),
    point("thinking-in-4d", 455, -132, 126, "thinking-in-4d"),
    point("left-rim-out", -650, 62, -168),
    point("left-rim-in", -260, 62, -78),
    point("hospitality", -455, 288, -108, "hospitality"),
    point("right-rim-in", 260, 62, 78),
    point("right-rim-out", 650, 62, 168),
    point("field-tools", 455, 288, 108, "field-tools"),
    point("stem", 0, 212, 0),
    point("base-left", -270, 460, -52),
    point("base-center", 0, 382, 0),
    point("base-right", 270, 460, 52),
  ],
  segments: [
    { id: "crown-pivot", from: "crown", to: "healthcare" },
    {
      id: "beam-left",
      from: "healthcare",
      to: "professional-archive",
    },
    {
      id: "beam-right",
      from: "healthcare",
      to: "thinking-in-4d",
    },
    {
      id: "left-suspension-out",
      from: "professional-archive",
      to: "left-rim-out",
    },
    {
      id: "left-suspension-in",
      from: "professional-archive",
      to: "left-rim-in",
    },
    { id: "left-pan-out", from: "left-rim-out", to: "hospitality" },
    { id: "left-pan-in", from: "left-rim-in", to: "hospitality" },
    {
      id: "right-suspension-in",
      from: "thinking-in-4d",
      to: "right-rim-in",
    },
    {
      id: "right-suspension-out",
      from: "thinking-in-4d",
      to: "right-rim-out",
    },
    { id: "right-pan-in", from: "right-rim-in", to: "field-tools" },
    { id: "right-pan-out", from: "right-rim-out", to: "field-tools" },
    { id: "pivot-stem", from: "healthcare", to: "stem" },
    { id: "stem-base", from: "stem", to: "base-center" },
    { id: "base-left", from: "base-center", to: "base-left" },
    { id: "base-right", from: "base-center", to: "base-right" },
  ],
};

export const TATTOO_HEART: ConstellationDefinition = {
  id: "tattoo-heart",
  className: "tattoo-heart",
  gradientId: "tattoo-heart-constellation-gradient",
  priority: 10,
  triggerLensIds: ["red"],
  sourceReference:
    "Reference Library/03_WALTER_ARTIFACTS/Tattoo_References/sylvia-anatomical-heart-tattoo-source.jpeg",
  points: [
    point("vessel-left", -205, -382, -86, "hospitality"),
    point("vessel-left-top", -268, -520, -112),
    point("vessel-left-return", -132, -438, -62),
    point("aorta-base", -64, -305, -28, "healthcare"),
    point("aorta-top", -72, -520, 18),
    point("aorta-arch", 54, -552, 62),
    point("aorta-right", 142, -425, 108, "cv-archive"),
    point("branch-right-top", 224, -486, 146),
    point("branch-right", 176, -338, 116, "field-tools"),
    point("artery-tip", 314, -270, 154),
    point("upper-right", 258, -154, 118, "thinking-in-4d"),
    point("right-mid", 278, 44, 82),
    point("right-lower", 218, 235, 42),
    point("apex", 76, 470, -16, "library-writing"),
    point("lower-left", -88, 426, -52, "photo-archive"),
    point("left-lower", -214, 298, -92),
    point("left-mid", -286, 104, -126, "brooklyn"),
    point("left-upper", -276, -112, -142, "argentina"),
    point("upper-left-lobe", -242, -258, -124, "empanadas-son"),
    point("head-top", -58, -196, 38),
    point("head", -42, -132, 56, "listening-room"),
    point("head-right", 8, -116, 70),
    point("neck", 4, -62, 60),
    point("shoulder", -72, -42, 34, "maine"),
    point("back", -112, 42, 6),
    point("hip", -48, 148, -18),
    point("arm-out", 72, -10, 76),
    point("arm-knee", 132, 58, 62),
    point("knee", 94, 162, 42, "sports-playbook"),
    point("shin", 16, 294, 4),
    point("foot", -70, 360, -32),
  ],
  segments: [
    {
      id: "left-vessel-rise",
      from: "vessel-left",
      to: "vessel-left-top",
      bend: -0.08,
    },
    {
      id: "left-vessel-fall",
      from: "vessel-left-top",
      to: "vessel-left-return",
      bend: -0.14,
    },
    {
      id: "left-vessel-root",
      from: "vessel-left-return",
      to: "aorta-base",
      bend: 0.08,
    },
    {
      id: "aorta-rise",
      from: "aorta-base",
      to: "aorta-top",
      bend: 0.08,
    },
    {
      id: "aorta-crown-left",
      from: "aorta-top",
      to: "aorta-arch",
      bend: 0.13,
    },
    {
      id: "aorta-crown-right",
      from: "aorta-arch",
      to: "aorta-right",
      bend: 0.12,
    },
    {
      id: "right-vessel-rise",
      from: "aorta-right",
      to: "branch-right-top",
      bend: -0.08,
    },
    {
      id: "right-vessel-fall",
      from: "branch-right-top",
      to: "branch-right",
      bend: -0.08,
    },
    {
      id: "pulmonary-branch",
      from: "branch-right",
      to: "artery-tip",
      bend: -0.09,
    },
    {
      id: "outer-upper-right",
      from: "artery-tip",
      to: "upper-right",
      bend: 0.1,
    },
    {
      id: "outer-right",
      from: "upper-right",
      to: "right-mid",
      bend: -0.08,
    },
    {
      id: "outer-right-lower",
      from: "right-mid",
      to: "right-lower",
      bend: -0.1,
    },
    {
      id: "outer-apex-right",
      from: "right-lower",
      to: "apex",
      bend: -0.12,
    },
    {
      id: "outer-apex-left",
      from: "apex",
      to: "lower-left",
      bend: -0.1,
    },
    {
      id: "outer-lower-left",
      from: "lower-left",
      to: "left-lower",
      bend: -0.08,
    },
    {
      id: "outer-left",
      from: "left-lower",
      to: "left-mid",
      bend: -0.08,
    },
    {
      id: "outer-left-upper",
      from: "left-mid",
      to: "left-upper",
      bend: -0.08,
    },
    {
      id: "outer-left-lobe",
      from: "left-upper",
      to: "upper-left-lobe",
      bend: 0.1,
    },
    {
      id: "outer-left-close",
      from: "upper-left-lobe",
      to: "vessel-left",
      bend: 0.08,
    },
    {
      id: "outer-heart-root",
      from: "vessel-left",
      to: "aorta-base",
      bend: -0.12,
    },
    { id: "head-crown-left", from: "head-top", to: "head", bend: -0.18 },
    { id: "head-face", from: "head", to: "head-right", bend: -0.2 },
    {
      id: "head-crown-right",
      from: "head-right",
      to: "head-top",
      bend: -0.18,
    },
    { id: "head-neck", from: "head-right", to: "neck", bend: 0.06 },
    { id: "neck-shoulder", from: "neck", to: "shoulder", bend: 0.08 },
    { id: "figure-back", from: "shoulder", to: "back", bend: -0.1 },
    { id: "figure-waist", from: "back", to: "hip", bend: -0.1 },
    { id: "upper-arm", from: "shoulder", to: "arm-out", bend: 0.08 },
    { id: "forearm", from: "arm-out", to: "arm-knee", bend: 0.08 },
    { id: "hand-knee", from: "arm-knee", to: "knee", bend: 0.08 },
    { id: "thigh", from: "hip", to: "knee", bend: -0.12 },
    { id: "lower-leg", from: "knee", to: "shin", bend: -0.08 },
    { id: "ankle-foot", from: "shin", to: "foot", bend: 0.08 },
    { id: "folded-leg", from: "foot", to: "hip", bend: -0.18 },
  ],
};

export const CONSTELLATIONS = [TATTOO_HEART, HEALTHCARE_SCALES] as const;

export function constellationIsActive(
  definition: ConstellationDefinition,
  activeLensIds: readonly LensId[],
): boolean {
  const active = new Set(activeLensIds);
  return definition.triggerLensIds.every((lensId) => active.has(lensId));
}

export function selectConstellation(
  activeLensIds: readonly LensId[],
): ConstellationDefinition | null {
  return (
    CONSTELLATIONS.filter((definition) =>
      constellationIsActive(definition, activeLensIds),
    ).sort(
      (left, right) =>
        right.priority - left.priority ||
        right.triggerLensIds.length - left.triggerLensIds.length,
    )[0] ?? null
  );
}

export function constellationAnchorTargets(
  definition: ConstellationDefinition,
): ReadonlyMap<string, Vector3> {
  return new Map(
    definition.points.flatMap((constellationPoint) =>
      constellationPoint.anchorNodeId
        ? [[constellationPoint.anchorNodeId, constellationPoint.position] as const]
        : [],
    ),
  );
}

export function constellationPointMap(
  definition: ConstellationDefinition,
): ReadonlyMap<string, ConstellationPoint> {
  return new Map(definition.points.map((constellationPoint) => [
    constellationPoint.id,
    constellationPoint,
  ]));
}
