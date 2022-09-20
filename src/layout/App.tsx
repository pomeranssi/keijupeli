import "./App.css";

import * as React from "react";

import CategoryList from "../game/CategoryList";
import ItemList from "../game/ItemList";
import GameArea from "./GameArea";
import UtilityBar from "./UtilityBar";

export default class App extends React.Component<object> {
  UNSAFE_componentWillMount() {
    this.setState({ category: undefined });
  }
  render() {
    return (
      <div className="App">
        <div className="AppMain">
          <GameArea />
          <br />
        </div>
        <div className="AppToolbar primary">
          <div className="LogoArea">
            <div className="AppLogo">
              <img
                src="images/fairy.svg"
                className="AppLogoImage"
                alt="Keijupeli"
                title="Keijupeli"
              />
            </div>
            <h1>Keijupeli</h1>
          </div>
          <CategoryList />
        </div>
        <div className="AppToolbar secondary">
          <ItemList />
        </div>
        <div className="AppToolbar tertiary">
          <UtilityBar />
        </div>
      </div>
    );
  }
}
