import {
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ArrowLeft, Expand } from "lucide-react";
import { ALL_BODIES, AUTHORED_BODIES } from "../data/bodies";
import {
  LENSES,
  LENS_IDS,
  lensRelevance,
  mixLensColors,
  type CelestialNode,
  type LensId,
  type Vector3,
} from "../domain/cosmology";
import {
  clamp,
  pointerDistance,
  pointerMidpoint,
  zoomFromPinch,
  type Point2,
} from "../domain/gestures";
import type { GratitudePhase } from "../domain/gratitude";
import {
  easeVector,
  projectVector,
  type CameraState,
  type ProjectedPoint,
} from "../domain/projection";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useUniverseStore } from "../state/universeStore";
import {
  AmbientStarGlyph,
  BodyGlyph,
  EmergingGlyph,
} from "./BodyGlyph";
import { LensInstrument } from "./LensInstrument";
import { WorldResources } from "./WorldResources";

interface RuntimeBody {
  position: Vector3;
  target: Vector3;
  projected: ProjectedPoint;
  renderScale: number;
}

interface PointerRecord extends Point2 {
  previousX: number;
  previousY: number;
}

interface PinchState {
  distance: number;
  midpoint: Point2;
  zoom: number;
  panX: number;
  panY: number;
}

const LENS_ATTRACTORS: Record<LensId, Vector3> = {
  red: { x: -900, y: -470, z: 260 },
  orange: { x: -390, y: -890, z: -320 },
  yellow: { x: 350, y: -900, z: 310 },
  green: { x: 930, y: -420, z: -250 },
  blue: { x: 930, y: 410, z: 280 },
  indigo: { x: 350, y: 900, z: -310 },
  violet: { x: -350, y: 900, z: 320 },
  magenta: { x: -930, y: 390, z: -260 },
};

const RELATIONSHIPS = AUTHORED_BODIES.flatMap((node) =>
  node.relatedNodeIds
    .filter((relatedId) => node.id < relatedId)
    .map((relatedId) => ({
      id: `${node.id}--${relatedId}`,
      from: node.id,
      to: relatedId,
    })),
);

function dominantLensId(node: CelestialNode): LensId {
  return LENS_IDS.reduce((strongest, lensId) =>
    node.lensWeights[lensId] > node.lensWeights[strongest]
      ? lensId
      : strongest,
  );
}

function lensColor(lensId: LensId): string {
  return LENSES.find((lens) => lens.id === lensId)?.color ?? "#171717";
}

function relationshipAffinity(
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
  return clamp(0.18 + similarity * 0.5 + importance * 0.32, 0, 1);
}

const INITIAL_CAMERA: CameraState = {
  yaw: -0.18,
  pitch: 0.1,
  zoom: 0.5,
  panX: 0,
  panY: 0,
};

function copyVector(point: Vector3): Vector3 {
  return { x: point.x, y: point.y, z: point.z };
}

