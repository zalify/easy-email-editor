import React, { useState } from 'react';

export interface HoverIdxState {
  hoverIdx: string;
}

export const HoverIdxContext = React.createContext<{
  hoverIdx: string;
  setHoverIdx: React.Dispatch<React.SetStateAction<string>>;
}>({
  hoverIdx: '',
  setHoverIdx: () => { }
});

export const HoverIdxProvider: React.FC<{}> = (props) => {
  const [hoverIdx, setHoverIdx] = useState('');

  return (
    <HoverIdxContext.Provider value={{
      hoverIdx,
      setHoverIdx
    }}
    >
      { props.children}
    </HoverIdxContext.Provider>
  );
};
