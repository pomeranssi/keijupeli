import * as React from 'react';
import styled from 'styled-components';

import { colors } from '../colors';
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
    background-color: ${colors.analogous1[200]}cc;
  }
  &.login,
  &.logout {
    background-color: ${colors.complementary[200]}cc;
  }
  &.randomize {
    background-color: ${colors.analogous2[200]}cc;
  }
  &.restrictions {
    background-color: ${colors.analogous1[400]}cc;
  }
  &.delete {
    background-color: ${colors.gray[800]}cc;
    & > .Icon {
      filter: grayscale(1);
    }
  }
  &.delete.allow-delete {
    background-color: ${colors.primary[600]}cc;
    & > .Icon {
      filter: initial;
    }
  }

  &.link {
    background-color: ${colors.gray[800]}cc;
    & > .Icon {
      filter: grayscale(1);
    }
  }
  &.link.linking {
    background-color: ${colors.complementary[200]}cc;
    & > .Icon {
      filter: initial;
    }
  }
  @media all and (orientation: portrait) {
    text-align: center;
    margin-bottom: 0;
    margin-right: 10px;
  }
`;
