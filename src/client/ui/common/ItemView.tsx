import * as React from 'react';

import { Category, Item } from 'shared/types';

import { getThumbForItem, ItemImageView } from './ItemImageView';

interface ItemViewProps {
  item?: Item;
  category: Category;
  missingImage?: string;
  selected?: boolean;
  onClick?: (item?: Item) => void;
}

export const ItemView: React.FC<React.PropsWithChildren<ItemViewProps>> = ({
  category,
  item,
  missingImage,
  children,
  selected,
  onClick,
}) => {
  const image = getThumbForItem(item, missingImage, category.isBackground);
  return (
    <ItemImageView
      image={image}
      onClick={onClick ? () => onClick?.(item) : undefined}
      selected={selected}
    >
      {children}
    </ItemImageView>
  );
};
