import { useRef, useEffect } from 'react';

export function useRefState<T>(state: T) {
  const ref = useRef(state);

  ref.current = state;

  return ref;
}
