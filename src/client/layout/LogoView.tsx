import * as React from 'react';
import styled from 'styled-components';

import { getImagePath } from './Images';

export const LogoView: React.FC = () => (
  <LogoArea>
    <AppLogo>
      <LogoImage
        src={getImagePath('fairy.svg')}
        alt="Keijupeli"
        title="Keijupeli"
      />
    </AppLogo>
    <h1>Keijupeli</h1>
  </LogoArea>
);

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
