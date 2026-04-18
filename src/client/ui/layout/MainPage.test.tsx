import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { it } from 'vitest';

import { MainPage } from './MainPage';

it('renders without crashing', () => {
  render(
    <MemoryRouter>
      <MainPage />
    </MemoryRouter>
  );
});
