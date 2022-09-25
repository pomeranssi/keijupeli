import * as React from 'react';
import styled from 'styled-components';
import shallow from 'zustand/shallow';

import { Item } from 'shared/types';
import { assertDefined } from 'shared/util';

import { ItemView } from './ItemView';
import { useGameState } from './state/GameState';

export const ItemList: React.FC = () => {
  const [type, categories, toggle, selected, clear] = useGameState(
    s =>
      [
        s.selectedCategory,
        s.categories,
        s.toggleItem,
        s.selectedItems,
        s.clearItems,
      ] as const,
    shallow
  );
  const cat = categories[type];
  assertDefined(cat);

  const selectItem = React.useCallback(
    (item: Item) => toggle(cat.type, item),
    [toggle, cat]
  );

  const selections = selected[type];

  return cat ? (
    <ListContainer>
      <ItemView category={cat} onClick={() => clear(cat.type)} />
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
