import React from 'react';
import { InputWithUnitField } from '../../../components/Form';
import { useFocusIdx } from 'easy-email-editor';

export function LineHeight() {
  const { focusIdx } = useFocusIdx();

  return (
    <InputWithUnitField
      label='Line height'
      unitOptions='percent'
      name={`${focusIdx}.attributes.line-height`}
    />
  );
}
