import { useCallback, useContext } from 'react';
import { HoverIdxContext } from '@/components/Provider/HoverIdxProvider';
import { debounce } from 'lodash';

export function useHoverIdx() {
  const { hoverIdx, setHoverIdx, setIsDragging, isDragging } = useContext(HoverIdxContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setHoverIdxDebounce = useCallback(debounce(setHoverIdx), [setHoverIdx]);

  return {
    hoverIdx,
    setHoverIdx: setHoverIdxDebounce,
    isDragging,
    setIsDragging,

  };
}
