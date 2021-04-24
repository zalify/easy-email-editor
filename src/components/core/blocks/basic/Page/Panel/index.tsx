import React from 'react';
import { useBlock } from '@/hooks/useBlock';
import { Stack } from '@/components/Stack';
import { ColorPickerField, TextAreaField, TextField } from '@/components/core/Form';
import { Help } from '@/components/Help';
import { TextStyle } from '@/components/TextStyle';

export function Panel() {
  const { focusIdx, focusBlock } = useBlock();

  if (!focusBlock) return null;
  return (
    <Stack.Item fill>
      <Stack vertical>
        <TextField label='Subject' name={'subject'} inline />
        <TextField label='SubTitle' name={'subTitle'} inline />
        <TextAreaField label='Style' name={`${focusIdx}.data.value.style`} inline rows={5} />
        <ColorPickerField
          label='Background color'
          name={`${focusIdx}.attributes.background-color`}
          inline
        />
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
      </Stack>
    </Stack.Item>
  );
}
