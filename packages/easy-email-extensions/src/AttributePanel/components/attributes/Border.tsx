import React, { useMemo } from 'react';
import { TextField } from '../../../components/Form';
import { Stack, useFocusIdx } from 'easy-email-editor';

export function Border() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <Stack vertical spacing='tight'>
        <TextField
          label='Border'
          name={`${focusIdx}.attributes.border`}
          inline
        />
        <TextField
          label='Border radius'
          name={`${focusIdx}.attributes.border-radius`}
          inline
        />
      </Stack>
    );
  }, [focusIdx]);
}
