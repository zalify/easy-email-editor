import { Tabs, TabsProps } from '@arco-design/web-react';
import { classnames } from '@extensions/utils/classnames';
import React, { useState } from 'react';
import styles from './index.module.scss';

const { TabPane } = Tabs;

export interface EditTabProps<T extends any = any>
  extends Omit<TabsProps, 'onChange'> {
  value: Array<T>;
  renderItem: (item: T, index: number) => React.ReactNode;
  onChange: (vals: Array<T>) => any;
  additionItem: T;
  label: string;
}
export function EditTab<T extends any = any>(props: EditTabProps<T>) {
  const { value, additionItem } = props;
  const [activeTab, setActiveTab] = useState('0');

  const onAddTab = () => {
    setActiveTab((value.length).toString());
    props.onChange([...value, additionItem]);
  };

  const onDeleteTab = (index: string) => {
    if (index < activeTab) {
      setActiveTab((Number(activeTab) - 1).toString());
    }
    if (index === activeTab) {
      setActiveTab(Number(index) > 0 ? `${Number(index) - 1}` : '0');
    }
    props.onChange(value.filter((_, vIndex) => Number(index) !== vIndex));
  };

  return (
    <Tabs
      destroyOnHide
      className={classnames(styles.editTab)}
      style={{ border: 'none' }}
      type='card'
      activeTab={activeTab}
      tabPosition={props.tabPosition}
      editable
      onAddTab={onAddTab}
      onDeleteTab={onDeleteTab}
      onChange={setActiveTab}
    >
      {(Array.isArray(value) ? value : []).map((item, index) => (
        <TabPane
          style={{ paddingLeft: 12 }}
          title={`${props.label || t('Tab')} ${index + 1}`}
          key={index}
        >
          {props.renderItem(item, index)}
        </TabPane>
      ))}
    </Tabs>
  );
}
