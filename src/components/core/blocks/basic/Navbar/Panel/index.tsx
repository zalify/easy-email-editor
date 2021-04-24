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
import { INavbar } from '..';

const options = [
  {
    value: 'left',
    label: 'left',
  },
  {
    value: 'center',
    label: 'center',
  },
  {
    value: 'right',
    label: 'right',
  },
];

export function Panel() {
  const { focusIdx } = useBlock();
  return (
    <Stack vertical>
      <Align />
      <RadioGroupField
        label='IcoAlign'
        name={`${focusIdx}.attributes.ico-align`}
        options={options}
        inline
      />
      <ColorPickerField
        label='Ico color'
        name={`${focusIdx}.attributes.ico-color`}
        inline
        alignment='center'
      />
      <TextField
        label='Ico font size'
        name={`${focusIdx}.attributes.ico-font-size`}
        inline
        quickchange
      />
      <TextField
        label='Ico line height'
        name={`${focusIdx}.attributes.ico-line-height`}
        inline
        quickchange
      />
      <Padding
        title='Ico padding'
        attributeName={`${focusIdx}.attributes.ico-padding`}
      />

      <EditTabField
        name={`${focusIdx}.data.value.links`}
        label='Links'
        renderItem={(item, index) => <NavbarLink item={item} index={index} />}
        additionItem={{
          src:
            'https://www.mailjet.com/wp-content/uploads/2016/11/ecommerce-guide.jpg',
          target: '_blank',
          content: 'New link',
          color: '#1890ff',
          "font-size": "13px"
        }}
      />
    </Stack>
  );
}

function NavbarLink({
  item,
  index,
}: {
  item: INavbar['data']['value']['links'];
  index: number;
}) {
  const { focusIdx } = useBlock();
  return (
    <Stack>
      <TextField
        label='Font size'
        name={`${focusIdx}.data.value.links.[${index}].font-size`}
        inline
      />
      <ColorPickerField
        label='Color'
        name={`${focusIdx}.data.value.links.[${index}].color`}
        inline
        alignment='center'
      />
      <Stack vertical>
        <Stack.Item fill>
          <TextField
            prefix={<LinkOutlined />}
            label={<span>Href&nbsp;&nbsp;&nbsp;</span>}
            name={`${focusIdx}.data.value.links.[${index}].href`}
            inline
          />
        </Stack.Item>

        <div style={{ minWidth: 150 }}>
          <SelectField
            label='Target'
            name={`${focusIdx}.data.value.links.[${index}].target`}
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
