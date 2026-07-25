export interface Point2 {
  x: number;
  y: number;
}

export function pointerDistance(a: Point2, b: Point2): number {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

export function pointerMidpoint(a: Point2, b: Point2): Point2 {
  return {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
  };
}

export function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value));
}

export function zoomFromPinch(
  initialZoom: number,
  initialDistance: number,
  currentDistance: number,
  minimum = 0.42,
  maximum = 3.2,
): number {
  if (initialDistance <= 0) {
    return initialZoom;
  }
  return clamp(
    initialZoom * (currentDistance / initialDistance),
    minimum,
    maximum,
  );
}
