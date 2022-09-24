import { DateTime } from 'luxon';
import { ITask } from 'pg-promise';

import { ObjectId } from 'shared/types';

export async function createSession(tx: ITask<any>, userId: ObjectId) {
  const expiryTime = DateTime.now().plus({ hour: 3 }).toISO();
  const refreshTokenExpiry = DateTime.now().plus({ months: 3 }).toISO();
  await tx.one(
    `INSERT INTO sessions (user_id, expiry_time, refresh_token_expiry)
      VALUES ($/userId/, $/expiryTime/, $/refreshTokenExpiry/)
      RETURNING user_id AS "userId"`,
    { userId, expiryTime, refreshTokenExpiry }
  );
}
