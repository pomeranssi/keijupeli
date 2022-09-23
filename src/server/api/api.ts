import debug from 'debug';
import { Router } from 'express';

import { createErrorHandler } from 'server/server/ErrorHandler';

const log = debug('server:api');

export function createApi() {
  log('Registering API');

  const api = Router();

  // GET /api/status
  api.get('/status', (_req, res) => res.json({ status: 'OK' }));

  // Handle errors
  api.use(createErrorHandler());

  return api;
}
