import React, { useContext } from 'react';
import { Stack } from '@/components/UI/Stack';
import { BackgroundColor } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/BackgroundColor';
import {
  ImageUploaderField,
  RadioGroupField,
  TextField,
} from '@/components/core/Form';
import { Width } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Width';
import { Height } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Height';
import { VerticalAlign } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/VerticalAlign';
import { useFocusIdx } from '@/hooks/useFocusIdx';
import { Padding } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Padding';
import { EditorPropsContext } from '@/components/Provider/PropsProvider';
import { Collapse } from 'antd';
import { AttributesPanelWrapper } from '@/components/core/wrapper/AttributesPanelWrapper';

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

export function Panel() {
  const { focusIdx } = useFocusIdx();
  const { onUploadImage } = useContext(EditorPropsContext);

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
