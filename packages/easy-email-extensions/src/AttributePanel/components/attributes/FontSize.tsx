import { useFocusIdx } from 'easy-email-editor';
import React from 'react';
import { RangeSliderField } from '../../../components/Form';
import { pixelAdapter } from '../adapter';

export function FontSize() {
  const { focusIdx } = useFocusIdx();

  return (
    <RangeSliderField
      label='Font size'
      name={`${focusIdx}.attributes.font-size`}
      config={pixelAdapter}
      autoComplete='off'
      output
      showTextField
    />
  );
}
