import { useContext } from 'react';
import { HoverIdxContext } from '@/components/HoverIdxProvider';

export function useHoverIdx() {
  const { hoverIdx, setHoverIdx } = useContext(HoverIdxContext);
  return {
    hoverIdx,
    setHoverIdx
  };
}