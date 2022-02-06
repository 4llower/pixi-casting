import { toRad } from "@/services/geometry";
import { ICamera } from "@/services/state";
import { IPoint } from "@/services/types";
import { IRay } from "./types";

const raysDensity = 1024;
const rayLength = 1000;
const viewDeg = 110;

export const generateRaysFromCameraPosition = (
  { position, view }: ICamera,
  density = raysDensity
): IRay[] => {
  const { x, y } = position;
  const rays: IRay[] = [];

  for (let i = 0; i < density; i++) {
    const half = viewDeg * (i / density);
    const rotated = rotate2D(x, y, x, y + rayLength, view.xAngle - half);
    rays.push({ start: position, end: rotated });
  }

  return rays;
};

const rotate2D = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  rotation: number
): IPoint => {
  return {
    x:
      (x2 - x1) * Math.cos(toRad(rotation)) -
      (y2 - y1) * Math.sin(toRad(rotation)) +
      x1,
    y:
      (x2 - x1) * Math.sin(toRad(rotation)) +
      (y2 - y1) * Math.cos(toRad(rotation)) +
      y1,
    z: 0,
  };
};
