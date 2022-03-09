import React from 'react';
import {
  ColorPickerField,
  InputWithUnitField,
  SwitchField,
  TextAreaField,
  TextField,
} from '@extensions/components/Form';
import { Help } from '@extensions/AttributePanel/components/UI/Help';
import { AddFont } from '@extensions/components/Form/AddFont';
import { Collapse, Grid, Space } from '@arco-design/web-react';
import { Stack, TextStyle, useFocusIdx } from 'easy-email-editor';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { FontFamily } from '../../attributes/FontFamily';

export function Page() {
  const { focusIdx } = useFocusIdx();

  if (!focusIdx) return null;
  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <Stack.Item fill>
        <Collapse defaultActiveKey={['0', '1']}>
          <Collapse.Item name='0' header='Email Setting'>
            <Space direction='vertical'>
              <TextField label='Subject' name={'subject'} inline />
              <TextField label='SubTitle' name={'subTitle'} inline />
              <InputWithUnitField
                label='Width'
                name={`${focusIdx}.attributes.width`}
                inline
              />
              <InputWithUnitField
                label='Breakpoint'
                helpText='Allows you to control on which breakpoint the layout should go desktop/mobile.'
                name={`${focusIdx}.data.value.breakpoint`}
                inline
              />
            </Space>
          </Collapse.Item>
          <Collapse.Item name='1' header='Theme Setting'>
            <Stack vertical spacing='tight'>
              <Grid.Row>
                <Grid.Col span={11}>
                  <FontFamily name={`${focusIdx}.data.value.font-family`} />
                </Grid.Col>
                <Grid.Col offset={1} span={11}>
                  <InputWithUnitField
                    label='Font size'
                    name={`${focusIdx}.data.value.font-size`}
                  />
                </Grid.Col>
              </Grid.Row>

              <Grid.Row>
                <Grid.Col span={11}>
                  <InputWithUnitField
                    label='Line height'
                    unitOptions='percent'
                    name={`${focusIdx}.data.value.line-height`}
                  />
                </Grid.Col>
                <Grid.Col offset={1} span={11}>
                  <InputWithUnitField
                    label='Font weight'
                    unitOptions='percent'
                    name={`${focusIdx}.data.value.font-weight`}
                  />
                </Grid.Col>
              </Grid.Row>

              <Grid.Row>
                <Grid.Col span={11}>
                  <ColorPickerField
                    label='Text color'
                    name={`${focusIdx}.data.value.text-color`}
                  />
                </Grid.Col>
                <Grid.Col offset={1} span={11}>
                  <ColorPickerField
                    label='Background'
                    name={`${focusIdx}.attributes.background-color`}
                  />
                </Grid.Col>
              </Grid.Row>

              <Grid.Row>
                <ColorPickerField
                  label='Content background'
                  name={`${focusIdx}.data.value.content-background-color`}
                />

              </Grid.Row>

              <TextAreaField
                autoSize
                label='User style'
                name={`${focusIdx}.data.value.user-style.content`}
              />
              <Stack.Item />
              <Stack.Item />
              <AddFont />
              <Stack.Item />
              <Stack.Item />
            </Stack>
          </Collapse.Item>
        </Collapse>
      </Stack.Item>
    </AttributesPanelWrapper>
  );
}
