import { describe, expect, it } from "vitest";
import { projectVector, type CameraState } from "./projection";

const camera: CameraState = {
  yaw: 0,
  pitch: 0,
  zoom: 0.5,
  panX: 0,
  panY: 0,
};

describe("relative sky projection", () => {
  it("keeps near and far bodies within a readable depth scale", () => {
    const near = projectVector({ x: 0, y: 0, z: -1100 }, camera, 934, 907);
    const far = projectVector({ x: 0, y: 0, z: 1100 }, camera, 934, 907);

    expect(near.scale).toBeLessThanOrEqual(0.49);
    expect(far.scale).toBeGreaterThanOrEqual(0.26);
    expect(near.scale / far.scale).toBeLessThan(1.9);
  });

  it("responds to the viewport without collapsing the mobile sky", () => {
    const desktop = projectVector({ x: 900, y: 0, z: 0 }, camera, 1280, 860);
    const mobile = projectVector({ x: 900, y: 0, z: 0 }, camera, 390, 1180);

    expect(desktop.x).toBeGreaterThan(mobile.x);
    expect(mobile.scale).toBeGreaterThanOrEqual(0.26);
  });
});
