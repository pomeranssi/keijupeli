import debug from 'debug';
import { rename } from 'fs/promises';
import path from 'path';
import { ITask } from 'pg-promise';
import sharp from 'sharp';

import { AuthenticationError, CategoryType, User } from 'shared/types';
import { TargetImageSize } from 'shared/types/images';
import { getFileExt } from 'shared/util';

import { deleteImageFile } from './images';
import { insertItem } from './itemDb';
import { resetThumbnail } from './thumbnailService';

const log = debug('server:upload');

type ProcessResult = {
  filename: string;
  width: number;
  height: number;
  offsetX: number;
  offsetY: number;
};

export async function uploadFile(
  tx: ITask<any>,
  user: User | undefined,
  category: CategoryType,
  file: Express.Multer.File
) {
  if (!user) {
    throw new AuthenticationError('AUTHENTICATION_REQUIRED', 'Not logged in');
  }
  if (!file) return;
  log(`Uploading new file to ${category}`);
  log('File info', file);
  const uploadedImg = await sharp(file.path).metadata();
  const data = await renameAndProcessFile(category, file);
  const scale =
    Math.max(uploadedImg.width ?? 0, uploadedImg.height ?? 0, 1) /
    TargetImageSize;
  log('Scale ratio', scale);
  log('Process result', data);
  const item = await insertImageData(tx, user, category, file, data, scale);
  await resetThumbnail(tx, item);
}

async function insertImageData(
  tx: ITask<any>,
  user: User,
  category: CategoryType,
  file: Express.Multer.File,
  data: ProcessResult,
  scale: number
) {
  return await insertItem(tx, user.id, {
    category,
    filename: data.filename,
    originalFilename: file.originalname,
    width: data.width / scale,
    height: data.height / scale,
    offsetX: data.offsetX / scale,
    offsetY: data.offsetY / scale,
  });
}

async function renameAndProcessFile(
  category: CategoryType,
  file: Express.Multer.File
): Promise<ProcessResult> {
  const ext = getFileExt(file.originalname).toLowerCase() || 'image';
  if (category === 'background') {
    // Do not trim background images
    if (ext === 'jpg' || ext === 'jpeg') {
      return renameWithExt(category, file, ext);
    } else {
      return convertToJpg(category, file);
    }
  }
  // Trim to new name
  return trimImage(category, file, ext);
}

async function convertToJpg(
  category: CategoryType,
  file: Express.Multer.File
): Promise<ProcessResult> {
  const filename = `${category}-${file.filename}.jpg`;
  log(`Converting background image ${file.originalname} to JPEG: ${filename}`);
  const result = await sharp(file.path)
    .jpeg({ quality: 93 })
    .toFile(path.join(file.destination, filename));
  await deleteImageFile(file.path);
  return {
    filename,
    width: result.width,
    height: result.height,
    offsetX: 0,
    offsetY: 0,
  };
}

async function renameWithExt(
  category: CategoryType,
  file: Express.Multer.File,
  ext: string
): Promise<ProcessResult> {
  const filename = `${category}-${file.filename}.${ext}`;
  const resultFile = path.join(file.destination, filename);
  log(`Renaming background image ${file.originalname} to ${filename}`);
  await rename(file.path, resultFile);
  const metadata = await sharp(resultFile).metadata();
  return {
    filename,
    width: metadata.width ?? 0,
    height: metadata.height ?? 0,
    offsetX: 0,
    offsetY: 0,
  };
}

async function trimImage(
  category: CategoryType,
  file: Express.Multer.File,
  ext: string
): Promise<ProcessResult> {
  const filename = `${category}-${file.filename}.${ext}`;
  log(`Trimming image ${file.originalname} to ${filename}`);
  const result = await sharp(file.path)
    .trim()
    .toFile(path.join(file.destination, filename));
  await deleteImageFile(file.path);
  log('Trimmed', result);
  return {
    filename,
    width: result.width,
    height: result.height,
    offsetX: -(result.trimOffsetLeft ?? 0),
    offsetY: -(result.trimOffsetTop ?? 0),
  };
}
