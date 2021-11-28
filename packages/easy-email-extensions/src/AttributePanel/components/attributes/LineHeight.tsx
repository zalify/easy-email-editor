import React, { useMemo } from 'react';
import { TextField } from '../../../components/Form';
import { useFocusIdx, Stack } from 'easy-email-editor';

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
