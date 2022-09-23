import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { moveItem, SelectedItems, State, toggleItem } from '../game/GameState';
import allItems, { Category, Item } from '../game/Items';
import { useWindowSize } from '../hooks/useWindowSize';
import { Size } from '../util/size';
import { ItemElement } from './ItemElement';

const desiredSize = new Size(1024, 1024);

const areaPadding = { landscape: new Size(200, 0), portrait: new Size(0, 200) };

interface GameAreaProps {
  items: SelectedItems;
  onRemove: (category: Category, item: Item) => void;
  onMoveItem: (category: Category, item: Item, x: number, y: number) => void;
  restricted: boolean;
}

export const GameAreaView: React.FC<GameAreaProps> = ({
  items,
  onRemove,
  restricted,
}) => {
  const window = useWindowSize();

  const isLandscape = window.width >= window.height;
  const availableSpace = window.minus(
    areaPadding[isLandscape ? 'landscape' : 'portrait']
  );
  const scale = availableSpace.getScale(desiredSize);

  return (
    <Container>
      <Content scale={scale}>
        {allItems
          .map(category =>
            Object.keys(items[category.type] || {}).map(fn => {
              const item = items[category.type][fn];
              return item ? (
                <ItemElement
                  key={item.fileName}
                  item={item}
                  category={category}
                  scale={scale}
                  onClick={() => onRemove(category, item)}
                  restricted={restricted}
                />
              ) : undefined;
            })
          )
          .filter(i => i !== undefined)}
        <br />
      </Content>
    </Container>
  );
};

export const GameArea = connect(
  (state: State) => ({
    items: state.selectedItems,
    restricted: state.settings.restrictions,
  }),
  dispatch => ({
    onRemove: (category: Category, item: Item) => {
      dispatch(toggleItem(item, category, false));
    },
    onMoveItem: (category: Category, item: Item, x: number, y: number) => {
      dispatch(moveItem(item, category, x, y));
    },
  })
)(GameAreaView);

const Container = styled.div`
  padding: 0;
`;

type ContentProps = { scale: number };
const Content = styled.div`
  width: 1024px;
  height: 1024px;
  display: block;
  transform-origin: top left;

  transform: scale(${({ scale }: ContentProps) => scale});
`;
