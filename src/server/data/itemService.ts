import debug from 'debug';
import { unlink } from 'fs/promises';
import path from 'path';
import { ITask } from 'pg-promise';

import { GameError, Item, ObjectId, SessionInfo } from 'shared/types';
import { Category, CategoryMap } from 'shared/types';
import { assertDefined, groupBy, mapObject } from 'shared/util';
import { config } from 'server/config';

import { BaseCategoryData } from './categoryData';
import { deleteItemById, getItemById, getItems } from './itemDb';

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
  itemId: ObjectId,
  session: SessionInfo | undefined
): Promise<void> {
  assertDefined(session);
  const item = await getItemById(
    tx,
    itemId,
    session.user.id,
    session.user.admin
  );
  if (!item) {
    throw new GameError(`NOT_FOUND`, 'Item not found', 404);
  }
  await deleteItemImages(item);
  await deleteItemById(tx, item.id, session.user.id, session.user.admin);
}

async function deleteItemImages(item: Item) {
  if (item.thumbnail) {
    const file = path.join(config.uploadPath, item.thumbnail);
    log(`Deleting thumbnail ${file}`);
    await unlink(file);
  }
  if (item.filename) {
    const file = path.join(config.uploadPath, item.filename);
    log(`Deleting image ${file}`);
    await unlink(file);
  }
}
