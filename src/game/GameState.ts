import {createStore, combineReducers} from 'redux'
import categories, {Category, Item} from './Items'

export type Action = {
    type: 'ADD_ITEM',
    item: Item,
    category: string
} | {
    type: 'REMOVE_ITEM',
    category: string
} | {
    type: 'SELECT_CATEGORY',
    category: string
} | {
    type: 'RANDOMIZE'
}| {
    type: 'RESET'
}

export const addItem = (item: Item, category: Category): Action => ({
    type: 'ADD_ITEM',
    item: item,
    category: category.type
})

export const removeItem = (category: Category): Action => ({
    type: 'REMOVE_ITEM',
    category: category.type
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

    export type SelectedItems = {
        [category: string]: Item | undefined
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

const toCategorySelection = (items: Array<{[key: string]: Item | undefined}>): {[key: string]: Item} =>
    Object.assign.apply({}, items)

const initialItems: Game.SelectedItems =
    toCategorySelection(categories.map(c => ({[c.type]: c.items.find(i => i.isDefault!!)})))

function getRandomItem(category: Category) {
    const i = getRandomInt(category.isEssential ? 0 : -1, category.items.length)
    return i >= 0 ? category.items[i] : undefined
}

function selectedItemsReducer(state: Game.SelectedItems = initialItems, action: Action): Game.SelectedItems {
    switch (action.type) {
        case 'ADD_ITEM':
            return {...state, [action.category]: action.item}
        case 'REMOVE_ITEM': {
            const {[action.category]: removed, ...remaining} = state
            return remaining
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