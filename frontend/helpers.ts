import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

export const useKeyPress = (keys: string[], callback: (event: KeyboardEvent) => void, node: any = null) => {
  const callbackRef = useRef(callback);

  useLayoutEffect(() => {
    callbackRef.current = callback;
  });

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const ctrlPressed = event.ctrlKey || event.metaKey;
      const enterPressed = keys.includes('Enter') && event.key === 'Enter';

      // Check for Ctrl + Enter
      if (ctrlPressed && enterPressed) {
        callbackRef.current(event);
      }
    },
    [keys]
  );

  useEffect(() => {
    const targetNode = node ?? document;
    targetNode.addEventListener('keydown', handleKeyPress);

    return () => {
      targetNode.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress, node]);
};
