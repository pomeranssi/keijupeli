import { ApiClient } from 'shared/net/apiClient';
import { FetchClient } from 'shared/net/fetchClient';

export const apiClient = new ApiClient(
  new FetchClient(fetch.bind(window), '/api')
);
