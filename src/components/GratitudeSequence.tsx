import { useEffect, useReducer } from "react";
import {
  GRATITUDE_PHASE_DURATION,
  gratitudeReducer,
  initialGratitudeState,
} from "../domain/gratitude";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useUniverseStore } from "../state/universeStore";
import { LivingMapScene } from "./LivingMapScene";

export function GratitudeSequence() {
  const [sequence, dispatch] = useReducer(
    gratitudeReducer,
    initialGratitudeState,
  );
  const enterSnowGlobe = useUniverseStore((state) => state.enterSnowGlobe);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    dispatch({ type: "start" });
  }, []);

  useEffect(() => {
    if (sequence.phase === "snow-globe") {
      enterSnowGlobe();
      return;
    }
    if (!sequence.running) {
      return;
    }

    const duration = reducedMotion
      ? Math.min(160, GRATITUDE_PHASE_DURATION[sequence.phase])
      : GRATITUDE_PHASE_DURATION[sequence.phase];
    const timer = window.setTimeout(() => dispatch({ type: "advance" }), duration);
    return () => window.clearTimeout(timer);
  }, [enterSnowGlobe, reducedMotion, sequence.phase, sequence.running]);

  return (
    <div className="convergence-shell" data-phase={sequence.phase}>
      <LivingMapScene gratitudePhase={sequence.phase} />
      <button
        type="button"
        className="skip-convergence"
        onClick={() => dispatch({ type: "skip" })}
      >
        Skip
      </button>
      <div className="convergence-negative" aria-hidden="true" />
    </div>
  );
}
