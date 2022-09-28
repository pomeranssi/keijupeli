import * as React from 'react';

import { initializeCategories } from 'client/game/dataInit';
import { useGameState } from 'client/game/state';

export const AppDataLoader: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const session = useGameState(s => s.session);
  const sessionId = session?.id;
  React.useEffect(() => {
    void initializeCategories(sessionId);
  }, [sessionId]);
  return <>{children}</>;
};
