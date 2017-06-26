import * as React from 'react'
import {Category, Item} from './Items'
import './ItemView.css'

interface ItemViewProps {
    item?: Item,
    category: Category,
    missingImage?: string,
    onClick?: (item?: Item) => void
}
export default class ItemView extends React.Component<ItemViewProps, {}> {
    getImageClass(): string {
        return 'ItemImage' +
            (this.props.category.isBackground ? ' background' : '')
    }
    getImage(item: Item | undefined, thumb: string | undefined): object | undefined {
        return (item || thumb) ?
            <div className={this.getImageClass()} style={{backgroundImage: `url("${item ? item.thumb : thumb}")`}} /> :
            <div className="ItemImage" style={{backgroundImage: `url("${require('./thumbs/item-unselect.png')}")`}} />
    }
    render() {
        return (
            <div className="ItemView" onClick={i => this.props.onClick && this.props.onClick(this.props.item)}>
                {this.getImage(this.props.item, this.props.missingImage)}
                {this.props.children}
            </div>
        )
    }
}
