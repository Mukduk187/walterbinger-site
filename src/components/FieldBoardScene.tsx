import { motion } from "motion/react";
import {
  Archive,
  ArrowLeft,
  Boxes,
  Download,
  ExternalLink,
  Filter,
  Focus,
  Link2,
  List,
  Maximize2,
  Moon,
  MoreVertical,
  Plus,
  Search,
  SlidersHorizontal,
  Sparkles,
  SunMedium,
  X,
} from "lucide-react";
import {
  type CSSProperties,
  useMemo,
  useState,
} from "react";
import { AUTHORED_BODIES } from "../data/bodies";
import { useUniverseStore } from "../state/universeStore";
import "./field-board.css";

type BoardMode = "intake" | "constellation" | "blackout";
type FieldStatus =
  | "new"
  | "in review"
  | "linked"
  | "verified"
  | "question"
  | "fragment"
  | "parked";

interface FieldCardData {
  id: string;
  title: string;
  status: FieldStatus;
  date: string;
  redactions: number;
  type: string;
  tags: string[];
  note: string;
  links: string[];
}

interface BoardNode {
  id: string;
  x: number;
  y: number;
  cluster: string;
  hot?: boolean;
}

const INITIAL_CARDS: FieldCardData[] = [
  {
    id: "01",
    title: "Common Sense / Infinite Sense",
    status: "new",
    date: "Jun 23",
    redactions: 2,
    type: "Thesis",
    tags: ["flagship", "language"],
    note: "One-page thesis, claim audit, ten-section outline.",
    links: ["Science translation", "Civic language", "Synesthesia grammar"],
  },
  {
    id: "02",
    title: "JARVIS Intake Loop",
    status: "in review",
    date: "Jun 23",
    redactions: 1,
    type: "Tool",
    tags: ["center", "workflow"],
    note: "Single inbox to triage to project board to artifact generator.",
    links: ["AI Board Chamber", "Artifact tray", "Voice capture"],
  },
  {
    id: "03",
    title: "Dietary Systems Reform",
    status: "linked",
    date: "Jun 22",
    redactions: 1,
    type: "Memo",
    tags: ["care", "operations"],
    note: "Two-page problem memo with concrete examples and metrics.",
    links: ["Dementia lens", "Evidence wall", "Stakeholder map"],
  },
  {
    id: "04",
    title: "Dementia Communication Lens",
    status: "verified",
    date: "Jun 21",
    redactions: 1,
    type: "Training",
    tags: ["care", "practice"],
    note: "Five principles, each with one example and one source.",
    links: ["Dietary systems", "Care accuracy", "Training module"],
  },
  {
    id: "05",
    title: "Science / Mysticism Split",
    status: "question",
    date: "Jun 20",
    redactions: 2,
    type: "Audit",
    tags: ["claims", "research"],
    note: "Separate observed, researched, metaphorical, speculative.",
    links: ["Claim audit", "Reading list", "Metaphor lane"],
  },
  {
    id: "06",
    title: "Synesthesia Interface Grammar",
    status: "fragment",
    date: "Jun 19",
    redactions: 1,
    type: "Design",
    tags: ["color", "tone"],
    note: "Glossary: color, tone, feeling, action, UI implication.",
    links: ["Field card styling", "Signal overlay", "Private grammar"],
  },
  {
    id: "07",
    title: "Different Points",
    status: "parked",
    date: "Jun 18",
    redactions: 2,
    type: "Charter",
    tags: ["curation", "community"],
    note: "Needs mission, moderation, governance, audience, funding.",
    links: ["Nonprofit art site", "Curation rules", "Return loop"],
  },
  {
    id: "08",
    title: "Voice Memo Pilot",
    status: "linked",
    date: "Jun 17",
    redactions: 1,
    type: "Media",
    tags: ["audio", "edit"],
    note: "Select one 20-minute segment and make an edited transcript.",
    links: ["Privacy boundary", "Pilot transcript", "Consent rules"],
  },
  {
    id: "09",
    title: "Public History Timeline",
    status: "fragment",
    date: "Jun 16",
    redactions: 1,
    type: "Archive",
    tags: ["timeline", "source"],
    note: "People, dates, documents, and claims before any essay.",
    links: ["Family lineage", "Urban planning", "Claim audit"],
  },
];

