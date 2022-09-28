import * as express from 'express';
import { IBaseProtocol } from 'pg-promise';

import { AuthenticationError, SessionInfo } from 'shared/types';
import { db } from 'server/data/db';
import { getSession } from 'server/data/sessionDb';
import { getUserBySession } from 'server/data/userDb';

import { createMiddleware, ExpressMiddleware } from './middleware';
import { hasSessionInfo, setSessionInfo } from './request';
import { getTokenFromRequest } from './serverUtil';

export async function readSessionFromRequest(
  req: express.Request,
  txProvider: IBaseProtocol<any>
): Promise<SessionInfo | undefined> {
  // Check if the session info has already been checked
  if (hasSessionInfo(req)) {
    if (req.session === null) {
      // Already checked but no token present
      return undefined;
    }
    // Quick sanity check for data integrity
    if (!req.session.user?.id || !req.session.session?.id) {
      throw new AuthenticationError(
        'INVALID_SESSION',
        `Invalid session data for request, please re-login.`
      );
    }
  }

  // Session not parsed yet, so parse now
  const token = getTokenFromRequest(req);
  if (!token) {
    // Mark that there is no session attached to this request
    setSessionInfo(req, null);
    return;
  }

  const sessionInfo = await txProvider.tx(async tx => {
    const session = await getSession(tx, token);
    if (!session) {
      throw new AuthenticationError(
        `INVALID_SESSION`,
        `Session token is invalid, please re-login.`
      );
    }
    const user = await getUserBySession(tx, session.id);
    return { user, session };
  });

  // Record the validated session info
  setSessionInfo(req, sessionInfo);
  return sessionInfo;
}

export const requireSessionMiddleware: ExpressMiddleware = createMiddleware(
  async req => {
    const session = await readSessionFromRequest(req, db);
    if (!session)
      throw new AuthenticationError(
        'NO_SESSION',
        `This action requires you to log in.`
      );
  }
);
