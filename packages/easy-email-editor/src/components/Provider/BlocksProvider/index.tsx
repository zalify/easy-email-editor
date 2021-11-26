import { getPageIdx } from 'easy-email-core';
import React, { useState } from 'react';

export enum ActiveTabKeys {
  EDIT = 'EDIT',
  MOBILE = 'MOBILE',
  PC = 'PC',
}

export const BlocksContext = React.createContext<{
  initialized: boolean;
  setInitialized: React.Dispatch<React.SetStateAction<boolean>>;
  focusIdx: string;
  setFocusIdx: React.Dispatch<React.SetStateAction<string>>;
  dragEnabled: boolean;
  setDragEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  activeTab: ActiveTabKeys;
  setActiveTab: React.Dispatch<React.SetStateAction<ActiveTabKeys>>;
}>({
  initialized: false,
  setInitialized: () => {},
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
  const [initialized, setInitialized] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [activeTab, setActiveTab] = useState(ActiveTabKeys.EDIT);

  return (
    <BlocksContext.Provider
      value={{
        initialized,
        setInitialized,
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
