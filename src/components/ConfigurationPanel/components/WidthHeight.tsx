import React, { useMemo } from 'react';
import { TextField } from '@/components/core/Form';
import { Stack } from '@/components/Stack';
import { useBlock } from '@/hooks/useBlock';

export function WidthHeight() {
  const { focusIdx } = useBlock();

  return useMemo(() => {
    return (
      <Stack wrap={false}>
        <Stack.Item fill>
          <TextField
            label='宽'
            name={`${focusIdx}.style.width`}
            inline
            quickchange
          />
        </Stack.Item>
        <Stack.Item fill>
          <TextField
            label='高'
            name={`${focusIdx}.style.height`}
            inline
            quickchange
          />
        </Stack.Item>
      </Stack>
    );
  }, [focusIdx]);
}
