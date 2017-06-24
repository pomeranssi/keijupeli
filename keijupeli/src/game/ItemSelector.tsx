import * as React from 'react'
import {Category, Item} from './Items'
import ItemView from './ItemView'
import './ItemSelector.css'

interface ItemSelectorProps {
    readonly category: Category,
    readonly selectedItem: Item | undefined,
    readonly setCategory: (category: Category) => void
}
export default class ItemSelector extends React.Component<ItemSelectorProps, {}> {

    render() {
        return (
            <div className="ItemSelector">
                <ItemView
                    category={this.props.category}
                    item={this.props.selectedItem}
                    missingImage={this.props.category.thumb}
                    onClick={() => this.props.setCategory(this.props.category)}>
                    <div className="CategoryTitle">{this.props.category.title}</div>
                </ItemView>
            </div>
        )
    }

}
