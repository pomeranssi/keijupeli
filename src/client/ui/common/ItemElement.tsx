import * as React from 'react';
import styled from 'styled-components';

import { Category } from 'shared/types';
import { ItemOnScreen } from 'client/game/items';

import { getItemImagePath } from '../images';

type ItemElementProps = {
  item: ItemOnScreen;
  category: Category;
  scale: number;
  onClick: () => void;
  restricted: boolean;
  hueOffset?: number;
};

export const ItemElement: React.FC<ItemElementProps> = ({
  item,
  category,
  onClick,
  hueOffset,
}) => (
  <Image
    style={{
      left: item.offsetX,
      top: item.offsetY,
      zIndex: item.zIndex ?? category.zIndex,
      width: item.width,
      height: item.height,
      filter: hueOffset ? `hue-rotate(${hueOffset}deg)` : undefined,
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
