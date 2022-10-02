import debug from 'debug';

import { CategoryMap } from 'shared/types';

import { apiClient } from './apiCient';
import { useGameState } from './state';

const log = debug('client:init');

export async function initializeCategories(resetMode?: boolean) {
  const sessionId = useGameState.getState().session?.id;
  log(`Initializing data for session ${sessionId}`);
  const categories = await getCategories(sessionId);
  useGameState.getState().setupCategories(categories, resetMode);
}

const getCategories = (sessionId?: string) =>
  apiClient.get<CategoryMap>('/item/categories', { sessionId });
