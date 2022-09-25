import * as React from 'react';
import styled from 'styled-components';
import shallow from 'zustand/shallow';

import { useGameState } from '../game/GameState';

export const UtilityBar: React.FC = () => {
  const [reset, randomize, toggleRestrictions, restricted] = useGameState(
    s => [s.reset, s.randomize, s.toggleRestrictions, s.restricted],
    shallow
  );
  return (
    <Container>
      <AppIcon className="reset" onClick={reset}>
        <IconImage
          src={require('./images/icon-reset.png')}
          alt="Aloita alusta"
          title="Aloita alusta"
        />
      </AppIcon>
      <AppIcon className="randomize" onClick={randomize}>
        <IconImage
          src={require('./images/icon-random.png')}
          alt="Kokeile onneasi!"
          title="Kokeile onneasi!"
        />
      </AppIcon>
      <AppIcon className="restrictions" onClick={toggleRestrictions}>
        <IconImage
          src={
            restricted
              ? require('./images/icon-restrictions-on.png')
              : require('./images/icon-restrictions-off.png')
          }
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
  padding: 10px;
  background-color: rgba(255, 153, 153, 0.8);
  border-radius: 50%;
  display: inline-block;
  margin-bottom: 10px;

  &.reset {
    background-color: rgba(180, 180, 255, 0.8);
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
  width: 60px;
  height: 60px;
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
