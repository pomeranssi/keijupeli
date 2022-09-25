import * as debug from 'debug';
import create from 'zustand';

import { CategoryMap, CategoryType, CategoryTypes, Item } from 'shared/types';
import { assertDefined, recordFromPairs, recordSize } from 'shared/util';

const log = debug('client:state');

export type CategoryItems = {
  [filename: string]: Item;
};

export type SelectedItems = Record<CategoryType, CategoryItems>;

export type State = {
  categories: CategoryMap;
  selectedItems: SelectedItems;
  selectedCategory: CategoryType;
  restricted: boolean;
  setupCategories(categories: CategoryMap): void;
  selectCategory(type: CategoryType): void;
  toggleItem(type: CategoryType, item: Item): void;
  randomize(): void;
  reset(): void;
  toggleRestrictions(): void;
};

export const useGameState = create<State>((set, get) => ({
  categories: {},
  selectedItems: recordFromPairs(CategoryTypes.map(type => [type, {}])),
  selectedCategory: 'background',
  restricted: true,

  setupCategories: categories => {
    log('Setting categories', categories);
    // categories.map(c => `${c.type} (${c.items.length})`).join()

    set({ categories });
  },

  selectCategory: selectedCategory => set({ selectedCategory }),

  toggleItem: (type, item) => {
    const { categories, selectedItems, restricted } = get();
    const category = categories[type];
    assertDefined(category);
    const current: CategoryItems = selectedItems[type] ?? {};
    const isAdd = current[item.filename] === undefined;
    if (isAdd) {
      const isCategoryUnique =
        category.isUnique && (restricted || category.isBackground);
      set({
        selectedItems: {
          ...selectedItems,
          [type]: isCategoryUnique
            ? { [item.filename]: item }
            : { ...current, [item.filename]: item },
        },
      });
      return;
    } else {
      const { [item.filename]: deleted, ...trimmedItems } = current;
      if (recordSize(trimmedItems) > 0) {
        return set({
          selectedItems: { ...selectedItems, [type]: trimmedItems },
        });
      } else {
        return set({ selectedItems: { ...selectedItems, [type]: {} } });
      }
    }
  },

  randomize: () => {
    // TODO
  },

  reset: () => {
    // TODO
  },

  toggleRestrictions: () => set({ restricted: !get().restricted }),
}));

/*
function getRandomItem(category: Category): CategoryItems {
  const i = getRandomInt(category.isEssential ? 0 : -1, category.items.length);
  return i >= 0 ? toCategoryItems([category.items[i]]) : {};
}

function toCategoryItems(items: Item[]): CategoryItems {
  return items.length > 0
    ? Object.assign.apply(
        {},
        items.map(i => ({ [i.filename]: i }))
      )
    : {};
}
*/
