import React, { useMemo } from 'react';
import { TextField } from '@/components/core/Form';
import { Stack } from '@/components/UI/Stack';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { TextStyle } from '@/components/UI/TextStyle';

export function Margin() {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <Stack vertical spacing='extraTight'>
        <TextStyle size='large'>Margin</TextStyle>
        <Stack wrap={false}>
          <Stack.Item fill>
            <TextField
              label='Top'
              quickchange
              name={`${focusIdx}.attributes.marginTop`}
              inline
            />
          </Stack.Item>
          <Stack.Item fill>
            <TextField
              label='Bottom'
              quickchange
              name={`${focusIdx}.attributes.marginBottom`}
              inline
            />
          </Stack.Item>
        </Stack>

        <Stack wrap={false}>
          <Stack.Item fill>
            <TextField
              label='Left'
              quickchange
              name={`${focusIdx}.attributes.marginLeft`}
              inline
            />
          </Stack.Item>
          <Stack.Item fill>
            <TextField
              label='Right'
              quickchange
              name={`${focusIdx}.attributes.marginRight`}
              inline
            />
          </Stack.Item>
        </Stack>
      </Stack>
    );
  }, [focusIdx]);
}
