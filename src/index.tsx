import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { assertDefined } from 'shared/util';

import { store } from './client/game/GameState';
import { App } from './client/layout/App';

const container = document.getElementById('root');
assertDefined(container);
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
