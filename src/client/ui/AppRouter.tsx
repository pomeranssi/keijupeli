import * as React from 'react';
import {
  createBrowserRouter,
  createHashRouter,
  RouteObject,
  RouterProvider,
} from 'react-router-dom';
import styled from 'styled-components';

import { isStandaloneApp } from 'client/util/appState';

import { MainPage } from './layout/MainPage';
import { LoginPage } from './login/LoginPage';

const ErrorContainer = styled.div`
  padding: 16px;
`;

const Error = <ErrorContainer>Nyt kävi köpelösti</ErrorContainer>;

const routes: RouteObject[] = [
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
];

const router = isStandaloneApp()
  ? createHashRouter(routes)
  : createBrowserRouter(routes);

export const AppRouter: React.FC = () => <RouterProvider router={router} />;
