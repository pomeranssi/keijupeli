import * as React from "react";
import styled from "styled-components";

import CategoryList from "../game/CategoryList";
import ItemList from "../game/ItemList";
import GameArea from "./GameArea";
import { LogoView } from "./LogoView";
import { Toolbar } from "./Toolbar";
import { UtilityBar } from "./UtilityBar";

export const App: React.FC = () => (
  <Container>
    <AppMain>
      <GameArea />
      <br />
    </AppMain>
    <Toolbar className="primary">
      <LogoView />
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

const Container = styled.div``;
