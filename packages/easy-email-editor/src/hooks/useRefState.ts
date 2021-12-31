import { useRef, useEffect } from 'react';

export function useRefState<T>(state: T) {
  const ref = useRef(state);

  useEffect(() => {
    ref.current = state;
  }, [state]);

  return ref;
}
