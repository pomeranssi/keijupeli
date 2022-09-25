import * as React from 'react';
import styled from 'styled-components';

import { Category, Item } from 'shared/types';

import { getItemThumbPath } from './Items';

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
  const image = getImage(item, missingImage, category.isBackground);
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

interface ItemImageViewProps {
  image: React.ReactNode | string;
  selected?: boolean;
  onClick?: () => void;
}

export const ItemImageView: React.FC<
  React.PropsWithChildren<ItemImageViewProps>
> = ({ image, children, selected, onClick }) => {
  const img =
    typeof image === 'string' ? (
      <ItemImage
        style={{
          backgroundImage: `url("${image}")`,
        }}
      />
    ) : (
      image
    );
  return (
    <Container className={selected ? 'selected' : ''} onClick={onClick}>
      {img}
      {children}
    </Container>
  );
};

function getImage(
  item: Item | undefined,
  thumb: string | undefined,
  background: boolean
): React.ReactNode {
  return item || thumb ? (
    <ItemImage
      className={background ? 'background' : undefined}
      image={getItemThumbPath(item?.filename ?? thumb)}
    />
  ) : null;
}

const ItemImage = styled.div`
  position: absolute;
  background: no-repeat center;
  background-size: contain;
  z-index: 1;
  left: 10px;
  top: 10px;
  width: 70px;
  height: 70px;

  ${(props: { image?: string }) =>
    props.image ? `background-image: url("${props.image}");` : ''}

  &.background {
    width: 90px;
    height: 90px;
    top: 0;
    left: 0;
  }
`;

const Container = styled.div`
  width: 90px;
  height: 90px;
  -webkit-border-radius: 0.4em;
  -moz-border-radius: 0.4em;
  border-radius: 0.4em;
  background: rgba(255, 255, 255, 0.35);
  position: relative;
  overflow: hidden;
  display: inline-block;

  &.selected,
  &.selected > .background {
    box-shadow: inset 0 0 0 5px rgba(255, 153, 153, 0.7);
  }

  @media all and (orientation: portrait) {
    margin: 0 0.1em;
  }
`;
