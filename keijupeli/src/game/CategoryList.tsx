import * as React from 'react'
import './CategoryList.css'
import items, {Category, Item} from './Items'
import ItemSelector from './ItemSelector'
import {GameControl} from './GameControl'

export default class CategoryList extends React.Component<{
    getGameControl: () => GameControl
}, null> {
    selectors: {
        [key: string]: ItemSelector
    } = {}
    itemAdded(category: Category, item: Item) {
        this.selectors[category.type].selectItem(item)
    }
    itemRemoved(category: Category, item: Item) {
        this.selectors[category.type].selectItem()
    }
    render() {
        return (
            <div className="CategoryList">
                {items.map(i => <ItemSelector category={i} key={i.title} ref={r => this.selectors[i.type] = r}
                                              getGameControl={this.props.getGameControl}/>)}
            </div>
        )
    }
}