function targetForNode(
  node: CelestialNode,
  activeLensIds: readonly LensId[],
  gratitudePhase: GratitudePhase,
): Vector3 {
  if (
    node.tier === "authored" &&
    ["circle", "mycelium", "mosaic", "flash", "negative", "portal"].includes(
      gratitudePhase,
    )
  ) {
    const index = AUTHORED_BODIES.findIndex((body) => body.id === node.id);
    const angle = (index / AUTHORED_BODIES.length) * Math.PI * 2 - Math.PI / 2;
    return {
      x: Math.cos(angle) * 760,
      y: Math.sin(angle) * 760,
      z: Math.sin(angle * 2) * 90,
    };
  }

  if (["collapse", "transit"].includes(gratitudePhase)) {
    const drift = node.tier === "ambient" ? 24 : 8;
    return {
      x: Math.sin(node.basePosition.x) * drift,
      y: Math.cos(node.basePosition.y) * drift,
      z: Math.sin(node.basePosition.z) * drift,
    };
  }

  if (activeLensIds.length === 0) {
    return copyVector(node.basePosition);
  }

  let totalWeight = 0;
  const centroid = { x: 0, y: 0, z: 0 };
  const selectionCenter = { x: 0, y: 0, z: 0 };
  for (const lensId of activeLensIds) {
    const weight = Math.max(0.04, node.lensWeights[lensId]);
    const attractor = LENS_ATTRACTORS[lensId];
    totalWeight += weight;
    centroid.x += attractor.x * weight;
    centroid.y += attractor.y * weight;
    centroid.z += attractor.z * weight;
    selectionCenter.x += attractor.x;
    selectionCenter.y += attractor.y;
    selectionCenter.z += attractor.z;
  }

  centroid.x /= totalWeight;
  centroid.y /= totalWeight;
  centroid.z /= totalWeight;
  selectionCenter.x /= activeLensIds.length;
  selectionCenter.y /= activeLensIds.length;
  selectionCenter.z /= activeLensIds.length;

  const relevance = lensRelevance(node, activeLensIds);
  const baseInfluence =
    node.tier === "ambient"
      ? 0.78 - relevance * 0.18
      : node.tier === "emerging"
        ? 0.78 - relevance * 0.32
        : 0.9 - relevance * 0.5;
  const compositionSpread =
    node.tier === "ambient" ? 0.66 : node.tier === "emerging" ? 1.08 : 1.8;
  const breathingRoom = node.tier === "authored" ? 1.08 : 1;

  return {
    x:
      node.basePosition.x * baseInfluence * breathingRoom +
      (centroid.x - selectionCenter.x) * compositionSpread,
    y:
      node.basePosition.y * baseInfluence * breathingRoom +
      (centroid.y - selectionCenter.y) * compositionSpread,
    z:
      node.basePosition.z * baseInfluence * breathingRoom +
      (centroid.z - selectionCenter.z) * compositionSpread,
  };
}

function environmentPaths(glyphKey?: string) {
  switch (glyphKey) {
    case "empanadas-sun":
      return (
        <>
          <path d="M0 810Q250 720 500 810T1000 810 1500 810" />
          <path d="M160 850v-140h270v140M215 710v-70h160v70M190 760h215M260 640v-50h70v50" />
          <path d="M1120 870q120-180 240 0M1180 784q60-90 120 0" />
        </>
      );
    case "archive":
    case "book":
      return (
        <>
          <path d="M0 820h1600M90 820V560h280v260M1230 820V540h290v280" />
          <path d="M120 610h220M120 670h220M120 730h220M1260 600h230M1260 665h230M1260 730h230" />
          <path d="M650 820V650h300v170M720 650v-80h160v80" />
        </>
      );
    case "healthcare":
    case "balance":
    case "field-tools":
      return (
        <>
          <path d="M0 830h1600M80 830V700h340M1180 830V660h330" />
          <path d="M190 700v-90h120v90M1260 660v-120h170v120" />
          <path d="M650 830V710h300v120M730 710v-80h140v80" />
        </>
      );
    case "bridge":
      return (
        <>
          <path d="M0 850h1600M110 850V590M1490 850V590" />
          <path d="M110 590Q800 1020 1490 590M110 590h1380" />
          <path d="M260 650v170M460 720v100M1140 720v100M1340 650v170" />
        </>
      );
    case "pine":
      return (
        <>
          <path d="M0 830Q300 770 560 830T1120 820 1600 830" />
          <path d="M260 830q-15-145 30-270M285 590l-100 70M290 630l120 50M278 690l-140 80M285 730l130 65" />
          <path d="M1280 830q-10-110 25-210M1300 650l-90 70M1300 700l100 55" />
        </>
      );
    default:
      return (
        <>
          <path d="M0 840Q300 790 560 830T1080 820 1600 840" />
          <path d="M120 840q140-210 280 0M1190 840q150-260 300 0" />
        </>
      );
  }
}

interface LivingMapSceneProps {
  gratitudePhase?: GratitudePhase;
}

