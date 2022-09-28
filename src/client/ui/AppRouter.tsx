import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { MainPage } from './layout/MainPage';
import { LoginPage } from './login/LoginPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
]);

export const AppRouter: React.FC = () => <RouterProvider router={router} />;
