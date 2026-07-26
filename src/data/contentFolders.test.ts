import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { AUTHORED_BODIES } from "./bodies";

interface ContentCatalog {
  schemaVersion: number;
  lanes: string[];
  worlds: string[];
}

interface WorldManifest {
  schemaVersion: number;
  nodeId: string;
  slug: string;
  title: string;
}

const contentRoot = join(process.cwd(), "content", "worlds");
const catalog = JSON.parse(
  readFileSync(join(contentRoot, "catalog.json"), "utf8"),
) as ContentCatalog;

describe("world content folders", () => {
  it("gives every authored world a durable content home", () => {
    const authoredRoutes = AUTHORED_BODIES.map((body) => body.route).filter(
      (route): route is string => Boolean(route),
    );
    expect(catalog.worlds).toEqual(
      expect.arrayContaining(authoredRoutes),
    );

    for (const body of AUTHORED_BODIES) {
      if (!body.route) {
        throw new Error(`Authored body ${body.id} is missing a route.`);
      }
      const worldRoot = join(contentRoot, body.route);
      const manifest = JSON.parse(
        readFileSync(join(worldRoot, "manifest.json"), "utf8"),
      ) as WorldManifest;

      expect(manifest.nodeId).toBe(body.id);
      expect(manifest.slug).toBe(body.route);
      for (const lane of catalog.lanes) {
        expect(existsSync(join(worldRoot, lane))).toBe(true);
      }
    }
  });

  it("keeps manifest identities unique", () => {
    const manifests = catalog.worlds.map(
      (slug) =>
        JSON.parse(
          readFileSync(join(contentRoot, slug, "manifest.json"), "utf8"),
        ) as WorldManifest,
    );

    expect(new Set(manifests.map((manifest) => manifest.nodeId)).size).toBe(
      manifests.length,
    );
    expect(new Set(manifests.map((manifest) => manifest.slug)).size).toBe(
      manifests.length,
    );
  });
});
