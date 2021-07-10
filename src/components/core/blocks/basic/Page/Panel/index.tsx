import React from 'react';
import { Stack } from '@/components/UI/Stack';
import { ColorPickerField, TextField } from '@/components/core/Form';
import { Help } from '@/components/UI/Help';
import { TextStyle } from '@/components/UI/TextStyle';
import { AddFont } from '@/components/core/Form/AddFont';

import { useFocusIdx } from '@/hooks/useFocusIdx';
import { FontFamily } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/FontFamliy';
export function Panel() {
  const { focusIdx } = useFocusIdx();

  if (!focusIdx) return null;
  return (
    <Stack.Item fill>
      <Stack vertical>
        <TextField label='Subject' name={'subject'} inline />
        <TextField label='SubTitle' name={'subTitle'} inline />
        <TextField label='Width' name={`${focusIdx}.attributes.width`} inline />
        <Stack alignment='center'>
          <TextField
            label={(
              <Stack spacing='extraTight'>
                <TextStyle>Breakpoint</TextStyle>
                <Help title='Allows you to control on which breakpoint the layout should go desktop/mobile.' />
              </Stack>
            )}
            quickchange
            name={`${focusIdx}.data.value.breakpoint`}
            inline
          />
        </Stack>
        <FontFamily />
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
