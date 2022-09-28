import debug from 'debug';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Password, Session, Username } from 'shared/types';
import { apiClient } from 'client/game/apiCient';
import { useGameState } from 'client/game/state';

const log = debug('client:login');

export function useLogin() {
  const navigate = useNavigate();
  const setSession = useGameState(s => s.setSession);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [loginError, setLoginError] = React.useState<string | undefined>(
    undefined
  );

  const parsedUser = Username.safeParse(username);
  const parsedPass = Password.safeParse(password);
  const dataValid = parsedUser.success && parsedPass.success;

  React.useEffect(() => setLoginError(undefined), [username, password]);
  const doLogin = async () => {
    if (dataValid && !loading) {
      setLoginError(undefined);
      setLoading(true);
      try {
        log('Logging in with user', parsedUser.data);
        const result = await loginToServer(parsedUser.data, parsedPass.data);
        log('Success:', result);
        setSession(result);
        navigate('/');
      } catch (e) {
        setLoginError('Tarkista käyttäjätunnus ja salasana.');
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    loginError,
    doLogin,
    dataValid,
    loading,
  };
}

const loginToServer = (username: string, password: string) =>
  apiClient.put<Session>('/session', { body: { username, password } });
