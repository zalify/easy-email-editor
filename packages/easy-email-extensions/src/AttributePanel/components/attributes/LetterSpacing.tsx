import React from 'react';
import { InputWithUnitField } from '../../../components/Form';
import { useFocusIdx } from 'easy-email-editor';

export function LetterSpacing() {
  const { focusIdx } = useFocusIdx();

  return (
    <InputWithUnitField
      label='Letter spacing'
      name={`${focusIdx}.attributes.letter-spacing`}
    />
  );
}
