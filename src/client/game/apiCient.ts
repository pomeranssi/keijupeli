import { FetchClient } from 'shared/net/fetchClient';

import { ApiClient } from './apiClientImpl';

export const apiClient = new ApiClient(
  new FetchClient(fetch.bind(window), '/api')
);
