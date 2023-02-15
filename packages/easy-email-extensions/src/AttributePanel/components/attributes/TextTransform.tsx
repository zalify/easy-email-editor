import React, { useMemo } from 'react';
import { useFocusIdx } from 'easy-email-editor';
import { SelectField } from '../../../components/Form';

const options = [
  {
    value: 'initial',
    get label() {
      return t('None');
    },
  },
  {
    value: 'uppercase',
    get label() {
      return t('uppercase');
    },
  },
  {
    value: 'lowercase',
    get label() {
      return t('lowercase');
    },
  },
  {
    value: 'capitalize',
    get label() {
      return t('capitalize');
    },
  },
];

export function TextTransform({ name }: { name?: string }) {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <SelectField
        label={t('Text transform')}
        name={name || `${focusIdx}.attributes.text-transform`}
        options={options}
      />
    );
  }, [focusIdx, name]);
}