export function LivingMapScene({
  gratitudePhase = "idle",
}: LivingMapSceneProps) {
  const mode = useUniverseStore((state) => state.mode);
  const activeLensIds = useUniverseStore((state) => state.activeLensIds);
  const pinnedIds = useUniverseStore((state) => state.pinnedIds);
  const hoveredId = useUniverseStore((state) => state.hoveredId);
  const selectedId = useUniverseStore((state) => state.selectedId);
  const centeredId = useUniverseStore((state) => state.centeredId);
  const togglePin = useUniverseStore((state) => state.togglePin);
  const setHovered = useUniverseStore((state) => state.setHovered);
  const setSelected = useUniverseStore((state) => state.setSelected);
  const enterWorld = useUniverseStore((state) => state.enterWorld);
  const returnToSky = useUniverseStore((state) => state.returnToSky);
  const autoSpin = useUniverseStore((state) => state.autoSpin);
  const reducedMotion = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const nodeRefs = useRef(new Map<string, SVGGElement>());
  const nebulaRefs = useRef(new Map<string, SVGCircleElement>());
  const relationRefs = useRef(new Map<string, SVGPathElement>());
  const previewRef = useRef<HTMLButtonElement>(null);
  const camera = useRef<CameraState>({ ...INITIAL_CAMERA });
  const cameraTarget = useRef<CameraState>({ ...INITIAL_CAMERA });
  const runtime = useRef(
    new Map<string, RuntimeBody>(
      ALL_BODIES.map((node) => [
        node.id,
        {
          position: copyVector(node.basePosition),
          target: copyVector(node.basePosition),
          projected: {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            depth: 0,
            visible: true,
          },
          renderScale: 1,
        },
      ]),
    ),
  );
  const activePointers = useRef(new Map<number, PointerRecord>());
  const pinchState = useRef<PinchState | null>(null);
  const isDragging = useRef(false);
  const spacePressed = useRef(false);
  const lastInteractionAt = useRef(performance.now());
  const [size, setSize] = useState({ width: 1600, height: 1000 });

  const activeColor = mixLensColors(activeLensIds);
  const selectedNode = useMemo(
    () => ALL_BODIES.find((node) => node.id === selectedId) ?? null,
    [selectedId],
  );
  const centeredNode = useMemo(
    () => ALL_BODIES.find((node) => node.id === centeredId) ?? null,
    [centeredId],
  );
  const attentionIds = useMemo(() => {
    const ids = new Set(pinnedIds);
    if (hoveredId) {
      ids.add(hoveredId);
    }
    if (centeredId) {
      ids.add(centeredId);
    }
    return ids;
  }, [centeredId, hoveredId, pinnedIds]);
  const awakenedNodeIds = useMemo(() => {
    const ids = new Set(attentionIds);

    for (const node of AUTHORED_BODIES) {
      if (
        attentionIds.has(node.id) ||
        node.relatedNodeIds.some((relatedId) => attentionIds.has(relatedId))
      ) {
        ids.add(node.id);
      }
      if (
        activeLensIds.length > 0 &&
        lensRelevance(node, activeLensIds) > 0.54
      ) {
        ids.add(node.id);
      }
    }

    return ids;
  }, [activeLensIds, attentionIds]);
  const relationshipStates = useMemo(
    () =>
      RELATIONSHIPS.map((relationship) => {
        const from = AUTHORED_BODIES.find(
          (node) => node.id === relationship.from,
        );
        const to = AUTHORED_BODIES.find(
          (node) => node.id === relationship.to,
        );
        if (!from || !to) {
          return null;
        }

        const spectralMatch =
          activeLensIds.length > 0 &&
          lensRelevance(from, activeLensIds) > 0.54 &&
          lensRelevance(to, activeLensIds) > 0.54;
        const attentionMatch =
          attentionIds.size > 0 &&
          awakenedNodeIds.has(from.id) &&
          awakenedNodeIds.has(to.id);
        const fromLens = dominantLensId(from);
        const toLens = dominantLensId(to);
        const colors =
          activeLensIds.length > 0
            ? activeLensIds.map(lensColor)
            : [lensColor(fromLens), lensColor(toLens)];

        return {
          ...relationship,
          active: spectralMatch || attentionMatch,
          affinity: relationshipAffinity(from, to),
          bridge: fromLens !== toLens,
          colors,
        };
      }).filter((relationship) => relationship !== null),
    [activeLensIds, attentionIds, awakenedNodeIds],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) {
        return;
      }
      setSize({
        width: Math.max(320, entry.contentRect.width),
        height: Math.max(560, entry.contentRect.height),
      });
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    for (const node of ALL_BODIES) {
      const body = runtime.current.get(node.id);
      if (body) {
        body.target = targetForNode(node, activeLensIds, gratitudePhase);
      }
    }
  }, [activeLensIds, gratitudePhase]);

  useEffect(() => {
    if (centeredId) {
      cameraTarget.current.zoom = 1.44;
      cameraTarget.current.panX = 0;
      cameraTarget.current.panY = mode === "world" ? -size.height * 0.08 : 0;
    } else {
      cameraTarget.current.zoom = INITIAL_CAMERA.zoom;
      cameraTarget.current.panX = 0;
      cameraTarget.current.panY = 0;
    }
  }, [centeredId, mode, size.height]);

  useEffect(() => {
    const keyDown = (event: globalThis.KeyboardEvent) => {
      if (event.code === "Space" && event.target === document.body) {
        spacePressed.current = true;
        event.preventDefault();
      }
      if (event.key === "Escape") {
        if (mode === "world") {
          returnToSky();
        } else {
          setSelected(null);
        }
      }
    };
    const keyUp = (event: globalThis.KeyboardEvent) => {
      if (event.code === "Space") {
        spacePressed.current = false;
      }
    };
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
    return () => {
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
    };
  }, [mode, returnToSky, setSelected]);

  useEffect(() => {
    let frame = 0;
    let previousTime = performance.now();
    const renderFrame = (time: number) => {
      const delta = Math.min(40, time - previousTime);
      previousTime = time;
      const easing = reducedMotion ? 0.16 : 1 - Math.pow(0.87, delta / 16.67);
      const cameraEase = reducedMotion ? 0.18 : 1 - Math.pow(0.82, delta / 16.67);

      if (
        autoSpin &&
        !reducedMotion &&
        !isDragging.current &&
        mode === "sky" &&
        time - lastInteractionAt.current > 900 &&
        gratitudePhase === "idle"
      ) {
        cameraTarget.current.yaw += delta * 0.00006;
      }

      cameraTarget.current.pitch = clamp(
        cameraTarget.current.pitch,
        -1.02,
        1.02,
      );
      camera.current = {
        yaw:
          camera.current.yaw +
          (cameraTarget.current.yaw - camera.current.yaw) * cameraEase,
        pitch:
          camera.current.pitch +
          (cameraTarget.current.pitch - camera.current.pitch) * cameraEase,
        zoom:
          camera.current.zoom +
          (cameraTarget.current.zoom - camera.current.zoom) * cameraEase,
        panX:
          camera.current.panX +
          (cameraTarget.current.panX - camera.current.panX) * cameraEase,
        panY:
          camera.current.panY +
          (cameraTarget.current.panY - camera.current.panY) * cameraEase,
      };

      const centeredRuntime = centeredId
        ? runtime.current.get(centeredId)
        : undefined;
      const origin = centeredRuntime?.position ?? { x: 0, y: 0, z: 0 };

      for (const node of ALL_BODIES) {
        const body = runtime.current.get(node.id);
        const element = nodeRefs.current.get(node.id);
        if (!body || !element) {
          continue;
        }
        body.position = easeVector(body.position, body.target, easing);
        const localPosition = {
          x: body.position.x - origin.x,
          y: body.position.y - origin.y,
          z: body.position.z - origin.z,
        };
        body.projected = projectVector(
          localPosition,
          camera.current,
          size.width,
          size.height,
        );
        const relevance = lensRelevance(node, activeLensIds);
        const isPinned = pinnedIds.includes(node.id);
        const isHovered = hoveredId === node.id;
        const isCentered = centeredId === node.id;
        const interactionScale = isCentered
          ? 3
          : isPinned
            ? 2.1
            : isHovered
              ? 1.55
              : 1;
        const importanceScale =
          node.tier === "authored"
            ? 0.68 + node.importance * 0.58
            : node.tier === "emerging"
              ? 0.62
              : 0.48 + node.importance;
        const lensScale =
          activeLensIds.length > 0 ? 0.82 + relevance * 0.6 : 1;
        const phaseScale = gratitudePhase === "collapse" ? 0.46 : 1;
        const totalScale =
          body.projected.scale *
          interactionScale *
          importanceScale *
          lensScale *
          phaseScale;
        body.renderScale = totalScale;
        const baseOpacity =
          node.tier === "ambient"
            ? 0.22 + node.importance * 0.6
            : node.tier === "emerging"
              ? 0.24 + relevance * 0.48
              : 0.58 + relevance * 0.38;
        const visibleOpacity = body.projected.visible
          ? baseOpacity * body.projected.opacity
          : 0;

        element.setAttribute(
          "transform",
          `translate(${body.projected.x.toFixed(2)} ${body.projected.y.toFixed(2)}) scale(${totalScale.toFixed(4)})`,
        );
        element.style.opacity = String(clamp(visibleOpacity, 0, 1));
        element.style.setProperty("--depth", body.projected.depth.toFixed(2));

        const nebula = nebulaRefs.current.get(node.id);
        if (nebula) {
          const radius = clamp(
            82 * body.projected.scale * (0.78 + node.importance * 0.38),
            46,
            154,
          );
          nebula.setAttribute("cx", body.projected.x.toFixed(2));
          nebula.setAttribute("cy", body.projected.y.toFixed(2));
          nebula.setAttribute("r", radius.toFixed(2));
          nebula.style.visibility = body.projected.visible
            ? "visible"
            : "hidden";
        }
      }

      for (const relation of RELATIONSHIPS) {
        const path = relationRefs.current.get(relation.id);
        const from = runtime.current.get(relation.from)?.projected;
        const to = runtime.current.get(relation.to)?.projected;
        if (!path || !from || !to) {
          continue;
        }
        const midpointX = (from.x + to.x) / 2;
        const midpointY = (from.y + to.y) / 2;
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const length = Math.hypot(dx, dy) || 1;
        const bow = clamp(length * 0.17, 28, 130);
        const controlX = midpointX - (dy / length) * bow;
        const controlY = midpointY + (dx / length) * bow;
        path.setAttribute(
          "d",
          `M${from.x.toFixed(1)} ${from.y.toFixed(1)}Q${controlX.toFixed(1)} ${controlY.toFixed(1)} ${to.x.toFixed(1)} ${to.y.toFixed(1)}`,
        );
      }

      const preview = previewRef.current;
      if (preview && selectedId) {
        const selectedBody = runtime.current.get(selectedId);
        const point = selectedBody?.projected;
        if (point && selectedBody) {
          const previewX = point.x;
          const previewY = point.y + selectedBody.renderScale * 72 + 12;
          preview.style.transform = `translate3d(${previewX}px, ${previewY}px, 0) translate(-50%, 0)`;
          preview.style.opacity = point.visible ? "1" : "0";
          preview.style.pointerEvents = point.visible ? "auto" : "none";
        }
      }

      const svg = svgRef.current;
      if (svg) {
        svg.dataset.cameraYaw = camera.current.yaw.toFixed(4);
        svg.dataset.cameraPitch = camera.current.pitch.toFixed(4);
        svg.dataset.cameraZoom = camera.current.zoom.toFixed(4);
      }

      frame = requestAnimationFrame(renderFrame);
    };
    frame = requestAnimationFrame(renderFrame);
    return () => cancelAnimationFrame(frame);
  }, [
    activeLensIds,
    autoSpin,
    centeredId,
    gratitudePhase,
    hoveredId,
    mode,
    pinnedIds,
    reducedMotion,
    selectedId,
    size.height,
    size.width,
  ]);

  const resetView = () => {
    camera.current = { ...INITIAL_CAMERA };
    cameraTarget.current = { ...INITIAL_CAMERA };
    lastInteractionAt.current = performance.now();
    useUniverseStore.getState().setCentered(null);
  };

  const handlePointerDown = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (event.button !== 0 && event.button !== 1 && event.button !== 2) {
      return;
    }
    event.currentTarget.setPointerCapture(event.pointerId);
    activePointers.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
      previousX: event.clientX,
      previousY: event.clientY,
    });
    isDragging.current = true;
    lastInteractionAt.current = performance.now();

    if (activePointers.current.size === 2) {
      const [first, second] = [...activePointers.current.values()];
      if (first && second) {
        pinchState.current = {
          distance: pointerDistance(first, second),
          midpoint: pointerMidpoint(first, second),
          zoom: cameraTarget.current.zoom,
          panX: cameraTarget.current.panX,
          panY: cameraTarget.current.panY,
        };
      }
    }
  };

  const handlePointerMove = (event: ReactPointerEvent<SVGSVGElement>) => {
    const pointer = activePointers.current.get(event.pointerId);
    if (!pointer) {
      return;
    }
    const previousX = pointer.x;
    const previousY = pointer.y;
    pointer.previousX = previousX;
    pointer.previousY = previousY;
    pointer.x = event.clientX;
    pointer.y = event.clientY;

    if (activePointers.current.size >= 2) {
      const [first, second] = [...activePointers.current.values()];
      const initial = pinchState.current;
      if (first && second && initial) {
        const midpoint = pointerMidpoint(first, second);
        cameraTarget.current.zoom = zoomFromPinch(
          initial.zoom,
          initial.distance,
          pointerDistance(first, second),
        );
        cameraTarget.current.panX =
          initial.panX + (midpoint.x - initial.midpoint.x);
        cameraTarget.current.panY =
          initial.panY + (midpoint.y - initial.midpoint.y);
      }
      return;
    }

    const dx = event.clientX - previousX;
    const dy = event.clientY - previousY;
    const panning =
      event.button === 1 ||
      (event.buttons & 2) === 2 ||
      event.shiftKey ||
      spacePressed.current;
    if (panning) {
      cameraTarget.current.panX += dx;
      cameraTarget.current.panY += dy;
    } else {
      cameraTarget.current.yaw += dx * 0.0062;
      cameraTarget.current.pitch += dy * 0.0054;
    }
  };

  const handlePointerUp = (event: ReactPointerEvent<SVGSVGElement>) => {
    activePointers.current.delete(event.pointerId);
    if (activePointers.current.size < 2) {
      pinchState.current = null;
    }
    if (activePointers.current.size === 0) {
      isDragging.current = false;
    }
  };

  const handleWheel = (event: ReactWheelEvent<SVGSVGElement>) => {
    event.preventDefault();
    const multiplier = Math.exp(-event.deltaY * 0.00115);
    cameraTarget.current.zoom = clamp(
      cameraTarget.current.zoom * multiplier,
      0.42,
      3.2,
    );
    lastInteractionAt.current = performance.now();
  };

  const handleNodeKeyDown = (
    event: KeyboardEvent<SVGGElement>,
    node: CelestialNode,
  ) => {
    if (event.key === " " && node.inspectable) {
      event.preventDefault();
      togglePin(node.id);
    }
    if (event.key === "Enter" && node.inspectable) {
      event.preventDefault();
      enterWorld(node.id);
    }
  };

  const exploreNode = (node: CelestialNode) => {
    enterWorld(node.id);
  };

  return (
    <main
      ref={containerRef}
      className={`living-map mode-${mode} phase-${gratitudePhase}`}
      data-star-count={ALL_BODIES.length}
      data-authored-count={AUTHORED_BODIES.length}
    >
      <div className="sky-paper" aria-hidden="true" />
      <svg
        ref={svgRef}
        className="universe-canvas"
        viewBox={`0 0 ${size.width} ${size.height}`}
        role="application"
        aria-label="Living map. Drag to rotate, use the wheel or pinch to move closer, and select a drawn star to inspect it."
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        onContextMenu={(event) => event.preventDefault()}
      >
        <defs>
          <filter id="paper-wobble" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.008"
              numOctaves="2"
              seed="19"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="0.9"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <filter id="spectral-soft">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter
            id="nebula-wash"
            x="-70%"
            y="-70%"
            width="240%"
            height="240%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.012"
              numOctaves="3"
              seed="31"
              result="wash-noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="wash-noise"
              scale="18"
              xChannelSelector="R"
              yChannelSelector="G"
              result="wobbled-wash"
            />
            <feGaussianBlur in="wobbled-wash" stdDeviation="18" />
          </filter>
          {relationshipStates.map((relationship) => (
            <linearGradient
              key={`gradient-${relationship.id}`}
              id={`relationship-gradient-${relationship.id}`}
            >
              {relationship.colors.map((color, index) => (
                <stop
                  key={`${relationship.id}-${color}-${index}`}
                  offset={`${(index / Math.max(1, relationship.colors.length - 1)) * 100}%`}
                  stopColor={color}
                />
              ))}
            </linearGradient>
          ))}
        </defs>

        <g className="nebula-layer" aria-hidden="true">
          {AUTHORED_BODIES.map((node) => {
            const awakened = awakenedNodeIds.has(node.id);
            const color =
              activeLensIds.length > 0 &&
              lensRelevance(node, activeLensIds) > 0.54
                ? activeColor
                : lensColor(dominantLensId(node));
            return (
              <circle
                key={`nebula-${node.id}`}
                ref={(element) => {
                  if (element) {
                    nebulaRefs.current.set(node.id, element);
                  } else {
                    nebulaRefs.current.delete(node.id);
                  }
                }}
                className={`relationship-nebula${awakened ? " is-awake" : ""}${attentionIds.has(node.id) ? " is-attended" : ""}`}
                style={{ "--nebula-color": color } as CSSProperties}
              />
            );
          })}
        </g>

        <g className="relationship-layer" aria-hidden="true">
          {relationshipStates.map((relationship, relationshipIndex) => (
            <g key={relationship.id}>
              <path
                id={`relationship-${relationship.id}`}
                ref={(element) => {
                  if (element) {
                    relationRefs.current.set(relationship.id, element);
                  } else {
                    relationRefs.current.delete(relationship.id);
                  }
                }}
                className={`relationship-path${relationship.active ? " is-visible" : ""}${relationship.bridge ? " is-bridge" : ""}`}
                style={
                  {
                    stroke: `url(#relationship-gradient-${relationship.id})`,
                    "--relationship-color":
                      relationship.colors[relationship.colors.length - 1],
                    "--relationship-weight": relationship.affinity,
                  } as CSSProperties
                }
              />
              {Array.from({ length: 2 }, (_, particleIndex) => (
                <circle
                  key={`${relationship.id}-particle-${particleIndex}`}
                  className={`relationship-particle${relationship.active ? " is-visible" : ""}`}
                  r={particleIndex === 0 ? 1.8 : 1.15}
                  style={{
                    fill: relationship.colors[
                      (particleIndex + relationshipIndex) %
                        relationship.colors.length
                    ],
                  }}
                >
                  {!reducedMotion && (
                    <animateMotion
                      dur={`${7.5 + (relationshipIndex % 5) * 0.8}s`}
                      begin={`${-(relationshipIndex * 0.47 + particleIndex * 3.1)}s`}
                      repeatCount="indefinite"
                    >
                      <mpath href={`#relationship-${relationship.id}`} />
                    </animateMotion>
                  )}
                </circle>
              ))}
            </g>
          ))}
        </g>

        <g className="mycelium-layer" aria-hidden="true">
          {gratitudePhase !== "idle" &&
            gratitudePhase !== "instrument-lock" &&
            AUTHORED_BODIES.map((node, index) => (
              <path
                key={`mycelium-${node.id}`}
                d={`M${size.width / 2} ${size.height / 2}q${Math.cos(index) * size.width * 0.18} ${Math.sin(index * 1.7) * size.height * 0.2} ${Math.cos((index / AUTHORED_BODIES.length) * Math.PI * 2) * size.width * 0.36 + size.width / 2} ${Math.sin((index / AUTHORED_BODIES.length) * Math.PI * 2) * size.height * 0.38 + size.height / 2}`}
              />
            ))}
        </g>

        <g className="body-layer">
          {ALL_BODIES.map((node, index) => {
            const isPinned = pinnedIds.includes(node.id);
            const isHovered = hoveredId === node.id;
            const isCentered = centeredId === node.id;
            const isSelected = selectedId === node.id;
            const relevant =
              activeLensIds.length > 0 &&
              lensRelevance(node, activeLensIds) > 0.42;
            const interactive = node.inspectable;
            return (
              <g
                key={node.id}
                ref={(element) => {
                  if (element) {
                    nodeRefs.current.set(node.id, element);
                  } else {
                    nodeRefs.current.delete(node.id);
                  }
                }}
                className={`celestial-body tier-${node.tier} state-${node.state}${relevant ? " is-relevant" : ""}${awakenedNodeIds.has(node.id) ? " is-awake" : ""}${isPinned ? " is-pinned" : ""}${isHovered ? " is-hovered" : ""}${isCentered ? " is-centered" : ""}`}
                data-node-id={node.id}
                data-authored={node.tier === "authored" ? "true" : undefined}
                data-inspectable={interactive ? "true" : "false"}
                role={interactive ? "button" : undefined}
                tabIndex={interactive ? 0 : undefined}
                aria-label={
                  interactive
                    ? `${node.publicLabel}. Press Space to pin or Enter to explore.`
                    : undefined
                }
                aria-hidden={interactive ? undefined : true}
                onPointerDown={
                  interactive ? (event) => event.stopPropagation() : undefined
                }
                onPointerEnter={
                  interactive
                    ? () => {
                        setHovered(node.id);
                        setSelected(node.id);
                      }
                    : undefined
                }
                onPointerLeave={
                  interactive ? () => setHovered(null) : undefined
                }
                onClick={
                  interactive
                    ? (event) => {
                        event.stopPropagation();
                        togglePin(node.id);
                      }
                    : undefined
                }
                onDoubleClick={
                  interactive
                    ? (event) => {
                        event.stopPropagation();
                        exploreNode(node);
                      }
                    : undefined
                }
                onKeyDown={
                  interactive
                    ? (event) => handleNodeKeyDown(event, node)
                    : undefined
                }
              >
                {node.tier === "ambient" ? (
                  <AmbientStarGlyph variant={index} />
                ) : node.tier === "emerging" ? (
                  <EmergingGlyph index={index} />
                ) : (
                  <>
                    <circle className="body-aura" r="47" />
                    <BodyGlyph
                      node={node}
                      active={relevant}
                      selected={isSelected || isPinned || isCentered}
                      color={activeColor}
                    />
                    <circle className="body-hit-target" r="48" />
                    {(isHovered || isPinned) && !isCentered && (
                      <text className="body-label" x="0" y="58">
                        {node.publicLabel}
                      </text>
                    )}
                    {(isPinned || isCentered) &&
                      node.artifacts?.map((artifact, artifactIndex) => {
                        const artifactCount = node.artifacts?.length ?? 1;
                        const startingAngle =
                          (artifactIndex / artifactCount) * 360;
                        const orbitRadius = 92 + (artifactIndex % 2) * 25;
                        const orbitDuration = 17 + artifactIndex * 2.3;
                        return (
                          <g
                            key={artifact.id}
                            className="artifact-orbit"
                            transform={
                              reducedMotion
                                ? `rotate(${startingAngle} 0 0)`
                                : undefined
                            }
                            aria-hidden="true"
                          >
                            {!reducedMotion && (
                              <animateTransform
                                attributeName="transform"
                                type="rotate"
                                from={`${startingAngle} 0 0`}
                                to={`${startingAngle + 360} 0 0`}
                                dur={`${orbitDuration}s`}
                                repeatCount="indefinite"
                              />
                            )}
                            <image
                              href={artifact.src}
                              x={orbitRadius}
                              y="-18"
                              width="44"
                              height="36"
                              preserveAspectRatio="xMidYMid meet"
                            />
                          </g>
                        );
                      })}
                  </>
                )}
              </g>
            );
          })}
        </g>

        {mode === "world" && centeredNode && (
          <g
            className="environment-ground"
            transform={`scale(${size.width / 1600} ${size.height / 1000})`}
            aria-hidden="true"
          >
            {environmentPaths(centeredNode.glyphKey)}
          </g>
        )}

      </svg>

      <LensInstrument onResetView={resetView} />

      {mode === "world" && centeredNode && (
        <div className="world-chrome">
          <button type="button" onClick={returnToSky} title="Return to the sky">
            <ArrowLeft aria-hidden="true" />
            <span className="sr-only">Return to the sky</span>
          </button>
          <h1>{centeredNode.publicLabel}</h1>
        </div>
      )}

      {mode === "world" && centeredNode && (
        <WorldResources node={centeredNode} />
      )}

      {selectedNode && mode === "sky" && (
        <button
          ref={previewRef}
          type="button"
          className="explore-control"
          onClick={() => exploreNode(selectedNode)}
        >
          <Expand aria-hidden="true" />
          <span>Explore</span>
        </button>
      )}
    </main>
  );
}
