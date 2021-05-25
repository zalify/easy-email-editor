import { getPageIdx } from '@/utils/block';
import React, { useMemo, useState } from 'react';

export const BlocksContext = React.createContext<{
  focusIdx: string;
  setFocusIdx: React.Dispatch<React.SetStateAction<string>>;
  dragEnabled: boolean;
  setDragEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  focusIdx: getPageIdx(),
  setFocusIdx: () => { },
  dragEnabled: false,
  setDragEnabled: () => { },
  collapsed: false,
  setCollapsed: () => { }
});

export const BlocksProvider: React.FC<{}> = (props) => {
  const [focusIdx, setFocusIdx] = useState(getPageIdx());
  const [dragEnabled, setDragEnabled] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const children = useMemo(() => {
    return props.children;
  }, [props.children]);

  return (
    <BlocksContext.Provider
      value={{
        focusIdx,
        setFocusIdx,
        dragEnabled,
        setDragEnabled,
        collapsed,
        setCollapsed
      }}
    >
      {children}
    </BlocksContext.Provider>
  );
};
