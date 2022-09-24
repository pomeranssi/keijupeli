export function identity<T>(t: T): T {
  return t;
}

export function isDefined<T>(x: T | undefined | null): x is T {
  return x !== undefined && x !== null;
}

export function recordFromPairs<K extends string | number | symbol, V>(
  items: [K, V][]
): Record<K, V> {
  const res: Record<K, V> = {} as any;
  items.forEach(([k, v]) => (res[k] = v));
  return res;
}
