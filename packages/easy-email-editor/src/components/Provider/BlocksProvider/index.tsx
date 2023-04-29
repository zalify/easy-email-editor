import { EventManager } from '@';
import { EventType } from '@/utils/EventManager';
import { getPageIdx } from 'easy-email-core';
import { isFunction } from 'lodash';
import React, { useState, useCallback } from 'react';

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

export const BlocksProvider: React.FC<{ children?: React.ReactNode }> = props => {
  const [focusIdx, setFocusIdx] = useState(getPageIdx());
  const [dragEnabled, setDragEnabled] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [activeTab, setActiveTab] = useState(ActiveTabKeys.EDIT);

  const onChangeTab: React.Dispatch<React.SetStateAction<ActiveTabKeys>> = useCallback(
    handler => {
      if (isFunction(handler)) {
        setActiveTab(currentTab => {
          const nextTab = handler(currentTab);
          const next = EventManager.exec(EventType.ACTIVE_TAB_CHANGE, {
            currentTab,
            nextTab,
          });
          if (next) return nextTab;
          return currentTab;
        });
      }
      setActiveTab(currentTab => {
        let nextTab = handler as ActiveTabKeys;
        const next = EventManager.exec(EventType.ACTIVE_TAB_CHANGE, {
          currentTab,
          nextTab,
        });
        if (next) return nextTab;
        return currentTab;
      });
    },
    [],
  );

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
        setActiveTab: onChangeTab,
      }}
    >
      {props.children}
    </BlocksContext.Provider>
  );
};
