import { describe, expect, it } from "vitest";
import {
  GRATITUDE_PHASES,
  gratitudeReducer,
  initialGratitudeState,
} from "./gratitude";

describe("gratitude convergence", () => {
  it("moves through the locked phase order and ends in the Snow Globe", () => {
    let state = gratitudeReducer(initialGratitudeState, { type: "start" });
    const visited = [state.phase];
    while (state.running) {
      state = gratitudeReducer(state, { type: "advance" });
      visited.push(state.phase);
    }
    expect(visited).toEqual(GRATITUDE_PHASES.slice(1));
    expect(state.phase).toBe("snow-globe");
  });

  it("supports an accessible skip and a clean reset", () => {
    const skipped = gratitudeReducer(
      gratitudeReducer(initialGratitudeState, { type: "start" }),
      { type: "skip" },
    );
    expect(skipped).toEqual({ phase: "snow-globe", running: false });
    expect(gratitudeReducer(skipped, { type: "reset" })).toEqual(
      initialGratitudeState,
    );
  });
});
