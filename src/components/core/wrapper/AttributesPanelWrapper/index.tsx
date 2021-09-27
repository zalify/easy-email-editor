import { Stack } from '@/components/UI/Stack';
import { TextStyle } from '@/components/UI/TextStyle';
import { useBlock } from '@/hooks/useBlock';
import { findBlockByType } from '@/utils/block';
import { Card } from 'antd';
import React from 'react';

export interface AttributesPanelWrapper {
  style?: React.CSSProperties;
}
export const AttributesPanelWrapper: React.FC<AttributesPanelWrapper> = (
  props
) => {
  const { focusBlock } = useBlock();

  const block = focusBlock && findBlockByType(focusBlock.type);

  if (!focusBlock || !block) return null;

  return (
    <Card title={`${block.name} attributes`} bodyStyle={{ padding: 0 }}>
      <div style={{ padding: '0px', ...props.style }}>{props.children}</div>
    </Card>
  );
};
