import { describe, expect, it } from "vitest";
import { AUTHORED_BODIES } from "../data/bodies";
import {
  createGravitySystem,
  gravityTargetForNode,
  relationshipAffinity,
} from "./gravity";

const body = (id: string) => {
  const node = AUTHORED_BODIES.find((candidate) => candidate.id === id);
  if (!node) throw new Error(`Missing test body: ${id}`);
  return node;
};

describe("frequency gravity", () => {
  it("pulls a stronger match closer to the observable center", () => {
    const healthcareTarget = gravityTargetForNode(body("healthcare"), ["red"]);
    const thinkingTarget = gravityTargetForNode(body("thinking-in-4d"), ["red"]);

    expect(
      Math.hypot(healthcareTarget.x, healthcareTarget.y, healthcareTarget.z),
    ).toBeLessThan(
      Math.hypot(thinkingTarget.x, thinkingTarget.y, thinkingTarget.z),
    );
  });

  it("uses composition to separate stars under multiple lenses", () => {
    const hospitalityTarget = gravityTargetForNode(body("hospitality"), [
      "red",
      "green",
    ]);
    const fieldToolsTarget = gravityTargetForNode(body("field-tools"), [
      "red",
      "green",
    ]);

    expect(hospitalityTarget.x).not.toBeCloseTo(fieldToolsTarget.x, 1);
    expect(hospitalityTarget.z).not.toBeCloseTo(fieldToolsTarget.z, 1);
  });

  it("keeps strongly related work on a shorter spring", () => {
    const close = relationshipAffinity(body("healthcare"), body("field-tools"));
    const distant = relationshipAffinity(
      body("healthcare"),
      body("photo-archive"),
    );
    expect(close).toBeGreaterThan(distant);
  });

  it("caps authored-star velocity so lens changes slide instead of slam", () => {
    const system = createGravitySystem(AUTHORED_BODIES);
    system.setContext(["red", "green"]);
    system.tick(16.67);
    const velocity = system.velocity("healthcare");
    system.dispose();

    expect(velocity).toBeDefined();
    expect(
      Math.hypot(velocity?.x ?? 0, velocity?.y ?? 0, velocity?.z ?? 0),
    ).toBeLessThanOrEqual(16.001);
  });
});
