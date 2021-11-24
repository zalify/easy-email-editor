import { Tabs } from 'antd';
import React from 'react';
import { useCallback } from 'react';
const { TabPane } = Tabs;

export interface EditTabProps<T extends any = any> {
  value: Array<T>;
  renderItem: (item: T, index: number) => React.ReactNode;
  onChange: (vals: Array<T>) => any;
  additionItem: T;
}
export function EditTab<T extends any = any>(props: EditTabProps<T>) {
  const { value, additionItem } = props;

  const onEdit = useCallback(
    (index, action: 'add' | 'remove') => {
      if (action === 'remove') {
        props.onChange(value.filter((_, vIndex) => Number(index) !== vIndex));
      } else {
        props.onChange([...value, additionItem]);
      }
    },
    [additionItem, props, value]
  );

  return (
    <Tabs type="editable-card" onEdit={onEdit}>
      {value.map((item, index) => (
        <TabPane tab={`Tab ${index + 1}`} key={index}>
          {props.renderItem(item, index)}
        </TabPane>
      ))}
    </Tabs>
  );
}
