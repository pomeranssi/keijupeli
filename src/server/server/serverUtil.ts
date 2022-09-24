import { Request, Response } from 'express';
import { DateTime } from 'luxon';

const httpDateHeaderPattern = 'ddd, DD MMM YYYY HH:mm:ss';
export function setNoCacheHeaders(res: Response): Response {
  res.set(
    'Cache-Control',
    'private, no-cache, no-store, must-revalidate, max-age=0'
  );
  res.set('Pragma', 'no-cache');
  const time = DateTime.now().toUTC().toFormat(httpDateHeaderPattern) + ' GMT';
  console.log('req time', time);
  res.set('Date', time);
  res.set('Expires', time);
  return res;
}

const bearerMatch = /Bearer ([0-9a-zA-Z]*)/;
export function getTokenFromRequest(req: Request): string | undefined {
  const tmatch = bearerMatch.exec(req.header('Authorization') || '');
  const token = tmatch && tmatch.length > 0 ? tmatch[1] : undefined;
  return token || undefined;
}
