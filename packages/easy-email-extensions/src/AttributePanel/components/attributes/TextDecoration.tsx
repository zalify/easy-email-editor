import React, { useMemo } from 'react';
import { useFocusIdx } from 'easy-email-editor';
import { SelectField } from '../../../components/Form';

const options = [
  {
    value: '',
    get label() {
      return t('None');
    },
  },
  {
    value: 'underline',
    get label() {
      return t('Underline');
    },
  },
  {
    value: 'overline',
    get label() {
      return t('Overline');
    },
  },
  {
    value: 'line-through',
    get label() {
      return t('Line through');
    },
  },
  {
    value: 'blink',
    get label() {
      return t('Blink');
    },
  },
  {
    value: 'inherit',
    get label() {
      return t('Inherit');
    },
  },
];

export function TextDecoration({ name }: { name?: string }) {
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
