import React, { useContext } from 'react';
import { BackgroundColor } from '@extensions/AttributePanel/components/attributes/BackgroundColor';
import {
  ImageUploaderField,
  RadioGroupField,
  TextField,
} from '@extensions/components/Form';
import { Width } from '@extensions/AttributePanel/components/attributes/Width';
import { Height } from '@extensions/AttributePanel/components/attributes/Height';
import { VerticalAlign } from '@extensions/AttributePanel/components/attributes/VerticalAlign';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import { Collapse } from 'antd';
import { Stack, useEditorProps, useFocusIdx } from 'easy-email-editor';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';

const options = [
  {
    value: 'fluid-height',
    label: 'Fluid height',
  },
  {
    value: 'fixed-height',
    label: 'Fixed height',
  },
];

export function Hero() {
  const { focusIdx } = useFocusIdx();
  const { onUploadImage } = useEditorProps();

  return (
    <AttributesPanelWrapper>
      <Collapse defaultActiveKey={['0', '1', '2']}>
        <Collapse.Panel key='0' header='Dimension'>
          <Stack vertical spacing='tight'>
            <RadioGroupField
              label='Mode'
              name={`${focusIdx}.attributes.mode`}
              options={options}
            />

            <Stack wrap={false}>
              <Stack.Item fill>
                <Width />
              </Stack.Item>
              <Stack.Item fill>
                <Height />
              </Stack.Item>
            </Stack>

            <Padding />
            <VerticalAlign />
          </Stack>
        </Collapse.Panel>
        <Collapse.Panel key='1' header='Background'>
          <Stack vertical spacing='tight'>
            <TextField
              label='Background width'
              name={`${focusIdx}.attributes.background-width`}
              inline
            />
            <TextField
              label='Background height'
              name={`${focusIdx}.attributes.background-height`}
              inline
            />
            <TextField
              label='Background position'
              name={`${focusIdx}.attributes.background-position`}
              inline
            />
            <ImageUploaderField
              label='src'
              name={`${focusIdx}.attributes.background-url`}
              helpText='The image suffix should be .jpg, jpeg, png, gif, etc. Otherwise, the picture may not be displayed normally.'
              uploadHandler={onUploadImage}
              inline
            />

            <TextField
              label='Border radius'
              name={`${focusIdx}.attributes.border-radius`}
              inline
              quickchange
            />

            <BackgroundColor />
          </Stack>
        </Collapse.Panel>
      </Collapse>
    </AttributesPanelWrapper>
  );
}
