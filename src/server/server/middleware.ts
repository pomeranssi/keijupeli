import * as express from 'express';

import { MaybePromise } from 'shared/types';

export type ExpressMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => void;

export type ExpressErrorMiddleware = (
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => void;

export function createMiddleware(
  handler: (req: express.Request, res: express.Response) => MaybePromise<any>
): ExpressMiddleware {
  return (req, res, next) => {
    try {
      Promise.resolve(handler(req, res))
        // Move to next on success
        .then(() => next())
        // Catch errors from promise rejections
        .catch(next);
    } catch (e) {
      // Catch sync errors throw from handler
      next(e);
    }
  };
}
