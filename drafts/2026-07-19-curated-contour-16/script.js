const svgNS = "http://www.w3.org/2000/svg";

const asset = (path) => `assets/${path}`;

const nodes = [
  {
    id: "argentina",
    label: "Argentina",
    note: "Spanish, hospitality, reinvention, rooms that became home.",
    base: { x: 835, y: 178 },
    glyph: "sun",
    scene: "sun",
    color: "#72c9f4",
    composition: { argentina: 1, gratitude: 0.42, travel: 0.62, food: 0.44, nyc: 0.22, healthcare: 0.1, art: 0.28 },
    artifacts: [
      {
        id: "empanada-menu",
        title: "Empanada's Son menu",
        note: "The real old menu drawing. Not polished into myth, just proof.",
        src: asset("artifacts/empanada-menu.png"),
        target: "empanadas",
        related: ["empanadas", "travel", "systems"],
      },
      {
        id: "sunset-thread",
        title: "Somewhere warm",
        note: "A placeholder for Buenos Aires energy until we curate the archive.",
        src: asset("artifacts/sunset-through-trees.jpg"),
        target: "travel",
        related: ["travel", "art", "maine"],
      },
    ],
  },
  {
    id: "empanadas",
    label: "Empanada's Son!",
    note: "A food concept that became systems, guests, vendors, labor, taste, and story.",
    base: { x: 580, y: 305 },
    glyph: "empanada",
    scene: "kitchen",
    color: "#f4b64b",
    composition: { argentina: 0.92, gratitude: 0.82, travel: 0.68, food: 1, nyc: 0.88, healthcare: 0.42, art: 0.86 },
    artifacts: [
      {
        id: "menu-drawings",
        title: "Hand-drawn menu",
        note: "The empanadas were already little constellations.",
        src: asset("artifacts/empanada-menu.png"),
        target: "empanadas",
        related: ["argentina", "systems", "art"],
      },
    ],
  },
  {
    id: "systems",
    label: "Office Work",
    note: "The library setting: ledgers, workflows, audits, handoffs, and receipts.",
    base: { x: 388, y: 426 },
    glyph: "ledger",
    scene: "library",
    color: "#86b879",
    composition: { argentina: 0.34, gratitude: 0.62, travel: 0.28, food: 0.38, nyc: 0.58, healthcare: 0.78, art: 0.36 },
    artifacts: [
      {
        id: "resume-proof",
        title: "Work proof",
        note: "Healthcare, operations, food service, leadership, and repair work in one page.",
        src: asset("artifacts/work-proof-resume.png"),
        target: "healthcare",
        related: ["healthcare", "maine", "empanadas"],
      },
      {
        id: "systems-map",
        title: "Systems sketch",
        note: "A placeholder for the operator brain: routes, roles, dependencies, handoffs.",
        src: asset("hero-systems-map.png"),
        target: "observatory",
        related: ["observatory", "healthcare", "art"],
      },
    ],
  },
  {
    id: "healthcare",
    label: "Healthcare",
    note: "Care settings as complicated human systems, not abstract process diagrams.",
    base: { x: 1010, y: 396 },
    glyph: "cross",
    scene: "clinic",
    color: "#31b96f",
    composition: { argentina: 0.08, gratitude: 0.74, travel: 0.18, food: 0.08, nyc: 0.36, healthcare: 1, art: 0.2 },
    artifacts: [
      {
        id: "healthcare-proof",
        title: "Operations page",
        note: "The professional proof side of the constellation.",
        src: asset("artifacts/work-proof-resume.png"),
        target: "healthcare",
        related: ["systems", "maine", "observatory"],
      },
    ],
  },
  {
    id: "art",
    label: "Art",
    note: "Rough and deliberate, with fingerprints left in the work.",
    base: { x: 250, y: 500 },
    glyph: "hand",
    scene: "museum",
    color: "#f257a5",
    composition: { argentina: 0.28, gratitude: 0.68, travel: 0.38, food: 0.26, nyc: 0.48, healthcare: 0.18, art: 1 },
    artifacts: [
      {
        id: "casting-hand",
        title: "College casting",
        note: "The roughness works because it was made with care.",
        src: asset("artifacts/art-casting-hand.jpg"),
        target: "art",
        related: ["systems", "observatory", "maine"],
      },
      {
        id: "butterfly",
        title: "Small attention",
        note: "A provisional marker for perception and softness.",
        src: asset("artifacts/butterfly-flowers.jpg"),
        target: "art",
        related: ["travel", "argentina", "maine"],
      },
    ],
  },
  {
    id: "maine",
    label: "Maine",
    note: "Place, stewardship, weather, quiet systems, and the ground under the work.",
    base: { x: 195, y: 210 },
    glyph: "water",
    scene: "water",
    color: "#84b8c9",
    composition: { argentina: 0.14, gratitude: 0.84, travel: 0.58, food: 0.18, nyc: 0.16, healthcare: 0.46, art: 0.38 },
    artifacts: [
      {
        id: "maine-water",
        title: "Cold water",
        note: "A real but imperfect place-marker from the archive.",
        src: asset("artifacts/maine-water.jpg"),
        target: "maine",
        related: ["healthcare", "systems", "art"],
      },
    ],
  },
  {
    id: "travel",
    label: "Travel",
    note: "Reorientation: the same stars from a different planet are not in the same shape.",
    base: { x: 755, y: 472 },
    glyph: "bird",
    scene: "route",
    color: "#a98ef6",
    composition: { argentina: 0.74, gratitude: 0.44, travel: 1, food: 0.38, nyc: 0.42, healthcare: 0.16, art: 0.48 },
    artifacts: [
      {
        id: "road",
        title: "Roadside sky",
        note: "A provisional travel point: the map keeps moving.",
        src: asset("artifacts/out-there-road.jpg"),
        target: "travel",
        related: ["argentina", "maine", "moon"],
      },
      {
        id: "sunset",
        title: "Evening aperture",
        note: "A soft placeholder for motion, distance, and attention.",
        src: asset("artifacts/sunset-through-trees.jpg"),
        target: "travel",
        related: ["argentina", "art", "moon"],
      },
    ],
  },
  {
    id: "observatory",
    label: "Observatory",
    note: "A place to choose how to look, then notice the whole sky rearrange.",
    base: { x: 720, y: 565 },
    glyph: "telescope",
    scene: "observatory",
    color: "#b7a1ff",
    composition: { argentina: 0.18, gratitude: 0.44, travel: 0.62, food: 0.2, nyc: 0.36, healthcare: 0.58, art: 0.72 },
    artifacts: [
      {
        id: "operator-map",
        title: "The map table",
        note: "This is where perspective becomes a working surface.",
        src: asset("hero-systems-map.png"),
        target: "observatory",
        related: ["systems", "travel", "moon"],
      },
    ],
  },
  {
    id: "moon",
    label: "Out There",
    note: "The far-fetched stuff, still connected if you tilt the sky correctly.",
    base: { x: 945, y: 595 },
    glyph: "moon",
    scene: "moon",
    color: "#d4d7e6",
    composition: { argentina: 0.12, gratitude: 0.24, travel: 0.82, food: 0.08, nyc: 0.18, healthcare: 0.08, art: 0.54 },
    artifacts: [
      {
        id: "out-there-road",
        title: "Other horizon",
        note: "A stand-in for the moon until the stranger archive surfaces.",
        src: asset("artifacts/out-there-road.jpg"),
        target: "moon",
        related: ["travel", "observatory", "art"],
      },
    ],
  },
];