const NODES: BoardNode[] = [
  { id: "01", x: 48, y: 42, cluster: "Thesis Spine", hot: true },
  { id: "02", x: 34, y: 35, cluster: "Operating System" },
  { id: "03", x: 64, y: 34, cluster: "Care Systems" },
  { id: "04", x: 71, y: 48, cluster: "Care Systems" },
  { id: "05", x: 53, y: 62, cluster: "Evidence Wall" },
  { id: "06", x: 28, y: 58, cluster: "Design Grammar" },
  { id: "07", x: 20, y: 70, cluster: "Parked Orbit" },
  { id: "08", x: 43, y: 73, cluster: "Source Material" },
  { id: "09", x: 78, y: 67, cluster: "Archive Thread" },
];

const CONNECTIONS = [
  ["01", "02"],
  ["01", "03"],
  ["03", "04"],
  ["01", "05"],
  ["05", "06"],
  ["06", "08"],
  ["08", "01"],
  ["07", "06"],
  ["09", "05"],
  ["09", "04"],
] as const;

const INITIAL_ARTIFACTS = [
  "Graph Snapshot",
  "Link Map",
  "Redaction Sheet",
  "Signal Overlay",
  "Key Extracts",
  "Interview Map",
];

const STATUS_LABEL: Record<FieldStatus, string> = {
  new: "NEW",
  "in review": "IN REVIEW",
  linked: "LINKED",
  verified: "VERIFIED",
  question: "QUESTION",
  fragment: "FRAGMENT",
  parked: "PARKED",
};

const ZOOM_STEPS = [100, 115, 130, 85];

