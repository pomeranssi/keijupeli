import {createStore} from 'redux'
import {Category, Item} from './Items'

export type Action = {
    type: 'ADD_ITEM',
    item: Item,
    category: string
} | {
    type: 'REMOVE_ITEM',
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

export namespace Game {

    export type SelectedItems = {
        [category: string]: Item
    }

    export type All = {
        items: SelectedItems
    }
}

const initialState: Game.SelectedItems = {}

function selectedItems(state: Game.SelectedItems = initialState, action: Action): Game.SelectedItems {
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

export const state = createStore(selectedItems)
