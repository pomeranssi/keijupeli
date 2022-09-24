import { ITask } from 'pg-promise';

import { User } from 'shared/types/user';

export async function getUserByCredentials(
  tx: ITask<any>,
  username: string,
  password: string
): Promise<User | undefined> {
  const row = await tx.oneOrNone(
    `SELECT * FROM users
      WHERE username=$/username/
      AND password=ENCODE(DIGEST($/password/, 'sha256'), 'hex')`,
    { username, password }
  );
  return row ? User.parse(row) : undefined;
}
