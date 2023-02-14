import { Stack } from '@demo/components/Stack';
import { useFocusIdx } from 'easy-email-editor';
import { AttributesPanelWrapper, ColorPickerField, NumberField, TextField } from 'easy-email-extensions';
import React from 'react';

export function Panel() {
  const { focusIdx } = useFocusIdx();
  return (
    <AttributesPanelWrapper style={{ padding: '20px' }}>
      <Stack vertical>
        <NumberField
          label='Quantity'
          inline
          max={6}
          name={`${focusIdx}.data.value.quantity`}
        />
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
    </AttributesPanelWrapper>
  );
}
