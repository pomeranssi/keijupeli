import { DateTime } from 'luxon';
import { z } from 'zod';

export const Timestamp = z
  .string()
  .regex(
    /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}(.[0-9]{1,6})?([+-][0-9]{2}(:[0-9]{2})?|Z)?$/
  );
export type Timestamp = z.infer<typeof Timestamp>;

const httpDateHeaderPattern = 'EEE, d MMM yyyy HH:mm:ss';
export function toHttpDateHeader(time: DateTime) {
  return (
    time.toUTC().toFormat(httpDateHeaderPattern, { locale: 'en-US' }) + ' GMT'
  );
}
