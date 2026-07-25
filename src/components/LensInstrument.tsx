import type { CSSProperties, KeyboardEvent } from "react";
import { motion } from "motion/react";
import { Home, RotateCcw } from "lucide-react";
import {
  LENSES,
  mixLensColors,
  resolvePhenomena,
  type LensId,
} from "../domain/cosmology";
import { useUniverseStore } from "../state/universeStore";

function polarPoint(radius: number, angle: number) {
  return {
    x: 100 + Math.cos(angle) * radius,
    y: 100 + Math.sin(angle) * radius,
  };
}

function segmentPath(index: number) {
  const start = (index / 8) * Math.PI * 2 - Math.PI / 2;
  const end = ((index + 1) / 8) * Math.PI * 2 - Math.PI / 2;
  const outerStart = polarPoint(66, start + 0.035);
  const outerEnd = polarPoint(66, end - 0.035);
  const innerEnd = polarPoint(28, end - 0.07);
  const innerStart = polarPoint(28, start + 0.07);
  return [
    `M${outerStart.x} ${outerStart.y}`,
    `A66 66 0 0 1 ${outerEnd.x} ${outerEnd.y}`,
    `L${innerEnd.x} ${innerEnd.y}`,
    `A28 28 0 0 0 ${innerStart.x} ${innerStart.y}`,
    "Z",
  ].join(" ");
}

interface LensInstrumentProps {
  onResetView: () => void;
}

export function LensInstrument({ onResetView }: LensInstrumentProps) {
  const activeLensIds = useUniverseStore((state) => state.activeLensIds);
  const toggleLens = useUniverseStore((state) => state.toggleLens);
  const returnToCv = useUniverseStore((state) => state.returnToCv);
  const phenomena = resolvePhenomena(activeLensIds).filter(
    (phenomenon) => phenomenon.status === "locked",
  );
  const activePhenomenon = phenomena.at(-1);
  const activeLens =
    activeLensIds.length === 1
      ? LENSES.find((lens) => lens.id === activeLensIds[0])
      : undefined;
  const blendedColor = mixLensColors(activeLensIds);

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    id: LensId,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleLens(id);
    }
  };

  return (
    <aside className="lens-instrument" aria-label="Kaleidoscope lens instrument">
      <div className="instrument-actions">
        <button type="button" onClick={returnToCv} title="Professional archive">
          <Home aria-hidden="true" />
          <span className="sr-only">Professional archive</span>
        </button>
        <button type="button" onClick={onResetView} title="Reset sky">
          <RotateCcw aria-hidden="true" />
          <span className="sr-only">Reset sky</span>
        </button>
      </div>

      <div className="instrument-body">
        <svg
          className="instrument-glass"
          viewBox="0 0 200 200"
          aria-hidden="true"
        >
          <circle className="instrument-ring" cx="100" cy="100" r="81" />
          <circle className="instrument-ring instrument-ring--inner" cx="100" cy="100" r="70" />
          {LENSES.map((lens, index) => {
            const isActive = activeLensIds.includes(lens.id);
            return (
              <motion.path
                key={lens.id}
                className={`glass-segment${isActive ? " is-loaded" : ""}`}
                d={segmentPath(index)}
                fill={isActive ? lens.color : "transparent"}
                initial={false}
                animate={{
                  opacity: isActive ? 0.72 : 0.055,
                  scale: isActive ? 1 : 1.16,
                  rotate: isActive ? 0 : index % 2 === 0 ? -7 : 7,
                }}
                transition={{ type: "spring", stiffness: 240, damping: 24 }}
                style={{ transformOrigin: "100px 100px" }}
              />
            );
          })}
          <motion.circle
            cx="100"
            cy="100"
            r="21"
            fill={blendedColor}
            initial={false}
            animate={{
              opacity: activeLensIds.length === 0 ? 0.08 : 0.34,
              scale: activeLensIds.length === 8 ? [1, 1.12, 1] : 1,
            }}
            transition={{
              scale: { duration: 1.4, repeat: activeLensIds.length === 8 ? Infinity : 0 },
            }}
          />
          <path className="instrument-reticle" d="M100 72v56M72 100h56" />
          <circle className="instrument-reticle" cx="100" cy="100" r="9" />
        </svg>

        {LENSES.map((lens, index) => {
          const angle = (index / 8) * Math.PI * 2 - Math.PI / 2;
          const x = Math.cos(angle) * 82;
          const y = Math.sin(angle) * 82;
          const isActive = activeLensIds.includes(lens.id);
          const style = {
            "--lens-x": `${x}px`,
            "--lens-y": `${y}px`,
            "--lens-color": lens.color,
          } as CSSProperties;
          return (
            <button
              type="button"
              key={lens.id}
              className={`lens-control${isActive ? " is-active" : ""}`}
              style={style}
              aria-pressed={isActive}
              aria-label={lens.name}
              title={lens.name}
              onClick={() => toggleLens(lens.id)}
              onKeyDown={(event) => handleKeyDown(event, lens.id)}
            >
              <span className="lens-shard" aria-hidden="true" />
              <span className="lens-tooltip">{lens.name}</span>
            </button>
          );
        })}
      </div>

      <div className="instrument-reading" aria-live="polite">
        <span>{activePhenomenon?.name ?? activeLens?.name ?? "\u00a0"}</span>
      </div>
    </aside>
  );
}
