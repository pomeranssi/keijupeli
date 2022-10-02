import * as React from 'react';
import styled from 'styled-components';

import { Category, Item } from 'shared/types';

import { getItemImagePath } from '../images';

type ItemElementProps = {
  item: Item;
  category: Category;
  scale: number;
  onClick: () => void;
  restricted: boolean;
};

export const ItemElement: React.FC<ItemElementProps> = ({
  item,
  category,
  onClick,
}) => (
  <Image
    style={{
      left: item.offsetX,
      top: item.offsetY,
      zIndex: item.zIndex ?? category.zIndex,
      width: item.width,
      height: item.height,
    }}
    src={getItemImagePath(item.filename)}
    className={category.type}
    onClick={onClick}
    draggable={false}
  />
);

const Image = styled.img`
  position: absolute;
`;
