import debug from 'debug';
import { Router } from 'express';

import { createErrorHandler } from 'server/server/errorHandler';
import { Requests } from 'server/server/requestHandling';

import { createSessionApi } from './sessionApi';

const log = debug('server:api');

export function createApi() {
  log('Registering API');

  const api = Router();

  // Log calls to API endpoints
  api.use((req, _res, next) => {
    log(`${req.method} ${req.path}`);
    next();
  });

  // Attach subrouters
  api.use('/session', createSessionApi());

  // GET /api/status
  api.get(
    '/status',
    Requests.request(() => ({ status: 'OK' }))
  );

  // Handle errors
  api.use(createErrorHandler());

  return api;
}
