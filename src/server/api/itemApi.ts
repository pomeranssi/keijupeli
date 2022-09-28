import { Router } from 'express';

import { getItems } from 'server/data/itemDb';
import { deleteItem, getItemsByCategory } from 'server/data/itemService';
import { requireSessionMiddleware } from 'server/server/sessionMiddleware';
import { createValidatingRouter } from 'server/server/validatingRouter';

/**
 * Creates item API router.
 * Assumed attach path: `/api/item`
 */
export function createItemApi() {
  const api = createValidatingRouter(Router());

  // Get all items for current user as a list
  // GET /api/item/list
  api.getTx('/list', {}, (tx, { session }) => getItems(tx, session?.user.id));

  // Get all items for current user as a list
  // GET /api/item/list
  api.getTx('/categories', {}, (tx, { session }) =>
    getItemsByCategory(tx, session?.user.id)
  );

  // Session required after this point
  api.router.use(requireSessionMiddleware);

  // Delete item
  // DELETE /api/item/:itemId
  api.deleteTx('/:itemId', {}, (tx, { params, session }) =>
    deleteItem(tx, params.itemId, session)
  );

  return api.router;
}
