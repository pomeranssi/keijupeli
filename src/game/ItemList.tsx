import * as React from 'react'
import categories, {Category, Item} from './Items'
import ItemView from './ItemView'
import {connect} from 'react-redux'
import {Game, removeItem, toggleItem} from './GameState'
import './ItemList.css'

interface ItemListProps {
    readonly restricted: boolean,
    readonly selectedCategory: Game.SelectedCategory,
    readonly selectedItems: Game.CategoryItems,
    readonly category: Category | undefined,
    readonly onSelectItem: (category: Category, item: Item, restricted: boolean) => void
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
                this.props.onSelectItem(this.props.category, item, this.props.restricted)
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
                    selected={this.props.selectedItems && this.props.selectedItems[i.fileName] !== undefined}
                    category={cat}
                    item={i}
                    onClick={this.selectItem}/>)}
            </div>
        ) : null
    }

}

const StatefulItemList = connect(
    (state: Game.State) => {
        const category = state.selectedCategory ?
            categories.find(c => c.type === state.selectedCategory) : undefined
        return {
            selectedCategory: state.selectedCategory,
            category: category,
            restricted: state.settings.restrictions,
            selectedItems: category ? state.selectedItems[category.type] : {}
        }
    },
    (dispatch) => ({
        onSelectItem: (category: Category, item: Item, restricted: boolean) => {
            dispatch(toggleItem(item, category, restricted))
        },
        onRemoveItem: (category: Category) => { dispatch(removeItem(category)) }
    })
)(ItemList)

export default StatefulItemList
