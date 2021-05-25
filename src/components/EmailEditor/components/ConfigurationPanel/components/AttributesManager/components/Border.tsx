import React, { useMemo } from 'react';
import { TextField } from '@/components/core/Form';
import { Stack } from '@/components/UI/Stack';
import { useFocusIdx } from '@/hooks/useFocusIdx';

export function Border() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <Stack vertical>
        <TextField
          label='Border'
          name={`${focusIdx}.attributes.border`}
          inline
          quickchange
        />
        <TextField
          label='Border radius'
          name={`${focusIdx}.attributes.border-radius`}
          inline
          quickchange
        />
      </Stack>
    );
  }, [focusIdx]);
}
