import React from 'react';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import {
  EditTabField,
  ImageUploaderField,
  RadioGroupField,
  SelectField,
  TextField,
} from '@extensions/components/Form';
import { Align } from '@extensions/AttributePanel/components/attributes/Align';
import { IconLink } from '@arco-design/web-react/icon';
import { Color } from '@extensions/AttributePanel/components/attributes/Color';
import { ContainerBackgroundColor } from '@extensions/AttributePanel/components/attributes/ContainerBackgroundColor';
import { FontFamily } from '@extensions/AttributePanel/components/attributes/FontFamily';
import { FontSize } from '@extensions/AttributePanel/components/attributes/FontSize';
import { FontStyle } from '@extensions/AttributePanel/components/attributes/FontStyle';
import { FontWeight } from '@extensions/AttributePanel/components/attributes/FontWeight';

import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Collapse } from '@arco-design/web-react';
import { TextDecoration } from '@extensions/AttributePanel/components/attributes/TextDecoration';
import { LineHeight } from '@extensions/AttributePanel/components/attributes/LineHeight';
import { Stack, useEditorProps, useFocusIdx } from 'easy-email-editor';
import { ISocial } from 'easy-email-core';
import { getImg } from '@extensions/AttributePanel/utils/getImg';

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

export function Social() {
  const { focusIdx } = useFocusIdx();
  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <Collapse defaultActiveKey={['0', '1', '2']}>
        <Collapse.Item name='1' header='Setting'>
          <Stack vertical spacing='tight'>
            <RadioGroupField
              label='Mode'
              name={`${focusIdx}.attributes.mode`}
              options={options}
              inline
            />
            <ContainerBackgroundColor title='Background color' />
          </Stack>
        </Collapse.Item>

        <Collapse.Item name='3' header='Typography'>
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
        </Collapse.Item>

        <Collapse.Item
          name='2'
          header='Social element'
          contentStyle={{ padding: 0 }}
        >
          <EditTabField
            tabPosition='top'
            name={`${focusIdx}.data.value.elements`}
            label=''
            labelHidden
            renderItem={(item, index) => (
              <SocialElement item={item} index={index} />
            )}
            additionItem={{
              href: '',
              'icon-size': '20px',
              target: '_blank',
              src: getImg('AttributePanel_01'),
              content: 'Google',
            }}
          />
        </Collapse.Item>

        <Collapse.Item name='0' header='Dimension'>
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
        </Collapse.Item>
      </Collapse>
    </AttributesPanelWrapper>
  );
}

function SocialElement({
  index,
}: {
  item: ISocial['data']['value']['elements'];
  index: number;
}) {
  const { focusIdx } = useFocusIdx();
  const { onUploadImage } = useEditorProps();

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
            prefix={<IconLink />}
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
