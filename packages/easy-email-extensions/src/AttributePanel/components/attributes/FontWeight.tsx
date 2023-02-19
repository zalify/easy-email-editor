import React, { useMemo } from 'react';
import { useFocusIdx } from 'easy-email-editor';
import { SelectField } from '../../../components/Form';

const options = [
  {
    value: 'normal',
    get label() {
      return t('Normal');
    },
  },
  {
    value: 'bold',
    get label() {
      return t('Bold');
    },
  },
  {
    value: '100',
    label: '100',
  },
  {
    value: '200',
    label: '200',
  },
  {
    value: '300',
    label: '300',
  },
  {
    value: '400',
    label: '400',
  },
  {
    value: '500',
    label: '500',
  },
  {
    value: '600',
    label: '600',
  },
  {
    value: '700',
    label: '700',
  },
  {
    value: '800',
    label: '800',
  },
  {
    value: '900',
    label: '900',
  },
];

export function FontWeight({ name }: { name?: string }) {
  const { focusIdx } = useFocusIdx();

  return useMemo(() => {
    return (
      <SelectField
        label={t('Font weight')}
        name={name || `${focusIdx}.attributes.font-weight`}
        options={options}
      />
    );
  }, [focusIdx, name]);
}
