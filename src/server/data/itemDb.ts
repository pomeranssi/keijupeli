import { ITask } from 'pg-promise';

import { Item, ItemData, ObjectId, UUID } from 'shared/types';
import { nullsToUndefined } from 'shared/util';

const ItemFields = `--sql
  id, user_id AS "userId", category, public,
  is_default AS "isDefault", filename, thumbnail, original_filename AS "originalFilename",
  width, height, offset_x as "offsetX", offset_y as "offsetY",
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

export async function insertItem(
  tx: ITask<any>,
  userId: UUID | undefined,
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
