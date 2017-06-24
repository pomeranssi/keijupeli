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

const initialItems: Game.SelectedItems = Object.assign(
    categories.map(c => ({[c.type]: c.items.find(i => i.isDefault!!)})))

function selectedItemsReducer(state: Game.SelectedItems = initialItems, action: Action): Game.SelectedItems {
    switch (action.type) {
        case 'ADD_ITEM':
            return {...state, [action.category]: action.item}
        case 'REMOVE_ITEM': {
            const {[action.category]: removed, ...remaining} = state
            return remaining
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

export const store = createStore(combineReducers({
    selectedItems: selectedItemsReducer,
    selectedCategory: selectedCategoryReducer
}))
