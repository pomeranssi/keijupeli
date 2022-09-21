import * as React from 'react';
import styled from 'styled-components';

import { Category, getImagePath, Item } from '../game/Items';

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
}) => {
  return (
    <Image
      style={{
        left: item.left,
        top: item.top,
        zIndex: item.zIndex,
      }}
      src={getImagePath(item.fileName)}
      className={category.type}
      onClick={onClick}
    />
  );
};

const Image = styled.img`
  position: absolute;

  &.background {
    z-index: 0;
  }
  &.wings {
    z-index: 1;
  }
  &.body {
    z-index: 2;
  }
  &.shoes {
    z-index: 3;
  }
  &.leg {
    z-index: 4;
  }
  &.chest {
    z-index: 6;
  }
  &.necklace {
    z-index: 8;
  }
  &.hair {
    z-index: 30;
  }
  &.eyes {
    z-index: 40;
  }
  &.crown {
    z-index: 50;
  }
  &.other {
    z-index: 60;
  }
`;
