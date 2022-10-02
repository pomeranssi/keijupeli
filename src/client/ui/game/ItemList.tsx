import * as React from 'react';
import styled from 'styled-components';
import shallow from 'zustand/shallow';

import { useGameState } from 'client/game/state';
import { ItemImageView } from 'client/ui/common/ItemImageView';
import { getImagePath } from 'client/ui/images';

import { UploadImageButton } from '../upload/UploadImageButton';
import { GameItem } from './GameItem';

export const ItemList: React.FC = () => {
  const [type, categories, selected, clear, session] = useGameState(
    s =>
      [
        s.selectedCategory,
        s.categories,
        s.selectedItems,
        s.clearItems,
        s.session,
      ] as const,
    shallow
  );
  const cat = categories[type];

  const selections = selected[type];

  return cat ? (
    <ListContainer>
      <ItemImageView
        image={getImagePath('item-unselect.png')}
        onClick={() => clear(cat.type)}
      />
      {cat.items.map(i => (
        <GameItem
          key={i.id}
          selected={selections?.[i.filename] !== undefined}
          category={cat}
          item={i}
        />
      ))}
      {session ? <UploadImageButton /> : null}
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
