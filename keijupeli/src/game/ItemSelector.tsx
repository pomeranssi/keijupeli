import * as React from 'react'
import {Category, Item} from './Items'
import ItemView from './ItemView'
import {GameControl} from './GameControl'
import './ItemSelector.css'

interface ItemSelectorProps {
    readonly category: Category,
    readonly getGameControl: () => GameControl
    readonly setCategory: (category: Category) => void
}
export default class ItemSelector extends React.Component<ItemSelectorProps, {
    selectedItem?: Item
}> {

    constructor(props: ItemSelectorProps) {
        super(props)
    }

    componentWillMount() {
        this.setState({
            selectedItem: this.props.category.items.find(i => i.isDefault!!),
        })
    }

    selectItem(item?: Item) {
        this.setState({selectedItem: item})
        if (item) {
            this.props.getGameControl().addItem(this.props.category, item)
        } else {
            this.props.getGameControl().removeItem(this.props.category)
        }
    }

    render() {
        return (
            <div className="ItemSelector">
                <ItemView
                    category={this.props.category}
                    item={this.state.selectedItem}
                    onClick={() => this.props.setCategory(this.props.category)}>
                    <div className="CategoryTitle">{this.props.category.title}</div>
                </ItemView>
            </div>
        )
    }

}
