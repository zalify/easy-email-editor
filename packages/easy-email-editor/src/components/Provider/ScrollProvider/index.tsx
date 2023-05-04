import React, { useRef } from 'react';

export interface HoverIdxState {
  hoverIdx: string;
}

export const ScrollContext = React.createContext<{
  scrollHeight: React.MutableRefObject<number>;
  viewElementRef: React.MutableRefObject<null | { selector: string; top: number }>;
}>({
  scrollHeight: { current: 0 },
  viewElementRef: { current: null },
});

export const ScrollProvider: React.FC<{ children?: React.ReactNode }> = props => {
  const scrollHeight = useRef(0);
  const viewElementRef = useRef<null | { selector: string; top: number }>(null);

  return (
    <ScrollContext.Provider
      value={{
        scrollHeight,
        viewElementRef,
      }}
    >
      {props.children}
    </ScrollContext.Provider>
  );
};
