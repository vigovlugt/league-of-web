export function getDistance(x: number, y: number, x1: number, y1: number) {
  const a = x - x1;
  const b = y - y1;
  return Math.sqrt(a * a + b * b);
}
