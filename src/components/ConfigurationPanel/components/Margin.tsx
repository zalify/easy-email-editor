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
        <TextStyle size="large">外边距</TextStyle>
        <Stack wrap={false}>
          <Stack.Item fill>
            <TextField
              label='上'
              quickchange
              name={`${focusIdx}.style.marginTop`}
              inline
            />
          </Stack.Item>
          <Stack.Item fill>
            <TextField
              label='下'
              quickchange
              name={`${focusIdx}.style.marginBottom`}
              inline
            />
          </Stack.Item>
        </Stack>

        <Stack wrap={false}>
          <Stack.Item fill>
            <TextField
              label='左'
              quickchange
              name={`${focusIdx}.style.marginLeft`}
              inline
            />
          </Stack.Item>
          <Stack.Item fill>
            <TextField
              label='右'
              quickchange
              name={`${focusIdx}.style.marginRight`}
              inline
            />
          </Stack.Item>
        </Stack>
      </Stack>
    );
  }, [focusIdx]);
}
