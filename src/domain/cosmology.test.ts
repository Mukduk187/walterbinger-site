import { describe, expect, it } from "vitest";
import {
  canonicalLensSet,
  combinationKey,
  LENS_IDS,
  matchingQuartets,
  NON_EMPTY_LENS_STATES,
  QUARTET_ADDRESSES,
  resolvePhenomena,
} from "./cosmology";

describe("cosmology canon", () => {
  it("keeps eight lenses, 255 non-empty states, and 70 quartet addresses", () => {
    expect(LENS_IDS).toHaveLength(8);
    expect(NON_EMPTY_LENS_STATES).toHaveLength(255);
    expect(QUARTET_ADDRESSES).toHaveLength(70);
    expect(new Set(QUARTET_ADDRESSES.map((item) => item.id)).size).toBe(70);
  });

  it("canonicalizes lens combinations in spectrum order", () => {
    expect(canonicalLensSet(["violet", "red", "green", "red"])).toEqual([
      "red",
      "green",
      "violet",
    ]);
    expect(combinationKey(["magenta", "violet"])).toBe("violet+magenta");
  });

  it("returns the expected quartet fan-out for every active count", () => {
    expect(
      Array.from({ length: 8 }, (_, index) =>
        matchingQuartets(LENS_IDS.slice(0, index + 1)).length,
      ),
    ).toEqual([35, 15, 5, 1, 5, 15, 35, 70]);
  });

  it("locks collaboration, legacy, and gratitude while keeping kintsugi provisional", () => {
    expect(resolvePhenomena(["violet", "magenta"])).toMatchObject([
      { id: "collaboration", status: "locked" },
    ]);
    expect(
      resolvePhenomena(["green", "indigo", "violet"]).map((item) => item.id),
    ).toContain("legacy");
    expect(
      resolvePhenomena(["orange", "green"]).find(
        (item) => item.id === "kintsugi",
      )?.status,
    ).toBe("candidate");
    expect(
      resolvePhenomena(LENS_IDS).find((item) => item.id === "gratitude")
        ?.status,
    ).toBe("locked");
  });
});
