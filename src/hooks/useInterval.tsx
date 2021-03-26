import { useEffect, useRef } from 'react';

export function useInterval(fn: Function, delay: number) {
  const fnRef = useRef<Function>(fn);

  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (fnRef.current) {
        fnRef.current();
      }
    }, delay);

    return () => {
      clearInterval(timer);
    };
  }, [delay]);
}