const lenses = {
  argentina: {
    label: "Argentina",
    color: "#72c9f4",
    shape: "sun",
    links: {
      argentina: ["empanadas", "travel", "systems"],
      empanadas: ["argentina", "systems", "art"],
      travel: ["argentina", "moon", "maine"],
      systems: ["empanadas", "healthcare"],
    },
  },
  gratitude: {
    label: "Gratitude",
    color: "#d69b16",
    shape: "heart",
    links: {
      maine: ["healthcare", "systems", "art"],
      healthcare: ["maine", "systems", "observatory"],
      art: ["maine", "travel", "observatory"],
      systems: ["healthcare", "empanadas", "maine"],
      argentina: ["empanadas", "travel"],
    },
  },
  travel: {
    label: "Travel",
    color: "#a98ef6",
    shape: "bird",
    links: {
      travel: ["argentina", "maine", "moon", "observatory"],
      argentina: ["travel", "empanadas"],
      moon: ["travel", "observatory", "art"],
      maine: ["travel", "healthcare"],
      art: ["travel", "observatory"],
    },
  },
  food: {
    label: "Food",
    color: "#ef6a3a",
    shape: "sun",
    links: {
      empanadas: ["argentina", "systems", "art", "nyc"],
      argentina: ["empanadas", "travel"],
      systems: ["empanadas", "healthcare"],
      art: ["empanadas", "argentina"],
      travel: ["argentina", "empanadas"],
    },
  },
  nyc: {
    label: "NYC",
    color: "#2f72b8",
    shape: "bridge",
    links: {
      empanadas: ["systems", "art", "argentina", "travel"],
      systems: ["empanadas", "healthcare"],
      art: ["empanadas", "observatory"],
      healthcare: ["systems", "maine"],
      travel: ["empanadas", "argentina"],
    },
  },
  healthcare: {
    label: "Healthcare",
    color: "#31b96f",
    shape: "scale",
    links: {
      healthcare: ["systems", "maine", "observatory"],
      systems: ["healthcare", "empanadas", "observatory"],
      maine: ["healthcare", "systems"],
      empanadas: ["systems", "healthcare"],
    },
  },
  art: {
    label: "Art",
    color: "#f257a5",
    shape: "lion",
    links: {
      art: ["observatory", "empanadas", "travel"],
      observatory: ["art", "systems", "moon"],
      empanadas: ["art", "argentina", "systems"],
      moon: ["art", "observatory"],
      argentina: ["art", "empanadas"],
    },
  },
};

const nodesById = new Map(nodes.map((node) => [node.id, node]));
const starsLayer = document.querySelector("[data-stars]");
const flashLayer = document.querySelector("[data-flashes]");
const linesLayer = document.querySelector("[data-lines]");
const markerLayer = document.querySelector("[data-marker]");
const constellationsLayer = document.querySelector("[data-constellations]");
const noteTitle = document.querySelector("[data-note-title]");
const noteCopy = document.querySelector("[data-note-copy]");
const goButton = document.querySelector("[data-go]");
const clearPinsButton = document.querySelector("[data-clear-pins]");
const lensButtons = document.querySelectorAll("[data-lens]");
const carousel = document.querySelector("[data-carousel]");
const artifactDock = document.querySelector("[data-artifact-dock]");
const artifactPreview = document.querySelector("[data-artifact-preview]");
const objectPreviewLayer = document.querySelector("[data-object-previews]");
const worldPanel = document.querySelector("[data-world]");
const worldKicker = document.querySelector("[data-world-kicker]");
const worldTitle = document.querySelector("[data-world-title]");
const worldNote = document.querySelector("[data-world-note]");
const worldFeature = document.querySelector("[data-world-feature]");
const worldImage = document.querySelector("[data-world-image]");
const worldCaption = document.querySelector("[data-world-caption]");
const sceneGraphic = document.querySelector("[data-scene-graphic]");
const backButton = document.querySelector("[data-back]");

const activeLenses = new Set(
  [...lensButtons].filter((button) => button.classList.contains("is-active")).map((button) => button.dataset.lens),
);
const pinnedNodes = new Set();

let hoverNodeId = null;
let selectedNodeId = null;
let selectedArtifactId = null;
let worldNodeId = null;
let worldArtifactId = null;
let starClickTimer = null;
let jumpTimer = null;
let arrivalTimer = null;
let hoverRenderTimer = null;
let pendingHoverNodeId = null;

function el(name, attrs = {}) {
  const node = document.createElementNS(svgNS, name);
  Object.entries(attrs).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      node.setAttribute(key, value);
    }
  });
  return node;
}

function htmlEl(name, attrs = {}) {
  const node = document.createElement(name);
  Object.entries(attrs).forEach(([key, value]) => {
    if (key === "class") node.className = value;
    else if (key === "text") node.textContent = value;
    else if (value !== undefined && value !== null) node.setAttribute(key, value);
  });
  return node;
}

function line(x1, y1, x2, y2, className = "glyph-line") {
  return el("line", { x1, y1, x2, y2, class: className });
}

function path(d, className = "glyph-line") {
  return el("path", { d, class: className });
}

function circle(cx, cy, r, className = "glyph-dot") {
  return el("circle", { cx, cy, r, class: className });
}

function ellipse(cx, cy, rx, ry, className) {
  return el("ellipse", { cx, cy, rx, ry, class: className });
}

function scheduleTogglePin(id) {
  if (starClickTimer) window.clearTimeout(starClickTimer);
  starClickTimer = window.setTimeout(() => {
    togglePin(id);
    starClickTimer = null;
  }, 210);
}

function goFromStar(id) {
  if (starClickTimer) {
    window.clearTimeout(starClickTimer);
    starClickTimer = null;
  }
  goToWorld(id);
}

function queueHoverRender(id) {
  if (hoverRenderTimer) window.clearTimeout(hoverRenderTimer);
  pendingHoverNodeId = id;
  hoverRenderTimer = window.setTimeout(() => {
    hoverRenderTimer = null;
    if (pendingHoverNodeId !== id) return;
    pendingHoverNodeId = null;
    setHoverState(id);
  }, 520);
}

function cancelHoverRender() {
  if (hoverRenderTimer) {
    window.clearTimeout(hoverRenderTimer);
    hoverRenderTimer = null;
  }
  pendingHoverNodeId = null;
}

function starElement(id) {
  return starsLayer.querySelector(`[data-node="${id}"]`);
}

function setHoverState(id) {
  hoverNodeId = id;
  const star = starElement(id);
  if (star) {
    star.classList.add("is-hover", "is-observed");
  }
  const nodeId = visibleNodeId();
  renderBodyState(nodeId);
  renderNote(nodeId);
  renderObjectPreviews(currentPositions());
}

function clearHoverState(id) {
  if (hoverNodeId !== id) return;
  hoverNodeId = null;
  const star = starElement(id);
  if (star) {
    star.classList.remove("is-hover");
    if (!pinnedNodes.has(id) && selectedNodeId !== id) {
      star.classList.remove("is-observed");
    }
  }
  const nodeId = visibleNodeId();
  renderBodyState(nodeId);
  renderNote(nodeId);
  renderObjectPreviews(currentPositions());
}

function activeRoots() {
  if (worldNodeId) {
    return new Set([worldNodeId, hoverNodeId].filter(Boolean));
  }

  const roots = new Set(pinnedNodes);
  if (hoverNodeId) roots.add(hoverNodeId);
  return roots;
}

function linksFor(nodeId, lensId) {
  const lens = lenses[lensId];
  if (!lens) return [];
  return lens.links[nodeId] || [];
}

function visibleNodeId() {
  return hoverNodeId || selectedNodeId || [...pinnedNodes][0] || worldNodeId || null;
}

function artifactsFor(nodeId) {
  const node = nodesById.get(nodeId);
  return node?.artifacts || [];
}

function previewNodeIds() {
  if (worldNodeId) return [];
  return [...pinnedNodes];
}

function focusedNodeId() {
  return [...pinnedNodes][0] || selectedNodeId || null;
}

