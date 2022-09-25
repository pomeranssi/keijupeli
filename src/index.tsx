import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { assertDefined } from 'shared/util';

import { App } from './client/layout/App';

const container = document.getElementById('root');
assertDefined(container);
const root = createRoot(container);

root.render(<App />);
