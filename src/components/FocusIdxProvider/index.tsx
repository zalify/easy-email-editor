import React, { useState } from 'react';

export const FocusIdxContext = React.createContext<{
  focusIdx: string;
  setFocusIdx: React.Dispatch<React.SetStateAction<string>>;
}>({
  focusIdx: '',
  setFocusIdx: () => { }
});

export const FocusIdxProvider: React.FC<{}> = (props) => {
  const [focusIdx, setFocusIdx] = useState('');

  return (
    <FocusIdxContext.Provider value={{
      focusIdx,
      setFocusIdx
    }}
    >
      {props.children}
    </FocusIdxContext.Provider>
  );
};
