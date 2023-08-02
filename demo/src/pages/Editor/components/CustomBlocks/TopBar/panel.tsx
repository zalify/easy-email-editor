import { Stack } from '@demo/components/Stack';
import { useFocusIdx } from 'easy-email-editor';
import { AttributesPanelWrapper, ColorPickerField, NumberField, TextField } from 'easy-email-extensions';
import React from 'react';

export function TopbarPanel1() {
  const { focusIdx } = useFocusIdx();
  return (
    <AttributesPanelWrapper style={{ padding: '20px' }}>
      <Stack vertical>
        <TextField
          label='Button text'
          name='Kya Haal hai'
          inline
        />
        <TextField
          label='Background-Color' name='bg-color' inline
        ></TextField>
      </Stack>
    </AttributesPanelWrapper>
  );
}
