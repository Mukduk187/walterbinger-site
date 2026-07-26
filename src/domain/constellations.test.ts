import { describe, expect, it } from "vitest";
import {
  HEALTHCARE_SCALES,
  TATTOO_HEART,
  constellationAnchorTargets,
  constellationIsActive,
  selectConstellation,
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

describe("tattoo heart constellation", () => {
  it("uses the care lens and yields to the more specific healthcare scales", () => {
    expect(selectConstellation(["red"])?.id).toBe(TATTOO_HEART.id);
    expect(selectConstellation(["red", "green"])?.id).toBe(
      HEALTHCARE_SCALES.id,
    );
  });

  it("uses every authored heart anchor plus helper stars for the tattoo", () => {
    const anchors = constellationAnchorTargets(TATTOO_HEART);
    expect(anchors.size).toBe(13);
    expect(TATTOO_HEART.points.length).toBeGreaterThan(anchors.size);
    expect(TATTOO_HEART.sourceReference).toContain(
      "sylvia-anatomical-heart-tattoo-source.jpeg",
    );
    expect(TATTOO_HEART.segments.some((segment) => segment.bend)).toBe(true);
  });
});
