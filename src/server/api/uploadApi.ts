import { Router } from 'express';
import multer from 'multer';
import { z } from 'zod';

import { CategoryType } from 'shared/types';
import { config } from 'server/config';
import { uploadFile } from 'server/data/uploadService';
import { Requests } from 'server/server/requestHandling';
import { requireSessionMiddleware } from 'server/server/sessionMiddleware';

const upload = multer({ dest: config.uploadPath });

/**
 * File upload API router.
 * Assumed attach path: `/api/upload`
 */
export function createUploadApi() {
  const api = Router();

  // Require session for all requests
  api.use(requireSessionMiddleware);

  api.post(
    '/',
    upload.fields([{ name: 'image', maxCount: 1 }]),
    Requests.validatedTxRequest(
      { body: z.object({ category: CategoryType }) },
      (tx, { body, session }, req) =>
        uploadFile(
          tx,
          session?.user,
          body.category,
          ((req.files as any)?.['image'] as any)[0]
        )
    )
  );

  return api;
}
