import React, { useContext } from 'react';
import { Padding } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Padding';
import { Stack } from '@/components/UI/Stack';
import {
  ColorPickerField,
  EditTabField,
  ImageUploaderField,
  RadioGroupField,
  SelectField,
  TextField,
} from '@/components/core/Form';
import { Align } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Align';
import { LinkOutlined } from '@ant-design/icons';
import { ISocial } from '.';
import { Color } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/Color';
import { ContainerBackgroundColor } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/ContainerBackgroundColor';
import { FontFamily } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/FontFamliy';
import { FontSize } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/FontSize';
import { FontStyle } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/FontStyle';
import { FontWeight } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/FontWeight';

import { useFocusIdx } from '@/hooks/useFocusIdx';

import { AttributesPanelWrapper } from '@/components/core/wrapper/AttributesPanelWrapper';
import { Collapse } from 'antd';
import { TextDecoration } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/TextDecoration';
import { LineHeight } from '@/components/EmailEditor/components/ConfigurationPanel/components/AttributesManager/components/LineHeight';
import { EditorPropsContext } from '@/components/Provider/PropsProvider';
import { IMAGE_LIST } from '@/assets/image';

const options = [
  {
    value: 'vertical',
    label: 'vertical',
  },
  {
    value: 'horizontal',
    label: 'horizontal',
  },
];

export function Panel() {
  const { focusIdx } = useFocusIdx();
  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <Collapse defaultActiveKey={['0', '1', '2']}>
        <Collapse.Panel key='1' header='Setting'>
          <Stack vertical spacing='tight'>
            <RadioGroupField
              label='Mode'
              name={`${focusIdx}.attributes.mode`}
              options={options}
              inline
            />
            <ContainerBackgroundColor title='Background color' />
          </Stack>
        </Collapse.Panel>

        <Collapse.Panel key='3' header='Typography'>
          <Stack vertical spacing='tight'>
            <Stack wrap={false}>
              <FontFamily />
              <Stack.Item fill>
                <FontSize />
              </Stack.Item>
            </Stack>

            <Stack wrap={false}>
              <FontWeight />
              <Stack.Item fill>
                <LineHeight />
              </Stack.Item>
            </Stack>

            <Stack wrap={false}>
              <TextDecoration />
              <Stack.Item fill>
                <Color inline={false} />
              </Stack.Item>
            </Stack>

            <FontStyle />
          </Stack>
        </Collapse.Panel>

        <Collapse.Panel key='2' header='Social element'>
          <EditTabField
            tabPosition='left'
            name={`${focusIdx}.data.value.elements`}
            label='Elements'
            renderItem={(item, index) => (
              <SocialElement item={item} index={index} />
            )}
            additionItem={{
              href: '',
              'icon-size': '20px',
              target: '_blank',
              src: IMAGE_LIST.IMAGE_05,
              content: 'Google',
            }}
          />
        </Collapse.Panel>

        <Collapse.Panel key='0' header='Dimension'>
          <Stack vertical spacing='tight'>
            <Align />
            <TextField
              label='Border radius'
              name={`${focusIdx}.attributes.border-radius`}
              inline
            />
            <Padding />
            <Padding attributeName='inner-padding' title='Inner padding' />
            <Padding attributeName='text-padding' title='Text padding' />
          </Stack>
        </Collapse.Panel>
      </Collapse>
    </AttributesPanelWrapper>
  );
}

function SocialElement({
  item,
  index,
}: {
  item: ISocial['data']['value']['elements'];
  index: number;
}) {
  const { focusIdx } = useFocusIdx();
  const { onUploadImage } = useContext(EditorPropsContext);

  return (
    <Stack vertical spacing='tight'>
      <ImageUploaderField
        label='Image'
        name={`${focusIdx}.data.value.elements.[${index}].src`}
        helpText='The image suffix should be .jpg, jpeg, png, gif, etc. Otherwise, the picture may not be displayed normally.'
        uploadHandler={onUploadImage}
        inline
      />

      <TextField
        label='Content'
        name={`${focusIdx}.data.value.elements.[${index}].content`}
        quickchange
        inline
      />

      <TextField
        label='Icon width'
        name={`${focusIdx}.data.value.elements.[${index}].icon-size`}
        quickchange
        inline
      />
      <TextField
        label='Icon height'
        name={`${focusIdx}.data.value.elements.[${index}].icon-height`}
        quickchange
        inline
      />

      <Stack wrap={false}>
        <Stack.Item fill>
          <TextField
            prefix={<LinkOutlined />}
            label={<span>Href</span>}
            name={`${focusIdx}.data.value.elements.[${index}].href`}
          />
        </Stack.Item>

        <SelectField
          style={{ minWidth: 65 }}
          label='Target'
          name={`${focusIdx}.data.value.elements.[${index}].target`}
          options={[
            {
              value: '_blank',
              label: '_blank',
            },
            {
              value: '_self',
              label: '_self',
            },
          ]}
        />
      </Stack>
    </Stack>
  );
}
