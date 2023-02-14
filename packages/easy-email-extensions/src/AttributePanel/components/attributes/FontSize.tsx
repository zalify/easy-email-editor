import React from 'react';
import { useFocusIdx } from 'easy-email-editor';
import { InputWithUnitField, NumberField } from '../../../components/Form';
import { pixelAdapter } from '../adapter';

export function FontSize() {
  const { focusIdx } = useFocusIdx();

  return (
    <NumberField
      label='Font size (px)'
      name={`${focusIdx}.attributes.font-size`}
      config={pixelAdapter}
      autoComplete='off'
    />
  );
}
