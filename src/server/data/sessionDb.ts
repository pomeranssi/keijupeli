import { DateTime } from 'luxon';
import { ITask } from 'pg-promise';

import { ObjectId, UUID } from 'shared/types';
import { Session } from 'shared/types/user';

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

export async function getSession(
  tx: ITask<any>,
  sessionId: UUID
): Promise<Session | undefined> {
  const row = await tx.oneOrNone(
    `SELECT * FROM sessions WHERE id=$/sessionId/`,
    { sessionId }
  );
  return row ? Session.parse(row) : undefined;
}
