import { Stack } from '@/components/Stack';
import { TextStyle } from '@/components/TextStyle';
import { useBlock } from '@/hooks/useBlock';
import { findBlockByType, getValueByIdx } from '@/utils/block';
import { Card } from 'antd';
import React from 'react';

export function AttributesManager() {
  const { focusIdx, values } = useBlock();
  const value = getValueByIdx(values, focusIdx);

  const block = value && findBlockByType(value.type) as any;

  if (!block || !value) return null;
  return (
    <Card
      bodyStyle={{ paddingTop: 0, backgroundColor: '#fff' }}
      title={(
        <TextStyle variation='strong' size='large'>
          {block.name} attributes
        </TextStyle>
      )}
    >
      <Stack.Item fill>
        <Stack vertical>
          <Stack.Item fill> {<block.Panel />}</Stack.Item>
          <Stack.Item />
          <Stack.Item />
          <Stack.Item />
          <Stack.Item />
        </Stack>
      </Stack.Item>
    </Card>
  );
}