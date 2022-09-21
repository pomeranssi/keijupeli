import './ItemView.css';

import * as React from 'react';

import { Category, getThumbPath, Item } from './Items';

interface ItemViewProps {
  item?: Item;
  category: Category;
  missingImage?: string;
  selected?: boolean;
  onClick?: (item?: Item) => void;
}
export default class ItemView extends React.Component<
  React.PropsWithChildren<ItemViewProps>
> {
  getImageClass(): string {
    return (
      'ItemImage' + (this.props.category.isBackground ? ' background' : '')
    );
  }
  getImage(item: Item | undefined, thumb: string | undefined): React.ReactNode {
    return item || thumb ? (
      <div
        className={this.getImageClass()}
        style={{
          backgroundImage: `url("${getThumbPath(
            item ? item.fileName : thumb
          )}")`,
        }}
      />
    ) : (
      <div
        className="ItemImage"
        style={{
          backgroundImage: `url("${require('./images/item-unselect.png')}")`,
        }}
      />
    );
  }
  render() {
    return (
      <div
        className={`ItemView ${this.props.selected ? 'selected' : ''}`}
        onClick={() =>
          this.props.onClick && this.props.onClick(this.props.item)
        }
      >
        {this.getImage(this.props.item, this.props.missingImage)}
        {this.props.children}
      </div>
    );
  }
}
