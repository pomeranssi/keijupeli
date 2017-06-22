import * as React from 'react'
import {Category, Item} from './Items'
import ItemView from './ItemView'
import {GameControl} from './GameControl'
import './ItemList.css'

interface ItemListProps {
    readonly category?: Category,
    readonly getGameControl: () => GameControl
}
export default class ItemList extends React.Component<ItemListProps, {}> {

    constructor(props: ItemListProps) {
        super(props)
        this.selectItem = this.selectItem.bind(this)
    }

    selectItem(item?: Item) {
        if (this.props.category) {
            if (item) {
                this.props.getGameControl().addItem(this.props.category, item)
            } else {
                this.props.getGameControl().removeItem(this.props.category)
            }
        }
    }

    render() {
        const cat = this.props.category
        return cat ? (
            <div className="ItemList">
                <ItemView category={cat} onClick={this.selectItem}/>
                {cat.items.map(i => <ItemView
                    key={i.img}
                    category={cat}
                    item={i}
                    onClick={this.selectItem}/>)}
            </div>
        ) : null
    }

}
