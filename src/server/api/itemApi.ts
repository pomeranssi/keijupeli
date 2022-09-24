import { Router } from 'express';

import { getItems } from 'server/data/itemDb';
import { createValidatingRouter } from 'server/server/validatingRouter';

/**
 * Creates item API router.
 * Assumed attach path: `/api/item`
 */
export function createItemApi() {
  const api = createValidatingRouter(Router());

  // Get all items for current user
  // GET /api/item/list
  api.getTx('/list', {}, (tx, { session }) => getItems(tx, session?.user.id));

  return api.router;
}
