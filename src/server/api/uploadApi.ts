import debug from 'debug';
import { Router } from 'express';
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });

const log = debug('server:upload');

/**
 * File upload API router.
 * Assumed attach path: `/api/upload`
 */
export function createUploadApi() {
  const api = Router();

  api.post(
    '/',
    upload.fields([
      { name: 'image', maxCount: 1 },
      { name: 'left', maxCount: 1 },
      { name: 'top', maxCount: 1 },
      { name: 'width', maxCount: 1 },
      { name: 'height', maxCount: 1 },
    ]),
    (req, res) => {
      log('Uploading', req.body);
      log('Files', req.files);
      res.json({ status: 'OK' });
    }
  );

  return api;
}
