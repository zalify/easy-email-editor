import React from 'react';
import { useFocusIdx } from 'easy-email-editor';
import { RadioGroupField } from '../../../components/Form';

const options = [
  {
    value: 'normal',
    get label() {
      return t('Normal');
    },
  },
  {
    value: 'italic',
    get label() {
      return t('Italic');
    },
  },
];

export function FontStyle({ name }: { name?: string }) {
  const { focusIdx } = useFocusIdx();

  return (
    <RadioGroupField
      label={t('Font style')}
      name={name || `${focusIdx}.attributes.font-style`}
      options={options}
    />
  );
}
