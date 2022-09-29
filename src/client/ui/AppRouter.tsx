import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import styled from 'styled-components';

import { MainPage } from './layout/MainPage';
import { LoginPage } from './login/LoginPage';

const ErrorContainer = styled.div`
  padding: 16px;
`;

const Error = <ErrorContainer>Nyt kävi köpelösti</ErrorContainer>;

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: Error,
  },
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: Error,
  },
]);

export const AppRouter: React.FC = () => <RouterProvider router={router} />;
