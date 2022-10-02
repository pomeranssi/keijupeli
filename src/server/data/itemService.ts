import debug from 'debug';
import { ITask } from 'pg-promise';

import {
  AuthenticationError,
  GameError,
  Item,
  ObjectId,
  SessionInfo,
  User,
} from 'shared/types';
import { Category, CategoryMap } from 'shared/types';
import { assertDefined, groupBy, mapObject } from 'shared/util';

import { BaseCategoryData } from './categoryData';
import { deleteImageFile } from './images';
import { deleteItemById, getItemById, getItems, setItemZIndex } from './itemDb';

const log = debug('server:items');

export async function getItemsByCategory(
  tx: ITask<any>,
  userId: ObjectId | undefined
): Promise<CategoryMap> {
  const items = await getItems(tx, userId);
  const byCats = groupBy(items, i => i.category);

  return CategoryMap.parse(
    mapObject(
      BaseCategoryData,
      (cat, type): Category => ({
        ...cat,
        type,
        items: byCats[type] ?? [],
      })
    )
  );
}

export async function deleteItem(
  tx: ITask<any>,
  session: SessionInfo | undefined,
  itemId: ObjectId
): Promise<void> {
  assertDefined(session);
  const item = await getItemForUser(tx, itemId, session.user);
  if (item.linkedItem) {
    throw new GameError(`LINKED_IMAGE`, 'Cannot delete linked image', 400);
  }
  log(`Deleting item ${item.id}...`);
  await deleteItemImages(item);
  await deleteItemById(tx, item.id, session.user.id, session.user.admin);
}

export async function setZIndex(
  tx: ITask<any>,
  session: SessionInfo | undefined,
  itemId: ObjectId,
  zIndex: number | undefined
) {
  assertDefined(session);
  const item = await getItemForUser(tx, itemId, session.user);
  const defaultZIndex = CategoryMap[item.category]?.zIndex ?? 0;
  await setItemZIndex(
    tx,
    itemId,
    zIndex === defaultZIndex ? undefined : zIndex
  );
}

async function getItemForUser(
  tx: ITask<any>,
  itemId: ObjectId,
  user: User | undefined
): Promise<Item> {
  const item = await getItemById(tx, itemId, user?.id, user?.admin ?? false);
  if (!item) {
    throw new GameError(`NOT_FOUND`, 'Item not found', 404);
  }
  requireItem(item);
  return item;
}

async function deleteItemImages(item: Item) {
  await deleteImageFile(item.thumbnail);
  await deleteImageFile(item.filename);
}

export function requireItem(item: Item | undefined): asserts item is Item {
  if (!item) {
    throw new AuthenticationError(
      `ACCESS_DENIED`,
      'No access to requested image'
    );
  }
}
