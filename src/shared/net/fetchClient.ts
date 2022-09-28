import debug from 'debug';

import { AuthenticationError, GameError } from 'shared/types';

import { ContentTypes, isJsonContent } from './contentTypes';
import { uri } from './urlUtils';

const log = debug('net:fetch-client');

export type HttpMethod = 'POST' | 'PUT' | 'GET' | 'PATCH' | 'DELETE';

export type MethodInit = {
  query?: Record<string, any>;
  body?: any;
  headers?: Record<string, string>;
  sessionId?: string;
  contentType?: string | null;
};

type RequestInit = MethodInit & {
  method: HttpMethod;
};

export type MethodFun = <T>(path: string, params?: MethodInit) => Promise<T>;

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
    { method, query, body, headers, contentType, sessionId }: RequestInit
  ): Promise<T> {
    try {
      const queryPath = this.toQuery(path, query);
      log(`${method} ${queryPath} with body`, body);
      const isJson =
        contentType === ContentTypes.json || contentType === undefined;
      const bodyContents = body && isJson ? JSON.stringify(body) : body;
      const requestHeaders = {
        ...(contentType !== null
          ? { 'Content-Type': contentType ?? ContentTypes.json }
          : {}),
        ...headers,
        ...(sessionId
          ? { Authorization: uri`Bearer ${sessionId}` }
          : undefined),
      };
      const options = {
        method,
        body: bodyContents,
        headers: requestHeaders,
      };
      const res = await this.fetch(queryPath, options);
      const responseType = res.headers.get('content-type') ?? undefined;
      const resText = await res.text();
      const resData = isJsonContent(responseType)
        ? resText
          ? JSON.parse(resText)
          : undefined
        : resText;

      log(`${method} ${queryPath} -> ${res.status} (${resText.length} bytes)`);
      switch (res.status) {
        case 200:
          return resData as T;
        case 401:
        case 403:
          throw new AuthenticationError(
            'Unauthorized: ' + res.status,
            resData?.cause ?? 'Authentication error'
          );
        default:
          log('Error received from API', resData);
          throw new GameError(
            resData?.code ?? 'ERROR',
            `Error ${res.status} from ${method} ${path}`,
            res.status,
            resData
          );
      }
    } catch (e: any) {
      if (e instanceof GameError || e instanceof AuthenticationError) {
        throw e;
      }
      log('Error in fetch client:', e);
      const data = { ...e };
      throw new GameError(
        data?.code ?? 'ERROR',
        data?.cause ? JSON.stringify(data.cause) : e.message,
        data?.status ?? 500,
        data
      );
    }
  }

  public static contentTypeJson: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  public get: MethodFun = (path, params) =>
    this.req(path, { ...params, method: 'GET' });
  public put: MethodFun = (path, params) =>
    this.req(path, { ...params, method: 'PUT' });
  public post: MethodFun = (path, params) =>
    this.req(path, { ...params, method: 'POST' });
  public patch: MethodFun = (path, params) =>
    this.req(path, { ...params, method: 'PATCH' });
  public delete: MethodFun = (path, params) =>
    this.req(path, { ...params, method: 'DELETE' });
}
