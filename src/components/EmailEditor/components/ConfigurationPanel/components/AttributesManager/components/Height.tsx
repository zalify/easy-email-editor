import React, { useMemo } from 'react';
import { TextField } from '@/components/core/Form';
import { Stack } from '@/components/UI/Stack';
import { useFocusIdx } from '@/hooks/useFocusIdx';

export function Height({ inline }: { inline?: boolean; }) {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <Stack wrap={false}>
        <Stack.Item fill>
          <TextField
            label='Height'
            name={`${focusIdx}.attributes.height`}
            quickchange
            inline={inline}
          />
        </Stack.Item>
      </Stack>
    );
  }, [focusIdx, inline]);
}
