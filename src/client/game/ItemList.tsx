import * as React from 'react';
import styled from 'styled-components';
import shallow from 'zustand/shallow';

import { Item } from 'shared/types';
import { assertDefined } from 'shared/util';

import { ItemView } from './ItemView';
import { useGameState } from './state/GameState';

export const ItemList: React.FC = () => {
  const [selectedCategory, categories, toggleItem, selectedItems] =
    useGameState(
      s =>
        [
          s.selectedCategory,
          s.categories,
          s.toggleItem,
          s.selectedItems,
        ] as const,
      shallow
    );
  const cat = categories[selectedCategory];
  assertDefined(cat);

  const selectItem = React.useCallback(
    (item: Item) => toggleItem(cat.type, item),
    [toggleItem, cat]
  );

  const selections = selectedItems[selectedCategory];

  return cat ? (
    <ListContainer>
      <ItemView
        category={cat}
        onClick={(item: Item) => toggleItem(cat.type, item)}
      />
      {cat.items.map(i => (
        <ItemView
          key={i.filename}
          selected={selections?.[i.filename] !== undefined}
          category={cat}
          item={i}
          onClick={selectItem}
        />
      ))}
    </ListContainer>
  ) : null;
};

const ListContainer = styled.div`
  margin: 0 0.3em;
  display: inline-block;

  @media all and (orientation: portrait) {
    margin: 0.3em 0;
  }
`;
