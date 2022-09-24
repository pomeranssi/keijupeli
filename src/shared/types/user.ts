import { z } from 'zod';

import { ObjectId } from './primitives';

export const User = z.object({
  id: ObjectId,
  username: z.string().trim().min(4),
  password: z.string().trim().min(8),
  admin: z.boolean(),
});
export type User = z.infer<typeof User>;
