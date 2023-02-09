import React, { useMemo } from 'react';
import { useFocusIdx } from 'easy-email-editor';
import { SelectField } from '../../../components/Form';

const options = [
  {
    value: '',
    label: t('None'),
  },
  {
    value: 'underline',
    label: t('Underline'),
  },
  {
    value: 'overline',
    label: t('Overline'),
  },
  {
    value: 'line-through',
    label: t('Line through'),
  },
  {
    value: 'blink',
    label: t('Blink'),
  },
  {
    value: 'inherit',
    label: t('Inherit'),
  },
];

export function TextDecoration({ name }: { name?: string; }) {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <SelectField
        label={t('Text decoration')}
        name={name || `${focusIdx}.attributes.text-decoration`}
        options={options}
      />
    );
  }, [focusIdx, name]);
}
