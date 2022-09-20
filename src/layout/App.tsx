import * as React from "react";
import styled from "styled-components";

import CategoryList from "../game/CategoryList";
import ItemList from "../game/ItemList";
import GameArea from "./GameArea";
import { UtilityBar } from "./UtilityBar";

export default class App extends React.Component<object> {
  UNSAFE_componentWillMount() {
    this.setState({ category: undefined });
  }
  render() {
    return (
      <Container>
        <AppMain>
          <GameArea />
          <br />
        </AppMain>
        <Toolbar className="primary">
          <LogoArea>
            <AppLogo>
              <LogoImage
                src="images/fairy.svg"
                alt="Keijupeli"
                title="Keijupeli"
              />
            </AppLogo>
            <h1>Keijupeli</h1>
          </LogoArea>
          <CategoryList />
        </Toolbar>
        <Toolbar className="secondary">
          <ItemList />
        </Toolbar>
        <Toolbar className="tertiary">
          <UtilityBar />
        </Toolbar>
      </Container>
    );
  }
}

const AppMain = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 200px;
  right: 0;
  overflow: hidden;
  background-color: #222;

  @media all and (orientation: portrait) {
    top: 200px;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

const Toolbar = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100px;
  overflow: auto;
  overflow-x: hidden;
  background-color: #222;
  color: white;
  vertical-align: top;
  text-align: center;

  &.primary {
    left: 0;
  }

  &.secondary {
    left: 100px;
    border-left: 1px dashed #777;
  }

  &.tertiary {
    right: 0;
    width: 100px;
    left: inherit;
    background: none;
    background: rgba(0, 0, 0, 0.2);
  }

  &::-webkit-scrollbar {
    width: 0 !important;
    height: 0 !important;
  }

  @media all and (orientation: portrait) {
    left: 0;
    right: 0;
    height: 100px;
    width: inherit;
    overflow-x: scroll;
    overflow-y: hidden;
    vertical-align: top;
    white-space: nowrap;
    text-align: left;

    &.primary {
      top: 0;
    }

    &.secondary {
      top: 100px;
      left: 0;
      border: none;
      border-top: 1px dashed #777;
    }

    &.tertiary {
      top: inherit;
      bottom: 0;
      left: 0;
      width: inherit;
      height: 100px;
    }
  }
`;

const LogoArea = styled.div`
  margin-top: 10pt;
  display: inline-block;

  & > h1 {
    font-size: 14pt;
    margin-top: 0.2em;
    margin-bottom: 0.3em;
  }

  @media all and (orientation: portrait) {
    margin: 0;
    display: inline-block;
    width: 92px;
    height: 90px;
    vertical-align: top;
    text-align: center;

    & > h1 {
      font-size: 12pt;
      padding: 0;
    }
  }
`;

const AppLogo = styled.div`
  background-color: #ff9999;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  text-align: center;
  display: inline-block;

  @media all and (orientation: portrait) {
    margin-top: 0.3em;
    margin-bottom: -0.1em;
    width: 70px;
    height: 70px;
  }
`;

const LogoImage = styled.img`
  height: 60px;
  margin-top: 10px;

  @media all and (orientation: portrait) {
    width: 50px;
    height: 50px;
  }
`;

const Container = styled.div``;
