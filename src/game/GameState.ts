import {createStore, combineReducers} from 'redux'
import categories, {Category, Item} from './Items'
import CategoryItems = Game.CategoryItems
import {addToMap, mapSize, removeFromMap} from '../util/objects'

export type Action = {
    type: 'TOGGLE_ITEM',
    item: Item,
    category: string
} | {
    type: 'REMOVE_ITEM',
    category: string,
    item?: Item
} | {
    type: 'SELECT_CATEGORY',
    category: string
} | {
    type: 'RANDOMIZE'
}| {
    type: 'RESET'
}

export const toggleItem = (item: Item, category: Category): Action => ({
    type: 'TOGGLE_ITEM',
    item: item,
    category: category.type
})

export const removeItem = (category: Category, item?: Item): Action => ({
    type: 'REMOVE_ITEM',
    category: category.type,
    item: item
})

export const selectCategory = (category: Category): Action => ({
    type: 'SELECT_CATEGORY',
    category: category.type
})

export const randomize = (): Action => ({
    type: 'RANDOMIZE'
})

export const reset = (): Action => ({
    type: 'RESET'
})

export namespace Game {

    export type CategoryItems = {
        [fileName: string]: Item
    }

    export type SelectedItems = {
        [category: string]: CategoryItems
    }
    export type SelectedCategory = string | null

    export type State = {
        selectedItems: SelectedItems,
        selectedCategory: SelectedCategory
    }
}

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min)) + min
}

const toCategorySelection = (items: Array<{[key: string]: CategoryItems}>): {[key: string]: CategoryItems} =>
    Object.assign.apply({}, items)

function getDefaultItems(category: Category): Game.CategoryItems {
    return toCategoryItems(category.items.filter(i => i.isDefault))
}

const initialItems: Game.SelectedItems =
    toCategorySelection(categories.map(c => ({[c.type]: getDefaultItems(c)})))

function getRandomItem(category: Category): CategoryItems {
    const i = getRandomInt(category.isEssential ? 0 : -1, category.items.length)
    return i >= 0 ? toCategoryItems([category.items[i]]) : {}
}

function toCategoryItems(items: Item[]): CategoryItems {
    return items.length > 0 ? Object.assign.apply({}, items.map(i => ({ [i.fileName] : i }))) : {}
}

function selectedItemsReducer(state: Game.SelectedItems = initialItems, action: Action): Game.SelectedItems {
    switch (action.type) {
        case 'TOGGLE_ITEM':
            const category = categories.find(c => c.type === action.category) || { unique: false }
            const current: CategoryItems = state[action.category] || {}
            const isAdd = current[action.item.fileName] === undefined
            if (isAdd) {
                return {...state, [action.category]:
                    category.unique ? { [action.item.fileName]: action.item } :
                    addToMap(current, action.item.fileName, action.item)}
            } else {
                const trimmedItems: CategoryItems = removeFromMap(current, action.item.fileName)
                if (mapSize(trimmedItems) > 0) {
                    return {...state, [action.category]: trimmedItems}
                } else {
                    return removeFromMap(state, action.category)
                }
            }
        case 'REMOVE_ITEM': {
            return removeFromMap(state, action.category)
        }
        case 'RANDOMIZE': {
            return toCategorySelection(categories.map(c => ({[c.type]: getRandomItem(c)})))
        }
        case 'RESET': {
            return initialItems
        }
        default:
            return state
    }
}

function selectedCategoryReducer(state: Game.SelectedCategory = null, action: Action): Game.SelectedCategory {
    switch (action.type) {
        case 'SELECT_CATEGORY':
            return action.category
        default:
            return state
    }
}

const persistedState = localStorage.getItem('reduxState') ?
    JSON.parse(localStorage.getItem('reduxState') || '') :
    undefined

export const store = createStore(combineReducers({
    selectedItems: selectedItemsReducer,
    selectedCategory: selectedCategoryReducer
}), persistedState)

store.subscribe(() => {
    localStorage.setItem('reduxState', JSON.stringify(store.getState()))
})
