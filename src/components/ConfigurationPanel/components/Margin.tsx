import React, { useMemo } from 'react';
import { TextField } from '@/components/core/Form';
import { Stack } from '@/components/Stack';
import { useBlock } from '@/hooks/useBlock';
import { TextStyle } from '@/components/TextStyle';

export function Margin() {
  const { focusIdx } = useBlock();

  return useMemo(() => {
    return (
      <Stack vertical spacing='extraTight'>
        <TextStyle size="large">Margin</TextStyle>
        <Stack wrap={false}>
          <Stack.Item fill>
            <TextField
              label='Top'
              quickchange
              name={`${focusIdx}.attribute.marginTop`}
              inline
            />
          </Stack.Item>
          <Stack.Item fill>
            <TextField
              label='Bottom'
              quickchange
              name={`${focusIdx}.attribute.marginBottom`}
              inline
            />
          </Stack.Item>
        </Stack>

        <Stack wrap={false}>
          <Stack.Item fill>
            <TextField
              label='Left'
              quickchange
              name={`${focusIdx}.attribute.marginLeft`}
              inline
            />
          </Stack.Item>
          <Stack.Item fill>
            <TextField
              label='Right'
              quickchange
              name={`${focusIdx}.attribute.marginRight`}
              inline
            />
          </Stack.Item>
        </Stack>
      </Stack>
    );
  }, [focusIdx]);
}
