import * as React from 'react';

import { CategoryMap, UUID } from 'shared/types';

import { apiClient } from './apiCient';
import { useGameState } from './GameState';

export const AppDataLoader: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const session = useGameState(s => s.session);
  const sessionId = session?.id;
  React.useEffect(() => {
    void initializeCategories(sessionId);
  }, [sessionId]);
  return <>{children}</>;
};

async function initializeCategories(sessionId: UUID | undefined) {
  console.log('Initializing categories with', sessionId);
  const categories = await getCategories(sessionId);
  useGameState.getState().setupCategories(categories);
}

const getCategories = (sessionId?: string) =>
  apiClient.get<CategoryMap>('/item/categories', { sessionId });
