import { CategoryMap } from 'shared/types';

import { apiClient } from './apiCient';
import { useGameState } from './state';

export async function initializeCategories() {
  const sessionId = useGameState.getState().session?.id;
  if (!sessionId) return;
  console.log('Initializing categories with', sessionId);
  const categories = await getCategories(sessionId);
  useGameState.getState().setupCategories(categories);
}

const getCategories = (sessionId?: string) =>
  apiClient.get<CategoryMap>('/item/categories', { sessionId });
