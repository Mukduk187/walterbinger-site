import { describe, expect, it } from "vitest";
import { ALL_BODIES, AUTHORED_BODIES } from "./bodies";
import { validateBidirectionalRelationships } from "../domain/cosmology";

describe("authored universe registry", () => {
  it("contains durable depth without publishing unfinished objects", () => {
    expect(ALL_BODIES.length).toBeGreaterThanOrEqual(90);
    expect(AUTHORED_BODIES.length).toBeGreaterThanOrEqual(12);
    expect(
      ALL_BODIES.filter((body) => body.tier !== "authored").every(
        (body) => !body.inspectable && body.publicLabel === undefined,
      ),
    ).toBe(true);
  });

  it("keeps authored relationships bidirectional", () => {
    expect(validateBidirectionalRelationships(AUTHORED_BODIES)).toEqual([]);
  });

  it("registers PREP 07 as the primary field-tool artifact", () => {
    const tools = AUTHORED_BODIES.find((body) => body.id === "field-tools");
    expect(tools?.resources?.at(0)).toMatchObject({
      id: "prep-07-learning-huddle",
      kind: "tool",
    });
  });
});
