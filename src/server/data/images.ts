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
export async function deleteImageFile(filename: string | undefined) {
  if (!filename) return;
  try {
    const fullPath = filename.includes('/')
      ? filename
      : path.join(config.uploadPath, filename);
    log(`Deleting image ${fullPath}`);
    await unlink(fullPath);
  } catch (e) {
    log(`Warning: Could not delete image file ${filename}`, e);
  }
}