function activeLensColors() {
  return [...activeLenses].map((lensId) => lenses[lensId]?.color).filter(Boolean);
}

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const value = Number.parseInt(clean.length === 3 ? clean.split("").map((char) => char + char).join("") : clean, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function rgba(hex, alpha) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${clamp(alpha).toFixed(3)})`;
}

function lensStrength(nodeId, lensId) {
  const node = nodesById.get(nodeId);
  const lens = lenses[lensId];
  if (!node || !lens) return 0;

  let strength = Number(node.composition?.[lensId] || 0);
  if (lensId === "gratitude") strength = Math.max(strength, 0.46);
  const outbound = linksFor(nodeId, lensId).filter((id) => nodesById.has(id)).length;
  const inbound = Object.values(lens.links).filter((ids) => ids.includes(nodeId)).length;

  if (outbound) strength = Math.max(strength, 0.34 + outbound * 0.1);
  if (inbound) strength = Math.max(strength, 0.18 + inbound * 0.08);

  return clamp(strength);
}

function activeSpectrum(nodeId) {
  return [...activeLenses]
    .map((lensId) => {
      const lens = lenses[lensId];
      const strength = lensStrength(nodeId, lensId);
      return lens && strength > 0 ? { lensId, color: lens.color, strength } : null;
    })
    .filter(Boolean)
    .sort((a, b) => b.strength - a.strength);
}

function spectrumStrength(spectrum) {
  if (!spectrum.length) return 0;
  const sum = spectrum.reduce((total, item) => total + item.strength, 0);
  const blendBonus = Math.min(0.18, (spectrum.length - 1) * 0.045);
  return clamp(sum / Math.max(1, activeLenses.size) + blendBonus);
}

function applySpectrumStyles(element, spectrum) {
  const strength = spectrumStrength(spectrum);
  element.classList.toggle("is-spectral", strength > 0);
  element.setAttribute("data-spectrum-strength", strength.toFixed(2));
  element.style.setProperty("--spectrum-opacity", (0.14 + strength * 0.78).toFixed(3));
  element.style.setProperty("--spectrum-scale", (0.92 + strength * 0.34).toFixed(3));
}

function labelLines(label) {
  const custom = {
    "Empanada's Son!": ["Empanada's", "Son!"],
    "Office Work": ["Office", "Work"],
    "Out There": ["Out", "There"],
  };
  if (custom[label]) return custom[label];
  if (label.length <= 11) return [label];

  const words = label.split(" ");
  const midpoint = Math.ceil(words.length / 2);
  return [
    words.slice(0, midpoint).join(" "),
    words.slice(midpoint).join(" "),
  ].filter(Boolean);
}

function addGlyphName(group, label) {
  const lines = labelLines(label);
  const text = el("text", {
    x: 0,
    y: lines.length > 1 ? 47 : 56,
    "text-anchor": "middle",
    class: "glyph-name",
  });
  lines.forEach((lineText, index) => {
    const tspan = el("tspan", { x: 0, dy: index === 0 ? 0 : 13 });
    tspan.textContent = lineText;
    text.append(tspan);
  });
  group.append(text);
}

function satelliteAngle(index, total, x = 600) {
  const nearLeft = x < 330;
  const nearRight = x > 870;

  if (total === 1) {
    if (nearLeft) return -38;
    if (nearRight) return -142;
    return -68;
  }

  if (total === 2) {
    if (nearLeft) return index === 0 ? -38 : 42;
    if (nearRight) return index === 0 ? -142 : 138;
    return index === 0 ? -132 : 42;
  }

  const angles = [-138, -18, 102];
  return angles[index] || -138 + index * (240 / Math.max(1, total - 1));
}

function satelliteRadius(x = 600, index = 0) {
  const nearEdge = x < 330 || x > 870;
  const compact = window.innerWidth <= 760;
  if (compact) return (nearEdge ? 108 : 124) + index * 28;
  return (nearEdge ? 140 : 174) + index * 36;
}

function seededUnit(value) {
  let hash = 2166136261;
  for (const char of value) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) / 4294967295;
}

function satelliteMotion(nodeId, index, total, x) {
  const seed = (suffix) => seededUnit(`${nodeId}:${index}:${suffix}`);
  const direction = seed("direction") > 0.5 ? 1 : -1;
  const angle = satelliteAngle(index, total, x) + (seed("angle") - 0.5) * 22;
  const empanadaClearance = nodeId === "empanadas" ? (window.innerWidth <= 760 ? 34 : 32) : 0;
  const radius = satelliteRadius(x, index) + empanadaClearance + (seed("radius") - 0.5) * 14;
  const quarterAngle = angle + direction * (72 + seed("quarter") * 32);
  const halfAngle = angle + direction * (162 + seed("half") * 38);
  const threeQuarterAngle = angle + direction * (248 + seed("three-quarter") * 34);
  const endAngle = angle + direction * 360;
  const duration = 14800 + seed("duration") * 9200;

  const phase = total > 1
    ? ((index / total) + seed("phase") * 0.12) % 1
    : seed("phase");

  return {
    angle,
    radius,
    quarterAngle,
    quarterRadius: radius + (seed("quarter-radius") - 0.5) * 25,
    quarterDrift: (seed("quarter-drift") - 0.5) * 15,
    halfAngle,
    halfRadius: radius + (seed("half-radius") - 0.5) * 20,
    halfDrift: (seed("half-drift") - 0.5) * 18,
    threeQuarterAngle,
    threeQuarterRadius: radius + (seed("three-quarter-radius") - 0.5) * 28,
    threeQuarterDrift: (seed("three-quarter-drift") - 0.5) * 16,
    endAngle,
    duration,
    orbitDelay: -phase * duration,
    imageDelay: -seed("twinkle-phase") * 4200,
    imageDuration: 3400 + seed("twinkle-duration") * 2200,
  };
}

function renderSpectrometerState() {
  const colors = activeLensColors();
  document.body.classList.toggle("has-spectrum", colors.length > 0);
  document.body.style.setProperty("--spectral-a", colors[0] || "rgba(32, 31, 27, 0)");
  document.body.style.setProperty("--spectral-b", colors[1] || colors[0] || "rgba(32, 31, 27, 0)");
  document.body.style.setProperty("--spectral-c", colors[2] || colors[1] || colors[0] || "rgba(32, 31, 27, 0)");
}

function hasLensLink(originId, targetId, lensId) {
  return linksFor(originId, lensId).includes(targetId);
}

function relationshipScore(originId, targetId) {
  if (!originId || originId === targetId) return 0;

  let score = 0;
  Object.keys(lenses).forEach((lensId) => {
    const activeWeight = activeLenses.has(lensId) ? 2 : 1;
    if (hasLensLink(originId, targetId, lensId)) score += 2 * activeWeight;
    if (hasLensLink(targetId, originId, lensId)) score += activeWeight;
  });

  artifactsFor(originId).forEach((artifact) => {
    if (artifact.target === targetId || artifact.related?.includes(targetId)) score += 1.5;
  });
  artifactsFor(targetId).forEach((artifact) => {
    if (artifact.target === originId || artifact.related?.includes(originId)) score += 0.75;
  });

  return score;
}

function localObservabilityClass(nodeId) {
  if (!worldNodeId) return "";
  if (nodeId === worldNodeId) return "is-local-origin";

  const score = relationshipScore(worldNodeId, nodeId);
  if (score >= 5) return "is-local-near";
  if (score >= 2) return "is-local-middle";
  return "is-local-far";
}

function applyScaleLayout(rootId, positions, origin = { x: 610, y: 320 }) {
  if (!activeLenses.has("healthcare")) return;
  const related = linksFor(rootId, "healthcare").filter((id) => nodesById.has(id));
  if (related.length < 3) return;

  const slots = [
    [rootId, origin],
    [related[0], { x: origin.x - 260, y: origin.y + 118 }],
    [related[1], { x: origin.x + 260, y: origin.y + 118 }],
    [related[2], { x: origin.x, y: origin.y + 270 }],
  ];

  slots.forEach(([id, position]) => positions.set(id, position));
}

function currentPositions() {
  if (!worldNodeId) {
    const positions = new Map(nodes.map((node) => [node.id, { ...node.base }]));
    const focus = focusedNodeId();
    if (focus) applyScaleLayout(focus, positions);
    return positions;
  }

  const positions = new Map();
  const origin = { x: 600, y: 310 };
  positions.set(worldNodeId, origin);

  const others = nodes.filter((node) => node.id !== worldNodeId);
  const seed = nodes.findIndex((node) => node.id === worldNodeId) * 0.62;
  others.forEach((node, index) => {
    const score = relationshipScore(worldNodeId, node.id);
    const radius = score >= 5 ? 178 : score >= 2 ? 248 : 348;
    const angle = seed + index * ((Math.PI * 2) / others.length);
    const wobble = score >= 5 ? 20 : score >= 2 ? 34 : 54;
    positions.set(node.id, {
      x: 600 + Math.cos(angle) * radius + Math.sin(index + seed) * wobble,
      y: 310 + Math.sin(angle) * radius * 0.72 + Math.cos(index * 0.7 + seed) * wobble,
    });
  });

  applyScaleLayout(worldNodeId, positions, origin);

  return positions;
}

function addMotionMarks(group, marks = "side") {
  if (marks === "side") {
    group.append(path("M-40 -9c-8 5-8 13 0 18M42 -12c9 6 9 15 0 22", "motion-line"));
  }
  if (marks === "halo") {
    group.append(path("M-28 -40l-7-12M0 -45v-14M28 -40l7-12M42 -15l13-6M-42 -15l-13-6", "motion-line"));
  }
  if (marks === "ground") {
    group.append(path("M-38 32c10 9 24 9 34 0M4 35c13 8 28 7 42-3", "motion-line"));
  }
}

function addEmpanadaMenuArt(group) {
  const crop = el("svg", {
    x: -45,
    y: -25,
    width: 90,
    height: 50,
    viewBox: "30 38 108 60",
    preserveAspectRatio: "xMidYMid slice",
    overflow: "hidden",
    class: "empanada-menu-art",
  });
  const defs = el("defs");
  const removePaper = el("filter", {
    id: "empanada-remove-paper",
    x: "-8%",
    y: "-8%",
    width: "116%",
    height: "116%",
  });
  removePaper.append(el("feColorMatrix", {
    type: "matrix",
    values: "0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -0.333 -0.333 -0.333 0 1",
  }));
  defs.append(removePaper);
  crop.append(defs);
  crop.append(el("image", {
    href: asset("artifacts/empanada-menu.png"),
    x: 0,
    y: 0,
    width: 396,
    height: 614,
    preserveAspectRatio: "none",
    filter: "url(#empanada-remove-paper)",
  }));
  group.append(crop);
}

function addGlyphOutline(group, type) {
  if (type === "sun") {
    group.append(circle(0, 0, 13, "glyph-dot"));
    group.append(path("M0-34v12M0 22v12M-34 0h12M22 0h12M-24-24l9 9M15 15l9 9M24-24l-9 9M-15 15l-9 9", "glyph-line"));
  }

  if (type === "empanada") {
    group.append(path("M-43 4C-38-12-25-21-6-20 9-20 25-15 41-7 41 4 29 16 10 21-9 25-29 18-43 4Z", "glyph-line"));
    addMotionMarks(group, "side");
  }

  if (type === "ledger") {
    group.append(path("M-26-27h42l12 12v48h-54ZM16-27v13h12", "glyph-line"));
  }

  if (type === "cross") {
    group.append(path("M-9-31h18v21h21v18H9v22H-9V8h-21v-18h21Z", "glyph-line"));
  }

  if (type === "hand") {
    group.append(path("M-19 31v-37c0-7 11-7 11 0v18-30c0-8 12-8 12 0v30-25c0-8 12-8 12 0v31-17c0-8 12-8 12 0v24c0 23-47 27-47 6Z", "glyph-line"));
    addMotionMarks(group, "side");
  }

  if (type === "water") {
    group.append(path("M-34 6c13-14 26-14 39 0s26 14 39 0M-34 24c13-14 26-14 39 0s26 14 39 0", "glyph-line"));
  }

  if (type === "bird") {
    group.append(path("M-40 4c20-25 42-18 54 0 13-17 30-22 47-16-17 10-29 24-34 42-15-18-30-20-47-6-7-8-14-15-20-20Z", "glyph-line"));
    addMotionMarks(group, "side");
  }

  if (type === "telescope") {
    group.append(path("M-35-5l62-22 8 19-64 24Z", "glyph-line"));
  }

  if (type === "moon") {
    group.append(path("M13-33c-25 6-39 34-24 56 13 18 39 19 55 2-23 2-43-10-48-29-4-15 3-26 17-29Z", "glyph-line"));
  }
}

function addGlyph(group, type) {
  if (type === "sun") {
    group.append(circle(0, 0, 12, "glyph-fill-dot"));
    group.append(path("M0-34v12M0 22v12M-34 0h12M22 0h12M-24-24l9 9M15 15l9 9M24-24l-9 9M-15 15l-9 9", "glyph-line"));
    addMotionMarks(group, "halo");
  }

  if (type === "empanada") {
    group.append(el("path", {
      d: "M-43 4C-38-12-25-21-6-20 9-20 25-15 41-7 41 4 29 16 10 21-9 25-29 18-43 4Z",
      class: "empanada-paper-backing",
    }));
    addEmpanadaMenuArt(group);
  }

  if (type === "ledger") {
    group.append(path("M-26-27h42l12 12v48h-54Z"));
    group.append(path("M16-27v13h12M-14-8h27M-14 7h28M-14 22h22", "glyph-detail"));
    group.append(path("M-31 33c18 9 40 9 64 0", "glyph-accent"));
  }

  if (type === "cross") {
    group.append(path("M-9-31h18v21h21v18H9v22H-9V8h-21v-18h21Z"));
    group.append(path("M-29 37c17-11 38-11 61 0", "glyph-accent"));
  }

  if (type === "hand") {
    group.append(path("M-19 31v-37c0-7 11-7 11 0v18-30c0-8 12-8 12 0v30-25c0-8 12-8 12 0v31-17c0-8 12-8 12 0v24c0 23-47 27-47 6Z"));
    group.append(circle(0, 4, 7, "glyph-dot"));
    addMotionMarks(group, "side");
  }

  if (type === "water") {
    group.append(path("M-34 6c13-14 26-14 39 0s26 14 39 0", "glyph-line"));
    group.append(path("M-34 24c13-14 26-14 39 0s26 14 39 0", "glyph-line"));
    group.append(path("M-18-10c9-18 21-18 30 0", "glyph-accent"));
  }

  if (type === "bird") {
    group.append(path("M-40 4c20-25 42-18 54 0 13-17 30-22 47-16-17 10-29 24-34 42-15-18-30-20-47-6-7-8-14-15-20-20Z"));
    group.append(path("M2 0c9 11 11 22 6 33", "glyph-detail"));
    addMotionMarks(group, "side");
  }

  if (type === "telescope") {
    group.append(path("M-35-5l62-22 8 19-64 24Z"));
    group.append(path("M-1 12l-14 35M8 8l24 34M-24 47h61", "glyph-detail"));
    group.append(path("M38-31c11-9 23-11 37-4", "glyph-accent"));
  }

  if (type === "moon") {
    group.append(path("M13-33c-25 6-39 34-24 56 13 18 39 19 55 2-23 2-43-10-48-29-4-15 3-26 17-29Z"));
    group.append(circle(30, -26, 3, "glyph-fill-dot"));
    group.append(circle(39, -12, 2.5, "glyph-fill-dot"));
  }
}

function addInkKnot(group) {
  group.append(path("M-13-3c6-12 24-10 25 2 1 11-13 18-24 9 9-1 18-8 14-18M-8 13c-7-9-4-23 9-24 12-1 20 10 14 21M-18 3c11 8 29 5 38-7M-15-10c9 14 28 20 37 6", "knot-line"));
  group.append(path("M-8-6c5 5 9 11 10 20M9-14c-7 8-12 16-15 28M-20 10c10-7 22-8 36-3", "knot-line knot-line-secondary"));
  group.append(circle(-3, 0, 2.3, "knot-dot"));
  group.append(circle(9, -7, 1.8, "knot-dot"));
  group.append(circle(14, 10, 1.5, "knot-dot"));
}

function renderStars(positions, relatedIds) {
  starsLayer.replaceChildren();
  flashLayer.replaceChildren();

  nodes.forEach((node) => {
    const pos = positions.get(node.id);
    const isPinned = !worldNodeId && pinnedNodes.has(node.id);
    const isHover = hoverNodeId === node.id;
    const isSelected = selectedNodeId === node.id;
    const isRelated = relatedIds.has(node.id);
    const isObserved = isPinned || isHover || isSelected;
    const observabilityClass = localObservabilityClass(node.id);
    const spectrum = activeSpectrum(node.id);

    const star = el("g", {
      class: [
        "star-hit",
        observabilityClass,
        spectrum.length && "is-spectral",
        isObserved && "is-observed",
        isPinned && "is-pinned",
        isHover && "is-hover",
        isSelected && "is-active",
        isRelated && "is-related",
      ].filter(Boolean).join(" "),
      tabindex: "0",
      role: "button",
      "aria-label": `${node.label}: single click to lock or unlock, double click to explore`,
      "data-node": node.id,
      transform: `translate(${pos.x} ${pos.y})`,
    });
    applySpectrumStyles(star, spectrum);

    star.append(circle(0, 0, 34, "hotspot"));
    const aura = el("g", { class: "spectral-aura", "aria-hidden": "true" });
    spectrum.slice(0, 7).forEach((item, index) => {
      const ring = circle(0, 0, 31 + index * 5.5 + item.strength * 2.5, "spectral-ring");
      ring.style.setProperty("--ring-color", item.color);
      ring.style.setProperty("--ring-strength", item.strength.toFixed(3));
      ring.style.setProperty("--ring-width", `${(1.35 + item.strength * 1.3).toFixed(2)}px`);
      ring.style.setProperty("--ring-opacity", (0.22 + item.strength * 0.34).toFixed(3));
      ring.style.setProperty("--ring-delay", `${index * -260}ms`);
      aura.append(ring);
    });
    star.append(aura);
    const comet = el("g", { class: "star-comet" });
    comet.style.setProperty("--comet-color", spectrum[0]?.color || "var(--ink)");
    comet.append(path("M-150 -58C-108 -48 -58 -23 -8 -1", "comet-trail"));
    comet.append(path("M-102 -24C-67 -18 -34 -8 -5 2", "comet-trail comet-trail-short"));
    comet.append(circle(0, 0, 3.6, "comet-head"));
    star.append(comet);
    const dashwork = el("g", { class: "spectral-dashwork", "aria-hidden": "true" });
    const spectrumSlice = spectrum.slice(0, 7);
    const segmentLength = spectrumSlice.length === 1 ? 54 : Math.max(12, 26 - spectrumSlice.length * 2);
    const patternLength = spectrumSlice.length === 1 ? 64 : segmentLength * spectrumSlice.length;
    spectrumSlice.forEach((item, index) => {
      const dash = el("g", { class: "spectral-dash" });
      dash.style.setProperty("--dash-color", item.color);
      dash.style.setProperty("--dash-opacity", clamp(0.74 + item.strength * 0.24).toFixed(3));
      dash.style.setProperty("--dash-segment", `${segmentLength}px`);
      dash.style.setProperty("--dash-gap", `${patternLength - segmentLength}px`);
      dash.style.setProperty("--dash-offset", `${index * -segmentLength}px`);
      dash.style.setProperty("--dash-travel", `${patternLength}px`);
      dash.style.setProperty("--dash-speed", `${(5600 + spectrumSlice.length * 420).toFixed(0)}ms`);
      addGlyphOutline(dash, node.glyph);
      dashwork.append(dash);
    });
    star.append(dashwork);
    const glyph = el("g", { class: "star-glyph" });
    glyph.style.setProperty("--node-color", node.color);
    addGlyph(glyph, node.glyph);
    addGlyphName(glyph, node.label);
    star.append(glyph);
    starsLayer.append(star);

    star.addEventListener("mouseenter", () => {
      selectedArtifactId = null;
      queueHoverRender(node.id);
    });
    star.addEventListener("mouseleave", () => {
      cancelHoverRender();
      clearHoverState(node.id);
      if (selectedNodeId === node.id && !pinnedNodes.has(node.id)) {
        selectedNodeId = [...pinnedNodes][0] || null;
      }
    });
    star.addEventListener("focus", () => {
      queueHoverRender(node.id);
    });
    star.addEventListener("blur", () => {
      cancelHoverRender();
      clearHoverState(node.id);
      if (selectedNodeId === node.id && !pinnedNodes.has(node.id)) {
        selectedNodeId = [...pinnedNodes][0] || null;
      }
    });
    star.addEventListener("click", (event) => {
      event.preventDefault();
      cancelHoverRender();
      if (worldNodeId) {
        goFromStar(node.id);
        return;
      }
      scheduleTogglePin(node.id);
    });
    star.addEventListener("dblclick", (event) => {
      event.preventDefault();
      goFromStar(node.id);
    });
    star.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        goFromStar(node.id);
      }
      if (event.key === " ") {
        event.preventDefault();
        togglePin(node.id);
      }
    });
  });
}

function shapeBounds(points) {
  const xs = points.map((point) => point.x);
  const ys = points.map((point) => point.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  return {
    minX,
    maxX,
    minY,
    maxY,
    cx: (minX + maxX) / 2,
    cy: (minY + maxY) / 2,
    width: Math.max(120, maxX - minX),
    height: Math.max(100, maxY - minY),
  };
}

function constellationPath(shape, bounds) {
  const { cx, cy, width, height } = bounds;
  const sx = width / 220;
  const sy = height / 180;
  const p = (x, y) => `${cx + x * sx} ${cy + y * sy}`;

  if (shape === "sun") {
    const r = Math.max(58, Math.min(width, height) * 0.44);
    return {
      paths: [
        `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${r * 2} 0a${r} ${r} 0 1 0 -${r * 2} 0`,
        `M${cx} ${cy - r - 34}L${cx} ${cy - r - 8}M${cx} ${cy + r + 8}L${cx} ${cy + r + 34}M${cx - r - 34} ${cy}L${cx - r - 8} ${cy}M${cx + r + 8} ${cy}L${cx + r + 34} ${cy}M${cx - r * 0.72 - 24} ${cy - r * 0.72 - 24}L${cx - r * 0.72 - 7} ${cy - r * 0.72 - 7}M${cx + r * 0.72 + 7} ${cy + r * 0.72 + 7}L${cx + r * 0.72 + 24} ${cy + r * 0.72 + 24}M${cx + r * 0.72 + 24} ${cy - r * 0.72 - 24}L${cx + r * 0.72 + 7} ${cy - r * 0.72 - 7}M${cx - r * 0.72 - 7} ${cy + r * 0.72 + 7}L${cx - r * 0.72 - 24} ${cy + r * 0.72 + 24}`,
      ],
    };
  }

  if (shape === "heart") {
    return {
      paths: [
        `M${p(0, 70)}C${p(-115, 5)} ${p(-95, -90)} ${p(-28, -56)}C${p(-6, -44)} ${p(0, -22)} ${p(0, -22)}C${p(0, -22)} ${p(8, -45)} ${p(31, -57)}C${p(95, -90)} ${p(116, 5)} ${p(0, 70)}Z`,
        `M${p(-60, 18)}C${p(-32, 0)} ${p(-10, 1)} ${p(13, 24)}M${p(31, 6)}c18 20 39 20 63 1`,
      ],
    };
  }

  if (shape === "bird") {
    return {
      paths: [
        `M${p(-106, -3)}C${p(-57, -77)} ${p(-16, -64)} ${p(13, -7)}C${p(52, -55)} ${p(91, -70)} ${p(116, -41)}C${p(71, -13)} ${p(51, 35)} ${p(45, 72)}C${p(13, 22)} ${p(-29, 10)} ${p(-88, 55)}C${p(-90, 27)} ${p(-96, 11)} ${p(-106, -3)}Z`,
        `M${p(-12, -7)}C${p(11, 7)} ${p(22, 33)} ${p(17, 64)}`,
      ],
    };
  }

  if (shape === "cross") {
    return {
      paths: [
        `M${p(-22, -84)}L${p(23, -84)}L${p(23, -32)}L${p(78, -32)}L${p(78, 30)}L${p(23, 30)}L${p(23, 83)}L${p(-22, 83)}L${p(-22, 30)}L${p(-78, 30)}L${p(-78, -32)}L${p(-22, -32)}Z`,
        `M${p(-86, 89)}C${p(-40, 54)} ${p(42, 54)} ${p(86, 89)}`,
      ],
    };
  }

  if (shape === "scale") {
    return {
      paths: [
        `M${p(-104, -16)}C${p(-48, -31)} ${p(48, -31)} ${p(104, -16)}`,
        `M${p(-86, -16)}L${p(-86, 44)}M${p(-126, 44)}C${p(-106, 77)} ${p(-65, 77)} ${p(-45, 44)}Z`,
        `M${p(86, -16)}L${p(86, 44)}M${p(45, 44)}C${p(65, 77)} ${p(106, 77)} ${p(126, 44)}Z`,
        `M${p(0, -28)}L${p(0, 82)}M${p(-34, 82)}C${p(-18, 98)} ${p(20, 98)} ${p(36, 82)}`,
      ],
    };
  }

  if (shape === "bridge") {
    return {
      paths: [
        `M${p(-126, 62)}L${p(126, 62)}`,
        `M${p(-88, 62)}L${p(-88, -48)}L${p(-48, -12)}L${p(0, -48)}L${p(48, -12)}L${p(88, -48)}L${p(88, 62)}`,
        `M${p(-88, -48)}C${p(-42, 18)} ${p(42, 18)} ${p(88, -48)}`,
        `M${p(-64, 62)}L${p(-64, 14)}M${p(-32, 62)}L${p(-32, 4)}M${p(0, 62)}L${p(0, -8)}M${p(32, 62)}L${p(32, 4)}M${p(64, 62)}L${p(64, 14)}`,
      ],
    };
  }

  return {
    paths: [
      `M${p(-102, -5)}C${p(-101, -73)} ${p(-31, -93)} ${p(0, -57)}C${p(34, -91)} ${p(103, -70)} ${p(102, -4)}C${p(91, 81)} ${p(21, 87)} ${p(0, 50)}C${p(-24, 88)} ${p(-92, 80)} ${p(-102, -5)}Z`,
      `M${p(-40, -16)}L${p(-13, -3)}L${p(-35, 18)}M${p(40, -16)}L${p(13, -3)}L${p(35, 18)}M${p(-19, 40)}C${p(-2, 53)} ${p(16, 53)} ${p(27, 39)}M${p(0, -1)}V${p(0, 32).split(" ")[1]}`,
    ],
  };
}

function helperPoints(shape, bounds) {
  const { cx, cy, width, height } = bounds;
  const sx = width / 220;
  const sy = height / 180;
  const point = (x, y, r = 3.2) => ({ x: cx + x * sx, y: cy + y * sy, r });

  if (shape === "sun") {
    const radius = Math.max(58, Math.min(width, height) * 0.44);
    const ring = Array.from({ length: 12 }, (_, index) => {
      const angle = (index / 12) * Math.PI * 2;
      return { x: cx + Math.cos(angle) * radius, y: cy + Math.sin(angle) * radius, r: index % 3 === 0 ? 4 : 2.8 };
    });
    return [
      ...ring,
      { x: cx, y: cy - radius - 34, r: 2.9 },
      { x: cx + radius + 34, y: cy, r: 2.9 },
      { x: cx, y: cy + radius + 34, r: 2.9 },
      { x: cx - radius - 34, y: cy, r: 2.9 },
    ];
  }

  if (shape === "heart") {
    return [
      point(0, 70, 4),
      point(-84, 28),
      point(-96, -31, 3.7),
      point(-35, -60),
      point(0, -24, 4.3),
      point(37, -62),
      point(98, -28, 3.7),
      point(84, 30),
      point(-28, 35, 2.8),
      point(31, 31, 2.8),
    ];
  }

  if (shape === "bird") {
    return [
      point(-106, -3, 4),
      point(-70, -55),
      point(-23, -55),
      point(13, -7, 4),
      point(70, -61),
      point(116, -41, 4),
      point(56, 15),
      point(45, 72, 4),
      point(0, 20),
      point(-88, 55),
    ];
  }

  if (shape === "cross") {
    return [
      point(-22, -84, 4),
      point(23, -84, 4),
      point(23, -32),
      point(78, -32, 4),
      point(78, 30, 4),
      point(23, 30),
      point(23, 83, 4),
      point(-22, 83, 4),
      point(-22, 30),
      point(-78, 30, 4),
      point(-78, -32, 4),
      point(-22, -32),
    ];
  }

  if (shape === "scale") {
    return [
      point(-104, -16, 4),
      point(-52, -27, 3.2),
      point(0, -28, 4.4),
      point(52, -27, 3.2),
      point(104, -16, 4),
      point(-86, 44, 3.8),
      point(-126, 44, 3.5),
      point(-86, 74, 3.5),
      point(-45, 44, 3.5),
      point(86, 44, 3.8),
      point(45, 44, 3.5),
      point(86, 74, 3.5),
      point(126, 44, 3.5),
      point(0, 82, 4.2),
    ];
  }

  if (shape === "bridge") {
    return [
      point(-126, 62, 4),
      point(-88, 62, 4),
      point(-88, -48, 4.2),
      point(-48, -12, 3.2),
      point(0, -48, 4.4),
      point(48, -12, 3.2),
      point(88, -48, 4.2),
      point(88, 62, 4),
      point(126, 62, 4),
      point(-64, 14, 2.8),
      point(-32, 4, 2.8),
      point(32, 4, 2.8),
      point(64, 14, 2.8),
    ];
  }

  return [
    point(-102, -5, 4),
    point(-91, -58),
    point(-31, -93, 3.7),
    point(0, -57, 4),
    point(34, -91, 3.7),
    point(94, -55),
    point(102, -4, 4),
    point(77, 62),
    point(0, 50, 4),
    point(-77, 64),
    point(-41, -16, 2.8),
    point(41, -16, 2.8),
    point(0, 32, 3.3),
  ];
}

function actualStarPath(rootId, relatedIds, positions, shape) {
  const ids = [...new Set([rootId, ...relatedIds])].filter((id) => positions.has(id));
  if (ids.length < 2) return "";

  if (shape === "scale" && relatedIds.length >= 3) {
    const pivot = positions.get(rootId);
    const left = positions.get(relatedIds[0]);
    const right = positions.get(relatedIds[1]);
    const base = positions.get(relatedIds[2]);
    if (pivot && left && right && base) {
      const leftPanY = left.y + 76;
      const rightPanY = right.y + 76;
      return [
        `M${left.x} ${left.y} Q${pivot.x} ${pivot.y - 48} ${right.x} ${right.y}`,
        `M${pivot.x} ${pivot.y - 8} C${pivot.x - 12} ${pivot.y + 72} ${base.x + 10} ${base.y - 66} ${base.x} ${base.y}`,
        `M${left.x} ${left.y} C${left.x - 8} ${left.y + 24} ${left.x + 8} ${leftPanY - 25} ${left.x} ${leftPanY}`,
        `M${left.x - 118} ${leftPanY} C${left.x - 70} ${leftPanY + 54} ${left.x + 70} ${leftPanY + 54} ${left.x + 118} ${leftPanY}`,
        `M${right.x} ${right.y} C${right.x + 8} ${right.y + 23} ${right.x - 8} ${rightPanY - 24} ${right.x} ${rightPanY}`,
        `M${right.x - 118} ${rightPanY} C${right.x - 70} ${rightPanY + 54} ${right.x + 70} ${rightPanY + 54} ${right.x + 118} ${rightPanY}`,
        `M${base.x - 70} ${base.y} C${base.x - 34} ${base.y + 34} ${base.x + 34} ${base.y + 34} ${base.x + 70} ${base.y}`,
      ].join(" ");
    }
  }

  const points = ids.map((id) => ({ id, ...positions.get(id) }));
  return organicRoutePath(points);
}

function organicRoutePath(points) {
  if (points.length < 2) return "";

  const segments = [`M${points[0].x} ${points[0].y}`];
  for (let index = 1; index < points.length; index += 1) {
    const from = points[index - 1];
    const to = points[index];
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const length = Math.hypot(dx, dy) || 1;
    const normalX = -dy / length;
    const normalY = dx / length;
    const drift = (index % 2 === 0 ? -1 : 1) * (16 + ((from.id.length + to.id.length + index) % 9));
    const c1 = {
      x: from.x + dx * 0.32 + normalX * drift,
      y: from.y + dy * 0.32 + normalY * drift,
    };
    const c2 = {
      x: from.x + dx * 0.68 - normalX * drift * 0.72,
      y: from.y + dy * 0.68 - normalY * drift * 0.72,
    };
    segments.push(`C${c1.x.toFixed(1)} ${c1.y.toFixed(1)} ${c2.x.toFixed(1)} ${c2.y.toFixed(1)} ${to.x} ${to.y}`);
  }

  return segments.join(" ");
}

function renderHoverComet(positions) {
  if (!hoverNodeId || pinnedNodes.size || worldNodeId) return;
  const pos = positions.get(hoverNodeId);
  if (!pos) return;
  const node = nodesById.get(hoverNodeId);
  const comet = el("g", { class: "hover-comet", transform: `translate(${pos.x} ${pos.y})` });
  comet.style.setProperty("--comet-color", node?.color || "#cf1975");
  comet.append(path("M-172 -74C-124 -57 -74 -34 -8 -2", "comet-trail"));
  comet.append(path("M-126 -35C-86 -24 -47 -12 -6 2", "comet-trail comet-trail-short"));
  comet.append(circle(0, 0, 4.2, "comet-head"));
  markerLayer.append(comet);
}

function renderConstellation(rootId, lensId, positions, relatedIds, order) {
  const root = nodesById.get(rootId);
  const lens = lenses[lensId];
  if (!root || !lens || !relatedIds.length) return;

  const group = el("g", { class: "constellation-picture", "data-root": rootId, "data-lens-id": lensId });
  group.style.setProperty("--lens-color", lens.color);
  group.style.setProperty("--delay", `${order * 60}ms`);
  const points = [rootId, ...relatedIds].map((id) => positions.get(id)).filter(Boolean);
  const bounds = shapeBounds(points);

  const route = actualStarPath(rootId, relatedIds, positions, lens.shape);
  if (route) {
    group.append(path(route, "relation-wash"));
    group.append(path(route, "relation-line"));
  }

  if (lens.shape !== "scale") {
    constellationPath(lens.shape, bounds).paths.forEach((d) => {
      group.append(path(d, "constellation-outline"));
    });

    helperPoints(lens.shape, bounds).forEach((dot) => {
      group.append(circle(dot.x, dot.y, dot.r, "constellation-drawn-node"));
    });
  }

  [rootId, ...relatedIds].forEach((id) => {
    const pos = positions.get(id);
    if (!pos) return;
    group.append(circle(pos.x, pos.y, id === rootId ? 5.5 : 3.8, "constellation-node"));
  });

  constellationsLayer.append(group);
}

function renderGratitudeField(positions) {
  if (!activeLenses.has("gratitude")) return;

  const lens = lenses.gratitude;
  const center = worldNodeId ? positions.get(worldNodeId) || { x: 600, y: 310 } : { x: 600, y: 360 };
  const group = el("g", { class: "center-field", "data-lens-id": "gratitude" });
  group.style.setProperty("--lens-color", lens.color);

  nodes.forEach((node, index) => {
    const pos = positions.get(node.id);
    if (!pos) return;
    const pull = 0.42 + (index % 3) * 0.06;
    const controlA = {
      x: center.x + (pos.x - center.x) * pull,
      y: center.y - 58 + Math.sin(index * 1.7) * 28,
    };
    const controlB = {
      x: center.x + (pos.x - center.x) * (1 - pull * 0.32),
      y: pos.y + Math.cos(index * 1.2) * 32,
    };
    group.append(path(`M${center.x} ${center.y}C${controlA.x.toFixed(1)} ${controlA.y.toFixed(1)} ${controlB.x.toFixed(1)} ${controlB.y.toFixed(1)} ${pos.x} ${pos.y}`, "center-field-link"));
  });

  const mark = el("g", { class: "center-field-mark", transform: `translate(${center.x} ${center.y})` });
  mark.append(path("M0-10C-13-28-42-8-31 18C-23 36-5 42 0 50C5 42 23 36 31 18C42-8 13-28 0-10Z", "center-field-heart"));
  mark.append(circle(0, 14, 2.8, "center-field-dot"));
  group.append(mark);
  constellationsLayer.append(group);
}

function renderConnections(positions) {
  constellationsLayer.replaceChildren();
  linesLayer.replaceChildren();
  markerLayer.replaceChildren();
  renderGratitudeField(positions);
  const roots = [...activeRoots()];
  const relatedIds = new Set();
  let order = 0;

  roots.forEach((rootId) => {
    activeLenses.forEach((lensId) => {
      const related = linksFor(rootId, lensId).filter((id) => nodesById.has(id));
      related.forEach((id) => relatedIds.add(id));
      renderConstellation(rootId, lensId, positions, related, order);
      order += 1;
    });
  });

  renderHoverComet(positions);

  return relatedIds;
}

function togglePin(id) {
  selectedNodeId = id;
  selectedArtifactId = null;
  if (pinnedNodes.has(id)) {
    pinnedNodes.delete(id);
    if (selectedNodeId === id) {
      selectedNodeId = hoverNodeId || [...pinnedNodes][0] || null;
    }
  } else {
    pinnedNodes.add(id);
  }
  render();
}

function renderNote(nodeId) {
  const node = nodesById.get(nodeId);
  const hasPins = pinnedNodes.size > 0;
  clearPinsButton.hidden = !hasPins;

  if (!node) {
    noteTitle.textContent = "pick a star.";
    noteCopy.textContent = "";
    goButton.disabled = true;
    return;
  }

  noteTitle.textContent = node.label;
  noteCopy.textContent = node.note;
  goButton.disabled = false;
}

function selectArtifact(artifactId) {
  selectedArtifactId = artifactId;
  const artifact = findArtifact(artifactId);
  if (artifact) {
    selectedNodeId = artifact.target;
    hoverNodeId = artifact.target;
  }
  render();
}

function findArtifact(artifactId) {
  for (const node of nodes) {
    const artifact = node.artifacts.find((item) => item.id === artifactId);
    if (artifact) return artifact;
  }
  return null;
}

function renderArtifactDock(nodeId) {
  carousel.replaceChildren();
  artifactPreview.replaceChildren();
  const node = worldNodeId ? nodesById.get(worldNodeId) : null;
  const artifacts = node ? artifactsFor(node.id) : [];
  const showDock = Boolean(worldNodeId && artifacts.length);
  artifactDock.classList.toggle("is-visible", showDock);
  document.body.classList.toggle("has-artifacts", showDock);

  artifacts.forEach((artifact) => {
    const card = htmlEl("button", {
      class: `artifact-card ${artifact.id === selectedArtifactId ? "is-selected" : ""}`,
      type: "button",
      "data-artifact": artifact.id,
      title: artifact.title,
    });
    const img = htmlEl("img", { src: artifact.src, alt: artifact.title, loading: "lazy" });
    const label = htmlEl("span", { text: artifact.title });
    card.append(img, label);
    card.addEventListener("click", () => {
      selectedArtifactId = artifact.id;
      if (artifact.target === worldNodeId) {
        worldArtifactId = artifact.id;
        render();
      } else {
        goToWorld(artifact.target, artifact.id);
      }
    });
    carousel.append(card);
  });
}

function renderObjectPreviews(positions) {
  objectPreviewLayer.replaceChildren();
  const ids = previewNodeIds();
  const showLayer = ids.length > 0;
  objectPreviewLayer.classList.toggle("is-visible", showLayer);
  objectPreviewLayer.setAttribute("aria-hidden", String(!showLayer));

  ids.forEach((id) => {
    const node = nodesById.get(id);
    const pos = positions.get(id);
    if (!node || !pos) return;

    const artifacts = artifactsFor(id).slice(0, 3);
    if (!artifacts.length) return;

    const isPinned = pinnedNodes.has(id);
    const preview = htmlEl("article", {
      class: [
        "object-preview",
        isPinned && "is-locked",
        hoverNodeId === id && "is-hovered",
        pos.y > 555 && "is-low",
      ].filter(Boolean).join(" "),
      "data-preview-node": id,
    });
    preview.style.setProperty("--preview-x", String((pos.x / 1200) * 100));
    preview.style.setProperty("--preview-y", String((pos.y / 760) * 100));
    preview.style.setProperty("--preview-color", node.color);
    const hotspot = starElement(id)?.querySelector(".hotspot")?.getBoundingClientRect();
    if (hotspot) {
      preview.style.left = `${hotspot.left + hotspot.width / 2}px`;
      preview.style.top = `${hotspot.top + hotspot.height / 2}px`;
    }

    const imageRail = htmlEl("div", { class: "object-preview-orbit" });
    imageRail.append(htmlEl("span", { class: "object-preview-ring" }));
    artifacts.forEach((artifact, index) => {
      const motion = satelliteMotion(id, index, artifacts.length, pos.x);
      const frame = htmlEl("span", {
        class: `object-preview-frame frame-${index + 1}`,
        title: artifact.title,
      });
      frame.style.setProperty("--satellite-angle", `${motion.angle.toFixed(2)}deg`);
      frame.style.setProperty("--satellite-counter-angle", `${(-motion.angle).toFixed(2)}deg`);
      frame.style.setProperty("--satellite-radius", `${motion.radius.toFixed(2)}px`);
      frame.style.setProperty("--satellite-quarter-angle", `${motion.quarterAngle.toFixed(2)}deg`);
      frame.style.setProperty("--satellite-quarter-counter-angle", `${(-motion.quarterAngle).toFixed(2)}deg`);
      frame.style.setProperty("--satellite-quarter-radius", `${motion.quarterRadius.toFixed(2)}px`);
      frame.style.setProperty("--satellite-quarter-drift", `${motion.quarterDrift.toFixed(2)}px`);
      frame.style.setProperty("--satellite-half-angle", `${motion.halfAngle.toFixed(2)}deg`);
      frame.style.setProperty("--satellite-half-counter-angle", `${(-motion.halfAngle).toFixed(2)}deg`);
      frame.style.setProperty("--satellite-half-radius", `${motion.halfRadius.toFixed(2)}px`);
      frame.style.setProperty("--satellite-half-drift", `${motion.halfDrift.toFixed(2)}px`);
      frame.style.setProperty("--satellite-three-quarter-angle", `${motion.threeQuarterAngle.toFixed(2)}deg`);
      frame.style.setProperty("--satellite-three-quarter-counter-angle", `${(-motion.threeQuarterAngle).toFixed(2)}deg`);
      frame.style.setProperty("--satellite-three-quarter-radius", `${motion.threeQuarterRadius.toFixed(2)}px`);
      frame.style.setProperty("--satellite-three-quarter-drift", `${motion.threeQuarterDrift.toFixed(2)}px`);
      frame.style.setProperty("--satellite-end-angle", `${motion.endAngle.toFixed(2)}deg`);
      frame.style.setProperty("--satellite-end-counter-angle", `${(-motion.endAngle).toFixed(2)}deg`);
      frame.style.setProperty("--satellite-orbit-duration", `${motion.duration.toFixed(0)}ms`);
      frame.style.setProperty("--satellite-orbit-delay", `${motion.orbitDelay.toFixed(0)}ms`);
      frame.style.setProperty("--image-delay", `${motion.imageDelay.toFixed(0)}ms`);
      frame.style.setProperty("--image-duration", `${motion.imageDuration.toFixed(0)}ms`);
      const img = htmlEl("img", { src: artifact.src, alt: artifact.title, loading: "lazy" });
      frame.append(img);
      imageRail.append(frame);
    });
    preview.append(imageRail);

    if (isPinned) {
      const explore = htmlEl("button", {
        class: "object-explore",
        type: "button",
        text: "Explore",
      });
      explore.addEventListener("click", (event) => {
        event.stopPropagation();
        goToWorld(id);
      });
      preview.append(explore);
    }

    objectPreviewLayer.append(preview);
  });
}

function sceneMarkup(scene) {
  const common = "vector-effect='non-scaling-stroke' fill='none' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round'";
  if (scene === "sun") {
    return `<svg viewBox="0 0 900 190" aria-hidden="true"><path ${common} d="M82 150C252 94 411 91 583 145s246 36 290-2"/><circle ${common} cx="453" cy="92" r="42"/><path ${common} d="M453 21v33M453 130v36M383 92h33M490 92h33M404 43l24 24M479 117l26 26M503 43l-25 24M428 117l-26 26"/></svg>`;
  }
  if (scene === "library") {
    return `<svg viewBox="0 0 900 190" aria-hidden="true"><path ${common} d="M55 158h790M113 158V48h666v110M166 58v88M228 58v88M314 58v88M390 58v88M509 58v88M590 58v88M702 58v88M113 94h666M113 124h666"/><path ${common} d="M248 145c22-16 46-16 72 0M603 145c35-20 71-18 112 3"/></svg>`;
  }
  if (scene === "museum") {
    return `<svg viewBox="0 0 900 190" aria-hidden="true"><path ${common} d="M82 160h742M190 160V60h132v100M578 160V44h150v116M245 60V34M653 44V20M238 34h18M646 20h18"/><path ${common} d="M397 158c-23-68 79-75 61-7M411 78c16-30 42-31 59 0M426 91v48M454 91v48"/></svg>`;
  }
  if (scene === "water") {
    return `<svg viewBox="0 0 900 190" aria-hidden="true"><path ${common} d="M42 118c42-38 85-38 128 0s86 38 129 0 86-38 129 0 86 38 129 0 86-38 129 0 86 38 171 0M42 157c42-35 85-35 128 0s86 35 129 0 86-35 129 0 86 35 129 0 86-35 129 0 86 35 171 0"/></svg>`;
  }
  if (scene === "clinic") {
    return `<svg viewBox="0 0 900 190" aria-hidden="true"><path ${common} d="M102 154h702M173 154V82h126v72M585 154V63h153v91M222 101v35M204 119h36M640 87h45M663 65v45M370 84c0 47 30 76 80 76s80-29 80-76"/><path ${common} d="M370 84c-12-20 11-35 28-20M530 84c12-20-11-35-28-20"/></svg>`;
  }
  if (scene === "observatory") {
    return `<svg viewBox="0 0 900 190" aria-hidden="true"><path ${common} d="M99 158h704M190 158v-45c0-78 124-78 124 0v45M220 80l45-42M251 66l26-25M420 158c-53-75 29-119 102-77s105 13 92-42M658 61c22 19 40 50 54 97"/><circle ${common} cx="673" cy="46" r="10"/></svg>`;
  }
  if (scene === "moon") {
    return `<svg viewBox="0 0 900 190" aria-hidden="true"><path ${common} d="M68 158c152-44 285-44 397 0s236 41 371-2"/><path ${common} d="M521 54c-51 14-75 76-38 112 32-35 40-75 38-112Z"/><path ${common} d="M179 113l44-65 44 65M202 80h42M632 91h55l22 67h-99Z"/></svg>`;
  }
  return `<svg viewBox="0 0 900 190" aria-hidden="true"><path ${common} d="M74 140C225 93 395 93 584 141s273 11 290-17"/></svg>`;
}

function goToWorld(nodeId, artifactId = null) {
  const node = nodesById.get(nodeId);
  if (!node) return;

  hoverNodeId = null;
  selectedNodeId = node.id;
  selectedArtifactId = artifactId;
  worldArtifactId = artifactId;
  const position = currentPositions().get(node.id) || node.base;
  document.body.style.setProperty("--jump-x", `${(position.x / 1200) * 100}%`);
  document.body.style.setProperty("--jump-y", `${(position.y / 760) * 100}%`);
  document.body.style.setProperty("--jump-color", node.color);
  if (jumpTimer) window.clearTimeout(jumpTimer);
  if (arrivalTimer) window.clearTimeout(arrivalTimer);
  document.body.classList.remove("is-arriving");
  document.body.classList.add("is-jumping");

  jumpTimer = window.setTimeout(() => {
    worldNodeId = node.id;
    document.body.classList.add("is-world");
    document.body.classList.add("is-arriving");
    document.body.classList.remove("is-jumping");
    render();
    jumpTimer = null;
    arrivalTimer = window.setTimeout(() => {
      document.body.classList.remove("is-arriving");
      arrivalTimer = null;
    }, 520);
  }, 720);
}

function leaveWorld() {
  if (jumpTimer) window.clearTimeout(jumpTimer);
  if (arrivalTimer) window.clearTimeout(arrivalTimer);
  jumpTimer = null;
  arrivalTimer = null;
  worldNodeId = null;
  worldArtifactId = null;
  document.body.classList.remove("is-world", "is-jumping", "is-arriving");
  render();
}

function renderWorld() {
  const node = worldNodeId ? nodesById.get(worldNodeId) : null;
  worldPanel.setAttribute("aria-hidden", String(!node));
  if (!node) return;

  const artifact = worldArtifactId ? findArtifact(worldArtifactId) : artifactsFor(node.id)[0];
  worldKicker.textContent = "centered on";
  worldTitle.textContent = node.label;
  worldNote.textContent = node.note;
  sceneGraphic.innerHTML = sceneMarkup(node.scene);

  worldFeature.hidden = !artifact;
  if (artifact) {
    worldImage.src = artifact.src;
    worldImage.alt = artifact.title;
    worldCaption.textContent = artifact.title;
  }
}

function renderLensButtons() {
  lensButtons.forEach((button) => {
    const active = activeLenses.has(button.dataset.lens);
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
    button.style.setProperty("--lens-color", lenses[button.dataset.lens]?.color || "#cf1975");
  });
}

function renderBodyState(nodeId) {
  const hasDiscovery = Boolean(nodeId || pinnedNodes.size || worldNodeId);
  document.body.classList.toggle("has-discovery", hasDiscovery);
  document.body.classList.toggle("has-pins", !worldNodeId && pinnedNodes.size > 0);
  document.body.style.setProperty("--active-color", nodesById.get(nodeId)?.color || "#cf1975");
}

function render() {
  const positions = currentPositions();
  const relatedIds = renderConnections(positions);
  renderStars(positions, relatedIds);
  const nodeId = visibleNodeId();
  renderBodyState(nodeId);
  renderNote(nodeId);
  renderObjectPreviews(positions);
  renderArtifactDock(nodeId);
  renderLensButtons();
  renderSpectrometerState();
  renderWorld();
}

lensButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const lensId = button.dataset.lens;
    if (activeLenses.has(lensId)) activeLenses.delete(lensId);
    else activeLenses.add(lensId);
    render();
  });
});

goButton.addEventListener("click", () => {
  const target = selectedArtifactId ? findArtifact(selectedArtifactId)?.target : visibleNodeId();
  if (target) goToWorld(target, selectedArtifactId);
});

clearPinsButton.addEventListener("click", () => {
  pinnedNodes.clear();
  selectedArtifactId = null;
  selectedNodeId = hoverNodeId;
  render();
});

backButton.addEventListener("click", leaveWorld);

render();
