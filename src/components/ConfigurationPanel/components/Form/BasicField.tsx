import React from 'react';
import { TextField } from '@/components/core/Form';
import { Stack } from '@/components/Stack';
import { useBlock } from '@/hooks/useBlock';

export function BasicField() {
  const { focusIdx } = useBlock();

  return (
    <Stack vertical>
      <TextField label='表单列名' quickchange name={`${focusIdx}.data.value.name`} inline />
      <TextField label='标签 ' quickchange name={`${focusIdx}.data.value.label`} inline />
    </Stack>
  );
}
