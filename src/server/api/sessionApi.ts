import { Router } from 'express';

import { LoginData } from 'shared/types';
import {
  loginUser,
  logoutUser,
  requireSession,
} from 'server/data/sessionService';
import { Requests } from 'server/server/requestHandling';

/**
 * Creates session API router.
 * Assumed attach path: `/api/session`
 */
export function createSessionApi() {
  const api = Router();

  // Login user
  // PUT /api/session
  api.put(
    '/',
    Requests.validatedTxRequest({ body: LoginData }, (tx, { body }) =>
      loginUser(tx, body.username, body.password)
    )
  );

  // Logout user
  // DELETE /api/session
  api.delete(
    '/',
    Requests.validatedTxRequest({}, (tx, { session }) =>
      logoutUser(tx, requireSession(session).session.id)
    )
  );

  return api;
}
