import React, { useMemo, useState } from 'react';

export interface HoverIdxState {
  hoverIdx: string;
}

export const HoverIdxContext = React.createContext<{
  hoverIdx: string;
  setHoverIdx: React.Dispatch<React.SetStateAction<string>>;
}>({
  hoverIdx: '',
  setHoverIdx: () => {},
});

export const HoverIdxProvider: React.FC<{}> = (props) => {
  const [hoverIdx, setHoverIdx] = useState('');

  const children = useMemo(() => props.children, [props.children]);
  return (
    <HoverIdxContext.Provider
      value={{
        hoverIdx,
        setHoverIdx,
      }}
    >
      {children}
    </HoverIdxContext.Provider>
  );
};
