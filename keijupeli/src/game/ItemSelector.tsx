import * as React from 'react'
import {Category, Item} from './Items'
import ItemView from './ItemView'
import {GameControl} from './GameControl'
import './ItemSelector.css'

interface ItemSelectorProps {
    readonly category: Category,
    readonly getGameControl: () => GameControl
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
                <ItemView category={this.props.category} onClick={(item?: Item) => this.selectItem()}/>
                {this.props.category.items.map(i => <ItemView
                    key={i.img}
                    category={this.props.category}
                    item={i}
                    onClick={(item?: Item) => this.selectItem(item)}/>)}
            </div>
        )
    }

    selectItem(item?: Item) {
        this.setState({selectedItem: item, open: false})
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
                    onClick={() => this.setState(s => ({open: !s.open}))}>
                    <div className="CategoryTitle">{this.props.category.title}</div>
                </ItemView>
                {this.state.open ? this.renderItemList() : null}
            </div>
        )
    }

}
