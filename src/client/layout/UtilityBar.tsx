import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import shallow from 'zustand/shallow';

import { useGameState } from '../game/GameState';
import { getImagePath } from './Images';

export const UtilityBar: React.FC = () => {
  const [reset, randomize, toggleRestrictions, restricted, session] =
    useGameState(
      s => [
        s.reset,
        s.randomize,
        s.toggleRestrictions,
        s.restricted,
        s.session,
      ],
      shallow
    );
  const location = useLocation();
  const loginTarget = location.pathname.includes('/login') ? '/' : '/login';
  return (
    <Container>
      <Link to={loginTarget}>
        {session ? (
          <AppIcon className="logout">
            <IconImage
              src={getImagePath('icon-profile.png')}
              title="Kirjaudu ulos"
            />
          </AppIcon>
        ) : (
          <AppIcon className="login">
            <IconImage
              src={getImagePath('icon-login.png')}
              title="Kirjaudu sisään"
            />
          </AppIcon>
        )}
      </Link>
      <AppIcon className="reset" onClick={reset}>
        <IconImage src={getImagePath('icon-reset.png')} title="Aloita alusta" />
      </AppIcon>
      <AppIcon className="randomize" onClick={randomize}>
        <IconImage
          src={getImagePath('icon-random.png')}
          title="Kokeile onneasi!"
        />
      </AppIcon>
      <AppIcon className="restrictions" onClick={toggleRestrictions}>
        <IconImage
          src={getImagePath(
            restricted
              ? 'icon-restrictions-on.png'
              : 'icon-restrictions-off.png'
          )}
          title={
            restricted
              ? 'Asut lukittu paikalleen'
              : 'Asut vapaasti liikutettavissa'
          }
        />
      </AppIcon>
    </Container>
  );
};

const AppIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50%;
  margin-bottom: 8px;

  &.reset {
    background-color: rgba(180, 180, 255, 0.8);
  }
  &.login,
  &.logout {
    background-color: rgba(163, 243, 219, 0.8);
  }
  &.randomize {
    background-color: rgba(255, 153, 153, 0.8);
  }
  &.restrictions {
    background-color: rgba(126, 208, 126, 0.8);
  }

  @media all and (orientation: portrait) {
    text-align: center;
    margin-bottom: 0;
    margin-right: 10px;
  }
`;

const IconImage = styled.img`
  width: 64px;
  height: 64px;
  margin: 0;
  padding: 0;
`;

const Container = styled.div`
  text-align: center;
  margin-top: 0.6em;

  @media all and (orientation: portrait) {
    text-align: left;
    margin: 0.6em 0.6em;
  }
`;
