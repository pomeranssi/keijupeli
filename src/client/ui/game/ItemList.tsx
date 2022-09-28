import * as React from 'react';
import styled from 'styled-components';
import shallow from 'zustand/shallow';

import { Item } from 'shared/types';
import { assertDefined } from 'shared/util';
import { useGameState } from 'client/game/state';
import { ItemImageView } from 'client/ui/common/ItemImageView';
import { getImagePath } from 'client/ui/images';

import { AppIcon } from '../common/AppIcon';
import { ItemView } from '../common/ItemView';
import { UploadImageButton } from '../upload/UploadImageButton';

export const ItemList: React.FC = () => {
  const [type, categories, toggle, selected, clear, allowDelete] = useGameState(
    s =>
      [
        s.selectedCategory,
        s.categories,
        s.toggleItem,
        s.selectedItems,
        s.clearItems,
        s.allowDelete,
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
          cornerIcon={
            allowDelete ? (
              <AppIcon
                icon="icon-delete.png"
                title="Poista"
                className="delete allow-delete"
                onClick={e => deleteItem(e, i)}
              />
            ) : undefined
          }
        />
      ))}
      <UploadImageButton />
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

const deleteItem = (e: React.SyntheticEvent, _item: Item) => {
  e.preventDefault();
  e.stopPropagation();
  console.log('Poistetaas}!');
  confirm('Haluatko varmasti poistaa tämän kuvan?');
};
