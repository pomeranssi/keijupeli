import styled from 'styled-components';

import { almostBlack } from '../colors';

export const Toolbar = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100px;
  overflow: auto;
  overflow-x: hidden;
  background-color: ${almostBlack};
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
