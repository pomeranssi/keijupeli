import * as React from 'react'
import categories, {Category, Item} from './Items'
import ItemView from './ItemView'
import {connect} from 'react-redux'
import {addItem, Game, removeItem} from './GameState'
import './ItemList.css'

interface ItemListProps {
    readonly selectedCategory: Game.SelectedCategory,
    readonly category: Category | undefined,
    readonly onSelectItem: (category: Category, item: Item) => void
    readonly onRemoveItem: (category: Category) => void
}
export class ItemList extends React.Component<ItemListProps, {}> {

    constructor(props: ItemListProps) {
        super(props)
        this.selectItem = this.selectItem.bind(this)
    }

    selectItem(item?: Item) {
        if (this.props.category) {
            if (item) {
                this.props.onSelectItem(this.props.category, item)
            } else {
                this.props.onRemoveItem(this.props.category)
            }
        }
    }

    render() {
        const cat = this.props.category
        return cat ? (
            <div className="ItemList">
                <ItemView category={cat} onClick={this.selectItem}/>
                {cat.items.map(i => <ItemView
                    key={i.fileName}
                    category={cat}
                    item={i}
                    onClick={this.selectItem}/>)}
            </div>
        ) : null
    }

}

const StatefulItemList = connect(
    (state: Game.State) => ({
        selectedCategory: state.selectedCategory,
        category: state.selectedCategory ? categories.find(c => c.type === state.selectedCategory) : undefined
    }),
    (dispatch) => ({
        onSelectItem: (category: Category, item: Item) => { dispatch(addItem(item, category)) },
        onRemoveItem: (category: Category) => { dispatch(removeItem(category)) }
    })
)(ItemList)

export default StatefulItemList
