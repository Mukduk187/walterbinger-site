export const GRATITUDE_PHASES = [
  "idle",
  "instrument-lock",
  "circle",
  "mycelium",
  "mosaic",
  "flash",
  "negative",
  "portal",
  "collapse",
  "transit",
  "snow-globe",
] as const;

export type GratitudePhase = (typeof GRATITUDE_PHASES)[number];

export const GRATITUDE_PHASE_DURATION: Record<GratitudePhase, number> = {
  idle: 0,
  "instrument-lock": 700,
  circle: 1100,
  mycelium: 1050,
  mosaic: 2100,
  flash: 420,
  negative: 700,
  portal: 900,
  collapse: 1150,
  transit: 1250,
  "snow-globe": 0,
};

export function nextGratitudePhase(
  current: GratitudePhase,
): GratitudePhase {
  const index = GRATITUDE_PHASES.indexOf(current);
  if (index < 0 || index >= GRATITUDE_PHASES.length - 1) {
    return "snow-globe";
  }
  return GRATITUDE_PHASES[index + 1] ?? "snow-globe";
}

export interface GratitudeState {
  phase: GratitudePhase;
  running: boolean;
}

export type GratitudeEvent =
  | { type: "start" }
  | { type: "advance" }
  | { type: "skip" }
  | { type: "reset" };

export const initialGratitudeState: GratitudeState = {
  phase: "idle",
  running: false,
};

export function gratitudeReducer(
  state: GratitudeState,
  event: GratitudeEvent,
): GratitudeState {
  if (event.type === "reset") {
    return initialGratitudeState;
  }
  if (event.type === "skip") {
    return { phase: "snow-globe", running: false };
  }
  if (event.type === "start") {
    return state.running || state.phase !== "idle"
      ? state
      : { phase: "instrument-lock", running: true };
  }

  const phase = nextGratitudePhase(state.phase);
  return {
    phase,
    running: phase !== "snow-globe",
  };
}
