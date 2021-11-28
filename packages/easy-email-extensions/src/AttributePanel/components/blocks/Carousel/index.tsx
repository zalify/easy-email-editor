import React from 'react';
import {
  ColorPickerField,
  EditTabField,
  ImageUploaderField,
  RadioGroupField,
  SelectField,
  TextField,
} from '@extensions/components/Form';
import { LinkOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import { Stack, useEditorProps, useFocusIdx } from 'easy-email-editor';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Align } from '@extensions/AttributePanel/components/attributes/Align';
import { ICarousel } from 'easy-email-core';

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

export function Carousel() {
  const { focusIdx } = useFocusIdx();
  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <Collapse defaultActiveKey={['0', '1', '2', '3', '4']}>
        <Collapse.Panel key='0' header='Dimension'>
          <Stack vertical spacing='tight'>
            <Stack vertical>
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
            </Stack>
          </Stack>
        </Collapse.Panel>
        <Collapse.Panel key='4' header='Images'>
          <Stack vertical spacing='tight'>
            <EditTabField
              tabPosition='left'
              name={`${focusIdx}.data.value.images`}
              label=''
              labelHidden
              renderItem={(item, index) => (
                <CarouselImage item={item} index={index} />
              )}
              additionItem={{
                src: 'https://www.mailjet.com/wp-content/uploads/2016/11/ecommerce-guide.jpg',
                target: '_blank',
              }}
            />
          </Stack>
        </Collapse.Panel>
        <Collapse.Panel key='3' header='Icon'>
          <Stack vertical spacing='tight'>
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
          </Stack>
        </Collapse.Panel>

        <Collapse.Panel key='1' header='Border'>
          <Stack vertical spacing='tight'>
            <ColorPickerField
              label='Hovered border color'
              name={`${focusIdx}.attributes.tb-hover-border-color`}
              inline
              alignment='center'
            />
            <ColorPickerField
              label='Selected Border color'
              name={`${focusIdx}.attributes.tb-selected-border-color`}
              inline
              alignment='center'
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
          </Stack>
        </Collapse.Panel>
      </Collapse>
    </AttributesPanelWrapper>
  );
}

function CarouselImage({
  item,
  index,
}: {
  item: ICarousel['data']['value']['images'];
  index: number;
}) {
  const { focusIdx } = useFocusIdx();
  const { onUploadImage } = useEditorProps();
  return (
    <Stack vertical spacing='tight'>
      <ImageUploaderField
        label='Image'
        labelHidden
        name={`${focusIdx}.data.value.images.[${index}].src`}
        helpText='The image suffix should be .jpg, jpeg, png, gif, etc. Otherwise, the picture may not be displayed normally.'
        uploadHandler={onUploadImage}
      />
      <Stack wrap={false}>
        <Stack.Item fill>
          <TextField
            prefix={<LinkOutlined />}
            label={<span>Href&nbsp;&nbsp;&nbsp;</span>}
            name={`${focusIdx}.data.value.images.[${index}].href`}
          />
        </Stack.Item>

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
        />
      </Stack>
      <TextField
        label='Title'
        helpText='tooltip & accessibility'
        name={`${focusIdx}.data.value.image.[${index}].title`}
      />
    </Stack>
  );
}
