import React, { useMemo } from 'react';
import { TextField } from '@/components/core/Form';
import { Stack } from '@/components/Stack';
import { useBlock } from '@/hooks/useBlock';
import { TextStyle } from '@/components/TextStyle';

export function InnerPadding() {
  const { focusIdx } = useBlock();

  return useMemo(() => {
    return (
      <Stack vertical spacing='extraTight'>
        <TextStyle size='large'>Inner padding</TextStyle>
        <Stack wrap={false}>
          <Stack.Item fill>
            <TextField
              label='上'
              quickchange
              name={`${focusIdx}.attribute.inner-padding-top`}
              inline
            />
          </Stack.Item>
          <Stack.Item fill>
            <TextField
              label='下'
              quickchange
              name={`${focusIdx}.attribute.inner-padding-bottom`}
              inline
            />
          </Stack.Item>
        </Stack>

        <Stack wrap={false}>
          <Stack.Item fill>
            <TextField
              label='左'
              quickchange
              name={`${focusIdx}.attribute.inner-padding-left`}
              inline
            />
          </Stack.Item>
          <Stack.Item fill>
            <TextField
              label='右'
              quickchange
              name={`${focusIdx}.attribute.inner-padding-right`}
              inline
            />
          </Stack.Item>
        </Stack>
      </Stack>
    );
  }, [focusIdx]);
}
