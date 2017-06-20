import {Item,Category} from './Items'

export interface GameControl {
    addItem: (category: Category, item: Item) => void,
    removeItem: (category: Category) => void
}
