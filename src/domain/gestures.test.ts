import { describe, expect, it } from "vitest";
import {
  pointerDistance,
  pointerMidpoint,
  zoomFromPinch,
} from "./gestures";

describe("map gestures", () => {
  it("calculates pinch geometry without moving the midpoint", () => {
    const first = { x: 10, y: 20 };
    const second = { x: 50, y: 60 };
    expect(pointerMidpoint(first, second)).toEqual({ x: 30, y: 40 });
    expect(pointerDistance(first, second)).toBeCloseTo(56.5685);
  });

  it("zooms in and clamps extreme pinch values", () => {
    expect(zoomFromPinch(1, 100, 200)).toBe(2);
    expect(zoomFromPinch(1, 100, 10000)).toBeLessThanOrEqual(3.2);
  });
});
