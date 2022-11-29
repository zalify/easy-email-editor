import React from 'react';
export declare enum ActiveTabKeys {
    EDIT = "EDIT",
    MOBILE = "MOBILE",
    PC = "PC"
}
export declare const BlocksContext: React.Context<{
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
}>;
export declare const BlocksProvider: React.FC<{}>;
