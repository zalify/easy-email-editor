import React from 'react';
import { Stack } from '@/components/Stack';
import {
  ColorPickerField,
  EditTabField,
  RadioGroupField,
  SelectField,
  TextField,
} from '@/components/core/Form';
import { LinkOutlined } from '@ant-design/icons';
import { useBlock } from '@/hooks/useBlock';
import { Align } from '@/components/EmailEditorLayout/components/ConfigurationPanel/components/AttributesManager/components/Align';
import { ICarousel } from '..';

const options = [
  {
    value: 'hidden',
    label: 'hidden',
  },
  {
    value: 'visible',
    label: 'visible',
  },
];

export function Panel() {
  const { focusIdx } = useBlock();
  return (
    <Stack vertical>

      <ColorPickerField
        label='Border color of the hovered thumbnail'
        name={`${focusIdx}.attributes.tb-hover-border-color`}
        inline
        alignment='center'
      />
      <ColorPickerField
        label='Border color of the selected thumbnail'
        name={`${focusIdx}.attributes.tb-selected-border-color`}
        inline
        alignment='center'
      />
      <TextField
        label='Icon width'
        name={`${focusIdx}.attributes.icon-width`}
        inline
        quickchange
      />
      <TextField
        label='Left icon'
        name={`${focusIdx}.attributes.left-icon`}
        inline
      />
      <TextField
        label='Right icon'
        name={`${focusIdx}.attributes.right-icon`}
        inline
      />
      <TextField
        label='Border of the thumbnails'
        name={`${focusIdx}.attributes.tb-border`}
        inline
      />
      <TextField
        label='Border radius of the thumbnails'
        name={`${focusIdx}.attributes.tb-border-radius`}
        inline
      />
      <TextField
        label='Thumbnail width'
        name={`${focusIdx}.attributes.tb-width`}
        quickchange
        inline
      />
      <RadioGroupField
        label='Thumbnails'
        name={`${focusIdx}.attributes.thumbnails`}
        options={options}
        inline
      />
      <Align />

      <div
        style={{
          borderTop: '1px solid #ccc',
          paddingTop: 10,
          marginTop: 20,
        }}
      >
        <EditTabField
          name={`${focusIdx}.data.value.images`}
          label='Images'
          renderItem={(item, index) => (
            <CarouselImage item={item} index={index} />
          )}
          additionItem={{
            src:
              'https://www.mailjet.com/wp-content/uploads/2016/11/ecommerce-guide.jpg',
            target: '_blank',
          }}
        />
      </div>
    </Stack>
  );
}

function CarouselImage({
  item,
  index,
}: {
  item: ICarousel['data']['value']['images'];
  index: number;
}) {
  const { focusIdx } = useBlock();
  return (
    <Stack>
      <TextField
        label='Image src'
        name={`${focusIdx}.data.value.images.[${index}].src`}
        inline
      />
      <TextField
        label='Thumbnails src'
        name={`${focusIdx}.data.value.images.[${index}].thumbnails-src`}
        inline
      />
      <Stack vertical>
        <Stack.Item fill>
          <TextField
            prefix={<LinkOutlined />}
            label={<span>Href&nbsp;&nbsp;&nbsp;</span>}
            name={`${focusIdx}.data.value.images.[${index}].href`}
            inline
          />
        </Stack.Item>

        <div style={{ minWidth: 150 }}>
          <SelectField
            label='Target'
            name={`${focusIdx}.data.value.images.[${index}].target`}
            options={[
              {
                value: '',
                label: '_self',
              },
              {
                value: '_blank',
                label: '_blank',
              },
            ]}
            inline
          />
        </div>
      </Stack>
      <TextField
        label='Title'
        helpText='tooltip & accessibility'
        name={`${focusIdx}.data.value.image.[${index}].title`}
        inline
      />
    </Stack>
  );
}
