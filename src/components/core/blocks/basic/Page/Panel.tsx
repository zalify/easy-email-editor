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
import { AttributesPanelWrapper } from '@/components/core/wrapper/AttributesPanelWrapper';
import { Collapse } from 'antd';

export function Panel() {
  const { focusIdx } = useFocusIdx();

  if (!focusIdx) return null;
  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <Stack.Item fill>
        <Collapse defaultActiveKey={['0', '1']}>
          <Collapse.Panel key='0' header='Email Setting'>
            <Stack vertical spacing='tight'>
              <TextField label='Subject' name={'subject'} inline />
              <TextField label='SubTitle' name={'subTitle'} inline />
              <TextField
                label='Width'
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
            </Stack>
          </Collapse.Panel>
          <Collapse.Panel key='1' header='Theme Setting'>
            <Stack vertical spacing='tight'>
              <Stack wrap={false}>
                <Stack.Item fill>
                  <TextField
                    label='Font family'
                    quickchange
                    name={`${focusIdx}.data.value.font-family`}
                  />
                </Stack.Item>
                <Stack.Item fill>
                  <TextField
                    label='Font size'
                    quickchange
                    name={`${focusIdx}.data.value.font-size`}
                  />
                </Stack.Item>
              </Stack>
              <Stack wrap={false}>
                <Stack.Item fill>
                  <ColorPickerField
                    label='Text color'
                    name={`${focusIdx}.data.value.text-color`}
                  />
                </Stack.Item>
                <Stack.Item fill>
                  <TextField
                    label='Line height'
                    quickchange
                    name={`${focusIdx}.data.value.line-height`}
                  />
                </Stack.Item>
              </Stack>

              <Stack wrap={false}>
                <ColorPickerField
                  label='Background color'
                  name={`${focusIdx}.attributes.background-color`}
                />
                <ColorPickerField
                  label='Content background color'
                  name={`${focusIdx}.data.value.content-background-color`}
                />
              </Stack>
              <TextAreaField
                label='User style'
                name={`${focusIdx}.data.value.user-style.content`}
              />
              <AddFont />
            </Stack>
          </Collapse.Panel>
        </Collapse>
      </Stack.Item>
    </AttributesPanelWrapper>
  );
}
