import { Stack } from '@/components/UI/Stack';
import { TextStyle } from '@/components/UI/TextStyle';
import { useBlock } from '@/hooks/useBlock';
import { findBlockByType } from '@/utils/block';
import React from 'react';

export interface AttributesPanel {
  padding?: string | number;
}
export const AttributesPanel: React.FC<AttributesPanel> = (props) => {
  const { focusBlock } = useBlock();

  const block = focusBlock && findBlockByType(focusBlock.type);

  if (!focusBlock || !block) return null;

  return (
    <div style={{ padding: props.padding || '0px 20px' }}>
      <Stack vertical>
        <TextStyle variation='strong' size='large'>
          {block.name} attributes
        </TextStyle>
        {props.children}
      </Stack>
    </div>
  );
};
