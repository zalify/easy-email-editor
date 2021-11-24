import React, { useRef, useState } from 'react';

export interface HoverIdxState {
  hoverIdx: string;
}

export const ScrollContext = React.createContext<{
  scrollHeight: React.MutableRefObject<number>;
}>({
  scrollHeight: { current: 0 },
});

export const ScrollProvider: React.FC<{}> = (props) => {
  const scrollHeight = useRef(0);

  return (
    <ScrollContext.Provider
      value={{
        scrollHeight,
      }}
    >
      {props.children}
    </ScrollContext.Provider>
  );
};
