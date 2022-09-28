import { AuthenticationError, GameError, Session } from 'shared/types';
import { useGameState } from 'client/game/GameState';

import { FetchClient, HttpMethod, MethodInit } from './fetchClient';

export class ApiClient {
  constructor(private client: FetchClient) {}

  private createFun = (type: Lowercase<HttpMethod>) => {
    return async <T>(
      path: string,
      params: MethodInit = {},
      step = 0
    ): Promise<T> => {
      if (step > 3) {
        throw new GameError(
          `TOO_MANY_RETRIES`,
          `Yritettiin ${step} kertaa, nyt ei enää kannata jatkaa`,
          500
        );
      }
      try {
        return await this.client[type](path, params);
      } catch (e) {
        if (e instanceof AuthenticationError) {
          // Retry with authentication
          if (await tryToExtendSession(this.client)) {
            // Success! retry
            return this[type](path, params, step + 1);
          }
        } else {
          useGameState
            .getState()
            .showMessage({ message: `Virhe: ${e.message}`, type: 'error' });
        }
        throw e;
      }
    };
  };

  get = this.createFun('get');
  post = this.createFun('post');
  put = this.createFun('put');
  delete = this.createFun('delete');
  patch = this.createFun('patch');
}

async function tryToExtendSession(client: FetchClient) {
  const session = useGameState.getState().session;
  if (!session) {
    // No session, can't extend
    throw new AuthenticationError(`NO_SESSION`, `No session info`);
  }

  try {
    const newSession = await client.post<Session>('/session/extend', {
      body: { refreshToken: session.refreshToken },
    });
    // OK, we logged in successfully
    useGameState.getState().setSession(newSession);
    return true;
  } catch (e) {
    // Could not re-login with session info
    if (e instanceof AuthenticationError) {
      // Refresh token was not valid
      // Clear old session data from state
      useGameState.getState().setSession(undefined);
      useGameState.getState().showMessage({
        message: `Istuntosi vanheni ja sinut on kirjattu ulos`,
        type: 'error',
      });
    }
    // Some other error, not related to authentication?
    throw e;
  }
}
