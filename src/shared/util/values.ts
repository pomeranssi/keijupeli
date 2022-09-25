import * as debug from 'debug';

import { GameError } from 'shared/types';

export function isDefined<T>(x: T | undefined | null): x is T {
  return x !== undefined && x !== null;
}

export function assertDefined<T>(t: T | undefined | null): asserts t is T {
  if (t === null || typeof t === 'undefined') {
    throw new Error(`Value is ${t}`);
  }
}

export function assertUnreachable(e: never): never {
  throw new GameError(
    'VALUE_NOT_EXPECTED',
    `Expected unreachable, but received: ${e}`,
    500
  );
}

const log = debug('shared:values');
export function logUnreachable(e: never) {
  log(`Expected unreachable, but received: ${e}`);
}
