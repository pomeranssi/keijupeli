import { z } from 'zod';

export const ObjectId = z.number().int().nonnegative();
export type ObjectId = z.infer<typeof ObjectId>;

export const UUID = z.string().uuid();
export type UUID = z.infer<typeof UUID>;
