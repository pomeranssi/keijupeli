import { ITask } from 'pg-promise';

import { NotFoundError, User, UUID } from 'shared/types';

const UserFields = (p = '') => `--sql
  ${p}id, ${p}username, ${p}admin
`;

export async function getUserByCredentials(
  tx: ITask<any>,
  username: string,
  password: string
): Promise<User | undefined> {
  const row = await tx.oneOrNone(
    `SELECT ${UserFields()} FROM users
      WHERE username=$/username/
      AND password=ENCODE(DIGEST($/password/, 'sha256'), 'hex')`,
    { username, password }
  );
  return row ? User.parse(row) : undefined;
}

export async function getUserBySession(
  tx: ITask<any>,
  sessionId: UUID
): Promise<User> {
  const row = await tx.oneOrNone(
    `SELECT ${UserFields('u.')} FROM users u
      LEFT JOIN sessions s ON (u.id = s.user_id)
      WHERE s.id = $/sessionId/`,
    { sessionId }
  );
  if (!row) {
    throw new NotFoundError(`USER_NOT_FOUND`, 'user with session', sessionId);
  }
  return User.parse(row);
}
