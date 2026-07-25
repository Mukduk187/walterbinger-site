import { describe, expect, it } from "vitest";
import { generateAmbientStars, generateEmergingBodies } from "./ambient";

describe("persistent ambient universe", () => {
  it("reproduces the same sky from the same seed", () => {
    expect(generateAmbientStars(6, "same")).toEqual(
      generateAmbientStars(6, "same"),
    );
    expect(generateAmbientStars(6, "same")).not.toEqual(
      generateAmbientStars(6, "different"),
    );
  });

  it("keeps incomplete bodies private and non-interactive", () => {
    for (const body of [
      ...generateAmbientStars(12),
      ...generateEmergingBodies(8),
    ]) {
      expect(body.inspectable).toBe(false);
      expect(body.publicLabel).toBeUndefined();
    }
  });
});
