import { Router } from 'express';

import { db } from 'server/data/db';
import { loginUser } from 'server/data/sessionService';

/**
 * Creates session API router.
 * Assumed attach path: `/api/session`
 */
export function createSessionApi() {
  const api = Router();

  // PUT /api/session
  api.put('/', (req, res, next) =>
    db
      .tx(tx => loginUser(tx, req.body.username, req.body.password))
      .then(r => res.json({ status: 'OK', result: r }))
      .catch(next)
  );

  return api;
}
