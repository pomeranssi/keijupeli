import * as React from 'react';
import styled from 'styled-components';

import { getImagePath } from '../images';

export type IconProps = {
  icon: string;
  title?: string;
  className?: string;
  onClick?: (e: React.SyntheticEvent) => void;
};

export const Icon: React.FC<IconProps> = ({ icon, ...rest }) => (
  <IconImage src={getImagePath(icon)} {...rest} />
);

export const IconImage = styled.img`
  width: 64px;
  height: 64px;
  margin: 0;
  padding: 0;
`;
