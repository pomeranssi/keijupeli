import * as React from 'react';
import shallow from 'zustand/shallow';

import { CategoryMap } from 'shared/types';
import { useAsyncData } from 'client/hooks/useAsyncData';

import { apiClient } from './apiCient';
import { Loader } from './Loader';
import { useGameState } from './state/GameState';

export const AppDataLoader: React.FC<{
  component: React.ComponentType;
}> = ({ component: Component }) => {
  const [categories, setupCategories] = useGameState(
    s => [s.categories, s.setupCategories],
    shallow
  );
  const data = useAsyncData(getCategories, true);
  if (data.type === 'loaded') {
    setTimeout(() => setupCategories(data.value), 0);
  }
  return Object.keys(categories).length > 0 ? (
    <Component />
  ) : (
    <Loader size="10px" />
  );
};

const getCategories = () => apiClient.get<CategoryMap>('/item/categories');
