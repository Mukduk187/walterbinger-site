import { describe, expect, it } from "vitest";
import {
  HEALTHCARE_SCALES,
  constellationAnchorTargets,
  constellationIsActive,
} from "./constellations";

describe("healthcare scales constellation", () => {
  it("appears only when care and stewardship are both active", () => {
    expect(constellationIsActive(HEALTHCARE_SCALES, ["red"])).toBe(false);
    expect(constellationIsActive(HEALTHCARE_SCALES, ["green"])).toBe(false);
    expect(
      constellationIsActive(HEALTHCARE_SCALES, ["red", "green"]),
    ).toBe(true);
  });

  it("uses real worlds as anchors and helper stars to complete the drawing", () => {
    const anchors = constellationAnchorTargets(HEALTHCARE_SCALES);
    expect([...anchors.keys()]).toEqual(
      expect.arrayContaining([
        "healthcare",
        "cv-archive",
        "thinking-in-4d",
        "hospitality",
        "field-tools",
      ]),
    );
    expect(HEALTHCARE_SCALES.points.length).toBeGreaterThan(anchors.size);
    expect(
      new Set(HEALTHCARE_SCALES.points.map((point) => point.position.z)).size,
    ).toBeGreaterThan(3);
  });
});
