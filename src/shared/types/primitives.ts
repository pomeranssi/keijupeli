import { z } from 'zod';

export const ObjectIdString = z
  .string()
  .regex(/^[1-9][0-9]*$/)
  .transform(Number);

export const ObjectId = z.union([
  ObjectIdString,
  z.number().int().nonnegative(),
]);
export type ObjectId = z.infer<typeof ObjectId>;

export const UUID = z.string().uuid();
export type UUID = z.infer<typeof UUID>;

export const NonEmptyString = z.string().trim().min(1);
