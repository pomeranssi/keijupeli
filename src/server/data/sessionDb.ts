import { DateTime } from 'luxon';
import { ITask } from 'pg-promise';

import { ObjectId, Session, UUID } from 'shared/types';

const SessionFields = `--sql
  id, user_id AS "userId", login_time AS "loginTime",
  expiry_time AS "expiryTime",
  refresh_token AS "refreshToken",
  refresh_token_expiry AS "refreshTokenExpiry"
`;

export async function createSession(
  tx: ITask<any>,
  userId: ObjectId
): Promise<Session> {
  const expiryTime = DateTime.now().plus({ hour: 3 }).toISO();
  const refreshTokenExpiry = DateTime.now().plus({ months: 3 }).toISO();
  const row = await tx.one(
    `INSERT INTO sessions (user_id, expiry_time, refresh_token_expiry)
      VALUES ($/userId/, $/expiryTime/, $/refreshTokenExpiry/)
      RETURNING ${SessionFields}`,
    { userId, expiryTime, refreshTokenExpiry }
  );
  return Session.parse(row);
}

export async function getSession(
  tx: ITask<any>,
  sessionId: UUID
): Promise<Session | undefined> {
  const row = await tx.oneOrNone(
    `SELECT ${SessionFields} FROM sessions WHERE id=$/sessionId/`,
    { sessionId }
  );
  return row ? Session.parse(row) : undefined;
}

export async function deleteSession(tx: ITask<any>, sessionId: UUID) {
  await tx.none(`DELETE FROM sessions WHERE id=$/sessionId/`, { sessionId });
}
