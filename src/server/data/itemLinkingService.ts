import debug from 'debug';
import path from 'path';
import { ITask } from 'pg-promise';
import sharp from 'sharp';

import {
  AuthenticationError,
  GameError,
  Item,
  ObjectId,
  SessionInfo,
} from 'shared/types';
import { assertDefined } from 'shared/util';
import { config } from 'server/config';

import { unlinkImage } from './images';
import { getItemById, linkItemsById, unlinkItemsById } from './itemDb';
import { requireItem } from './itemService';
import { writeThumbnail } from './thumbnailService';

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
  const thumbnail = `${i1.category}-${i1.id}-${i2.id}-tn.png`;
  await createLinkedThumbnail([i1, i2], thumbnail);
  await linkItemsById(tx, [i1.id, i2.id], thumbnail);
  // Delete old thumbnails
  await unlinkImage(thumbnail !== i1.thumbnail ? i1.thumbnail : undefined);
  await unlinkImage(thumbnail !== i2.thumbnail ? i2.thumbnail : undefined);
}

async function createLinkedThumbnail(items: Item[], thumbnail: string) {
  const combined = await sharp({
    create: {
      width: 1024,
      height: 1024,
      channels: 4,
      background: 'transparent',
    },
  })
    .composite(
      await Promise.all(
        items.map(async i => ({
          input: await getAlignedImage(i),
          gravity: 'northwest',
        }))
      )
    )
    .png()
    .toBuffer();
  await writeThumbnail(combined, thumbnail);
}

function getAlignedImage(item: Item) {
  return sharp(path.join(config.uploadPath, item.filename))
    .resize({
      width: item.width,
      height: item.height,
    })
    .extend({
      top: item.offsetY,
      left: item.offsetX,
      background: 'transparent',
    })
    .toBuffer();
}

export async function unlinkItem(
  tx: ITask<any>,
  session: SessionInfo | undefined,
  itemId: ObjectId
) {
  assertDefined(session);
  const item = await getItemById(
    tx,
    itemId,
    session.user.id,
    session.user.admin
  );
  requireItem(item);

  if (!item.linkedItem) {
    throw new GameError(`INVALID_ITEM`, `Item is not linked`, 400);
  }

  const linked = await getItemById(
    tx,
    item.linkedItem,
    session.user.id,
    session.user.admin
  );
  requireItem(linked);

  await unlinkItemsById(tx, [item.id, linked.id]);
}
