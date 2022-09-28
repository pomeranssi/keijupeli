import debug = require('debug');
import { ITask } from 'pg-promise';

import { AuthenticationError, Session, SessionInfo, UUID } from 'shared/types';

import { db } from './db';
import {
  createSession,
  deleteExpiredSessions,
  deleteSession,
  getSession,
  getSessionByRefreshToken,
} from './sessionDb';
import { getUserByCredentials } from './userDb';

const log = debug('server:session');

export async function loginUser(
  tx: ITask<any>,
  username: string,
  password: string
): Promise<Session> {
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

export async function extendSession(
  tx: ITask<any>,
  refreshToken: UUID
): Promise<Session> {
  await deleteExpiredSessions(tx);
  const session = await getSessionByRefreshToken(tx, refreshToken);
  if (!session)
    throw new AuthenticationError(
      `INVALID_REFRESH_TOKEN`,
      `No session found for given refresh token`
    );

  // OK, we have a valid (extendable) session
  const newSession = await createSession(tx, session.userId);
  log(
    `Extended session validity for user ${session.userId} with session ${newSession.id}`
  );
  await deleteSession(tx, session.id);
  return newSession;
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

export async function requireSessionForToken(token: string) {
  const session = await db.tx(async tx => {
    await deleteExpiredSessions(tx);
    return await getSession(tx, token);
  });
  if (!session) {
    throw new AuthenticationError(
      `INVALID_SESSION`,
      `Session token is invalid, please re-login.`
    );
  }
  return session;
}
