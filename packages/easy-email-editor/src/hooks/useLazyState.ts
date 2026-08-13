import { debounce } from 'lodash';
import { useMemo, useState, useEffect } from 'react';

export function useLazyState<T>(state: T, debounceTime: number) {
  const [lazyState, setLazyState] = useState<T>(state);

  const setDebounceLazyState = useMemo(
    () => debounce((s: T) => {
      setLazyState(s);
    }, debounceTime),
    [debounceTime],
  );

  useEffect(() => {
    setDebounceLazyState(state);
    return () => {
      setDebounceLazyState.cancel();
    };
  }, [setDebounceLazyState, state]);

  return lazyState;
}
