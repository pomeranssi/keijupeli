import { Request, Response } from 'express';
import { IBaseProtocol } from 'pg-promise';

import { AuthenticationError, SessionInfo, UUID } from 'shared/types';
import { getSession } from 'server/data/sessionDb';
import { getUserBySession } from 'server/data/userDb';

export function setNoCacheHeaders(res: Response): Response {
  res.set(
    'Cache-Control',
    'private, no-cache, no-store, must-revalidate, max-age=0'
  );
  res.set('Pragma', 'no-cache');
  const time = new Date().toUTCString();
  res.set('Date', time);
  res.set('Expires', time);
  return res;
}

const bearerMatch = /Bearer ([-0-9a-zA-Z]*)/;
export function getTokenFromRequest(req: Request): UUID | undefined {
  const tmatch = bearerMatch.exec(req.header('Authorization') || '');
  const token = tmatch && tmatch.length > 0 ? tmatch[1] : undefined;
  if (!token) return undefined;
  try {
    return UUID.parse(token);
  } catch (e) {
    throw new AuthenticationError(`INVALID_TOKEN`, `Token is not UUID`, token);
  }
}

export async function readSessionFromRequest(
  req: Request,
  txProvider: IBaseProtocol<any>
): Promise<SessionInfo | undefined> {
  const token = getTokenFromRequest(req);
  if (!token) return;

  return txProvider.tx(async tx => {
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
}
