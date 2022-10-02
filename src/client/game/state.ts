import debug from 'debug';
import create from 'zustand';
import { persist } from 'zustand/middleware';

import {
  Category,
  CategoryMap,
  CategoryType,
  CategoryTypes,
  Item,
  Session,
} from 'shared/types';
import {
  assertDefined,
  filterObj,
  getRandomInt,
  mapObject,
  recordFromPairs,
  recordSize,
  replaceKey,
  requireDefined,
  typedKeys,
} from 'shared/util';

import { GroupedCategoryMap, groupLinkedImages, LinkedItem } from './items';

const log = debug('client:state');

type Filename = string;
export type GameMode = 'play' | 'delete' | 'link' | 'layers';

export type CategoryItems = Record<Filename, LinkedItem>;

export type SelectedItems = Record<CategoryType, CategoryItems>;

export type State = {
  categories: GroupedCategoryMap;
  selectedItems: SelectedItems;
  selectedCategory: CategoryType;
  restricted: boolean;
  session?: Session;
  setSession(s: Session | undefined): void;
  setupCategories(categories: CategoryMap): void;
  selectCategory(type: CategoryType): void;
  toggleItem(type: CategoryType, item: Item): void;
  clearItems(type: CategoryType): void;
  randomize(): void;
  reset(): void;
  toggleRestrictions(): void;
  mode: GameMode;
  linkSource?: Item;
  selectLinkSource(item?: Item): void;
  setMode(mode: GameMode): void;
};

export const useGameState = create<State, any>(
  persist(
    (set, get) => ({
      categories: {},
      selectedItems: recordFromPairs(CategoryTypes.map(type => [type, {}])),
      selectedCategory: 'background',
      restricted: true,
      session: undefined,

      mode: 'play',
      setMode: mode => {
        if (mode === 'play') {
          set({ mode, linkSource: undefined });
        } else {
          set({ mode });
        }
      },

      linkSource: undefined,
      selectLinkSource: linkSource => set({ linkSource }),

      setupCategories: categories => {
        const grouped = groupLinkedImages(categories);
        log('Setting categories', grouped);
        const selections = get().selectedItems;
        set({
          categories: grouped,
          mode: 'play',
          linkSource: undefined,
          selectedItems: cleanSelections(selections, grouped),
        });
      },

      selectCategory: selectedCategory => set({ selectedCategory }),

      setSession: session => set({ session, mode: 'play' }),

      toggleItem: (type, item) => {
        const { categories, selectedItems, restricted } = get();
        const category = categories[type];
        assertDefined(category);
        const current: CategoryItems = selectedItems[type] ?? {};
        const isAdd = current[item.filename] === undefined;
        if (isAdd) {
          const isCategoryUnique =
            category.isUnique && (restricted || category.isBackground);
          const newItems = isCategoryUnique
            ? { [item.filename]: item }
            : { ...current, [item.filename]: item };
          set({
            selectedItems: replaceKey(selectedItems, type, newItems),
          });
          return;
        } else {
          const { [item.filename]: deleted, ...trimmedItems } = current;
          if (recordSize(trimmedItems) > 0) {
            return set({
              selectedItems: replaceKey(selectedItems, type, trimmedItems),
            });
          } else {
            return set({ selectedItems: replaceKey(selectedItems, type, {}) });
          }
        }
      },

      clearItems: type =>
        set({ selectedItems: replaceKey(get().selectedItems, type, {}) }),

      randomize: () => {
        const { categories } = get();
        set({
          selectedItems: recordFromPairs(
            Object.values(categories).map(category => [
              category.type,
              getRandomEntriesFor(requireDefined(category)),
            ])
          ),
        });
      },

      reset: () =>
        set({
          selectedItems: mapObject(get().categories, getDefaultSelection),
        }),

      toggleRestrictions: () => set({ restricted: !get().restricted }),
    }),
    { name: 'keijupeli-state' }
  )
);

function getDefaultSelection(category: Category): CategoryItems {
  return recordFromPairs(
    category.items.filter(i => i.isDefault).map(i => [i.filename, i])
  );
}

function getRandomEntriesFor(category: Category): CategoryItems {
  if (category.items.length < 1) return {};
  const item = getRandomItem(category);
  if (!item) return {};

  return { [item.filename]: item };
}

function getRandomItem(category: Category): Item | undefined {
  const i = getRandomInt(category.isEssential ? 0 : -1, category.items.length);
  return i >= 0 ? category.items[i] : undefined;
}

function cleanSelections(
  selections: SelectedItems,
  categories: GroupedCategoryMap
): SelectedItems {
  return recordFromPairs(
    typedKeys(selections).map(k => [
      k,
      filterObj(
        selections[k],
        item => categories[k]?.items.find(i => i.id === item.id) !== undefined
      ),
    ])
  );
}
