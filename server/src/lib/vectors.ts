import IVector2 from "../interfaces/IVector";

export function getDirection(a: IVector2, b: IVector2) {
  const x = b.x - a.x;
  const y = b.y - a.y;
  return { x, y };
}

export function getDistance(a: IVector2, b: IVector2) {
  return getLength(getDirection(a, b));
}

export function getLength(a: IVector2) {
  return Math.sqrt(a.x * a.x + a.y * a.y);
}

export function normalize(a: IVector2) {
  const length = getLength(a);
  return { x: a.x / length, y: a.y / length };
}

export function multiplyVector(a: IVector2, b: number) {
  return { x: a.x * b, y: a.y * b };
}

export function constrainRange(
  vector: IVector2,
  origin: IVector2,
  range: number
) {
  if (getDistance(vector, origin) > range) {
    const normalized = normalize(vector);
    return multiplyVector(normalized, range);
  }
  return vector;
}
