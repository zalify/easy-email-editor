import React from 'react';
import './index.scss';
export interface TabsProps {
    tabBarExtraContent?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    onChange?: (id: string) => void;
    onBeforeChange?: (current: string, next: string) => boolean;
    defaultActiveTab?: string;
    activeTab?: string;
}
export interface TabPaneProps {
    tab: React.ReactNode;
    key: string;
    style?: React.CSSProperties;
    className?: string;
}
declare const Tabs: React.FC<TabsProps>;
declare const TabPane: React.FC<TabPaneProps>;
export { Tabs, TabPane };
