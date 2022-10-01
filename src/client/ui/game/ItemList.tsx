import * as React from 'react';
import styled from 'styled-components';
import shallow from 'zustand/shallow';

import { uri } from 'shared/net/urlUtils';
import { Item, ObjectId, UUID } from 'shared/types';
import { apiClient } from 'client/game/apiCient';
import { initializeCategories } from 'client/game/dataInit';
import { requestLinking } from 'client/game/linkItems';
import { useGameState } from 'client/game/state';
import { ItemImageView } from 'client/ui/common/ItemImageView';
import { getImagePath } from 'client/ui/images';
import { executeOperation } from 'client/util/executeOperation';

import { AppIcon } from '../common/AppIcon';
import { ItemView } from '../common/ItemView';
import { UploadImageButton } from '../upload/UploadImageButton';

export const ItemList: React.FC = () => {
  const [
    type,
    categories,
    toggle,
    selected,
    clear,
    mode,
    session,
    linkS,
    setLinkS,
  ] = useGameState(
    s =>
      [
        s.selectedCategory,
        s.categories,
        s.toggleItem,
        s.selectedItems,
        s.clearItems,
        s.mode,
        s.session,
        s.linkSource,
        s.selectLinkSource,
      ] as const,
    shallow
  );
  const cat = categories[type];

  const selectItem = React.useCallback(
    (item: Item) => {
      if (!cat) return;
      if (mode === 'link') {
        if (
          linkS &&
          item.id !== linkS.id &&
          cat.items.find(i => i.id === linkS.id)
        ) {
          // Link
          return requestLinking(linkS, item);
        }
        setLinkS(item.id === linkS?.id ? undefined : item);
      } else {
        toggle(cat.type, item);
      }
      return;
    },
    [toggle, cat, mode, setLinkS, linkS]
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
          key={i.id}
          selected={selections?.[i.filename] !== undefined}
          linkSource={i.id === linkS?.id}
          category={cat}
          item={i}
          onClick={selectItem}
          cornerIcon={
            mode === 'delete' ? (
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

const deleteItem = async (e: React.SyntheticEvent, item: Item) => {
  e.preventDefault();
  e.stopPropagation();
  const sessionId = useGameState.getState().session?.id;
  if (!sessionId) return;

  await executeOperation(() => deleteItemFromServer(sessionId, item.id), {
    confirm: 'Haluatko varmasti poistaa tämän kuvan?',
    success: 'Kuva poistettu',
    postProcess: initializeCategories,
  });
};

const deleteItemFromServer = (sessionId: UUID, itemId: ObjectId) =>
  apiClient.delete(uri`/item/${itemId}`, { sessionId });
