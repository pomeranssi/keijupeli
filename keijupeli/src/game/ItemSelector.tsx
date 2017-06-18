import * as React from 'react'
import items, {Category, Item} from './items'
import './ItemSelector.css'

export default class CategoryList extends React.Component<{}, null> {
    render() {
        return (
            <div className="CategoryList">
                {items.map(i => <ItemSelector category={i} key={i.title}/>)}
            </div>
        )
    }
}

interface ItemSelectorProps {
    readonly category: Category
}
export class ItemSelector extends React.Component<ItemSelectorProps, {
    selectedItem?: Item,
    open: boolean
}> {
    constructor(props: ItemSelectorProps) {
        super(props)
    }
    componentWillMount() {
        this.setState({
            selectedItem: this.getDefaultItem(),
            open: false
        })
    }
    getDefaultItem(): Item | undefined {
        return this.props.category.items.find(i => i.isDefault!!)
    }
    getStyle(item: Item): object {
        const bg = this.props.category.isBackground
        return {
            backgroundImage: `url("${item.img}")`,
            width: bg ? '100px' : '90px',
            height: bg ? '100px' : '90px',
            top: bg ? 0 : 5,
            left: bg ? 0 : 5
        }
    }
    getImage(): object | undefined {
        const item = this.state.selectedItem
        return item ?
            <div className="ItemImage selected" style={this.getStyle(item)} /> :
            undefined
    }
    render() {
        return (
            <div className="ItemSelector">
                <span className="title">{this.props.category.title}</span>
                {this.getImage()}
            </div>
        )
    }
}
