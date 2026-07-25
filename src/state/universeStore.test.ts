import { beforeEach, describe, expect, it } from "vitest";
import { LENS_IDS } from "../domain/cosmology";
import { useUniverseStore } from "./universeStore";

describe("universe transitions", () => {
  beforeEach(() => {
    window.history.replaceState(null, "", "#/");
    useUniverseStore.setState({
      mode: "cv",
      activeLensIds: [],
      pinnedIds: [],
      hoveredId: null,
      selectedId: null,
      centeredId: null,
      currentTripDiscoveryIds: [],
      fieldBoardReturnMode: "cv",
    });
  });

  it("clears the converged spectrum when returning from the Snow Globe", () => {
    useUniverseStore.setState({
      mode: "snow-globe",
      activeLensIds: [...LENS_IDS],
    });

    useUniverseStore.getState().enterFieldBoard();

    expect(useUniverseStore.getState().mode).toBe("field-board");
    expect(useUniverseStore.getState().activeLensIds).toEqual([]);
    expect(useUniverseStore.getState().centeredId).toBe("field-tools");
    expect(useUniverseStore.getState().fieldBoardReturnMode).toBe(
      "snow-globe",
    );
  });

  it("returns to the professional doorway without a latent convergence", () => {
    useUniverseStore.setState({
      mode: "snow-globe",
      activeLensIds: [...LENS_IDS],
    });

    useUniverseStore.getState().returnToCv();

    expect(useUniverseStore.getState().mode).toBe("cv");
    expect(useUniverseStore.getState().activeLensIds).toEqual([]);
  });
});
