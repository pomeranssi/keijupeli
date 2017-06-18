import * as React from 'react'
import {Category, Item} from './items'
import ItemView from './ItemView'
import './ItemSelector.css'

interface ItemSelectorProps {
    readonly category: Category
}
export default class ItemSelector extends React.Component<ItemSelectorProps, {
    selectedItem?: Item,
    open: boolean
}> {

    constructor(props: ItemSelectorProps) {
        super(props)
    }

    componentWillMount() {
        this.setState({
            selectedItem: this.props.category.items.find(i => i.isDefault!!),
            open: false
        })
    }

    renderItemList(): object {
        return (
            <div className="ItemList">
                {this.props.category.items.map(i => <ItemView category={this.props.category} item={i} />)}
            </div>
        )
    }

    render() {
        return (
            <div className="ItemSelector">
                <ItemView
                    category={this.props.category}
                    item={this.state.selectedItem}
                    onClick={() => this.setState(s => ({open: !s.open}))}>
                    <div className="CategoryTitle">{this.props.category.title}</div>
                </ItemView>
                {this.state.open ? this.renderItemList() : null}
            </div>
        )
    }

}
