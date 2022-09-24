import { Router } from 'express';

import { LoginData } from 'shared/types';
import { loginUser } from 'server/data/sessionService';
import { Requests } from 'server/server/requestHandling';

/**
 * Creates session API router.
 * Assumed attach path: `/api/session`
 */
export function createSessionApi() {
  const api = Router();

  // PUT /api/session
  api.put(
    '/',
    Requests.validatedTxRequest({ body: LoginData }, (tx, { body }) =>
      loginUser(tx, body.username, body.password)
    )
  );

  return api;
}
