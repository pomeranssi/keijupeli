import { z } from 'zod';

export const Timestamp = z
  .string()
  .regex(
    /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(.[0-9]{1,6})?$/
  );
export type Timestamp = z.infer<typeof Timestamp>;
