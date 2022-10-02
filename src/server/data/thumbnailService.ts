import path from 'path';
import { ITask } from 'pg-promise';
import sharp from 'sharp';

import { Item } from 'shared/types';
import { getFileExt } from 'shared/util';

import { deleteImageFile, getFullImagePath } from './images';
import { setItemThumbnail } from './itemDb';

type HasFilename = Pick<Item, 'filename'>;

export function hasFilename(x: any): x is HasFilename {
  return (
    x &&
    typeof x === 'object' &&
    'filename' in x &&
    typeof x.filename === 'string' &&
    x.filename
  );
}

export async function resetThumbnail(tx: ITask<any>, item: Item) {
  await deleteImageFile(item.thumbnail);
  const thumbnail = getThumbnailName(item.filename);
  await writeThumbnail(item, thumbnail);
  await setItemThumbnail(tx, item.id, thumbnail);
}

/**
 * @param file if filename, then without path
 * @param thumbnail just the thumbnail name, no path
 */
export async function writeThumbnail(
  file: string | HasFilename | Buffer,
  thumbnail: string
) {
  const src = hasFilename(file) ? getFullImagePath(file.filename) : file;
  await sharp(src)
    .trim()
    .resize({
      width: 144,
      height: 144,
      fit: 'contain',
      background: 'transparent',
    })
    .png()
    .toFile(getFullImagePath(thumbnail));
  return thumbnail;
}

export function getThumbnailName(filename: string) {
  const ext = getFileExt(filename);
  const base = path.basename(filename, `.${ext}`);
  return `${base}-tn.${ext || 'unknown'}`;
}
