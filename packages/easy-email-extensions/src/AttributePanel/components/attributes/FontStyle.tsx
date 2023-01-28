import React, { useMemo } from 'react';
import { useFocusIdx } from 'easy-email-editor';
import { RadioGroupField } from '../../../components/Form';

const options = [
  {
    value: 'normal',
    label: t('Normal'),
  },
  {
    value: 'italic',
    label: t('Italic'),
  },
];

export function FontStyle({ name }: { name?: string; }) {
  const { focusIdx } = useFocusIdx();

  return (
    <RadioGroupField
      label={t('Font style')}
      name={name || `${focusIdx}.attributes.font-style`}
      options={options}
    />
  );
}
