import { render } from '@testing-library/react';
import * as React from 'react';

import { App } from './App';

it('renders without crashing', () => {
  render(<App />);
});
