import React, { useMemo, useState } from 'react';

export interface BlocksState {
  focusIdx: string;
  hoverIdx: string;
}

export const BlocksContext = React.createContext<{
  blocksState: BlocksState;
  setBlocksState: React.Dispatch<React.SetStateAction<BlocksState>>;
}>({
  blocksState: {
    focusIdx: '',
    hoverIdx: ''
  },
  setBlocksState: () => { }
});

export const BlocksProvider: React.FC<{}> = (props) => {
  const [blocksState, setBlocksState] = useState<BlocksState>({
    focusIdx: '',
    hoverIdx: ''
  });

  const value = useMemo(() => {
    return {
      blocksState,
      setBlocksState
    };
  }, [blocksState]);

  return (
    <BlocksContext.Provider value={value}>
      {props.children}
    </BlocksContext.Provider>
  );
};
