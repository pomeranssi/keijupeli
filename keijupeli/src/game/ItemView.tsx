import * as React from 'react'
import {Category, Item} from './items'
import './ItemView.css'

interface ItemViewProps {
    item?: Item,
    category: Category,
    onClick?: (item?: Item) => void
}
export default class ItemView extends React.Component<ItemViewProps, null> {
    getImageClass(): string {
        return 'ItemImage' + (this.props.category.isBackground ? ' background' : '')
    }
    getImage(item: Item | undefined): object | undefined {
        return item ?
            <div className={this.getImageClass()} style={{backgroundImage: `url("${item.img}")`}} /> :
            undefined
    }
    render() {
        return (
            <div className="ItemView" onClick={i => this.props.onClick && this.props.onClick(this.props.item)}>
                {this.getImage(this.props.item)}
                {this.props.children}
            </div>
        )
    }
}
