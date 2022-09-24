import { ITask } from 'pg-promise';

import { ObjectId } from 'shared/types';
import { Category, CategoryMap } from 'shared/types/item';
import { groupBy, mapObject } from 'shared/util';

import { BaseCategoryData } from './categoryData';
import { getItems } from './itemDb';

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
