import { z } from 'zod';

import { NonEmptyString, ObjectId } from './primitives';

export const CategoryType = z.enum([
  'background',
  'body',
  'crown',
  'hair',
  'eyes',
  'necklace',
  'wings',
  'chest',
  'legs',
  'shoes',
  'other',
  'pets',
]);
export type CategoryType = z.infer<typeof CategoryType>;
export const CategoryTypes = CategoryType.options;

export const ItemData = z.object({
  category: CategoryType,
  filename: NonEmptyString,
  originalFilename: NonEmptyString.optional(),
  thumbnail: NonEmptyString.optional(),
  width: z.number().nonnegative(),
  height: z.number().nonnegative(),
  offsetX: z.number().nonnegative(),
  offsetY: z.number().nonnegative(),
});
export type ItemData = z.infer<typeof ItemData>;

export const Item = ItemData.extend({
  id: ObjectId,
  userId: ObjectId.optional(),
  public: z.boolean(),
  isDefault: z.boolean(),
  zIndex: z.number().int().nonnegative().optional(),
  linkedItem: ObjectId.optional(),
});
export type Item = z.infer<typeof Item>;

export function isItem(x: any): x is Item {
  return x && typeof x === 'object' && Item.safeParse(x).success;
}

export const Category = z.object({
  title: NonEmptyString,
  type: CategoryType,
  isBackground: z.boolean(),
  isEssential: z.boolean(),
  isUnique: z.boolean(),
  isMovable: z.boolean(),
  imageFileName: z.string(),
  items: z.array(Item),
  zIndex: z.number().int().nonnegative(),
});
export type Category = z.infer<typeof Category>;

export const CategoryMap = z.record(CategoryType, Category);
export type CategoryMap = z.infer<typeof CategoryMap>;

export const ItemLinkingBody = z.object({ items: z.array(ObjectId) });
export type ItemLinkingBody = z.infer<typeof ItemLinkingBody>;

export const ItemZIndexBoxy = z.object({
  zIndex: z.number().int().nonnegative().optional(),
});
export type ItemZIndexBoxy = z.infer<typeof ItemZIndexBoxy>;
