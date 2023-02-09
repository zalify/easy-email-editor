import React, { useMemo } from 'react';
import { useFocusIdx } from 'easy-email-editor';
import { SelectField, TextField } from '../../../components/Form';

const options = [
  {
    value: 'normal',
    label: t('Normal'),
  },
  {
    value: 'bold',
    label: t('Bold'),
  },
  {
    value: '100',
    label: t('100'),
  },
  {
    value: '200',
    label: t('200'),
  },
  {
    value: '300',
    label: t('300'),
  },
  {
    value: '400',
    label: t('400'),
  },
  {
    value: '500',
    label: t('500'),
  },
  {
    value: '600',
    label: t('600'),
  },
  {
    value: '700',
    label: t('700'),
  },
  {
    value: '800',
    label: t('800'),
  },
  {
    value: '900',
    label: t('900'),
  },
];

export function FontWeight({ name }: { name?: string; }) {
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
