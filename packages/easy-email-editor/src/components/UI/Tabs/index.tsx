import { classnames } from '@/utils/classnames';
import React, { useEffect, useState } from 'react';
import { Button } from '../Button';
import { Stack } from '../Stack';
import styles from './index.module.scss';

export interface TabsProps {
  tabBarExtraContent?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  onChange?: (id: string) => void;
  defaultActiveTab?: string;
}
export interface TabPaneProps {
  tab: React.ReactNode;
  key: string;
  style?: React.CSSProperties;
  className?: string;
}

const Tabs: React.FC<TabsProps> = (props) => {
  const [activeTab, setActiveTab] = useState<string>(props.defaultActiveTab || '');

  const onClick = (id: string) => {
    setActiveTab(id);
    props.onChange?.(id);
  };

  return (
    <div style={props.style} className={props.className}>
      <div className={styles.tabWrapper}>
        <Stack distribution='equalSpacing' alignment='center'>
          <Stack alignment='center'>
            {React.Children.map(
              props.children as any,
              (item: { props: { tab: TabPaneProps; }; key: string; }, index) => {
                return (
                  <div
                    key={item.key}
                    onClick={() => onClick(item.key)}
                    className={classnames(
                      styles.tabItem,
                      !activeTab && index === 0 && styles.tabActiveItem,
                      activeTab === item.key && styles.tabActiveItem
                    )}
                  >
                    <Button noBorder>{item.props.tab}</Button>
                  </div>
                );
              }
            )}
          </Stack>
          {props.tabBarExtraContent}
        </Stack>
      </div>
      {React.Children.map(
        props.children as any,
        (item: { props: { tab: TabPaneProps; }; key: string; }, index) => {
          const visible = (!activeTab && index === 0) || item.key === activeTab;
          return (
            <div style={{ display: visible ? undefined : 'none', height: `calc(100% - 50px)` }}>{item}</div>
          );
        }
      )}
    </div>
  );
};

const TabPane: React.FC<TabPaneProps> = (props) => {
  return <>{props.children}</>;
};

export { Tabs, TabPane };
