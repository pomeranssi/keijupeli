import * as React from 'react';
import styled from 'styled-components';

import { Item } from 'shared/types';
import { spaced } from 'shared/util';

import { getItemImagePath } from '../images';

interface ItemImageViewProps {
  image: React.ReactNode | string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

export const ItemImageView: React.FC<
  React.PropsWithChildren<ItemImageViewProps>
> = ({ image, children, selected, onClick, className }) => {
  const img = typeof image === 'string' ? <ItemImage image={image} /> : image;
  return (
    <Container
      className={spaced`${className} ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      {img}
      {children}
    </Container>
  );
};

export function getThumbForItem(
  item: Item | undefined,
  fallback: string | undefined,
  background: boolean
): React.ReactNode {
  return item || fallback ? (
    <ItemImage
      className={background ? 'background' : undefined}
      image={getItemImagePath(item?.thumbnail) ?? fallback}
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
  width: 72px;
  height: 72px;

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
  border-radius: 0.4em;
  background: rgba(255, 255, 255, 0.35);
  position: relative;
  overflow: hidden;
  display: inline-block;

  &.dim {
    filter: grayscale(0.6);
  }

  &.selected,
  &.selected > .background {
    box-shadow: inset 0 0 0 5px rgba(255, 153, 153, 0.7);
  }

  @media all and (orientation: portrait) {
    margin: 0 0.1em;
  }
`;
