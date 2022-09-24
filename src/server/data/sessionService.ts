import debug = require('debug');
import { ITask } from 'pg-promise';

import { AuthenticationError } from 'shared/types';

import { createSession } from './sessionDb';
import { getUserByCredentials } from './userDb';

const log = debug('server:session');

export async function loginUser(
  tx: ITask<any>,
  username: string,
  password: string
) {
  const user = await getUserByCredentials(tx, username, password);
  if (!user) {
    throw new AuthenticationError(
      'INVALID_CREDENTIALS',
      'No matching user found for the given username and password'
    );
  }
  const session = await createSession(tx, user.id);
  log(`Logged in user ${user.username} with session ${session}`);
}
