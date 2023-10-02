import * as express from 'express';

import { SessionInfo } from 'shared/types';

export type WithSessionInfo<T> = T & {
  /**
   * Either:
   * - undefined (not parsed yet)
   * - null (no session present in request)
   * - SessionInfo object (valid session)
   */
  session?: SessionInfo | null;
};

export function hasSessionInfo<T extends object>(
  req: T
): req is T & { session: SessionInfo | null } {
  return (
    'session' in req &&
    ((req as any).session === null || typeof (req as any).session === 'object')
  );
}

export function setSessionInfo(
  req: express.Request,
  sessionInfo: SessionInfo | null
) {
  const r: WithSessionInfo<express.Request> = req;
  r.session = sessionInfo;
}
