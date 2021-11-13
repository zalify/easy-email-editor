/* eslint-disable @typescript-eslint/no-unsafe-call */
import { getShadowRoot } from '@/utils/findBlockNodeByIdx';
import React, { useEffect, useState } from 'react';

export const SelectionRangeContext = React.createContext<{
  selectionRange: Range | null;
  setSelectionRange: React.Dispatch<React.SetStateAction<Range | null>>;
}>({
  selectionRange: null,
  setSelectionRange: () => { },
});

export const SelectionRangeProvider: React.FC<{}> = (props) => {
  const [selectionRange, setSelectionRange] = useState<Range | null>(null);

  useEffect(() => {
    const onSelectionChange = () => {
      try {
        const range = (getShadowRoot() as any).getSelection().getRangeAt(0);
        if (range) {
          setSelectionRange(range);
        }
      } catch (error) { }
    };

    document.addEventListener('selectionchange', onSelectionChange);

    return () => {
      document.removeEventListener('selectionchange', onSelectionChange);
    };
  }, []);

  return (
    <SelectionRangeContext.Provider
      value={{
        selectionRange,
        setSelectionRange
      }}
    >
      {props.children}
    </SelectionRangeContext.Provider>
  );
};
