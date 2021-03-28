import React, { useMemo } from 'react';
import { useBlock } from '@/hooks/useBlock';
import { RadioGroupField, SelectField } from '@/components/core/Form';

const options = [
  {
    value: '',
    label: 'none',
  },
  {
    value: 'h1',
    label: 'h1',
  },
  {
    value: 'h2',
    label: 'h2',
  },
  {
    value: 'h3',
    label: 'h3',
  },
  {
    value: 'h4',
    label: 'h4',
  },
  {
    value: 'h5',
    label: 'h5',
  },
  {
    value: 'h6',
    label: 'h6',
  },
];

export function TextTitle() {
  const { focusIdx } = useBlock();

  return useMemo(() => {
    return (
      <SelectField
        label="Title"
        name={`${focusIdx}.data.value.title`}
        options={options}
        style={{ width: 120 }}
        inline
      />

    );
  }, [focusIdx]);
}
