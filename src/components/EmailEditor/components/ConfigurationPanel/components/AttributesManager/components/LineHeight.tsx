import React, { useMemo } from 'react';
import { TextField } from '@/components/core/Form';
import { Stack } from '@/components/UI/Stack';
import { useFocusIdx } from '@/hooks/useFocusIdx';

export function LineHeight() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <Stack wrap={false}>
        <Stack.Item fill>
          <TextField
            label='Line height'
            name={`${focusIdx}.attributes.line-height`}
            quickchange
          />
        </Stack.Item>
      </Stack>
    );
  }, [focusIdx]);
}
