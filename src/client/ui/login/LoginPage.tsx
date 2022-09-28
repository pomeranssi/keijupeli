import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import shallow from 'zustand/shallow';

import { useGameState } from 'client/game/state';
import { useLogin } from 'client/hooks/useLogin';

import { Dialog } from '../common/Dialog';
import { TextEdit } from '../common/TextEdit';
import { GameLayout } from '../layout/GameLayout';

export const LoginPage: React.FC = () => {
  const {
    username,
    password,
    dataValid,
    doLogin,
    setUsername,
    setPassword,
    loading,
    loginError,
  } = useLogin();
  const navigate = useNavigate();
  const [session, setSession] = useGameState(
    s => [s.session, s.setSession],
    shallow
  );
  const logout = () => {
    setSession(undefined);
    navigate('/');
  };
  return (
    <GameLayout>
      <LoginContainer>
        <LoginDialog title="Kirjaudu sisään">
          {session ? (
            <>
              <Row>Olet jo kirjautunut sisään.</Row>
              <Row topMargin="24px">
                <Button onClick={logout}>Kirjaudu ulos</Button>
              </Row>
            </>
          ) : (
            <>
              <Row>
                <Label htmlFor="username">Käyttäjätunnus</Label>
                <TextEdit
                  id="username"
                  type="text"
                  value={username}
                  onChange={setUsername}
                />
              </Row>
              <Row>
                <Label htmlFor="password">Salasana</Label>
                <TextEdit
                  id="passwod"
                  type="password"
                  value={password}
                  onChange={setPassword}
                />
              </Row>
              <Row>
                {loading ? (
                  <>
                    <Label>Ladataan...</Label>
                  </>
                ) : loginError ? (
                  <>
                    <Label>Virhe kirjautumisessa!</Label>
                    {loginError}
                  </>
                ) : null}
              </Row>
              <Row topMargin="20px">
                <Label htmlFor="login">Kirjaudu</Label>
                <Button
                  id="login"
                  disabled={!dataValid || loading}
                  onClick={doLogin}
                >
                  Kirjaudu
                </Button>
              </Row>
            </>
          )}
        </LoginDialog>
      </LoginContainer>
    </GameLayout>
  );
};

const LoginDialog = styled(Dialog)`
  width: 480px;
`;

const Row = styled.div`
  height: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 12px 0;
  ${(props: { topMargin?: string }) =>
    props.topMargin ? `margin-top: ${props.topMargin}` : ''}
`;

const Label = styled.label`
  width: 160px;
`;

const Button = styled.button`
  padding: 4px 24px;
  background-color: #83b3a4;
  color: white;
  font-size: 12pt;
  border: none;
  border-radius: 20px;
  height: 40px;

  &:active {
    background-color: #89c8b5;
  }

  &:disabled {
    background-color: #bbb;
  }
`;

const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
