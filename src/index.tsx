import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './client/game/GameState';
import { App } from './client/layout/App';
import { assertDefined } from './client/util/objects';

const container = document.getElementById('root');
assertDefined(container);
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
