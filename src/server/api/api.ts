import debug from 'debug';
import express, { Router } from 'express';

import { GameError } from 'shared/types';
import { createErrorHandler } from 'server/server/errorHandler';
import { Requests } from 'server/server/requestHandling';

import { createItemApi } from './itemApi';
import { createSessionApi } from './sessionApi';
import { createUploadApi } from './uploadApi';

const log = debug('server:api');

export function createApi() {
  log('Registering API');

  const api = Router();
  // Log calls to API endpoints
  api.use((req, _res, next) => {
    log(`${req.method} ${req.path}`);
    next();
  });

  api.use('/upload', createUploadApi());

  api.use(express.urlencoded({ extended: false }));
  api.use(express.json());

  // Attach subrouters
  api.use('/session', createSessionApi());
  api.use('/item', createItemApi());

  // GET /api/status
  api.get(
    '/status',
    Requests.request(() => ({ status: 'OK' }))
  );

  api.all('/*splat', (req, _res, next) =>
    next(
      new GameError(
        'NOT_FOUND',
        `Requested path ${req.path} was not found`,
        404
      )
    )
  );

  // Handle errors
  api.use(createErrorHandler());

  return api;
}
