import { render } from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';

import { store } from '../game/GameState';
import { App } from './App';

it('renders without crashing', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
