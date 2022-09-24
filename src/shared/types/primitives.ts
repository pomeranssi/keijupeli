import { z } from 'zod';

export const PositiveIntString = z
  .string()
  .regex(/^[1-9][0-9]*$/)
  .transform(Number);

export const ObjectId = z.union([
  PositiveIntString,
  z.number().int().nonnegative(),
]);
export type ObjectId = z.infer<typeof ObjectId>;

export const UUID = z.string().uuid();
export type UUID = z.infer<typeof UUID>;
