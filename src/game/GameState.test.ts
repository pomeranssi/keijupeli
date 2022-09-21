import { removeItem, store, toggleItem } from './GameState';
import items from './Items';

function ifd<S, T>(o: S | undefined | null, f: (s: S) => T): T | undefined {
  return o ? f(o) : undefined;
}

it('adds and removes categories from state correctly', () => {
  const c1 = items[0];
  const c2 = items[1];
  store.dispatch(toggleItem(c1.items[0], c1, true));
  expect(ifd(store.getState(), s => s[c1.type])).toEqual(c1.items[0]);
  store.dispatch(toggleItem(c2.items[1], c2, true));
  expect(ifd(store.getState(), s => s[c1.type])).toEqual(c1.items[0]);
  expect(ifd(store.getState(), s => s[c2.type])).toEqual(c2.items[1]);
  store.dispatch(removeItem(c1));
  expect(ifd(store.getState(), s => s[c2.type])).toEqual(c2.items[1]);
  expect(ifd(store.getState(), s => s[c1.type])).toBeUndefined();
});
