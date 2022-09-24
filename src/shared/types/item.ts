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
]);
export type CategoryType = z.infer<typeof CategoryType>;

export const Item = z.object({
  id: ObjectId,
  category: CategoryType,
  public: z.boolean(),
  filename: NonEmptyString,
  width: z.number().int().nonnegative(),
  height: z.number().int().nonnegative(),
  offsetX: z.number().int().nonnegative(),
  offsetY: z.number().int().nonnegative(),
  isDefault: z.boolean(),
  zIndex: z.number().int().nonnegative().optional(),
});
export type Item = z.infer<typeof Item>;

export const Category = z.object({
  title: NonEmptyString,
  type: CategoryType,
  isBackground: z.boolean(),
  isEssential: z.boolean(),
  isUnique: z.boolean(),
  isMovable: z.boolean(),
  imageFileName: z.string(),
  items: z.array(Item),
});
export type Category = z.infer<typeof Category>;
