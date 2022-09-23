import { removeItem, store, toggleItem } from './GameState';
import items, { Category, Item } from './Items';

function ifd<S, T>(o: S | undefined | null, f: (s: S) => T): T | undefined {
  return o ? f(o) : undefined;
}

it('adds and removes categories from state correctly', () => {
  const c1 = items[0];
  const c2 = items[1];
  const [c1i1] = c1.items;
  const [, c2i2] = c2.items;
  store.dispatch(toggleItem(c1i1, c1, true));
  expectCatImg(c1, c1i1);
  store.dispatch(toggleItem(c2i2, c2, true));
  expectCatImg(c1, c1i1);
  expectCatImg(c2, c2i2);
  store.dispatch(removeItem(c1));
  expectCatImg(c2, c2i2);
  expectCatImg(c1, undefined);
});

function expectCatImg(category: Category, item?: Item) {
  expect(ifd(store.getState(), s => s.selectedItems[category.type])).toEqual(
    item
      ? {
          [item.fileName]: item,
        }
      : undefined
  );
}
