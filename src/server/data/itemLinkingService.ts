import debug from 'debug';
import { ITask } from 'pg-promise';

import {
  AuthenticationError,
  GameError,
  ObjectId,
  SessionInfo,
} from 'shared/types';
import { assertDefined } from 'shared/util';

import { getItemById, linkItemsById } from './itemDb';

const log = debug('server:item-linking');

export async function linkItems(
  tx: ITask<any>,
  session: SessionInfo | undefined,
  itemIds: ObjectId[]
): Promise<void> {
  assertDefined(session);
  const items = await Promise.all(
    itemIds.map(i => getItemById(tx, i, session.user.id, session.user.admin))
  );
  if (items.length !== itemIds.length) {
    throw new AuthenticationError(
      `ACCESS_DENIED`,
      'No access to requested images'
    );
  }
  if (items.length !== 2) {
    throw new GameError(`INVALID_LINK`, 'Can only link 2 images', 400);
  }
  const [i1, i2] = items;
  assertDefined(i1);
  assertDefined(i2);
  if (i1.category !== i2.category) {
    throw new GameError(
      `INVALID_LINK`,
      'Can only link items that are in the same category',
      400
    );
  }

  log('Linking images', i1, i2);
  await linkItemsById(tx, [i1.id, i2.id]);
}
