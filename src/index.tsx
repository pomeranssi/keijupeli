import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { assertDefined } from 'shared/util';
import { AppDataLoader } from 'client/ui/AppDataLoader';
import { AppRouter } from 'client/ui/AppRouter';

const container = document.getElementById('root');
assertDefined(container);
const root = createRoot(container);

root.render(
  <AppDataLoader>
    <AppRouter />
  </AppDataLoader>
);
