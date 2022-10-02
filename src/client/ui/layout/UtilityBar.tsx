import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import shallow from 'zustand/shallow';

import { useGameState } from 'client/game/state';

import { AppIcon } from '../common/AppIcon';

const allowRestrictions = false;

export const UtilityBar: React.FC = () => {
  const [
    reset,
    randomize,
    toggleRestrictions,
    restricted,
    session,
    mode,
    setMode,
  ] = useGameState(
    s => [
      s.reset,
      s.randomize,
      s.toggleRestrictions,
      s.restricted,
      s.session,
      s.mode,
      s.setMode,
    ],
    shallow
  );
  const location = useLocation();
  const loginTarget = location.pathname.includes('/login') ? '/' : '/login';
  return (
    <Container>
      <Link to={loginTarget}>
        {session ? (
          <AppIcon
            className="logout"
            icon="icon-profile.png"
            title="Kirjaudu ulos"
          />
        ) : (
          <AppIcon
            className="login"
            icon="icon-login.png"
            title="Kirjaudu sisään"
          />
        )}
      </Link>
      <AppIcon
        className="reset"
        onClick={reset}
        icon="icon-reset.png"
        title="Aloita alusta"
      />
      <AppIcon
        className="randomize"
        onClick={randomize}
        icon="icon-random.png"
        title="Kokeile onneasi!"
      />
      {allowRestrictions ? (
        <AppIcon
          className="restrictions"
          onClick={toggleRestrictions}
          icon={
            restricted
              ? 'icon-restrictions-on.png'
              : 'icon-restrictions-off.png'
          }
          title={
            restricted
              ? 'Asut lukittu paikalleen'
              : 'Asut vapaasti liikutettavissa'
          }
        />
      ) : null}
      {session ? (
        <>
          <AppIcon
            className={`layers ${mode === 'layers' ? 'active' : 'inactive'}`}
            onClick={() => setMode(mode === 'layers' ? 'play' : 'layers')}
            icon="icon-layers.png"
            title="Vaihda kerroksia"
          />
          <AppIcon
            className={`link ${mode === 'link' ? 'active' : 'inactive'}`}
            onClick={() => setMode(mode === 'link' ? 'play' : 'link')}
            icon="icon-link.png"
            title="Yhdistä kuvia"
          />
          <AppIcon
            className={`delete ${mode === 'delete' ? 'active' : 'inactive'}`}
            onClick={() => setMode(mode === 'delete' ? 'play' : 'delete')}
            icon="icon-delete.png"
            title="Poista kuvia"
          />
        </>
      ) : null}
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
  margin-top: 0.6em;

  @media all and (orientation: portrait) {
    text-align: left;
    margin: 0.6em 0.6em;
  }
`;
