import { Router } from 'express';

import { ItemLinkingBody } from 'shared/types';
import { getItems } from 'server/data/itemDb';
import { linkItems, unlinkItem } from 'server/data/itemLinkingService';
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

  // Link item
  // POST /api/item/link
  api.postTx('/link', { body: ItemLinkingBody }, (tx, { body, session }) =>
    linkItems(tx, session, body.items)
  );

  // Unlink item
  // DELETE /api/item/link/:itemId
  api.deleteTx('/link/:itemId', {}, (tx, { params, session }) =>
    unlinkItem(tx, session, params.itemId)
  );

  // Delete item
  // DELETE /api/item/:itemId
  api.deleteTx('/:itemId', {}, (tx, { params, session }) =>
    deleteItem(tx, params.itemId, session)
  );

  return api.router;
}
