import * as React from 'react';
import shallow from 'zustand/shallow';

import { uri } from 'shared/net/urlUtils';
import { Category, ObjectId, UUID } from 'shared/types';
import { apiClient } from 'client/game/apiCient';
import { initializeCategories } from 'client/game/dataInit';
import { LinkedItem } from 'client/game/items';
import { requestLinking, requestUnlink } from 'client/game/linkItems';
import { GameMode, useGameState } from 'client/game/state';
import { executeOperation } from 'client/util/executeOperation';

import { AppIcon, TextIcon } from '../common/AppIcon';
import { ItemView } from '../common/ItemView';

export type GameItemProps = {
  item: LinkedItem;
  category: Category;
  selected?: boolean;
};

export const GameItem: React.FC<GameItemProps> = ({
  item,
  category,
  selected,
}) => {
  const [linkS, mode] = useGameState(s => [s.linkSource, s.mode], shallow);
  return (
    <ItemView
      selected={selected}
      linkSource={item.id === linkS?.id}
      category={category}
      item={item}
      onClick={() => clickItem(item, category)}
      cornerIcon={<CornerItem mode={mode} item={item} category={category} />}
    />
  );
};

const CornerItem: React.FC<{
  mode: GameMode;
  item: LinkedItem;
  category: Category;
}> = ({ mode, item, category }) => {
  switch (mode) {
    case 'delete':
      return (
        <AppIcon
          icon="icon-delete.png"
          title="Poista"
          className={`delete ${item.linkedItem ? 'inactive' : 'active'}`}
          onClick={e => clickCorner(e, item, category)}
        />
      );
    case 'link':
      return item.linkedItem ? (
        <AppIcon
          icon="icon-link.png"
          title="Linkitetty"
          className="link active"
        />
      ) : null;
    case 'layers':
      return (
        <TextIcon className="layers active">
          {item.zIndex ?? category.zIndex}
        </TextIcon>
      );
    default:
      return null;
  }
};

function clickItem(item: LinkedItem, category: Category) {
  const { mode, linkSource } = useGameState.getState();

  switch (mode) {
    case 'link':
      return clickLink(item, category, linkSource);
    case 'layers':
      return adjustLayers(item, category);
    default:
      return clickSelect(item);
  }
}

function clickCorner(
  e: React.SyntheticEvent<any>,
  item: LinkedItem,
  category: Category
) {
  e.preventDefault();
  e.stopPropagation();

  const { mode } = useGameState.getState();

  switch (mode) {
    case 'delete':
      return deleteItem(item);
    default:
      return clickItem(item, category);
  }
}

function clickLink(item: LinkedItem, cat: Category, linkSource?: LinkedItem) {
  if (item.linked) {
    return requestUnlink(item);
  }
  if (
    linkSource &&
    item.id !== linkSource.id &&
    cat.items.find(i => i.id === linkSource.id)
  ) {
    // Link
    return requestLinking(linkSource, item);
  } else {
    // Toggle link source selection
    return useGameState
      .getState()
      .selectLinkSource(item.id === linkSource?.id ? undefined : item);
  }
}

function clickSelect(item: LinkedItem) {
  useGameState.getState().toggleItem(item.category, item);
}

const deleteItem = async (item: LinkedItem) => {
  if (item.linked) {
    alert('Ei voida poistaa yhdistettyjä kuvia. Pura yhdistys ensin!');
    return;
  }
  const sessionId = useGameState.getState().session?.id;
  if (!sessionId) return;

  await executeOperation(() => deleteItemFromServer(sessionId, item.id), {
    confirm: 'Haluatko varmasti poistaa tämän kuvan?',
    success: 'Kuva poistettu',
    postProcess: initializeCategories,
  });
};

const adjustLayers = async (item: LinkedItem, category: Category) => {
  const sessionId = useGameState.getState().session?.id;
  if (!sessionId) return;

  const zIndex = prompt(
    `Mihin kerrokseen kuva siirretään? Nykyinen taso on ${
      item.zIndex ?? category.zIndex
    }`
  );
  if (!zIndex) return;

  await executeOperation(
    () => setItemLayer(sessionId, item.id, Number(zIndex)),
    {
      success: 'Taso muutettu',
      postProcess: initializeCategories,
    }
  );
};

const deleteItemFromServer = (sessionId: UUID, itemId: ObjectId) =>
  apiClient.delete(uri`/item/${itemId}`, { sessionId });

const setItemLayer = (sessionId: UUID, itemId: ObjectId, zIndex: number) =>
  apiClient.post(uri`/item/zindex/${itemId}`, { sessionId, body: { zIndex } });
