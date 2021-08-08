import { useCallback, useContext } from 'react';
import { SelectionRangeContext } from '@/components/Provider/SelectionRangeProvider';
import { getShadowRoot } from '@/utils/findBlockNodeByIdx';

export function useSelectionRange() {
  const { selectionRange, setSelectionRange } = useContext(SelectionRangeContext);

  const restoreRange = useCallback((range: Range) => {

    const selection = getShadowRoot().getSelection()!;
    selection.removeAllRanges();
    const newRange = document.createRange();
    newRange.setStart(range.startContainer, range.startOffset);
    newRange.setEnd(range.endContainer, range.endOffset);

    selection.addRange(newRange);
  }, []);

  return {
    selectionRange,
    setSelectionRange,
    restoreRange
  };
}
