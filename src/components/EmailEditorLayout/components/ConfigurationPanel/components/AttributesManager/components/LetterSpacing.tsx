import React, { useMemo } from 'react';
import { TextField } from '@/components/core/Form';
import { Stack } from '@/components/Stack';
import { useBlock } from '@/hooks/useBlock';

export function LetterSpacing() {
  const { focusIdx } = useBlock();

  return useMemo(() => {
    return (
      <Stack wrap={false}>
        <Stack.Item fill>
          <TextField
            label='Letter spacing'
            name={`${focusIdx}.attributes.letter-spacing`}
            inline
            quickchange
          />
        </Stack.Item>
      </Stack>
    );
  }, [focusIdx]);
}
