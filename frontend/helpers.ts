import { useEffect } from 'react';

export const useKeyPress = (keys: string[], action: () => void) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // event.preventDefault();
      if (keys.includes(event.key)) {
        action();
      }
    };

    // Attach event listener
    window.addEventListener('keydown', handleKeyPress);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [keys, action]);
};