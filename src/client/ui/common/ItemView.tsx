import * as React from 'react';
import styled from 'styled-components';

import { Category, Item } from 'shared/types';

import { getThumbForItem, ItemImageView } from './ItemImageView';

interface ItemViewProps {
  item?: Item;
  category: Category;
  missingImage?: string;
  selected?: boolean;
  onClick?: (item?: Item) => void;
  cornerIcon?: any;
  className?: string;
}

export const ItemView: React.FC<React.PropsWithChildren<ItemViewProps>> = ({
  category,
  item,
  missingImage,
  children,
  selected,
  onClick,
  cornerIcon,
  className,
}) => {
  const image = getThumbForItem(item, missingImage, category.isBackground);
  return (
    <ItemImageView
      image={image}
      onClick={onClick ? () => onClick?.(item) : undefined}
      selected={selected}
      className={`ItemView ${className}`}
    >
      {children}
      {cornerIcon ? <Corner>{cornerIcon}</Corner> : null}
    </ItemImageView>
  );
};

const Corner = styled.div`
  position: absolute;
  transform: scale(0.5);
  transform-origin: right top;
  right: 4px;
  top: 4px;
  z-index: 1;
`;
