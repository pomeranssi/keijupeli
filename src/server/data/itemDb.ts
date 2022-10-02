import { ITask } from 'pg-promise';

import { Item, ItemData, ObjectId } from 'shared/types';
import { nullsToUndefined } from 'shared/util';

const ItemFields = `--sql
  id, user_id AS "userId", category, public,
  is_default AS "isDefault", filename, thumbnail, original_filename AS "originalFilename",
  width, height, offset_x as "offsetX", offset_y as "offsetY",
  linked_item as "linkedItem",
  z_index as "zIndex"
`;

export async function getItems(
  tx: ITask<any>,
  userId: ObjectId | undefined
): Promise<Item[]> {
  const rows = await tx.manyOrNone(
    `SELECT ${ItemFields} FROM items
      WHERE ${userId ? `user_id=$/userId/ OR public=TRUE` : `public=TRUE`}`,
    { userId }
  );

  return rows.map(r => Item.parse(nullsToUndefined(r)));
}

export async function getItemById(
  tx: ITask<any>,
  itemId: ObjectId,
  userId: ObjectId | undefined,
  allowOthersImages: boolean
): Promise<Item | undefined> {
  const row = await tx.oneOrNone(
    `SELECT ${ItemFields} FROM items
      WHERE id=$/itemId/
        ${allowOthersImages ? '' : `AND user_id=$/userId/ AND user_id`}`,
    { itemId, userId }
  );

  return row ? Item.parse(nullsToUndefined(row)) : undefined;
}

export async function linkItemsById(
  tx: ITask<any>,
  itemIds: ObjectId[],
  thumbnail: string
) {
  await Promise.all(
    itemIds.map((itemId, idx) => {
      const linkId = itemIds[(idx + 1) % itemIds.length];
      return tx.none(
        `UPDATE items
          SET linked_item=$/linkId/, thumbnail=$/thumbnail/
          WHERE id=$/itemId/`,
        { itemId, linkId, thumbnail }
      );
    })
  );
}

export async function unlinkItemsById(tx: ITask<any>, itemIds: ObjectId[]) {
  if (itemIds.length < 1) return;
  await tx.none(
    `UPDATE items SET linked_item = NULL WHERE id IN ($/itemIds:csv/)`,
    { itemIds }
  );
}

export async function deleteItemById(
  tx: ITask<any>,
  itemId: ObjectId,
  userId: ObjectId | undefined,
  allowOthersImages: boolean
): Promise<void> {
  await tx.none(
    `DELETE FROM items
      WHERE id=$/itemId/
        ${allowOthersImages ? '' : `AND user_id=$/userId/ AND user_id`}`,
    { itemId, userId }
  );
}

export async function insertItem(
  tx: ITask<any>,
  userId: ObjectId | undefined,
  data: ItemData
): Promise<Item> {
  const res = await tx.one(
    `INSERT INTO items
      (user_id, category, filename, thumbnail, original_filename, width, height, offset_x, offset_y, public)
      VALUES ($/userId/, $/category/, $/filename/, $/thumbnail/, $/originalFilename/,
        $/width/, $/height/, $/offsetX/, $/offsetY/, true)
      RETURNING ${ItemFields}`,
    {
      userId,
      category: data.category,
      filename: data.filename,
      thumbnail: data.thumbnail,
      originalFilename: data.originalFilename,
      width: data.width,
      height: data.height,
      offsetX: data.offsetX,
      offsetY: data.offsetY,
    }
  );
  return Item.parse(nullsToUndefined(res));
}
