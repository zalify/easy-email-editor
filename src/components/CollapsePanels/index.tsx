import React, { useMemo } from 'react';
import { Collapse } from 'antd';
import { TextStyle } from '@/components/TextStyle';

interface CollapsePanelsProps {
  options: Array<{
    title: string;
    children: React.ReactNode;
    active?: boolean;
  }>;
}
export function CollapsePanels(props: CollapsePanelsProps) {
  const { options } = props;

  const defaultActiveKey = useMemo(() => options.filter(o => o.active).map(item => item.title), [options]);
  return (
    <Collapse style={{ marginLeft: -24 }} ghost bordered={false} defaultActiveKey={defaultActiveKey}>
      {
        options.map(option => (
          <Collapse.Panel header={<TextStyle variation="strong" size={'large'}>{option.title}</TextStyle>} key={option.title}>
            {option.children}
          </Collapse.Panel>
        ))
      }

    </Collapse>
  );
}
