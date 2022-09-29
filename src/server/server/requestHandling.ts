import debug from 'debug';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ITask } from 'pg-promise';
import { z } from 'zod';

import { timeout } from 'shared/time';
import { MaybePromise, SessionInfo } from 'shared/types';
import { db } from 'server/data/db';

import { readSessionFromRequest, setNoCacheHeaders } from './serverUtil';
import { validateOr } from './validation';

const log = debug('server:requests');

const requestDelayMs = process.env.DELAY
  ? parseInt(process.env.DELAY, 10)
  : undefined;

function processUnauthorizedRequest<T>(
  handler: (req: Request, res: Response) => MaybePromise<T>
): RequestHandler {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (requestDelayMs) {
        await timeout(requestDelayMs);
      }
      log(req.method, req.originalUrl);
      const r = await handler(req, res);
      // Handler succeeded: output response
      setNoCacheHeaders(res).json(r);
    } catch (e) {
      // Handler failed: pass error to error handler
      next(e);
    }
  };
}

const processUnauthorizedTxRequest = <T>(
  handler: (tx: ITask<any>, req: Request, res: Response) => MaybePromise<T>
): RequestHandler =>
  processUnauthorizedRequest((req, res) => db.tx(tx => handler(tx, req, res)));

const processRequest = <T>(
  handler: (
    session: SessionInfo | undefined,
    req: Request,
    res: Response
  ) => MaybePromise<T>
): RequestHandler =>
  processUnauthorizedRequest(
    async (req, res) =>
      await handler(await readSessionFromRequest(req, db), req, res)
  );

const processTxRequest = <T>(
  handler: (
    tx: ITask<any>,
    session: SessionInfo | undefined,
    req: Request,
    res: Response
  ) => MaybePromise<T>
): RequestHandler =>
  processRequest((session, req, res) =>
    db.tx(tx => handler(tx, session, req, res))
  );

type ValidatorSpec<R, P, Q, B> = {
  params?: z.ZodType<P, any, any>;
  query?: z.ZodType<Q, any, any>;
  body?: z.ZodType<B, any, any>;
  response?: z.ZodType<R, any, any>;
};

type HandlerParams<P, Q, B> = {
  params: P;
  query: Q;
  body: B;
  session: SessionInfo | undefined;
};

const processValidatedRequest = <Return, P, Q, B>(
  spec: ValidatorSpec<Return, P, Q, B>,
  handler: (
    data: HandlerParams<P, Q, B>,
    req: Request,
    res: Response
  ) => MaybePromise<Return>
): RequestHandler =>
  processRequest(async (session, req, res) => {
    const ctx = `${req.method} ${req.originalUrl}`;
    const params = validateOr(
      req.params,
      spec.params,
      {} as P,
      `${ctx} params`
    );
    const body = validateOr(req.body, spec.body, {} as B, `${ctx} body`);
    const query = validateOr(req.query, spec.query, {} as Q, `${ctx} query`);
    const response = await handler({ session, params, query, body }, req, res);
    return validateOr(response, spec.response, response, `${ctx} return value`);
  });

const processValidatedTxRequest = <Return, P, Q, B>(
  spec: ValidatorSpec<Return, P, Q, B>,
  handler: (
    tx: ITask<any>,
    data: HandlerParams<P, Q, B>,
    req: Request,
    res: Response
  ) => MaybePromise<Return>
): RequestHandler =>
  processValidatedRequest(spec, (...p) => db.tx(tx => handler(tx, ...p)));

export const Requests = {
  unauthorizedRequest: processUnauthorizedRequest,
  unauthorizedTxRequest: processUnauthorizedTxRequest,
  request: processRequest,
  txRequest: processTxRequest,
  validatedRequest: processValidatedRequest,
  validatedTxRequest: processValidatedTxRequest,
};
