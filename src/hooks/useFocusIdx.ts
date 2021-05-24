import { FocusIdxContext } from '@/components/FocusIdxProvider';
import { useContext } from 'react';

export function useFocusIdx() {
  const { focusIdx, setFocusIdx } = useContext(FocusIdxContext);
  return {
    focusIdx, setFocusIdx
  };
}