export function FieldBoardScene() {
  const leaveFieldBoard = useUniverseStore((state) => state.leaveFieldBoard);
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [selectedId, setSelectedId] = useState("06");
  const [mode, setMode] = useState<BoardMode>("constellation");
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [docsOpen, setDocsOpen] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [maximized, setMaximized] = useState(false);
  const [zoomIndex, setZoomIndex] = useState(0);
  const [artifacts, setArtifacts] = useState(INITIAL_ARTIFACTS);
  const [activeArtifact, setActiveArtifact] = useState<string | null>(null);
  const selected = cards.find((card) => card.id === selectedId) ?? cards[0];
  const selectedNode = NODES.find((node) => node.id === selected.id);
  const fieldTools = AUTHORED_BODIES.find((body) => body.id === "field-tools");
  const zoom = ZOOM_STEPS[zoomIndex] ?? 100;

  const starField = useMemo(
    () =>
      Array.from({ length: 72 }, (_, index) => ({
        id: index,
        left: `${(index * 37) % 100}%`,
        top: `${(index * 61) % 100}%`,
        opacity: 0.2 + ((index * 13) % 45) / 100,
      })),
    [],
  );

  const filteredCards = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return cards;
    }
    return cards.filter((card) =>
      [card.title, card.type, card.note, ...card.tags, ...card.links]
        .join(" ")
        .toLowerCase()
        .includes(normalized),
    );
  }, [cards, query]);

  const connectedIds = useMemo(() => {
    const ids = new Set([selected.id]);
    for (const [from, to] of CONNECTIONS) {
      if (from === selected.id) {
        ids.add(to);
      }
      if (to === selected.id) {
        ids.add(from);
      }
    }
    return ids;
  }, [selected.id]);

  const addFieldCard = () => {
    const nextNumber = cards.length + 1;
    const id = String(nextNumber).padStart(2, "0");
    const nextCard: FieldCardData = {
      id,
      title: "Untitled Field Signal",
      status: "new",
      date: "Now",
      redactions: 1,
      type: "Signal",
      tags: ["intake"],
      note: "New material waiting to be named, linked, and tested.",
      links: ["Unmapped"],
    };
    setCards((current) => [...current, nextCard]);
    setSelectedId(id);
    setMode("intake");
  };

  const generateArtifact = () => {
    const next = `Field Extract ${String(artifacts.length + 1).padStart(2, "0")}`;
    setArtifacts((current) => [...current, next]);
    setActiveArtifact(next);
  };

  const exportBoard = () => {
    const payload = JSON.stringify(
      {
        exportedAt: new Date().toISOString(),
        selectedId,
        mode,
        cards,
        connections: CONNECTIONS,
      },
      null,
      2,
    );
    const href = URL.createObjectURL(
      new Blob([payload], { type: "application/json" }),
    );
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = "prep-perp-field-board.json";
    anchor.click();
    URL.revokeObjectURL(href);
  };

  return (
    <motion.main
      className={`field-board-scene mode-${mode}${maximized ? " is-maximized" : ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
    >
      <header className="field-board-topbar">
        <div className="field-board-brand">
          <button
            type="button"
            className="field-board-icon-button field-board-back"
            onClick={leaveFieldBoard}
            aria-label="Leave field board"
            title="Back"
          >
            <ArrowLeft size={18} />
          </button>
          <Boxes size={20} aria-hidden="true" />
          <strong>PERP Field Board</strong>
        </div>

        <nav className="field-board-mode-tabs" aria-label="Board modes">
          <ModeButton
            active={mode === "intake"}
            icon={<List size={15} />}
            label="Intake"
            onClick={() => setMode("intake")}
          />
          <ModeButton
            active={mode === "constellation"}
            icon={<Sparkles size={15} />}
            label="Constellation"
            onClick={() => setMode("constellation")}
          />
          <ModeButton
            active={mode === "blackout"}
            icon={<Moon size={15} />}
            label="Blackout"
            onClick={() => setMode("blackout")}
          />
          <ModeButton
            icon={<Download size={15} />}
            label="Export"
            onClick={exportBoard}
          />
        </nav>

        <div className="field-board-top-actions">
          {searchOpen && (
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Find a signal"
              aria-label="Search field cards"
              autoFocus
            />
          )}
          <button
            type="button"
            onClick={() => {
              setSearchOpen((open) => !open);
              if (searchOpen) {
                setQuery("");
              }
            }}
            aria-label={searchOpen ? "Close search" : "Search field cards"}
            title={searchOpen ? "Close search" : "Search"}
          >
            {searchOpen ? <X size={18} /> : <Search size={18} />}
          </button>
          <button
            type="button"
            onClick={() => setDocsOpen((open) => !open)}
            aria-label="Supporting documents"
            aria-expanded={docsOpen}
            title="Supporting documents"
          >
            <Archive size={18} />
          </button>
          <SunMedium size={18} aria-hidden="true" />
          <span aria-hidden="true">P</span>
        </div>
      </header>

      <div className="field-board-workspace">
        <aside className="field-board-rail">
          <div className="field-board-rail-head">
            <div>
              <h1>Field Cards</h1>
              <span>{cards.length} active fragments</span>
            </div>
            <button
              type="button"
              className="field-board-icon-button"
              onClick={addFieldCard}
              aria-label="Add field card"
              title="Add field card"
            >
              <Plus size={17} />
            </button>
          </div>

          <div className="field-board-card-grid">
            {filteredCards.map((card) => (
              <FieldCard
                card={card}
                key={card.id}
                selected={card.id === selected.id}
                onSelect={() => setSelectedId(card.id)}
              />
            ))}
            {filteredCards.length === 0 && (
              <p className="field-board-empty">No matching signal.</p>
            )}
          </div>

          <div className="field-board-rail-tools">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Filter field cards"
            >
              <Filter size={16} />
              <span>Filter</span>
            </button>
            <button
              type="button"
              onClick={() =>
                setCards((current) =>
                  [...current].sort((a, b) => a.title.localeCompare(b.title)),
                )
              }
              aria-label="Sort field cards"
            >
              <SlidersHorizontal size={16} />
              <span>Sort</span>
            </button>
            <button
              type="button"
              onClick={() => setMode("intake")}
              aria-label="Intake view"
            >
              <List size={17} />
            </button>
          </div>
        </aside>

        <section className={`field-board-zone ${focusMode ? " is-focused" : ""}`}>
          <div className="field-board-board-top">
            <div>
              <h2>Blackout / Constellation</h2>
              <p>
                {mode === "blackout"
                  ? "Redaction-first reading mode"
                  : mode === "intake"
                    ? "Working fragments before they find their orbit"
                    : "Pattern map from field evidence"}
              </p>
            </div>
            <div className="field-board-tool-cluster">
              <button
                type="button"
                className="field-board-icon-button"
                onClick={() => setFocusMode((focused) => !focused)}
                aria-pressed={focusMode}
                aria-label="Focus selection"
                title="Focus selection"
              >
                <Focus size={16} />
              </button>
              <button
                type="button"
                className="field-board-icon-button"
                onClick={() => setMaximized((expanded) => !expanded)}
                aria-pressed={maximized}
                aria-label="Maximize board"
                title="Maximize board"
              >
                <Maximize2 size={16} />
              </button>
              <button
                type="button"
                className="field-board-zoom-control"
                onClick={() =>
                  setZoomIndex((current) => (current + 1) % ZOOM_STEPS.length)
                }
                aria-label={`Board zoom ${zoom}%`}
              >
                {zoom}%
              </button>
            </div>
          </div>

          <div className="field-board-constellation">
            <div
              className="field-board-map-plane"
              style={{ "--board-zoom": zoom / 100 } as CSSProperties}
            >
              {starField.map((star) => (
                <span
                  className="field-board-star"
                  key={star.id}
                  style={{
                    left: star.left,
                    top: star.top,
                    opacity: star.opacity,
                  }}
                />
              ))}

              <svg
                className="field-board-link-layer"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {CONNECTIONS.map(([from, to]) => {
                  const a = NODES.find((node) => node.id === from);
                  const b = NODES.find((node) => node.id === to);
                  if (!a || !b) {
                    return null;
                  }
                  const active = from === selected.id || to === selected.id;
                  return (
                    <line
                      key={`${from}-${to}`}
                      x1={a.x}
                      y1={a.y}
                      x2={b.x}
                      y2={b.y}
                      className={active ? "is-active" : ""}
                    />
                  );
                })}
              </svg>

              {NODES.map((node) => {
                const card = cards.find((item) => item.id === node.id);
                const connected = connectedIds.has(node.id);
                return (
                  <button
                    type="button"
                    className={`field-board-node${node.hot ? " is-hot" : ""}${node.id === selected.id ? " is-selected" : ""}${connected ? " is-connected" : ""}`}
                    key={node.id}
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                    onClick={() => setSelectedId(node.id)}
                    aria-label={`Select ${card?.title ?? node.id}`}
                  >
                    <span />
                  </button>
                );
              })}

              <ClusterLabel label="Thesis Spine" x={42} y={28} />
              <ClusterLabel label="Care Systems" x={72} y={38} />
              <ClusterLabel label="Evidence Wall" x={55} y={72} />
              <ClusterLabel label="Source Material" x={31} y={79} />

              <div className="field-board-mini-map" aria-hidden="true">
                <div />
              </div>
            </div>
          </div>

          <section className="field-board-detail-dock">
            <div className="field-board-selected-card">
              <FieldCard card={selected} selected compact onSelect={() => {}} />
            </div>
            <div className="field-board-detail-meta">
              <div className="field-board-dock-title">
                <h3>{selected.title}</h3>
                <Sparkles size={17} aria-hidden="true" />
              </div>
              <dl>
                <div>
                  <dt>Type</dt>
                  <dd>{selected.type}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{STATUS_LABEL[selected.status]}</dd>
                </div>
                <div>
                  <dt>Cluster</dt>
                  <dd>{selectedNode?.cluster ?? "Unmapped"}</dd>
                </div>
              </dl>
              <div className="field-board-tag-row">
                {selected.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <div className="field-board-detail-links">
              <h4>Links ({selected.links.length})</h4>
              {selected.links.map((link, index) => (
                <p key={link}>
                  <i
                    style={
                      {
                        "--field-link-dot": [
                          "#7dd3d8",
                          "#8bcf75",
                          "#f2b95f",
                        ][index % 3],
                      } as CSSProperties
                    }
                  />
                  {link}
                </p>
              ))}
            </div>
            <div className="field-board-detail-notes">
              <h4>Notes</h4>
              <p>{selected.note}</p>
              <div className="field-board-redaction-lines" aria-hidden="true">
                {Array.from(
                  { length: selected.redactions + 2 },
                  (_, index) => (
                    <span key={index} />
                  ),
                )}
              </div>
            </div>
          </section>

          <section className="field-board-artifact-tray">
            <div className="field-board-tray-title">
              <h3>Artifacts</h3>
              <span>{artifacts.length}</span>
            </div>
            {artifacts.map((artifact, index) => (
              <button
                type="button"
                className={`field-board-artifact${activeArtifact === artifact ? " is-active" : ""}`}
                key={artifact}
                onClick={() =>
                  setActiveArtifact((active) =>
                    active === artifact ? null : artifact,
                  )
                }
              >
                <span>{artifact}</span>
                <small>Jun {Math.max(1, 12 - index)}</small>
                <i />
              </button>
            ))}
            <button
              type="button"
              className="field-board-generate-artifact"
              onClick={generateArtifact}
            >
              <Plus size={22} />
              <span>Generate Artifact</span>
            </button>
          </section>
        </section>
      </div>

      {docsOpen && (
        <aside className="field-board-docs" aria-label="Supporting documents">
          <div>
            <Archive size={18} aria-hidden="true" />
            <strong>Supporting documents</strong>
            <button
              type="button"
              onClick={() => setDocsOpen(false)}
              aria-label="Close supporting documents"
            >
              <X size={17} />
            </button>
          </div>
          <nav>
            {fieldTools?.resources?.map((resource) => (
              <a
                key={resource.id}
                href={resource.href}
                target="_blank"
                rel="noreferrer"
              >
                <span>{resource.label}</span>
                <ExternalLink size={15} aria-hidden="true" />
              </a>
            ))}
          </nav>
        </aside>
      )}
    </motion.main>
  );
}

function ModeButton({
  active = false,
  icon,
  label,
  onClick,
}: {
  active?: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={active ? "is-active" : ""}
      onClick={onClick}
      aria-pressed={active}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function FieldCard({
  card,
  selected,
  onSelect,
  compact = false,
}: {
  card: FieldCardData;
  selected: boolean;
  onSelect: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      className={`field-board-card${selected ? " is-selected" : ""}${compact ? " is-compact" : ""}`}
      onClick={onSelect}
    >
      <div className="field-board-card-top">
        <span>{card.id}</span>
        <b className={`field-board-status status-${card.status.replace(" ", "-")}`}>
          {STATUS_LABEL[card.status]}
        </b>
      </div>
      <h2>{card.title}</h2>
      <div className="field-board-blackout-line" aria-hidden="true" />
      {!compact && (
        <div className="field-board-card-foot">
          <span>{card.date}</span>
          <div>
            <MoreVertical size={15} aria-hidden="true" />
            {card.links.length > 2 && <Link2 size={14} aria-hidden="true" />}
          </div>
        </div>
      )}
    </button>
  );
}

function ClusterLabel({
  label,
  x,
  y,
}: {
  label: string;
  x: number;
  y: number;
}) {
  return (
    <div
      className="field-board-cluster-label"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {label}
    </div>
  );
}
