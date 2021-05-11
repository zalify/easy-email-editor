import { Stack } from '@example/components/Stack';
import { ColorPickerField, TextField, useBlock } from 'easy-email-editor';
import React from 'react';
export function Panel() {
  const { focusIdx } = useBlock();
  return (
    <Stack vertical>
      <TextField
        label='Title'
        name={`${focusIdx}.data.value.title`}
        inline
        alignment='center'
      />
      <TextField
        label='Button text'
        name={`${focusIdx}.data.value.buttonText`}
        inline
        alignment='center'
      />
      <ColorPickerField
        label='Background color'
        name={`${focusIdx}.attributes.background-color`}
        inline
        alignment='center'
      />
      <ColorPickerField
        label='Title color'
        name={`${focusIdx}.attributes.title-color`}
        inline
        alignment='center'
      />
      <ColorPickerField
        label='Product name color'
        name={`${focusIdx}.attributes.product-name-color`}
        inline
        alignment='center'
      />
      <ColorPickerField
        label='Product price color'
        name={`${focusIdx}.attributes.product-price-color`}
        inline
        alignment='center'
      />
      <ColorPickerField
        label='Button color'
        name={`${focusIdx}.attributes.button-color`}
        inline
        alignment='center'
      />
      <ColorPickerField
        label='Button text color'
        name={`${focusIdx}.attributes.button-text-color`}
        inline
        alignment='center'
      />
    </Stack>
  );
}
