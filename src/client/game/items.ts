import {
  Category,
  CategoryMap,
  CategoryType,
  Item,
  ObjectId,
} from 'shared/types';
import {
  assertDefined,
  recordFromPairs,
  requireDefined,
  typedKeys,
} from 'shared/util';

export type LinkedItem = Item & {
  linked?: Item[];
};

export type LinkedCategory = Omit<Category, 'items'> & {
  items: LinkedItem[];
};

export type GroupedCategoryMap = Partial<Record<CategoryType, LinkedCategory>>;

export function groupLinkedImages(data: CategoryMap): GroupedCategoryMap {
  return recordFromPairs(
    typedKeys(data).map<[CategoryType, LinkedCategory]>(k => [
      k,
      groupItems(requireDefined(data[k])),
    ])
  );
}

function groupItems(category: Category): LinkedCategory {
  const imageMap: Record<ObjectId, Item> = recordFromPairs(
    category.items.map(i => [i.id, i])
  );
  const encontered = new Set<ObjectId>();
  const items: LinkedItem[] = [];
  for (const item of category.items) {
    if (encontered.has(item.id)) continue;
    const newItem = { ...item, linked: gatherLinks(item, imageMap) };
    items.push(newItem);
    // Mark item and links as encountered so that they will be skipped
    encontered.add(newItem.id);
    newItem.linked?.forEach(l => encontered.add(l.id));
  }
  return { ...category, items };
}

function gatherLinks(
  item: Item,
  map: Record<ObjectId, Item>
): Item[] | undefined {
  if (!item.linkedItem) return;

  let nextLink: ObjectId | undefined = item.linkedItem;
  if (!nextLink) return;
  const links: Item[] = [];
  while (nextLink) {
    const next: Item = map[nextLink];
    assertDefined(next);
    links.push(next);
    nextLink = next.linkedItem;

    // Break when a cycle is found
    if (item.id === nextLink || links.find(l => l.id === nextLink))
      return links;
  }
  return links;
}
