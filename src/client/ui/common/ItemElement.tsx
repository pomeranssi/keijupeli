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
}) => {
  return (
    <Image
      style={{
        left: item.offsetX,
        top: item.offsetY,
        zIndex: item.zIndex,
        width: item.width,
        height: item.height,
      }}
      src={getItemImagePath(item.filename)}
      className={category.type}
      onClick={onClick}
      draggable={false}
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
  &.legs {
    z-index: 4;
  }
  &.chest {
    z-index: 6;
  }
  &.necklace {
    z-index: 8;
  }
  &.eyes {
    z-index: 20;
  }
  &.hair {
    z-index: 30;
  }
  &.crown {
    z-index: 50;
  }
  &.other {
    z-index: 60;
  }
  &.pets {
    z-index: 70;
  }
`;
