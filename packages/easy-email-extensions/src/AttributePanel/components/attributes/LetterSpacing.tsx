import React, { useMemo } from 'react';
import { TextField } from '../../../components/Form';
import { useFocusIdx, Stack } from 'easy-email-editor';

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
