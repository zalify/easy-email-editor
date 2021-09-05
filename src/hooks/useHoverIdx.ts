import { useCallback, useContext } from 'react';
import { HoverIdxContext } from '@/components/Provider/HoverIdxProvider';
import { debounce } from 'lodash';

export function useHoverIdx() {
  const { hoverIdx, setHoverIdx, setIsDragging, isDragging, setDirection, direction, dragPosition, setDragPosition } = useContext(HoverIdxContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setHoverIdxDebounce = useCallback(debounce(setHoverIdx), [setHoverIdx]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setDragPositionDebounce = useCallback(debounce(setDragPosition), [setDragPosition]);

  return {
    hoverIdx,
    setHoverIdx: setHoverIdxDebounce,
    isDragging,
    setIsDragging,
    direction,
    setDirection,
    dragPosition,
    setDragPosition: setDragPositionDebounce
  };
}
