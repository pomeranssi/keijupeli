export type Map<T> = {
  [key: string]: T;
};

export function removeFromMap<T>(o: Map<T>, key: string): Map<T> {
  const { [key]: removeThis, ...remaining } = o;
  return remaining;
}

export function mapSize<T>(o: Map<T>): number {
  return Object.keys(o).length;
}

export function assertDefined<T>(t: T | undefined | null): asserts t is T {
  if (t === null || typeof t === "undefined") {
    throw new Error(`Value is ${t}`);
  }
}
