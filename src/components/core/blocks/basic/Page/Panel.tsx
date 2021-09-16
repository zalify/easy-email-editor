import React, { useContext } from 'react';
import { Stack } from '@/components/UI/Stack';
import {
  AutoCompleteField,
  ColorPickerField,
  SwitchField,
  TextAreaField,
  TextField,
} from '@/components/core/Form';
import { Help } from '@/components/UI/Help';
import { TextStyle } from '@/components/UI/TextStyle';
import { AddFont } from '@/components/core/Form/AddFont';

import { useFocusIdx } from '@/hooks/useFocusIdx';
import { EditorPropsContext } from '@/components/Provider/PropsProvider';

export function Panel() {
  const { focusIdx } = useFocusIdx();
  const { fontList = [] } = useContext(EditorPropsContext);

  if (!focusIdx) return null;
  return (
    <Stack.Item fill>
      <Stack vertical>
        <TextField label='Subject' name={'subject'} inline />
        <TextField label='SubTitle' name={'subTitle'} inline />
        <TextField
          label='Width'
          type='number'
          name={`${focusIdx}.attributes.width`}
          inline
        />
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
        <SwitchField
          inline
          label='Responsive'
          name={`${focusIdx}.data.value.responsive`}
          checkedChildren='True'
          unCheckedChildren='False'
        />
        <AutoCompleteField
          showSearch
          label='Font family'
          name={`${focusIdx}.data.value.font-family`}
          inline
          options={fontList}
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
        <ColorPickerField
          label='Content bg-color'
          name={`${focusIdx}.data.value.content-background-color`}
          inline
        />
        <TextAreaField
          label='User style'
          name={`${focusIdx}.data.value.user-style.content`}
        />
        <AddFont />
      </Stack>
    </Stack.Item>
  );
}
