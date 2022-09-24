import * as React from 'react';

import { CategoryMap } from 'shared/types/item';
import { useAsyncData } from 'client/hooks/useAsyncData';

import { apiClient } from './apiCient';
import { Loader } from './Loader';

export const CategoryLoader: React.FC<{
  component: React.ComponentType<{ categories: CategoryMap }>;
}> = ({ component: Component }) => {
  const data = useAsyncData(getCategories, true);
  return data.type === 'loaded' ? (
    <Component categories={data.value} />
  ) : (
    <Loader size="10px" />
  );
};

const getCategories = () => apiClient.get<CategoryMap>('/item/categories');
