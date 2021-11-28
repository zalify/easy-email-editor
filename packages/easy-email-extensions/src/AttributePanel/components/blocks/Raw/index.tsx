import React from 'react';
import { Stack, useFocusIdx } from 'easy-email-editor';
import { TextField } from '@extensions/components/Form';

export function Raw() {
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
