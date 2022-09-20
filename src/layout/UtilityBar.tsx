import * as React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { randomize, reset, State, toggleRestrictions } from "../game/GameState";

export const UtilityBarView: React.FC<{
  onRandomize: () => void;
  onReset: () => void;
  onToggleRestrictions: () => void;
  restricted: boolean;
}> = ({ onRandomize, onReset, onToggleRestrictions, restricted }) => (
  <Container>
    <AppIcon className="reset" onClick={onReset}>
      <IconImage
        src={require("./images/icon-reset.png")}
        alt="Aloita alusta"
        title="Aloita alusta"
      />
    </AppIcon>
    <AppIcon className="randomize" onClick={onRandomize}>
      <IconImage
        src={require("./images/icon-random.png")}
        alt="Kokeile onneasi!"
        title="Kokeile onneasi!"
      />
    </AppIcon>
    <AppIcon className="restrictions" onClick={onToggleRestrictions}>
      <IconImage
        src={
          restricted
            ? require("./images/icon-restrictions-on.png")
            : require("./images/icon-restrictions-off.png")
        }
        title={
          restricted
            ? "Asut lukittu paikalleen"
            : "Asut vapaasti liikutettavissa"
        }
      />
    </AppIcon>
  </Container>
);

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

export const UtilityBar = connect(
  (state: State) => ({
    restricted: state.settings.restrictions,
  }),
  (dispatch) => ({
    onRandomize: () => {
      dispatch(randomize());
    },
    onReset: () => {
      dispatch(reset());
    },
    onToggleRestrictions: () => {
      dispatch(toggleRestrictions());
    },
  })
)(UtilityBarView);
