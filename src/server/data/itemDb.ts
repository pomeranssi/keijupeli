import { ITask } from 'pg-promise';

import { Item, ObjectId } from 'shared/types';
import { nullsToUndefined } from 'shared/util';

const ItemFields = `--sql
  id, user_id AS "userId", category, public,
  is_default AS "isDefault", filename,
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
