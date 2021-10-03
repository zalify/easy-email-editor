import { getPageIdx } from '@/utils/block';
import React, { useState } from 'react';

export enum ActiveTabKeys {
  EDIT = 'EDIT',
  MOBILE = 'MOBILE',
  PC = 'PC',
}

export const BlocksContext = React.createContext<{
  focusIdx: string;
  setFocusIdx: React.Dispatch<React.SetStateAction<string>>;
  dragEnabled: boolean;
  setDragEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  activeTab: ActiveTabKeys;
  setActiveTab: React.Dispatch<React.SetStateAction<ActiveTabKeys>>;
}>({
  focusIdx: getPageIdx(),
  setFocusIdx: () => {},
  dragEnabled: false,
  setDragEnabled: () => {},
  collapsed: false,
  setCollapsed: () => {},
  activeTab: ActiveTabKeys.EDIT,
  setActiveTab: () => {},
});

export const BlocksProvider: React.FC<{}> = (props) => {
  const [focusIdx, setFocusIdx] = useState(getPageIdx());
  const [dragEnabled, setDragEnabled] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [activeTab, setActiveTab] = useState(ActiveTabKeys.EDIT);

  return (
    <BlocksContext.Provider
      value={{
        focusIdx,
        setFocusIdx,
        dragEnabled,
        setDragEnabled,
        collapsed,
        setCollapsed,
        activeTab,
        setActiveTab,
      }}
    >
      {props.children}
    </BlocksContext.Provider>
  );
};
