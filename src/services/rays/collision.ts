import { IPoint } from "@/services/types";
import { ISubject } from "@/services/state";
import { IRay } from "./types";

/*
    TODO: Implement fast algorithm with vectors
    see: https://www.scratchapixel.com/lessons/3d-basic-rendering/minimal-ray-tracer-rendering-simple-shapes/ray-plane-and-ray-disk-intersection
*/

const parts = 300;

export const getCollisionCF = (ray: IRay, subject: ISubject): number => {
  const { start, end } = ray;
  const { x: x1, y: y1, z: z1 } = start;
  const { x: x, y: y, z: z } = end;

  const dx = x - x1;
  const dy = y - y1;
  const dz = z - z1;

  for (let i = 0; i < parts; i++) {
    const t = i / parts;
    const xx = x1 + dx * t;
    const yy = y1 + dy * t;
    const zz = z1 + dz * t;
    if (isPointInsideSubject({ x: xx, y: yy, z: zz }, subject)) {
      return 1 - t;
    }
  }

  return 0;
};

export const isPointInsideSubject = (point: IPoint, subject: ISubject) => {
  return (
    point.x >= subject.position.x &&
    point.x <= subject.position.x + subject.width &&
    point.y >= subject.position.y &&
    point.y <= subject.position.y + subject.length &&
    point.z >= subject.position.z &&
    point.z <= subject.position.z + subject.height
  );
};
