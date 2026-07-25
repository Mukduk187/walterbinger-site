import { ArrowLeft, RotateCcw, Save } from "lucide-react";
import { AUTHORED_BODIES } from "../data/bodies";
import { useUniverseStore } from "../state/universeStore";
import { BodyGlyph } from "./BodyGlyph";

export function SnowGlobeScene() {
  const discoveries = useUniverseStore(
    (state) => state.currentTripDiscoveryIds,
  );
  const savedDiscoveries = useUniverseStore(
    (state) => state.savedDiscoveryIds,
  );
  const saveCurrentTrip = useUniverseStore((state) => state.saveCurrentTrip);
  const returnToCv = useUniverseStore((state) => state.returnToCv);
  const rebirth = useUniverseStore((state) => state.rebirth);
  const visibleDiscoveries = AUTHORED_BODIES.filter((body) =>
    [...new Set([...savedDiscoveries, ...discoveries])].includes(body.id),
  );
  const markers =
    visibleDiscoveries.length > 0
      ? visibleDiscoveries
      : AUTHORED_BODIES.filter((body) =>
          ["empanadas-son", "field-tools", "thinking-in-4d"].includes(body.id),
        );

  return (
    <main className="snow-globe-world">
      <div className="snow-globe-actions">
        <button type="button" onClick={returnToCv} title="Professional page">
          <ArrowLeft aria-hidden="true" />
          <span className="sr-only">Professional page</span>
        </button>
        <button type="button" onClick={saveCurrentTrip} title="Save discoveries">
          <Save aria-hidden="true" />
          <span className="sr-only">Save discoveries</span>
        </button>
        <button type="button" onClick={rebirth} title="Return to the sky">
          <RotateCcw aria-hidden="true" />
          <span className="sr-only">Return to the sky</span>
        </button>
      </div>

      <section className="snow-globe" aria-label="Snow Globe">
        <div className="globe-glass">
          <div className="globe-weather" aria-hidden="true">
            {Array.from({ length: 38 }, (_, index) => (
              <i
                key={index}
                style={{
                  left: `${(index * 37) % 96}%`,
                  top: `${(index * 61) % 88}%`,
                  animationDelay: `${(index % 11) * -0.37}s`,
                }}
              />
            ))}
          </div>
          <div className="globe-horizon" aria-hidden="true" />
          <div className="globe-village">
            {markers.map((body, index) => {
              const angle = (index / markers.length) * Math.PI * 1.4 + 0.8;
              const radius = 31 + (index % 3) * 7;
              return (
                <button
                  type="button"
                  key={body.id}
                  className="globe-memory"
                  style={{
                    left: `${50 + Math.cos(angle) * radius}%`,
                    top: `${48 + Math.sin(angle) * radius * 0.52}%`,
                  }}
                  onClick={() => useUniverseStore.getState().enterWorld(body.id)}
                  title={body.publicLabel}
                  aria-label={`Return to ${body.publicLabel}`}
                >
                  <svg viewBox="-42 -42 84 84" aria-hidden="true">
                    <BodyGlyph
                      node={body}
                      active={false}
                      selected={false}
                      color="#171717"
                    />
                  </svg>
                </button>
              );
            })}
          </div>
        </div>
        <div className="globe-neck" aria-hidden="true" />
        <div className="globe-base" aria-hidden="true">
          <span />
        </div>
      </section>
    </main>
  );
}
