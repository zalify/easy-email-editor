import React from 'react';
import { useBlock } from '@/hooks/useBlock';
import { Stack } from '@/components/Stack';
import { ColorPickerField, TextField } from '@/components/core/Form';
import { Help } from '@/components/Help';
import { TextStyle } from '@/components/TextStyle';
import { AddFont } from '@/components/core/Form/AddFont';

export function Panel() {
  const { focusIdx, focusBlock } = useBlock();

  if (!focusBlock) return null;
  return (
    <Stack.Item fill>
      <Stack vertical>
        <TextField label='Subject' name={'subject'} inline />
        <TextField label='SubTitle' name={'subTitle'} inline />
        <TextField label='Width' name={`${focusIdx}.attributes.width`} inline />
        <Stack alignment="center">
          <TextField
            label={(
              <Stack spacing="extraTight">
                <TextStyle>Breakpoint</TextStyle>
                <Help title="Allows you to control on which breakpoint the layout should go desktop/mobile." />
              </Stack>
            )}
            name={`${focusIdx}.data.value.breakpoint`}
            inline
          />

        </Stack>
        <TextField
          label='Font family'
          quickchange
          name={`${focusIdx}.data.value.font-family`}
          inline
        />
        <ColorPickerField
          label='Text color'
          name={`${focusIdx}.data.value.text-color`}
          inline
        />
        <ColorPickerField
          label='Background color'
          name={`${focusIdx}.attributes.background-color`}
          inline
        />
        <AddFont />
      </Stack>
    </Stack.Item>
  );
}
