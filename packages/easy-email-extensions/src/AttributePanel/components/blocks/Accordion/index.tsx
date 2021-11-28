import React from 'react';
import { Stack, useEditorProps, useFocusIdx } from 'easy-email-editor';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { BackgroundColor } from '@extensions/AttributePanel/components/attributes/BackgroundColor';
import { FontFamily } from '@extensions/AttributePanel/components/attributes/FontFamliy';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import {
  ImageUploaderField,
  RadioGroupField,
  SelectField,
  TextField,
} from '@extensions/components/Form';

const positionOptions = [
  {
    value: 'left',
    label: 'Left',
  },
  {
    value: 'right',
    label: 'Right',
  },
];

const alignOptions = [
  {
    value: 'top',
    label: 'top',
  },
  {
    value: 'middle',
    label: 'middle',
  },
  {
    value: 'bottom',
    label: 'bottom',
  },
];

export function Accordion() {
  const { focusIdx } = useFocusIdx();
  const { onUploadImage } = useEditorProps();

  return (
    <AttributesPanelWrapper>
      <Stack vertical>
        <Padding />
        <BackgroundColor />
        <FontFamily />
        <TextField
          label='border'
          name={`${focusIdx}.attributes.border`}
          inline
          quickchange
        />
        <TextField
          label='Icon width'
          quickchange
          name={`${focusIdx}.attributes.icon-width`}
          inline
        />
        <TextField
          label='Icon height'
          quickchange
          name={`${focusIdx}.attributes.icon-height`}
          inline
        />

        <ImageUploaderField
          label='Icon unwrapped url'
          name={`${focusIdx}.attributes.icon-unwrapped-url`}
          helpText='The image suffix should be .jpg, jpeg, png, gif, etc. Otherwise, the picture may not be displayed normally.'
          uploadHandler={onUploadImage}
        />
        <ImageUploaderField
          label='Icon wrapped url'
          name={`${focusIdx}.attributes.icon-wrapped-url`}
          helpText='The image suffix should be .jpg, jpeg, png, gif, etc. Otherwise, the picture may not be displayed normally.'
          uploadHandler={onUploadImage}
        />
        <RadioGroupField
          label='Icon position'
          name={`${focusIdx}.attributes.icon-position`}
          options={positionOptions}
          inline
        />
        <SelectField
          style={{ width: 120 }}
          label='Icon align'
          name={`${focusIdx}.attributes.icon-align`}
          options={alignOptions}
          inline
        />
      </Stack>
    </AttributesPanelWrapper>
  );
}
