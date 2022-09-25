import * as React from 'react';
import styled from 'styled-components';
import shallow from 'zustand/shallow';

import { Item } from 'shared/types';
import { assertDefined } from 'shared/util';
import { getImagePath } from 'client/layout/Images';

import { useGameState } from './GameState';
import { ItemImageView, ItemView } from './ItemView';

export const ItemList: React.FC = () => {
  const [type, categories, toggle, selected, clear, upload] = useGameState(
    s =>
      [
        s.selectedCategory,
        s.categories,
        s.toggleItem,
        s.selectedItems,
        s.clearItems,
        s.startImageUpload,
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
      <ItemImageView
        image={getImagePath('item-unselect.png')}
        onClick={() => clear(cat.type)}
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
      <ItemImageView image={getImagePath('icon-add.png')} onClick={upload} />
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
