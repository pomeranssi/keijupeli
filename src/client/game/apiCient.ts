import { FetchClient } from 'shared/net/FetchClient';

export const apiClient = new FetchClient(fetch.bind(window), '/api');
