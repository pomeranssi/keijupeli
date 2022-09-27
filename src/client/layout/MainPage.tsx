import * as React from 'react';

import { GameArea } from './GameArea';
import { GameLayout } from './GameLayout';

export const MainPage: React.FC = () => (
  <GameLayout>
    <GameArea />
  </GameLayout>
);
