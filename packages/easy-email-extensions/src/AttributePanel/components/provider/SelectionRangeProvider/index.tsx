/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useEffect, useMemo, useState } from 'react';
import { RICH_TEXT_TOOL_BAR } from '@extensions/constants';
import { getIframeDocument } from '@extensions/utils/getIframeDocument';

export const SelectionRangeContext = React.createContext<{
  selectionRange: Range | null;
  setSelectionRange: React.Dispatch<React.SetStateAction<Range | null>>;
}>({
  selectionRange: null,
  setSelectionRange: () => {
  },
});

export const SelectionRangeProvider: React.FC<{
  children: React.ReactNode | React.ReactElement;
}> = props => {
  const [selectionRange, setSelectionRange] = useState<Range | null>(null);

  useEffect(() => {
    const onSelectionChange = () => {
      try {
        const range = getIframeDocument()?.getSelection()?.getRangeAt(0);
        if (range) {
          const toolbar = getIframeDocument()?.getElementById(RICH_TEXT_TOOL_BAR);
          if (toolbar?.contains(range.commonAncestorContainer)) return;

          setSelectionRange(range);
        }
      } catch (error) {
      }
    };

    getIframeDocument()?.addEventListener('selectionchange', onSelectionChange);

    return () => {
      getIframeDocument()?.removeEventListener('selectionchange', onSelectionChange);
    };
  }, []);

  const value = useMemo(() => {
    return {
      selectionRange,
      setSelectionRange,
    };
  }, [selectionRange]);

  return useMemo(() => {
    return (
      <SelectionRangeContext.Provider value={value}>
        {props.children}
      </SelectionRangeContext.Provider>
    );
  }, [props.children, value]);
};
