import React, { useMemo, useState } from 'react';

export interface HoverIdxState {
  hoverIdx: string;
}

export const HoverIdxContext = React.createContext<{
  hoverIdx: string;
  isDragging: boolean;
  setHoverIdx: React.Dispatch<React.SetStateAction<string>>;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  hoverIdx: '',
  isDragging: false,
  setHoverIdx: () => { },
  setIsDragging: () => { },
});

export const HoverIdxProvider: React.FC<{}> = (props) => {
  const [hoverIdx, setHoverIdx] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  return (
    <HoverIdxContext.Provider
      value={{
        hoverIdx,
        setHoverIdx,
        isDragging,
        setIsDragging,
      }}
    >
      {props.children}
    </HoverIdxContext.Provider>
  );
};
