import { Router } from 'express';
import multer from 'multer';
import { z } from 'zod';

import { CategoryType } from 'shared/types';
import { config } from 'server/config';
import { uploadFile } from 'server/data/uploadService';
import { Requests } from 'server/server/requestHandling';

const upload = multer({ dest: config.uploadPath });

/**
 * File upload API router.
 * Assumed attach path: `/api/upload`
 */
export function createUploadApi() {
  const api = Router();

  api.post(
    '/',
    upload.fields([{ name: 'image', maxCount: 1 }]),
    Requests.validatedTxRequest(
      { body: z.object({ category: CategoryType }) },
      (tx, { body, session }, req) =>
        uploadFile(tx, session?.user, body.category, req.files?.['image'][0])
    )
  );

  return api;
}
