import { clamp } from "./gestures";
import type { Vector3 } from "./cosmology";

export interface CameraState {
  yaw: number;
  pitch: number;
  zoom: number;
  panX: number;
  panY: number;
}

export interface ProjectedPoint {
  x: number;
  y: number;
  scale: number;
  opacity: number;
  depth: number;
  visible: boolean;
}

export function rotateVector(
  point: Vector3,
  yaw: number,
  pitch: number,
): Vector3 {
  const cosYaw = Math.cos(yaw);
  const sinYaw = Math.sin(yaw);
  const cosPitch = Math.cos(pitch);
  const sinPitch = Math.sin(pitch);

  const yawX = point.x * cosYaw - point.z * sinYaw;
  const yawZ = point.x * sinYaw + point.z * cosYaw;

  return {
    x: yawX,
    y: point.y * cosPitch - yawZ * sinPitch,
    z: point.y * sinPitch + yawZ * cosPitch,
  };
}

export function projectVector(
  point: Vector3,
  camera: CameraState,
  width: number,
  height: number,
): ProjectedPoint {
  const rotated = rotateVector(point, camera.yaw, camera.pitch);
  const fieldOfView = 1240;
  const denominator = fieldOfView + rotated.z * 0.34;
  const perspective = clamp(fieldOfView / denominator, 0.72, 1.32);
  const viewportScale = clamp(Math.min(width / 1280, height / 860), 0.52, 1.1);
  const scale = clamp(
    perspective * camera.zoom * viewportScale,
    0.12,
    2.4,
  );
  const x = width / 2 + rotated.x * scale + camera.panX;
  const y = height / 2 + rotated.y * scale + camera.panY;
  const margin = 180;

  return {
    x,
    y,
    scale,
    opacity: clamp(0.24 + perspective * 0.64, 0.12, 1),
    depth: rotated.z,
    visible:
      x > -margin &&
      x < width + margin &&
      y > -margin &&
      y < height + margin &&
      denominator > 240,
  };
}

export function easeVector(
  current: Vector3,
  target: Vector3,
  amount: number,
): Vector3 {
  return {
    x: current.x + (target.x - current.x) * amount,
    y: current.y + (target.y - current.y) * amount,
    z: current.z + (target.z - current.z) * amount,
  };
}
