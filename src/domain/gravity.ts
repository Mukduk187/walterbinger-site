import {
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  type Force,
  type Simulation,
  type SimulationLinkDatum,
  type SimulationNodeDatum,
} from "d3-force-3d";
import {
  LENS_IDS,
  lensRelevance,
  type CelestialNode,
  type LensId,
  type Vector3,
} from "./cosmology";

export const LENS_DIRECTIONS: Record<LensId, Vector3> = {
  red: { x: -0.82, y: -0.42, z: 0.38 },
  orange: { x: -0.34, y: -0.88, z: -0.34 },
  yellow: { x: 0.34, y: -0.88, z: 0.34 },
  green: { x: 0.82, y: -0.42, z: -0.38 },
  blue: { x: 0.82, y: 0.42, z: 0.38 },
  indigo: { x: 0.34, y: 0.88, z: -0.34 },
  violet: { x: -0.34, y: 0.88, z: 0.34 },
  magenta: { x: -0.82, y: 0.42, z: -0.38 },
};

export interface GravityNode extends SimulationNodeDatum {
  id: string;
  source: CelestialNode;
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
}

interface GravityLink extends SimulationLinkDatum<GravityNode> {
  affinity: number;
}

interface GravityContext {
  activeLensIds: readonly LensId[];
  anchorTargets: ReadonlyMap<string, Vector3>;
}

export interface GravitySystem {
  setContext(
    activeLensIds: readonly LensId[],
    anchorTargets?: ReadonlyMap<string, Vector3>,
  ): void;
  tick(deltaMilliseconds: number): void;
  position(nodeId: string): Vector3 | undefined;
  velocity(nodeId: string): Vector3 | undefined;
  sync(positions: ReadonlyMap<string, Vector3>): void;
  dispose(): void;
}

function magnitude(point: Vector3): number {
  return Math.hypot(point.x, point.y, point.z);
}

function normalized(point: Vector3): Vector3 {
  const length = magnitude(point) || 1;
  return {
    x: point.x / length,
    y: point.y / length,
    z: point.z / length,
  };
}

export function relationshipAffinity(
  from: CelestialNode,
  to: CelestialNode,
): number {
  let dot = 0;
  let fromMagnitude = 0;
  let toMagnitude = 0;

  for (const lensId of LENS_IDS) {
    const fromWeight = from.lensWeights[lensId];
    const toWeight = to.lensWeights[lensId];
    dot += fromWeight * toWeight;
    fromMagnitude += fromWeight * fromWeight;
    toMagnitude += toWeight * toWeight;
  }

  const similarity =
    dot / (Math.sqrt(fromMagnitude) * Math.sqrt(toMagnitude) || 1);
  const importance = (from.importance + to.importance) / 2;
  return Math.max(0, Math.min(1, 0.18 + similarity * 0.5 + importance * 0.32));
}

export function gravityTargetForNode(
  node: CelestialNode,
  activeLensIds: readonly LensId[],
): Vector3 {
  if (activeLensIds.length === 0) {
    return { ...node.basePosition };
  }

  const baseDirection = normalized(node.basePosition);
  const relevance = lensRelevance(node, activeLensIds);
  const activeMean =
    activeLensIds.reduce(
      (total, lensId) => total + node.lensWeights[lensId],
      0,
    ) / activeLensIds.length;
  const composition = activeLensIds.reduce<Vector3>(
    (result, lensId) => {
      const difference = node.lensWeights[lensId] - activeMean;
      const direction = LENS_DIRECTIONS[lensId];
      result.x += direction.x * difference;
      result.y += direction.y * difference;
      result.z += direction.z * difference;
      return result;
    },
    { x: 0, y: 0, z: 0 },
  );
  const hasCompositionDirection = magnitude(composition) > 0.015;
  const compositionDirection = normalized(composition);
  const direction = normalized({
    x:
      baseDirection.x * 0.58 +
      (hasCompositionDirection ? compositionDirection.x * 0.82 : 0),
    y:
      baseDirection.y * 0.58 +
      (hasCompositionDirection ? compositionDirection.y * 0.82 : 0),
    z:
      baseDirection.z * 0.58 +
      (hasCompositionDirection ? compositionDirection.z * 0.82 : 0),
  });

  const tierFloor =
    node.tier === "authored" ? 240 : node.tier === "emerging" ? 430 : 720;
  const tierRange =
    node.tier === "authored" ? 820 : node.tier === "emerging" ? 680 : 520;
  const radius =
    tierFloor +
    (1 - relevance) * tierRange +
    (1 - node.importance) * (node.tier === "authored" ? 130 : 60);

  return {
    x: direction.x * radius,
    y: direction.y * radius,
    z: direction.z * radius,
  };
}

function createLinks(nodes: readonly CelestialNode[]): GravityLink[] {
  const byId = new Map(nodes.map((node) => [node.id, node]));
  return nodes.flatMap((node) =>
    node.relatedNodeIds
      .filter((relatedId) => node.id < relatedId && byId.has(relatedId))
      .map((relatedId) => ({
        source: node.id,
        target: relatedId,
        affinity: relationshipAffinity(node, byId.get(relatedId)!),
      })),
  );
}

