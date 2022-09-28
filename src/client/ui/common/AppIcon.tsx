import * as React from 'react';
import styled from 'styled-components';

import { Icon, IconProps } from './Icon';

export const AppIcon: React.FC<IconProps> = ({
  className,
  onClick,
  ...rest
}) => (
  <AppIconView className={className} onClick={onClick}>
    <Icon {...rest} />
  </AppIconView>
);

const AppIconView = styled.div`
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
  &.delete {
    background-color: rgba(125, 78, 78, 0.8);
  }
  &.delete.allow-delete {
    background-color: rgba(255, 78, 78, 0.8);
  }

  @media all and (orientation: portrait) {
    text-align: center;
    margin-bottom: 0;
    margin-right: 10px;
  }
`;
