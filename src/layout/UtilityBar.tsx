import "./UtilityBar.css";

import * as React from "react";
import { connect } from "react-redux";

import { randomize, reset, State, toggleRestrictions } from "../game/GameState";

export class UtilityBar extends React.Component<{
  onRandomize: () => void;
  onReset: () => void;
  onToggleRestrictions: () => void;
  restricted: boolean;
}> {
  render() {
    const restrictTitle = this.props.restricted
      ? "Asut lukittu paikalleen"
      : "Asut vapaasti liikutettavissa";
    return (
      <div className="UtilityBar">
        <div className="AppIcon reset" onClick={this.props.onReset}>
          <img
            src={require("./images/icon-reset.png")}
            className="AppIconImage"
            alt="Aloita alusta"
            title="Aloita alusta"
          />
        </div>
        <div className="AppIcon randomize" onClick={this.props.onRandomize}>
          <img
            src={require("./images/icon-random.png")}
            className="AppIconImage"
            alt="Kokeile onneasi!"
            title="Kokeile onneasi!"
          />
        </div>
        <div
          className="AppIcon restrictions"
          onClick={this.props.onToggleRestrictions}
        >
          <img
            src={
              this.props.restricted
                ? require("./images/icon-restrictions-on.png")
                : require("./images/icon-restrictions-off.png")
            }
            className="AppIconImage"
            alt={restrictTitle}
            title={restrictTitle}
          />
        </div>
      </div>
    );
  }
}

const StatefulUtilityBar = connect(
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
)(UtilityBar);

export default StatefulUtilityBar;
