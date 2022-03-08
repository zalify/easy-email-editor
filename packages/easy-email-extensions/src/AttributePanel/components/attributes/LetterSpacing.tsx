import React from 'react';
import { InputWithUnitField } from '../../../components/Form';
import { useFocusIdx } from 'easy-email-editor';

export function LetterSpacing({ name }: { name?: string; }) {
  const { focusIdx } = useFocusIdx();

  return (
    <InputWithUnitField
      label='Letter spacing'
      name={name || `${focusIdx}.attributes.letter-spacing`}
    />
  );
}
