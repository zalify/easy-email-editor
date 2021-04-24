import React, { useMemo } from 'react';
import { useBlock } from '@/hooks/useBlock';
import { SelectField, TextField } from '@/components/core/Form';

const options = [
  {
    value: 'normal',
    label: 'Normal',
  },
  {
    value: 'bold',
    label: 'Bold',
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

export function FontWeight() {
  const { focusIdx } = useBlock();

  return useMemo(() => {
    return (
      <SelectField
        label='Font weight'
        name={`${focusIdx}.attributes.font-weight`}
        options={options}
        inline
      />
    );
  }, [focusIdx]);
}
