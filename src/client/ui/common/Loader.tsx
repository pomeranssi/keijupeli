import * as React from 'react';
import styled from 'styled-components';

type LoaderProps = { size?: string; color?: string };

export const Loader: React.FC<LoaderProps> = ({ size, color }) => (
  <Container>
    <Spinner size={size ?? '10px'} color={color ?? '#0dc5c1'} />
  </Container>
);

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #222;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

// Spinner CSS taken from https://projects.lukehaas.me/css-loaders/

type SpinnerProps = { size: string; color: string };
const Spinner = styled.div`
  font-size: ${({ size }: SpinnerProps) => size};
  margin: 50px auto;
  text-indent: -9999em;
  width: 11em;
  height: 11em;
  border-radius: 50%;
  background: ${({ color }: SpinnerProps) => color};
  background: linear-gradient(
    to right,
    ${({ color }: SpinnerProps) => color} 10%,
    rgba(255, 255, 255, 0) 42%
  );
  position: relative;
  animation: load3 1.5s infinite linear;
  transform: translateZ(0);

  &:before {
    width: 50%;
    height: 50%;
    background: ${({ color }: SpinnerProps) => color};
    border-radius: 100% 0 0 0;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
  }

  &:after {
    background: #222;
    width: 75%;
    height: 75%;
    border-radius: 50%;
    content: '';
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  @-webkit-keyframes load3 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes load3 {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
