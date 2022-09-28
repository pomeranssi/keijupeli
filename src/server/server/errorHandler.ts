import debug from 'debug';

import { config } from '../config';
import { ExpressErrorMiddleware } from './middleware';

const log = debug('server:api:error');

const logUserErrors = false;

function isUserError(status: number) {
  return status >= 400 && status < 500;
}

export function createErrorHandler(): ExpressErrorMiddleware {
  return (err, req, res, _next) => {
    const status = typeof err.status === 'number' ? err.status : 500;

    log(
      `${req.method} ${req.path} -> ${status}:`,
      logUserErrors || !isUserError(status)
        ? JSON.stringify(err, null, 2)
        : err.message
    );
    const data: ErrorInfo = {
      ...(config.showErrorCause ? err : undefined),
      type: 'error',
      code: err.code ? err.code : 'INTERNAL_ERROR',
    };
    res.status(status).json(data);
  };
}

interface ErrorInfo {
  type: 'error';
  code: string;
  cause?: any;
  info?: any;
}
