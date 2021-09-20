import React, { useMemo } from 'react';
import { TextField } from '@/components/core/Form';
import { Stack } from '@/components/UI/Stack';
import { useFocusIdx } from '@/hooks/useFocusIdx';

export function Border() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <Stack vertical spacing="tight">
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
