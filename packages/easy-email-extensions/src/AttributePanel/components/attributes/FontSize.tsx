import React from 'react';
import { useFocusIdx } from 'easy-email-editor';
import { InputWithUnitField } from '../../../components/Form';

export function FontSize() {
  const { focusIdx } = useFocusIdx();

  return (
    <InputWithUnitField
      label='Font size'
      name={`${focusIdx}.attributes.font-size`}
    />
  );
}
