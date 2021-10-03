import React, { useMemo } from 'react';
import { TextField } from '@/components/core/Form';
import { Stack } from '@/components/UI/Stack';
import { useFocusIdx } from '@/hooks/useFocusIdx';

export function LetterSpacing() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <Stack wrap={false}>
        <Stack.Item fill>
          <TextField
            label='Letter spacing'
            name={`${focusIdx}.attributes.letter-spacing`}
          />
        </Stack.Item>
      </Stack>
    );
  }, [focusIdx]);
}
