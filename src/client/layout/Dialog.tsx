import * as React from 'react';
import styled from 'styled-components';

export const Dialog: React.FC<
  React.PropsWithChildren<{ title: string; className?: string }>
> = ({ title, children, className }) => (
  <DialogView className={className}>
    <Header>{title}</Header>
    <Content>{children}</Content>
  </DialogView>
);

const Header = styled.div`
  padding: 24px 32px;
  background-color: #8484a1;
  color: white;
  font-size: 14pt;
`;

const Content = styled.div`
  padding: 32px;
`;

const DialogView = styled.div`
  background-color: #e8e2dd;
`;
