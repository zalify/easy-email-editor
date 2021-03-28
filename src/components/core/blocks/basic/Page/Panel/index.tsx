import React from 'react';
import { useBlock } from '@/hooks/useBlock';
import { Stack } from '@/components/Stack';
import { ColorPickerField, TextField } from '@/components/core/Form';

export function Panel() {
  const { focusIdx, focusBlock } = useBlock();

  if (!focusBlock) return null;
  return (
    <Stack>
      <ColorPickerField
        label='Background color'
        name={`${focusIdx}.attribute.background-color`}
        inline
      />
      <TextField
        label="Breakpoint"
        name={`${focusIdx}.data.value.breakpoint`}
        inline
      />
    </Stack>
  );
}
