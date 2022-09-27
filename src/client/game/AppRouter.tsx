import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { LoginPage } from 'client/layout/LoginPage';
import { MainPage } from 'client/layout/MainPage';

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
