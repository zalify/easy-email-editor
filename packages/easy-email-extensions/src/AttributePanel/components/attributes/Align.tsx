import React from 'react';
import { useFocusIdx } from 'easy-email-editor';
import { RadioGroupField } from '../../../components/Form';

const options = [
  {
    value: 'left',
    get label() {
      return t('left');
    },
  },
  {
    value: 'center',
    get label() {
      return t('center');
    },
  },
  {
    value: 'right',
    get label() {
      return t('right');
    },
  },
];

export function Align({
  inline,
  align,
}: {
  inline?: boolean;
  align?: 'space-between' | 'center';
}) {
  const { focusIdx } = useFocusIdx();

  return (
    <RadioGroupField
      label={t('Align')}
      name={`${focusIdx}.attributes.align`}
      options={options}
      align={align}
    />
  );
}