function createTargetForce(
  context: GravityContext,
): Force<GravityNode> {
  let nodes: GravityNode[] = [];
  const force = ((alpha: number) => {
    for (const node of nodes) {
      const gravityTarget = gravityTargetForNode(
        node.source,
        context.activeLensIds,
      );
      const anchorTarget = context.anchorTargets.get(node.id);
      const relevance = lensRelevance(node.source, context.activeLensIds);
      const homeStrength =
        node.source.tier === "authored"
          ? 0.018 + relevance * 0.012
          : node.source.tier === "emerging"
            ? 0.011
            : 0.006;
      const anchorStrength = anchorTarget ? 0.13 : 0;
      const target = anchorTarget ?? gravityTarget;
      const strength = anchorStrength || homeStrength;

      node.vx += (target.x - node.x) * strength * alpha;
      node.vy += (target.y - node.y) * strength * alpha;
      node.vz += (target.z - node.z) * strength * alpha;
    }
  }) as Force<GravityNode>;
  force.initialize = (initializedNodes) => {
    nodes = initializedNodes;
  };
  return force;
}

function createVelocityLimitForce(): Force<GravityNode> {
  let nodes: GravityNode[] = [];
  const force = (() => {
    for (const node of nodes) {
      const speed = Math.hypot(node.vx, node.vy, node.vz);
      const limit =
        node.source.tier === "authored"
          ? 16
          : node.source.tier === "emerging"
            ? 10
            : 4;
      if (speed <= limit) {
        continue;
      }
      const scale = limit / speed;
      node.vx *= scale;
      node.vy *= scale;
      node.vz *= scale;
    }
  }) as Force<GravityNode>;
  force.initialize = (initializedNodes) => {
    nodes = initializedNodes;
  };
  return force;
}

export function createGravitySystem(
  celestialNodes: readonly CelestialNode[],
): GravitySystem {
  const gravityNodes: GravityNode[] = celestialNodes.map((node) => ({
    id: node.id,
    source: node,
    x: node.basePosition.x,
    y: node.basePosition.y,
    z: node.basePosition.z,
    vx: 0,
    vy: 0,
    vz: 0,
  }));
  const byId = new Map(gravityNodes.map((node) => [node.id, node]));
  const context: GravityContext = {
    activeLensIds: [],
    anchorTargets: new Map(),
  };
  const links = createLinks(celestialNodes);
  const linkForce = forceLink<GravityNode, GravityLink>(links)
    .id((node) => node.id)
    .distance((link) => 250 + (1 - link.affinity) * 360)
    .strength((link) => 0.025 + link.affinity * 0.08)
    .iterations(2);
  const collisionForce = forceCollide<GravityNode>()
    .radius((node) =>
      node.source.tier === "authored"
        ? 112
        : node.source.tier === "emerging"
          ? 42
          : 9,
    )
    .strength(0.72)
    .iterations(2);
  const chargeForce = forceManyBody<GravityNode>()
    .strength((node) =>
      node.source.tier === "authored"
        ? -420
        : node.source.tier === "emerging"
          ? -34
          : -2.5,
    )
    .distanceMin(24)
    .distanceMax(720)
    .theta(0.88);
  const simulation: Simulation<GravityNode, GravityLink> = forceSimulation<
    GravityNode,
    GravityLink
  >(gravityNodes, 3)
    .force("target", createTargetForce(context))
    .force("links", linkForce)
    .force("collision", collisionForce)
    .force("charge", chargeForce)
    .force("speed-limit", createVelocityLimitForce())
    .alpha(0.16)
    .alphaMin(0.001)
    .alphaDecay(0.018)
    .velocityDecay(0.18)
    .stop();

  return {
    setContext(activeLensIds, anchorTargets = new Map()) {
      context.activeLensIds = [...activeLensIds];
      context.anchorTargets = anchorTargets;
      linkForce.strength((link) =>
        activeLensIds.length > 0 ? 0.025 + link.affinity * 0.08 : 0,
      );
      chargeForce.strength((node) =>
        activeLensIds.length === 0
          ? 0
          : node.source.tier === "authored"
            ? -420
            : node.source.tier === "emerging"
              ? -34
              : -2.5,
      );
      simulation.alpha(Math.max(simulation.alpha(), 0.78));
    },
    tick(deltaMilliseconds) {
      const iterations = Math.max(
        1,
        Math.min(3, Math.round(deltaMilliseconds / 16.67)),
      );
      simulation.tick(iterations);
    },
    position(nodeId) {
      const node = byId.get(nodeId);
      return node ? { x: node.x, y: node.y, z: node.z } : undefined;
    },
    velocity(nodeId) {
      const node = byId.get(nodeId);
      return node ? { x: node.vx, y: node.vy, z: node.vz } : undefined;
    },
    sync(positions) {
      for (const [nodeId, position] of positions) {
        const node = byId.get(nodeId);
        if (!node) continue;
        node.x = position.x;
        node.y = position.y;
        node.z = position.z;
        node.vx = 0;
        node.vy = 0;
        node.vz = 0;
      }
      simulation.alpha(0.72);
    },
    dispose() {
      simulation.stop();
    },
  };
}
