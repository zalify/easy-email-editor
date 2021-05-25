import { BlocksContext } from '@/components/Provider/BlocksProvider';
import { useContext } from 'react';

export function useFocusIdx() {
  const { focusIdx, setFocusIdx } = useContext(BlocksContext);
  return {
    focusIdx,
    setFocusIdx,
  };
}
