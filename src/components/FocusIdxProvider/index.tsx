import { getPageIdx } from '@/utils/block';
import React, { useState } from 'react';

export const FocusIdxContext = React.createContext<{
  focusIdx: string;
  setFocusIdx: React.Dispatch<React.SetStateAction<string>>;
}>({
  focusIdx: getPageIdx(),
  setFocusIdx: () => {},
});

export const FocusIdxProvider: React.FC<{}> = (props) => {
  const [focusIdx, setFocusIdx] = useState(getPageIdx());

  return (
    <FocusIdxContext.Provider
      value={{
        focusIdx,
        setFocusIdx,
      }}
    >
      {props.children}
    </FocusIdxContext.Provider>
  );
};
