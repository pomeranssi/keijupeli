import { combineReducers, createStore } from "redux";

import { mapSize, removeFromMap } from "../util/objects";
import categories, { Category, Item } from "./Items";

export type Action =
  | {
      type: "TOGGLE_ITEM";
      restricted: boolean;
      item: Item;
      category: string;
    }
  | {
      type: "REMOVE_ITEM";
      category: string;
      item?: Item;
    }
  | {
      type: "MOVE_ITEM";
      category: string;
      item: Item;
      x: number;
      y: number;
    }
  | {
      type: "SELECT_CATEGORY";
      category: string;
    }
  | {
      type: "RANDOMIZE";
    }
  | {
      type: "RESET";
    }
  | {
      type: "TOGGLE_RESTRICTIONS";
    };

export const toggleItem = (
  item: Item,
  category: Category,
  restricted: boolean
): Action => ({
  type: "TOGGLE_ITEM",
  item: item,
  restricted: restricted,
  category: category.type,
});

export const moveItem = (
  item: Item,
  category: Category,
  x: number,
  y: number
): Action => ({
  type: "MOVE_ITEM",
  item: item,
  category: category.type,
  x: x,
  y: y,
});

export const removeItem = (category: Category, item?: Item): Action => ({
  type: "REMOVE_ITEM",
  category: category.type,
  item: item,
});

export const selectCategory = (category: Category): Action => ({
  type: "SELECT_CATEGORY",
  category: category.type,
});

export const randomize = (): Action => ({
  type: "RANDOMIZE",
});

export const reset = (): Action => ({
  type: "RESET",
});

export const toggleRestrictions = (): Action => ({
  type: "TOGGLE_RESTRICTIONS",
});

export type CategoryItems = {
  [fileName: string]: Item;
};

export type SelectedItems = {
  [category: string]: CategoryItems;
};
export type SelectedCategory = string | null;

export type Settings = {
  restrictions: boolean;
};

export type State = {
  selectedItems: SelectedItems;
  selectedCategory: SelectedCategory;
  settings: Settings;
};

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

const toCategorySelection = (
  items: Array<{ [key: string]: CategoryItems }>
): { [key: string]: CategoryItems } => Object.assign.apply({}, items);

function getDefaultItems(category: Category): CategoryItems {
  return toCategoryItems(category.items.filter((i) => i.isDefault));
}

const initialItems: SelectedItems = toCategorySelection(
  categories.map((c) => ({ [c.type]: getDefaultItems(c) }))
);

const initialSettings: Settings = {
  restrictions: true,
};

function getRandomItem(category: Category): CategoryItems {
  const i = getRandomInt(category.isEssential ? 0 : -1, category.items.length);
  return i >= 0 ? toCategoryItems([category.items[i]]) : {};
}

function toCategoryItems(items: Item[]): CategoryItems {
  return items.length > 0
    ? Object.assign.apply(
        {},
        items.map((i) => ({ [i.fileName]: i }))
      )
    : {};
}

function moveItemTo(item: Item, x: number, y: number): Item {
  return Object.assign({}, item, { left: x, top: y });
}

function selectedItemsReducer(
  state: SelectedItems = initialItems,
  action: Action
): SelectedItems {
  switch (action.type) {
    case "TOGGLE_ITEM":
      const category = categories.find((c) => c.type === action.category) || {
        isUnique: false,
      };
      const current: CategoryItems = state[action.category] || {};
      const isAdd = current[action.item.fileName] === undefined;
      if (isAdd) {
        const isCategoryUnique =
          category.isUnique && (action.restricted || category.isBackground);
        return {
          ...state,
          [action.category]: isCategoryUnique
            ? { [action.item.fileName]: action.item }
            : { ...current, [action.item.fileName]: action.item },
        };
      } else {
        const trimmedItems: CategoryItems = removeFromMap(
          current,
          action.item.fileName
        );
        if (mapSize(trimmedItems) > 0) {
          return { ...state, [action.category]: trimmedItems };
        } else {
          return removeFromMap(state, action.category);
        }
      }
    case "REMOVE_ITEM": {
      return removeFromMap(state, action.category);
    }
    case "RANDOMIZE": {
      return toCategorySelection(
        categories.map((c) => ({ [c.type]: getRandomItem(c) }))
      );
    }
    case "RESET": {
      return initialItems;
    }
    case "MOVE_ITEM": {
      const catSel = state[action.category];
      return {
        ...state,
        [action.category]: {
          ...catSel,
          [action.item.fileName]: moveItemTo(action.item, action.x, action.y),
        },
      };
    }
    default:
      return state;
  }
}

function selectedCategoryReducer(
  state: SelectedCategory = null,
  action: Action
): SelectedCategory {
  switch (action.type) {
    case "SELECT_CATEGORY":
      return action.category;
    default:
      return state;
  }
}

function settingsReducer(
  state: Settings = initialSettings,
  action: Action
): Settings {
  switch (action.type) {
    case "TOGGLE_RESTRICTIONS":
      return { ...state, restrictions: !state.restrictions };
    default:
      return state;
  }
}

const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState") || "")
  : undefined;

export const store = createStore(
  combineReducers({
    selectedItems: selectedItemsReducer,
    selectedCategory: selectedCategoryReducer,
    settings: settingsReducer,
  }),
  persistedState
);

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});
