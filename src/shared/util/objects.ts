export function identity<T>(t: T): T {
  return t;
}

export function isDefined<T>(x: T | undefined | null): x is T {
  return x !== undefined && x !== null;
}

export function assertDefined<T>(t: T | undefined | null): asserts t is T {
  if (t === null || typeof t === 'undefined') {
    throw new Error(`Value is ${t}`);
  }
}

export function recordFromPairs<K extends string | number | symbol, V>(
  items: [K, V][]
): Record<K, V> {
  const res: Record<K, V> = {} as any;
  items.forEach(([k, v]) => (res[k] = v));
  return res;
}

export function typedKeys<O extends object>(o: O): (keyof O)[] {
  return Object.keys(o) as any;
}

export function nullsToUndefined<O extends object>(
  o: O
): { [k in keyof O]: O[k] extends null ? undefined : O[k] } {
  return recordFromPairs(
    typedKeys(o).map(k => [k, o[k] !== null ? o[k] : undefined])
  ) as any;
}

export function groupBy<T, K extends string | number>(
  arr: ReadonlyArray<T>,
  filter: (item: T) => K
): Record<K, T[]> {
  const res: Record<K, T[]> = {} as any;
  arr.forEach(a => {
    const key = filter(a);
    if (!res[key]) {
      res[key] = [];
    }
    res[key].push(a);
  });
  return res;
}

export function mapObject<S, D, K extends string | number>(
  o: Record<K, S>,
  f: (s: S, key: K) => D
): Record<K, D> {
  const res: Record<K, D> = {} as any;
  typedKeys(o).forEach(k => (res[k] = f(o[k], k)));
  return res;
}

export function removeFromRecord<T, K extends keyof T>(
  o: T,
  key: K
): Omit<T, K> {
  const { [key]: removeThis, ...remaining } = o;
  return remaining;
}

export function recordSize<T extends object>(o: T): number {
  return Object.keys(o).length;
}
