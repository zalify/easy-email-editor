import React from 'react';
import { Padding } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/Padding';
import { Stack } from '@/components/Stack';
import {
  ColorPickerField,
  EditTabField,
  RadioGroupField,
  SelectField,
  TextField,
} from '@/components/core/Form';
import { useBlock } from '@/hooks/useBlock';
import { Align } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/Align';
import { LinkOutlined } from '@ant-design/icons';
import { ISocial } from '..';
import { Color } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/Color';
import { ContainerBackgroundColor } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/ContainerBackgroundColor';
import { FontFamily } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/FontFamliy';
import { FontSize } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/FontSize';
import { FontStyle } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/FontStyle';
import { FontWeight } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/FontWeight';
import { TextDecoration } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/TextDecoration';

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
  const { focusIdx } = useBlock();
  return (
    <Stack vertical>
      <div
        style={{
          borderBottom: '1px solid #ccc',
          paddingBottom: 10,
          marginBottom: 20,
        }}
      >
        <EditTabField
          name={`${focusIdx}.data.value.elements`}
          label='Elements'
          renderItem={(item, index) => (
            <SocialElement item={item} index={index} />
          )}
          additionItem={{
            'font-size': '13px',
            href: '',
            'icon-size': '20px',
            'line-height': '22px',
            'text-padding': '4px 4px 4px 0',
            target: '_blank',
            'vertical-align': 'middle',
            'text-decoration': 'none',
            src: 'https://assets.maocanhua.cn/FtBnhQQju_LU3-OtYq9_Ueu-G0lb',
            content: 'Google',
          }}
        />
      </div>

      <Align />
      <TextField
        label='Border radius'
        name={`${focusIdx}.attributes.border-radius`}
        inline
      />
      <Color />
      <ContainerBackgroundColor />
      <FontFamily />
      <FontSize />
      <FontStyle />
      <FontWeight />
      <TextDecoration />

      <RadioGroupField
        label='Mode'
        name={`${focusIdx}.attributes.mode`}
        options={options}
        inline
      />
      <Padding />
      <Padding title='Inner padding' attributeName='inner-padding' />
      <Padding title='Icon padding' attributeName='icon-padding' />
      <Padding title='Text padding' attributeName='text-padding' />
    </Stack>
  );
}

function SocialElement({
  item,
  index,
}: {
  item: ISocial['data']['value']['elements'];
  index: number;
}) {
  const { focusIdx } = useBlock();
  return (
    <Stack>
      <TextField
        label='Font size'
        name={`${focusIdx}.data.value.elements.[${index}].font-size`}
        quickchange
        inline
      />
      <TextField
        label='Icon size'
        name={`${focusIdx}.data.value.elements.[${index}].icon-size`}
        quickchange
        inline
      />
      <TextField
        label='Icon height'
        name={`${focusIdx}.data.value.elements.[${index}].icon-height`}
        quickchange
        inline
        placeholder='overrides icon-size'
      />
      <TextField
        label='Src'
        name={`${focusIdx}.data.value.elements.[${index}].src`}
        inline
      />
      <ColorPickerField
        label='Color'
        name={`${focusIdx}.data.value.elements.[${index}].color`}
        inline
        alignment='center'
      />
      <Stack vertical>
        <Stack.Item fill>
          <TextField
            prefix={<LinkOutlined />}
            label={<span>Href&nbsp;&nbsp;&nbsp;</span>}
            name={`${focusIdx}.data.value.elements.[${index}].href`}
            inline
          />
        </Stack.Item>

        <div style={{ minWidth: 150 }}>
          <SelectField
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
            inline
          />
        </div>
      </Stack>
    </Stack>
  );
}
