import debug from 'debug';

import { Item, ItemLinkingBody } from 'shared/types';
import { executeOperation } from 'client/util/executeOperation';

import { apiClient } from './apiCient';
import { initializeCategories } from './dataInit';
import { useGameState } from './state';

const log = debug('client:link-items');

export async function requestLinking(...items: Item[]) {
  log('Requested linking', items);
  await executeOperation(() => linkItems(items), {
    confirm: `Haluatko yhdistää nämä ${items.length} kuvaa?`,
    success: 'Kuvat yhdistetty',
    postProcess: initializeCategories,
  });
}

async function linkItems(items: Item[]) {
  const sessionId = useGameState.getState().session?.id;
  if (!sessionId) return;
  const body: ItemLinkingBody = { items: items.map(i => i.id) };
  return apiClient.post<undefined>('/item/link', { body, sessionId });
}
