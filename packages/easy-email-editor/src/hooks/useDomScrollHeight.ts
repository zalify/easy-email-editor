import { useContext } from 'react';
import { ScrollContext } from './../components/Provider/ScrollProvider/index';

export function useDomScrollHeight() {
  const { scrollHeight } = useContext(ScrollContext);
  return {
    scrollHeight,
  };
}
