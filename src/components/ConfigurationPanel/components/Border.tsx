import React, { useMemo } from 'react';
import { TextField } from '@/components/core/Form';
import { Stack } from '@/components/Stack';
import { useBlock } from '@/hooks/useBlock';

export function Border() {
  const { focusIdx } = useBlock();

  return useMemo(() => {
    return (
      <Stack vertical>
        <TextField
          label='border'
          name={`${focusIdx}.attribute.border`}
          inline
          quickchange
        />
        <TextField
          label='border-radius'
          name={`${focusIdx}.attribute.border-radius`}
          inline
          quickchange
        />
      </Stack>
    );
  }, [focusIdx]);
}
