import * as React from 'react';
import styled from 'styled-components';

import { useGameState } from 'client/game/state';

import { colors } from '../colors';

export const NotificationBar: React.FC = () => {
  const [message, dismiss] = useGameState(s => [s.message, s.clearMessage]);
  if (!message) return null;
  return (
    <Container>
      <MessageArea className={message.type}>
        <CloseIcon onClick={dismiss}>X</CloseIcon>
        {message.message}
      </MessageArea>
    </Container>
  );
};

const MessageArea = styled.div`
  position: relative;
  background-color: ${colors.gray[700]};
  min-width: 380px;
  max-width: 960px;
  padding: 32px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  pointer-events: auto;

  &.error {
    background-color: ${colors.primary[900]};
    color: white;
  }

  &.notification {
    background-color: ${colors.complementary[900]};
    color: white;
  }
`;

const CloseIcon = styled.div`
  position: absolute;
  right: 8px;
  top: 8px;
  background-color: ${colors.gray[900]};
  width: 32px;
  height: 32px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  cursor: pointer;

  &:hover {
    background-color: ${colors.gray[800]};
  }
`;

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  pointer-events: none;
`;
