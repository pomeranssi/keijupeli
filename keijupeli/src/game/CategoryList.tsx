import * as React from 'react'
import items from './items'
import './CategoryList.css'
import {Item} from './items'
import ItemSelector from './ItemSelector'

export default class CategoryList extends React.Component<{
    onAddItem: (category: string, item: Item) => void
}, null> {
    render() {
        return (
            <div className="CategoryList">
                {items.map(i => <ItemSelector category={i} key={i.title} onAddItem={this.props.onAddItem}/>)}
            </div>
        )
    }
}
