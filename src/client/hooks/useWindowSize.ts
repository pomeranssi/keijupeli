import * as React from 'react';

import { Size } from '../util/size';

/**
 * Keeps track of the given element size in the DOM, updating it if the window
 * size is changed.
 */
export function useWindowSize(): Size {
  const [size, setSize] = React.useState(
    new Size(window.innerWidth, window.innerHeight)
  );

  // Listen for window resize events
  React.useEffect(() => {
    const listener = () => {
      setSize(new Size(window.innerWidth, window.innerHeight));
    };
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [setSize]);

  return size;
}
