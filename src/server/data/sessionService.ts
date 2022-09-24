import debug = require('debug');
import { ITask } from 'pg-promise';

import { AuthenticationError, SessionInfo, UUID } from 'shared/types';

import { createSession, deleteSession } from './sessionDb';
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
  log(`Logged in user ${user.username} with session ${session.id}`);
  return session;
}

export async function logoutUser(tx: ITask<any>, sessionId: UUID) {
  await deleteSession(tx, sessionId);
  log(`Logged out session ${sessionId}`);
}

export function requireSession(session: SessionInfo | undefined): SessionInfo {
  if (!session) {
    throw new AuthenticationError(
      `NO_SESSION`,
      `This action requires logged in session`
    );
  }
  return session;
}
