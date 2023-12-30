import React from 'react';
import { useFocusIdx } from 'easy-email-editor';
import { InputWithUnitField } from '../../../components/Form';
import { pixelAdapter } from '../adapter';

export function FontSize() {
  const { focusIdx } = useFocusIdx();

  return (
    <InputWithUnitField
      label='Font size'
      name={`${focusIdx}.attributes.font-size`}
      config={pixelAdapter}
      suffix='px'
      type='number'
      autoComplete='off'
    />
  );
}
