export type Point = { x: number; y: number };
export type Size = { width: number; height: number };
export const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

// Event coordinates are CSS pixels; do not convert them to rem.
export function coverRadius({ x, y }: Point, { width, height }: Size) {
  return Math.hypot(Math.max(x, width - x), Math.max(y, height - y)) + 3;
}

export function exitOrigin(point: Point, { width, height }: Size): Point {
  const x = clamp(point.x, 0, width);
  const y = clamp(point.y, 0, height);
  const distances = [x, width - x, y, height - y];
  const edge = distances.indexOf(Math.min(...distances));
  return [
    { x: -12, y }, { x: width + 12, y },
    { x, y: -12 }, { x, y: height + 12 },
  ][edge];
}

