import { Router } from 'express';

import { LoginData, Session } from 'shared/types';
import {
  loginUser,
  logoutUser,
  requireSession,
} from 'server/data/sessionService';
import { createValidatingRouter } from 'server/server/validatingRouter';

/**
 * Creates session API router.
 * Assumed attach path: `/api/session`
 */
export function createSessionApi() {
  const api = createValidatingRouter(Router());

  // Login user
  // PUT /api/session
  api.putTx('/', { body: LoginData, response: Session }, (tx, { body }) =>
    loginUser(tx, body.username, body.password)
  );

  // Logout user
  // DELETE /api/session
  api.deleteTx('/', {}, (tx, { session }) =>
    logoutUser(tx, requireSession(session).session.id)
  );

  return api.router;
}
