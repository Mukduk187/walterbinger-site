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
}

export interface ConstellationDefinition {
  id: string;
  triggerLensIds: readonly LensId[];
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

export function constellationIsActive(
  definition: ConstellationDefinition,
  activeLensIds: readonly LensId[],
): boolean {
  const active = new Set(activeLensIds);
  return definition.triggerLensIds.every((lensId) => active.has(lensId));
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
