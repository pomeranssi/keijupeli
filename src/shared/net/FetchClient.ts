import debug from 'debug';

import { AuthenticationError, GameError } from 'shared/types';

const log = debug('net:fetch-client');

export type FetchType = (
  input: RequestInfo,
  init?: FixedRequestInit
) => Promise<Response>;

function encodeComponent(x: any) {
  if (!x) {
    return '';
  } else if (typeof x === 'string') {
    return encodeURIComponent(x);
  } else {
    return encodeURIComponent(JSON.stringify(x));
  }
}

export class FetchClient {
  private fetch: FetchType;

  constructor(f: FetchType, private baseUrl: string = '') {
    this.fetch = f;
  }

  public toQuery(path: string, query?: Record<string, any>): string {
    const fullPath = this.baseUrl + path;
    return query
      ? fullPath +
          '?' +
          Object.keys(query)
            .map(k => encodeComponent(k) + '=' + encodeComponent(query[k]))
            .join('&')
      : fullPath;
  }

  async req<T>(
    path: string,
    {
      method,
      query,
      body,
      headers,
    }: {
      method: string;
      query?: Record<string, any>;
      body?: any;
      headers?: Record<string, string>;
    }
  ): Promise<T> {
    try {
      const queryPath = this.toQuery(path, query);
      log(`${method} ${queryPath} with body`, body);
      const options = {
        method,
        body: body ? JSON.stringify(body) : undefined,
        headers,
      };
      const res = await this.fetch(queryPath, options);
      log(`${method} ${queryPath} -> ${res.status}`);
      switch (res.status) {
        case 200:
          return (await res.json()) as T;
        case 401:
        case 403:
          throw new AuthenticationError(
            'Unauthorized: ' + res.status,
            await res.json()
          );
        default:
          const data = await res.json();
          log('Error received from API', data);
          throw new GameError(
            'code' in data ? data.code : 'ERROR',
            `Error ${res.status} from ${method} ${path}`,
            res.status,
            data
          );
      }
    } catch (e: any) {
      if (e instanceof GameError || e instanceof AuthenticationError) {
        throw e;
      }
      log('Error in fetch client:', e);
      const data = { ...e };
      throw new GameError(
        'code' in data ? data.code : 'ERROR',
        'cause' in data ? data.cause : e.message,
        'status' in data ? data.status : 500,
        data
      );
    }
  }

  public static contentTypeJson: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  public get<T>(
    path: string,
    query?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.req(path, { method: 'GET', query, headers });
  }

  public put<T>(
    path: string,
    body?: any,
    query?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.req(path, {
      method: 'PUT',
      body,
      query,
      headers: { ...FetchClient.contentTypeJson, ...headers } as Record<
        string,
        string
      >,
    });
  }

  public post<T>(
    path: string,
    body?: any,
    query?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.req(path, {
      method: 'POST',
      body,
      query,
      headers: { ...FetchClient.contentTypeJson, ...headers } as Record<
        string,
        string
      >,
    });
  }

  public del<T>(
    path: string,
    data?: any,
    query?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.req(path, { method: 'DELETE', query, headers, body: data });
  }
}