import * as React from 'react';
import shallow from 'zustand/shallow';

import { CategoryMap } from 'shared/types';
import { useAsyncData } from 'client/hooks/useAsyncData';

import { apiClient } from './apiCient';
import { useGameState } from './GameState';
import { Loader } from './Loader';

export const AppDataLoader: React.FC<{
  component: React.ComponentType;
}> = ({ component: Component }) => {
  const [categories, setupCategories, session] = useGameState(
    s => [s.categories, s.setupCategories, s.session],
    shallow
  );
  const data = useAsyncData(getCategories, true, session?.id);
  if (data.type === 'loaded') {
    setTimeout(() => setupCategories(data.value), 0);
  }
  return Object.keys(categories).length > 0 ? (
    <Component />
  ) : (
    <Loader size="10px" />
  );
};

const getCategories = (sessionId?: string) =>
  apiClient.get<CategoryMap>('/item/categories', { sessionId });
