import { render } from '@testing-library/react';
import * as React from 'react';

import { MainPage } from './MainPage';

it('renders without crashing', () => {
  render(<MainPage />);
});
