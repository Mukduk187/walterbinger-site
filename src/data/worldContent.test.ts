import { describe, expect, it } from "vitest";
import type { ResourceReference } from "../domain/content";
import { AUTHORED_BODIES } from "./bodies";
import { WORLD_CONTENT } from "./worldContent";

describe("world content registry", () => {
  it("only attaches content to authored worlds", () => {
    const authoredIds = new Set(AUTHORED_BODIES.map((body) => body.id));
    expect(
      Object.values(WORLD_CONTENT).every((content) =>
        authoredIds.has(content.nodeId),
      ),
    ).toBe(true);
  });

  it("keeps resource identifiers unique and links deployable", () => {
    const resources = Object.values(WORLD_CONTENT).reduce<ResourceReference[]>(
      (allResources, content) => [
        ...allResources,
        ...content.resources,
      ],
      [],
    );
    const resourceIds = resources.map((resource) => resource.id);

    expect(new Set(resourceIds).size).toBe(resourceIds.length);
    expect(
      resources
        .filter((resource) => resource.external)
        .every((resource) => resource.href.startsWith("https://")),
    ).toBe(true);
  });
});
