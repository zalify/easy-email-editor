import React from 'react';
import { Stack } from '@/components/UI/Stack';
import { TextField } from '@/components/core/Form';
import { useFocusIdx } from '@/hooks/useFocusIdx';

export function Panel() {
  const { focusIdx } = useFocusIdx();

  return (
    <Stack>
      <TextField
        label='content'
        name={`${focusIdx}.data.value.content`}
        inline
      />
    </Stack>
  );
}
