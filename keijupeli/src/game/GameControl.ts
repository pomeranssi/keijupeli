import {Item,Category} from './Items'

export interface GameControl {
    addItem: (category: Category, item: Item) => void,
    removeItem: (category: Category) => void
}

export interface GameEventListener {
    itemAdded: (category: Category, item: Item) => void,
    itemRemoved: (category: Category, item: Item) => void
}
