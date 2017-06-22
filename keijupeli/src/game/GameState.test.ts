import {addItem, removeItem, state} from './GameState'
import items from './Items'

it('adds and removes items from state correctly', () => {
    state.subscribe(() => console.log(state.getState()))
    const c1 = items[0]
    const c2 = items[1]
    state.dispatch(addItem(c1.items[0], c1))
    state.dispatch(addItem(c2.items[0], c2))
    state.dispatch(removeItem(c1))
})
