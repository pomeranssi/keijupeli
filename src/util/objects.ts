export type Map<T> = {
  [key: string]: T;
};

export function addToMap<T>(o: Map<T>, key: string, value: T): Map<T> {
  return Object.assign({}, o, { [key]: value });
}

export function removeFromMap<T>(o: Map<T>, key: string): Map<T> {
  const { [key]: removeThis, ...remaining } = o;
  return remaining;
}

export function mapSize<T>(o: Map<T>): number {
  return Object.keys(o).length;
}
