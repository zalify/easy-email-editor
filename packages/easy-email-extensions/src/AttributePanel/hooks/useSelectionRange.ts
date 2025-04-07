/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useCallback, useContext } from 'react';
import {
  SelectionRangeContext,
} from '@extensions/AttributePanel/components/provider/SelectionRangeProvider';
import { getIframeDocument } from 'easy-email-editor';

export function useSelectionRange() {
  const { selectionRange, setSelectionRange } = useContext(
    SelectionRangeContext,
  );

  const restoreRange = useCallback((range: Range) => {
    const selection = getIframeDocument()?.getSelection();
    selection?.removeAllRanges();
    const newRange = document.createRange();
    newRange.setStart(range.startContainer, range.startOffset);
    newRange.setEnd(range.endContainer, range.endOffset);

    selection?.addRange(newRange);
  }, []);

  const setRangeByElement = useCallback(
    (element: ChildNode) => {
      const selection = getIframeDocument()?.getSelection();

      selection?.removeAllRanges();
      const newRange = document.createRange();
      newRange.selectNode(element);
      setSelectionRange(newRange);
      selection?.addRange(newRange);

    },
    [setSelectionRange],
  );

  return {
    selectionRange,
    setSelectionRange,
    restoreRange,
    setRangeByElement,
  };
}
