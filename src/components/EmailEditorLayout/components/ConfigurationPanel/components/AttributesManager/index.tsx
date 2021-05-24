import { Stack } from '@/components/UI/Stack';
import { TextStyle } from '@/components/UI/TextStyle';
import { useBlock } from '@/hooks/useBlock';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { findBlockByType, getValueByIdx } from '@/utils/block';
import { Card } from 'antd';
import React from 'react';

export function AttributesManager() {
  const { values } = useBlock();
  const { focusIdx } = useFocusIdx();

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