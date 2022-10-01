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
  const thumbnail = i1.thumbnail ?? `${i1.category}-${i1.id}-tn.png`;
  const thumbpath = path.join(config.uploadPath, thumbnail);
  await createLinkedThumbnail([i1, i2], thumbpath);
  await linkItemsById(tx, [i1.id, i2.id], thumbnail);
}

async function createLinkedThumbnail(items: Item[], thumbfile: string) {
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
  await sharp(combined)
    .trim()
    .resize({
      width: 144,
      height: 144,
      fit: 'contain',
      background: 'transparent',
    })
    .png()
    .toFile(thumbfile);
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
