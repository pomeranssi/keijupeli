import debug from 'debug';
import { unlink } from 'fs/promises';
import path from 'path';

import { config } from 'server/config';

const log = debug('server:images');

export function getFullImagePath(filename: string) {
  return path.join(config.uploadPath, filename);
}

/**
 * @param filename just the filename, or may be a full path
 */
export async function unlinkImage(filename: string | undefined) {
  if (!filename) return;
  try {
    await unlink(
      filename.includes('/') ? filename : path.join(config.uploadPath, filename)
    );
  } catch (e) {
    log(`Warning: Could not delete image file ${filename}`, e);
  }
}
